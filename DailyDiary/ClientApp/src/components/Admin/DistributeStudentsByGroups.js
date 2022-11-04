import React from 'react'
import { Link } from 'react-router-dom';
import { Host } from '../Host'
import { connect } from "react-redux";
import GeneralHeader from '../Headers/GeneralHeader';
import GeneralNavigationBar from '../Navigations/GeneralNavigationBar';
import StudentsTable from './StudentsTable';

class DistributeStudentsByGroups extends React.Component {
    constructor(props) {
        super(props);

        this.getAllGroups = this.getAllGroups.bind(this); //всі групи теперішнього навчального року
        this.getAllStudentsWithoutGroupThisStudyYear = this.getAllStudentsWithoutGroupThisStudyYear.bind(this);
        this.addStudentsIntoGroup = this.addStudentsIntoGroup.bind(this); // додати обраних студентів без групи в групу
        this.onGroupChange = this.onGroupChange.bind(this); // заміна ід обраної групи
        // this.ChildElementStudentsArrayIntoGroup = React.createRef();
        // this.ChildElementStudentsArrayIntoSubgroup = React.createRef();

        this.state = {
            groupId: 0,// ід групи
            studentsWithoutGroup: [],
            studentsToGroupAddId: [], // масив ід студентів для додання в групу
            groups: [], // масив усіх груп теперішнього навчального року
        }
    };
    componentDidMount() {
        this.getAllGroups();
        this.getAllStudentsWithoutGroupThisStudyYear();
    }
    async getAllGroups() {
        try {
            const response = await fetch(`${Host}/api/group/getAllGroupsDatasOfCurrentStudyYear`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    groups: data
                }
                )
                this.setState({
                    groupId: data[0].groupId,
                    title: data[0].groupTitle,
                    studyPlanId: data[0].studyPlanId,
                    yearOfStudyId: data[0].yearOfStudyId,
                    auditoryId: data[0].auditoryId
                })
                console.log("recieved groups: ", data)
            }
            else {
                this.setState({
                    groupId: 0,
                    title: "",
                    studyPlanId: 0,
                    yearOfStudyId: 0,
                    auditoryId: 0,
                    groups: [],
                    groupStudents: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getAllStudentsWithoutGroupThisStudyYear() {
        try {
            const response = await fetch(`${Host}/api/student/getAllStudentsWithoutGroupThisStudyYear`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved students: ", data)
                this.setState({
                    studentsWithoutGroup: data
                })
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    onSelectStudentToGroup = (studentId) => {
        const indexOfExistingStudentId = this.state.studentsToGroupAddId.indexOf(studentId);
        if (indexOfExistingStudentId === -1) {
            this.setState(previousState => ({
                studentsToGroupAddId: [...previousState.studentsToGroupAddId, studentId]
            }
            )
                , () => console.log(this.state.studentsToGroupAddId)
            );
        }
        else {
            this.setState({
                studentsToGroupAddId: this.state.studentsToGroupAddId.filter(function (id) {
                    return id !== studentId;
                })
            }
                , () => console.log(this.state.studentsToGroupAddId)
            );
        }
    }
    getDatasToGroupAdd = () => { // отримання масиву ід обраних студентів із дочірнього компонента
        // const childelement = this.ChildElementStudentsArrayIntoGroup.current;
        // if (childelement.state.studentsToAdd != null && childelement.state.studentsToAdd <= 0) {
        //     alert("No one student selected!");
        // }
        if (this.state.studentsToGroupAddId.length <= 0) {
            alert("No one student selected!");
        }
        else {
            const groupId = document.getElementById('group');
            if (groupId == undefined) {
                alert("Group not found");
                return 0;
            }
            this.setState({
                groupId: groupId.value,
            },
                () => this.addStudentsIntoGroup())

            alert("Selected students id:  " + this.state.studentsToGroupAddId);
        }
    }

    async addStudentsIntoGroup() {
        try {
            const datasToSend = {
                groupId: this.state.groupId,
                studentsId: this.state.studentsToGroupAddId
            }
            const response = await fetch(`${Host}/api/student/addStudentsIntoGroup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });
            if (response.ok === true) {
                this.setState({
                    studentsToGroupAddId: []
                })

                window.alert("Added");
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }

    onGroupChange(e) {

        this.setState({
            groupId: e.target.value
        })
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} menuItemToSelect={4} />
                    </div>
                    <div className="generalSide">


                        {/*________________Список студентів без групи_________________________*/}
                        {this.state.studentsWithoutGroup.length > 0 ?
                            <>
                                {/*________________Список груп_________________________*/}

                                <div>Групи:</div>
                                <div className="d-flex flex-row justify-content-between">
                                    <div className="form-floating col-md">
                                        <select id="group" name="group" className="form-select" value={this.state.groupId} onChange={(e) => this.onGroupChange(e)} required>
                                            {this.state.groups.map(group =>
                                                <option key={"group" + group.groupId} value={group.groupId}>{group.groupTitle}</option>
                                            )}
                                        </select>
                                        <label htmlFor="group">Groups</label>
                                    </div>
                                    <button className='btn btn-danger' style={{ textSize: "1.25em" }} onClick={() => this.deleteGroup(this.state.groupId)}>Видалити групу</button>
                                </div>
                                {/*________________Список груп_________________________*/}
                                <div style={{ marginTop: "20px" }}>Список нерозподілених студентів:</div>
                                <div id="groupStudents" className="cards-container">
                                    <div className="cards">
                                        {
                                            this.state?.studentsWithoutGroup?.map(student =>
                                                <StudentsTable key={"student_" + student.studentId} onStudentSelect={this.onSelectStudentToGroup} student={student} withoutGroup={true}></StudentsTable>
                                            )
                                        }
                                    </div>
                                </div>
                                <button className='general-button button-static' onClick={this.getDatasToGroupAdd}>Add selected in group</button>

                            </>
                            :
                            <div style={{ marginTop: "20px" }}>Усі студенти розподілені по групах</div>
                        }
                        {/*________________Список студентів без групи_________________________*/}
                    </div>
                </div>
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
export default connect(mapStateToProps)(DistributeStudentsByGroups);
// export default EditGroup;