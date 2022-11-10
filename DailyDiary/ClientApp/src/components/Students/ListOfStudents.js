import React from 'react'
import StudentsTable from './StudentCard';
import { Host } from '../Host'
import GeneralHeader from '../Headers/GeneralHeader';
import GeneralNavigationBar from '../Navigations/GeneralNavigationBar';
import { connect } from "react-redux";
import "../../styles/index.css"
import "../../styles/Tasks/HomeworkCard.css"
import SubgroupCard from '../GeneralComponents/SubgroupCard';
import StudentCard from './StudentCard';


class ListOfStudents extends React.Component { // список студентів
    constructor(props) {
        super(props);

        this.getAllGroups = this.getAllGroups.bind(this); //всі групи та підгрупи теперішнього навчального року
        // this.getAllStudentsBySubroupId = this.getAllStudentsBySubroupId.bind(this); // всі студенти підгрупи
        this.getAllStudents = this.getAllStudents.bind(this); // всі студенти
        this.state = {
            subgroupId: 0,
            groups: [],
            students: [] // масив студентів 
        }
    };
    componentDidMount() {
        this.getAllGroups();
        this.getAllStudents();
    }

    async getAllStudents() {
        try {
            const response = await fetch(`${Host}/api/student/getAll`)
            // console.log(response)

            if (response.ok === true) {
                const data = await response.json();

                this.setState({
                    students: data
                })
                console.log("recieved students: ", data)
            }
            else {
                this.setState({
                    students: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getAllGroups() {
        try {
            const response = await fetch(`${Host}/api/group/getAllGroupsDatasOfCurrentStudyYear`)
            if (response.ok === true) {
                const data = await response.json();

                data.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1;
                    }
                    return 0;
                });

                this.setState({
                    groups: data
                }
                )
                if (data.length > 0) {
                    this.setState({
                        subgroupId: data[0].defSubgroupId
                    })
                }
                else {
                    this.setState({
                        groups: [],
                        subgroupId: 0
                    })
                }

                console.log("recieved groups: ", data)
            }
            else {
                this.setState({
                    groups: [],
                    subgroupId: 0
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    onSubgroupChange = (e) => {
        this.setState({
            subgroupId: e.target.value
        })
    }
    onSearchStudentChange = (e) => {
        // console.log(e.target.value)
        var studentTitle = e.target.value.toLowerCase();

        const cardsParrent = document.getElementById('students-cards');

        var cards = cardsParrent?.children;
        var students = this.state.students.filter(x => x.name.toLowerCase().includes(studentTitle) || x.middleName.toLowerCase().includes(studentTitle) || x.lastName.toLowerCase().includes(studentTitle))

        console.log(students)

        if (cardsParrent?.children.length > 0) {

            for (let i = 0; i < cards.length; i++) {
                cards[i].style.display = "none";
            }
            students.forEach(student => {
                for (let j = 0; j < cards.length; j++) {
                    if (cards[j].id == "student_" + student.studentId) {
                        cards[j].style.display = "flex";
                        break;
                    }
                }
            })
        }
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} menuItemToSelect={3} />
                    </div>
                    <div className="generalSide">
                        <div className="general-info-actions-bar">
                            <div className="d-flex flex-row align-items-center generalTextColor">
                                <div style={{ margin: "0px 5px 0px 5px" }}>
                                    Cтуденти
                                </div>

                            </div>
                            <div>
                                <select className='form-select' value={this.state.subgroupId} onChange={(e) => this.onSubgroupChange(e)}>
                                    <option value="0">---</option>
                                    {this.state?.groups?.map(group =>
                                        <option key={"subgroup_" + group.groupId} value={group.groupId}>{group.groupTitle}</option>
                                    )}
                                </select>

                            </div>
                        </div>

                        <div className="general-pagination-bar">
                            <div className="buttons-inline">
                                <button id="showStudents" className="general-outline-button button-static">
                                    <div className="tip-amount">
                                        <div className="number">
                                            {this.state.students.length}
                                        </div>
                                    </div>
                                    Учні
                                </button>

                                <div>
                                    <input style={{ margin: "0px 10px 0px 10px", width: "100%" }} type="search" className="form-control" placeholder='Пошук студентів' onChange={(e) => this.onSearchStudentChange(e)}></input>
                                </div>

                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <svg style={{ transform: "rotate(180deg)" }} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.28448 0L2.19345e-05 1.28446L5.71484 7L2.19345e-05 12.7155L1.28448 14L8.28448 7L1.28448 0Z" fill="#4F4F4F" />
                                </svg>
                                <ul className="pagination-ul">
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                </ul>

                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.28448 0L2.19345e-05 1.28446L5.71484 7L2.19345e-05 12.7155L1.28448 14L8.28448 7L1.28448 0Z" fill="#4F4F4F" />
                                </svg>
                                <div style={{ marginLeft: "14px" }} className="d-flex flex-row align-items-center">
                                    <svg width="2" height="34" viewBox="0 0 2 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="2" height="34" rx="1" fill="#E9EBED" />
                                    </svg>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5004 25.5H14.4754C14.2588 25.5 14.0671 25.425 13.9004 25.275C13.7338 25.125 13.6338 24.9333 13.6004 24.7L13.3004 22.45C13.0338 22.3667 12.7631 22.2417 12.4884 22.075C12.2131 21.9083 11.9588 21.7333 11.7254 21.55L9.65043 22.45C9.43376 22.5333 9.22143 22.5417 9.01343 22.475C8.80476 22.4083 8.63376 22.275 8.50043 22.075L7.00043 19.45C6.88376 19.25 6.85043 19.0373 6.90043 18.812C6.95043 18.5873 7.05876 18.4083 7.22543 18.275L9.05043 16.9C9.0171 16.75 8.99643 16.6 8.98843 16.45C8.97976 16.3 8.97543 16.15 8.97543 16C8.97543 15.8667 8.97976 15.725 8.98843 15.575C8.99643 15.425 9.0171 15.2667 9.05043 15.1L7.22543 13.725C7.05876 13.5917 6.95043 13.4127 6.90043 13.188C6.85043 12.9627 6.88376 12.75 7.00043 12.55L8.50043 9.95C8.6171 9.75 8.78376 9.61667 9.00043 9.55C9.2171 9.48333 9.42543 9.49167 9.62543 9.575L11.7254 10.45C11.9588 10.2667 12.2131 10.096 12.4884 9.938C12.7631 9.77933 13.0338 9.65 13.3004 9.55L13.6004 7.3C13.6338 7.06667 13.7338 6.875 13.9004 6.725C14.0671 6.575 14.2588 6.5 14.4754 6.5H17.5004C17.7338 6.5 17.9338 6.575 18.1004 6.725C18.2671 6.875 18.3671 7.06667 18.4004 7.3L18.7004 9.55C19.0004 9.66667 19.2711 9.79567 19.5124 9.937C19.7544 10.079 20.0004 10.25 20.2504 10.45L22.3754 9.575C22.5754 9.49167 22.7798 9.48333 22.9884 9.55C23.1964 9.61667 23.3671 9.75 23.5004 9.95L25.0004 12.55C25.1171 12.75 25.1504 12.9627 25.1004 13.188C25.0504 13.4127 24.9421 13.5917 24.7754 13.725L22.9254 15.125C22.9588 15.2917 22.9754 15.4417 22.9754 15.575V16C22.9754 16.1333 22.9711 16.2707 22.9624 16.412C22.9544 16.554 22.9338 16.7167 22.9004 16.9L24.7254 18.275C24.9088 18.4083 25.0254 18.5873 25.0754 18.812C25.1254 19.0373 25.0838 19.25 24.9504 19.45L23.4504 22.05C23.3338 22.25 23.1671 22.3833 22.9504 22.45C22.7338 22.5167 22.5171 22.5083 22.3004 22.425L20.2504 21.55C20.0004 21.75 19.7464 21.925 19.4884 22.075C19.2298 22.225 18.9671 22.35 18.7004 22.45L18.4004 24.7C18.3671 24.9333 18.2671 25.125 18.1004 25.275C17.9338 25.425 17.7338 25.5 17.5004 25.5V25.5ZM16.0004 19C16.8338 19 17.5421 18.7083 18.1254 18.125C18.7088 17.5417 19.0004 16.8333 19.0004 16C19.0004 15.1667 18.7088 14.4583 18.1254 13.875C17.5421 13.2917 16.8338 13 16.0004 13C15.1671 13 14.4588 13.2917 13.8754 13.875C13.2921 14.4583 13.0004 15.1667 13.0004 16C13.0004 16.8333 13.2921 17.5417 13.8754 18.125C14.4588 18.7083 15.1671 19 16.0004 19ZM16.0004 17.5C15.5838 17.5 15.2298 17.354 14.9384 17.062C14.6464 16.7707 14.5004 16.4167 14.5004 16C14.5004 15.5833 14.6464 15.2293 14.9384 14.938C15.2298 14.646 15.5838 14.5 16.0004 14.5C16.4171 14.5 16.7711 14.646 17.0624 14.938C17.3544 15.2293 17.5004 15.5833 17.5004 16C17.5004 16.4167 17.3544 16.7707 17.0624 17.062C16.7711 17.354 16.4171 17.5 16.0004 17.5ZM15.0004 24H16.9754L17.3254 21.325C17.8421 21.1917 18.3088 21 18.7254 20.75C19.1421 20.5 19.5504 20.1833 19.9504 19.8L22.4254 20.85L23.4254 19.15L21.2504 17.525C21.3338 17.2583 21.3881 17 21.4134 16.75C21.4381 16.5 21.4504 16.25 21.4504 16C21.4504 15.7333 21.4381 15.4793 21.4134 15.238C21.3881 14.996 21.3338 14.75 21.2504 14.5L23.4254 12.85L22.4504 11.15L19.9254 12.2C19.5921 11.85 19.1921 11.5373 18.7254 11.262C18.2588 10.9873 17.7921 10.7917 17.3254 10.675L17.0004 8H15.0254L14.6754 10.675C14.1754 10.7917 13.7088 10.975 13.2754 11.225C12.8421 11.475 12.4254 11.7917 12.0254 12.175L9.55043 11.15L8.57543 12.85L10.7254 14.45C10.6421 14.7 10.5838 14.95 10.5504 15.2C10.5171 15.45 10.5004 15.7167 10.5004 16C10.5004 16.2667 10.5171 16.525 10.5504 16.775C10.5838 17.025 10.6421 17.275 10.7254 17.525L8.57543 19.15L9.55043 20.85L12.0254 19.8C12.4088 20.1833 12.8171 20.5 13.2504 20.75C13.6838 21 14.1588 21.1917 14.6754 21.325L15.0004 24Z" fill="#4F4F4F" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div id="students">
                            {/*________________Список студентів_________________________*/}

                            <div style={{ margin: "20px 0px 20px 0px" }}>Список студентів:</div>
                            <div id="groupStudents" className="cards-container" style={{ margin: "20px 0px 20px 0px" }}>
                                <div id="students-cards" className="cards">
                                    {this.state.students.length > 0 ?
                                        this.state?.students?.map(student =>
                                            <StudentCard key={"student_" + student.studentId} student={student}></StudentCard>
                                        )
                                        :
                                        <></>
                                    }
                                </div>
                            </div>

                            {/*________________Список студентів_________________________*/}
                        </div >
                    </div >
                </div >
            </>
        )
    }
}
function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}
export default connect(mapStateToProps)(ListOfStudents);
