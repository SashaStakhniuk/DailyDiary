import React, { Component } from "react";
import { connect } from "react-redux";
import { Host } from "../Host"
import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import GeneralHeader from "../Headers/GeneralHeader";
import "../../styles/journal.css"
import logo from "../../images/Photo.png"
class TeacherPage extends Component {
    constructor(props) {
        super(props)
        this.getTeacherIdByUserId = this.getTeacherIdByUserId.bind(this)
        this.state = {
            teacherId: 0,
            journalData: []
        }
    }
    async componentDidMount() {
        await this.getTeacherIdByUserId();
        this.getLessonData();
    }
    async getTeacherIdByUserId() {
        try {
            const response = await fetch(`${Host}/api/teacher/getTeacherIdByUserId/${this.props.credentials.userId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    teacherId: data
                })
                console.log("teacherId:", data)
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getLessonData() {
        try {
            if (+this.state.teacherId === 0) {
                return 0;
            }

            const response = await fetch(`${Host}/api/shedule/GetSheduleDataForSelectedDayByTeacherId/${this.state.teacherId}`);

            if (response.ok === true) {
                const data = await response.json();

                this.setState({
                    journalData: data
                }
                    , () => this.appendSubjectInShedule())
                // )
                console.log(data);
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
            // const data = await response.text();
            // window.alert(data);
        }
        catch (e) {
            window.alert(e);
        }
    }
    onLessonBarClick = (e) => {
        // console.log(e.target)
        var listsOfLi = e.target?.parentNode?.children;
        // console.log(listsOfLi.className)

        if (listsOfLi === undefined || e.target.tagName == "UL") {
            return 0;
        }
        for (let i = 0; i < listsOfLi.length; i++) {
            listsOfLi[i].className = "";
            if (listsOfLi[i].id == e.target.id) {
                listsOfLi[i].className = "selectedLesson";
            }
        }

    }
    appendSubjectInShedule = async (existingData) => {

        var oTable = document.getElementById('journalTable');
        if (!oTable) {
            return 0;
        }

        var tableBody = oTable.getElementsByTagName('tbody')[0];
        if (tableBody == undefined) {
            return 0;
        }
        if (this.state.journalData) {

            const journalDataStudent = this.state.journalData.students;
            for (let i = 0; i < journalDataStudent.length; i++) {
                let tr = document.createElement("tr");
                tr.setAttribute('value', journalDataStudent[i].studentId);
                tr.setAttribute('id', journalDataStudent[i].studentId);
                tr.setAttribute('class', "shedule-table-body-tr");

                let tdStudent = document.createElement("td");
                let tdButtonsChecked = document.createElement("td");
                let tdRate = document.createElement("td");
                let tdComment = document.createElement("td");

                // <div style="position:absolute; left:10px;">

                tdStudent.innerHTML = `
                        <div>
                        <div>
                        ${i + 1}
                    </div>
                    <div>
                        <img width="70px" src=${logo} alt="..."></img>
                    </div>
                    <div>
                    ${journalDataStudent[i].lastName + " " + journalDataStudent[i].name + " " + journalDataStudent[i].middleName}
                    </div>
                    </div>

                    `
                tdButtonsChecked.setAttribute("class", "td-radios");
                tdButtonsChecked.innerHTML = `
                    <label class="table-radio-container">
                                      <input type="radio" class="table-radio-green" name=${"radio_" + journalDataStudent[i].studentId}/>
                                      <span class="table-checkmark table-radio-green"></span>
                                    </label>
                                    <label class="table-radio-container">
                                      <input type="radio" class="table-radio-orange" name=${"radio_" + journalDataStudent[i].studentId}/>
                                      <span class="table-checkmark table-radio-orange"></span>
                                    </label>
                                    <label class="table-radio-container">
                                      <input type="radio" checked class="table-radio-red" name=${"radio_" + journalDataStudent[i].studentId}/>
                                      <span class="table-checkmark table-radio-red"></span>
                                    </label>
                    `;

                let selectRate = document.createElement('select')
                selectRate.setAttribute('class', 'form-select');
                selectRate.setAttribute('id', 'rate');
                selectRate.setAttribute('name', 'rate');
                selectRate.setAttribute('style', 'width:80px;');
                selectRate.innerHTML = `
                        <option selected value="0">-</option>

                                 ${Array.from({ length: 12 }, (_, i) => i + 1).map((element, index) =>
                    `<option key={"rate_${element}"} value=${element}>${element}</option>`
                )

                    }`;
                tdRate.appendChild(selectRate);

                var button = document.createElement('button');
                button.innerHTML = 'Додати';
                // button.onclick = (e) => this.deleteItemFromTable(e);
                button.setAttribute('class', 'general-outline-button');

                tdComment.appendChild(button);
                tr.appendChild(tdStudent);
                tr.appendChild(tdButtonsChecked);
                tr.appendChild(tdRate);
                tr.appendChild(tdComment);
                tableBody.appendChild(tr);
                //     }
                // }
                // else {
                //     tableBody.innerHTML = "No one subject for this day found";
                // }
            }
        }
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>
                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar menuItemToSelect={0} role={this.props.credentials.roles} />
                    </div>
                    <div className="generalSide">
                        <div className="text-bolder" style={{ margin: "10px 0px 10px 0px", fontSize: "20px" }}>
                            Журнал
                        </div>
                        <div className="lessons-number-bar">
                            <ul className="lessons-numer-list" onClick={(e) => this.onLessonBarClick(e)}>
                                {Array.from({ length: 9 }, (_, i) => i + 1).map((element, index) =>

                                    +index === 0 ?
                                        <li key={"lesson_" + element} id={"lesson_" + element} className="selectedLesson">
                                            Урок {element}
                                        </li>
                                        :
                                        <li key={"lesson_" + element} id={"lesson_" + element}>
                                            Урок {element}
                                        </li>
                                )
                                }
                            </ul>
                        </div>
                        <div className="journal-table-container">
                            <div className="journal-lesson-info">
                                <div>
                                    {this.state.journalData.groupTitle}
                                    {/* 8-А клас */}
                                </div>
                                <div>
                                    {this.state.journalData.subjectTitle}
                                    {/* Алгебра */}
                                </div>
                                <div>
                                    <input type="text" className="form-control" placeholder="Тема уроку" />
                                </div>
                                <div>
                                    <button className="general-outline-button upload-button">
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12L2.25 2L12.25 2L12.25 12H10.25V14H13.25C13.8023 14 14.25 13.5523 14.25 13L14.25 1C14.25 0.447715 13.8023 0 13.25 0L1.25 0C0.697715 0 0.25 0.447715 0.25 1L0.25 13C0.25 13.5523 0.697715 14 1.25 14H4.25V12H2.25ZM10.5429 9.70711L11.9571 8.29289L7.25 3.58579L2.54289 8.29289L3.95711 9.70711L6.25 7.41421V14L8.25 14V7.41421L10.5429 9.70711Z" />
                                        </svg>
                                        Класна робота
                                    </button>
                                </div>
                                <div>
                                    <button className="general-outline-button upload-button">
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12L2.25 2L12.25 2L12.25 12H10.25V14H13.25C13.8023 14 14.25 13.5523 14.25 13L14.25 1C14.25 0.447715 13.8023 0 13.25 0L1.25 0C0.697715 0 0.25 0.447715 0.25 1L0.25 13C0.25 13.5523 0.697715 14 1.25 14H4.25V12H2.25ZM10.5429 9.70711L11.9571 8.29289L7.25 3.58579L2.54289 8.29289L3.95711 9.70711L6.25 7.41421V14L8.25 14V7.41421L10.5429 9.70711Z" />
                                        </svg>
                                        Домашня робота
                                    </button>
                                </div>
                            </div>
                            <table id="journalTable" className="journal-table">
                                <thead className="journal-table-head">
                                    <tr>
                                        <th>ФІО студента</th>
                                        <th>
                                            <div className="makeCheckboxesGreenDiv">
                                                <div>
                                                    Відмітити присутніх
                                                </div>
                                                <label className="table-radio-container" style={{ position: "relative", top: "-3px", pointerEvents: "none" }}>
                                                    <input type="radio" defaultChecked disabled className="table-radio-green" name="radio" />
                                                    <span className="table-checkmark table-radio-green"></span>
                                                </label>
                                            </div>
                                        </th>
                                        <th>Робота на уроці</th>
                                        <th>Коментарі</th>
                                    </tr>
                                </thead>
                                <tbody className="journal-table-body">
                                    {/* <tr>
                                    <td>
                                        <div>
                                            1
                                        </div>
                                        <div>
                                            <img width="70px" src={logo} alt="..."></img>
                                        </div>
                                        <div>
                                        Студент студент студент
                                        </div>
                                    </td>
                                    <td className="td-radios">

                                    <label className="table-radio-container">
                                      <input type="radio" className="table-radio-green" name="radio"/>
                                      <span className="table-checkmark table-radio-green"></span>
                                    </label>
                                    <label className="table-radio-container">
                                      <input type="radio" className="table-radio-orange" name="radio"/>
                                      <span className="table-checkmark table-radio-orange"></span>
                                    </label>
                                    <label className="table-radio-container">
                                      <input type="radio" defaultChecked="checked" className="table-radio-red" name="radio"/>
                                      <span className="table-checkmark table-radio-red"></span>
                                    </label>
                                    </td>
                                    <td>
                                        <select className="form-select" style={{width:"80px"}}>
                                            <option value="11">11</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="general-outline-button">
                                        Додати
                                        </button>
                                    </td>
                                </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}

export default connect(mapStateToProps)(TeacherPage);