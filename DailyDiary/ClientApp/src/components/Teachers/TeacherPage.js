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
            lessons: [],
            selectedSheduleId: 0,
            journalData: [],

            file: "",
            fileName: "",
            fileType: ""
        }
    }
    async componentDidMount() {
        await this.getTeacherIdByUserId();
        this.getAllLessonsForTodayByTeacherId();
        // this.getLessonData();
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
    async getAllLessonsForTodayByTeacherId() {
        try {
            if (+this.state.teacherId === 0) {
                return 0;
            }

            const response = await fetch(`${Host}/api/shedule/getAllLessonsForTodayByTeacherId/${this.state.teacherId}`);

            if (response.ok === true) {
                const data = await response.json();

                this.setState({
                    lessons: data,
                    selectedSheduleId: data[0].id
                }
                    , () => this.getLessonData()
                )
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
    async getLessonData() {
        try {
            if (+this.state.teacherId === 0 || +this.state.selectedSheduleId===0) {
                return 0;
            }
            console.log("selectedSheduleId",this.state.selectedSheduleId);
            const response = await fetch(`${Host}/api/shedule/GetSheduleDataForSelectedDayBySheduleId/${this.state.selectedSheduleId}`);

            if (response.ok === true) {
                const data = await response.json();

                const tableBody = document.getElementById("journal-table-body");
                if (tableBody) {
                    tableBody.innerHTML = "";
                }
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
        this.setState({
            selectedSheduleId: e.target.value
        }
            , () => this.getLessonData()
        )
        // console.log(e.target.value)
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
    onNewHomeworkSubmit = async (e) => {
        e.preventDefault();
        const { theme, comment, deadline, subject, subgroup } = e.target;

        // theme: theme.value,
        // comment: comment.value,
        // deadline: deadline.value
        if (!deadline.value || !theme.value || !comment.value || !subject.value || !subgroup.value) {
            return 0;
        }
        try {
            const formData = new FormData();
            formData.append("formFile", this.state.file);
            formData.append("fileName", this.state.fileName);
            formData.append("fileType", this.state.fileType);
            formData.append("deadline", deadline.value);
            formData.append("theme", theme.value);
            formData.append("comment", comment.value);
            // formData.append("teacherUserId", this.props.credentials.userId);
            formData.append("teacherId", this.state.teacherId);
            formData.append("subjectId", subject.value);
            formData.append("subgroupId", subgroup.value);
            // console.log(formData.values());
            const response = await fetch(`${Host}/api/file/AddNewHomework`,
                {
                    method: "post",
                    body: formData
                });
            if (response.ok === true) {
                document.getElementById("closeJournalModalWindowButton").click();
            }
            const data = await response.text();
            window.alert(data);

        }
        catch (e) {
            // console.log(e.response);
            // const data = e.response.data;
            console.log(e)
        }
    }
    saveFile = (e) => {
        console.log(e.target.files);
        if (e.target.files[0].size <= 104857600) {
            this.setState({
                file: e.target.files[0],
                fileName: e.target.files[0].name,
                fileType: e.target.files[0].type
            }
                //, () => console.log(this.state)
            )
        }
        else {
            window.alert("File size can't be > 100Mb");
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
                        {this.state.lessons.length > 0 ?
                            <>
                                <div className="lessons-number-bar">
                                    <ul className="lessons-numer-list" onClick={(e) => this.onLessonBarClick(e)}>
                                        {/* {Array.from({ length: 9 }, (_, i) => i + 1).map((element, index) =>

                                    +index === 0 ?
                                        <li key={"lesson_" + element} id={"lesson_" + element} className="selectedLesson">
                                            Урок {element}
                                        </li>
                                        :
                                        <li key={"lesson_" + element} id={"lesson_" + element}>
                                            Урок {element}
                                        </li>
                                )
                                } */}
                                        {this.state.lessons.map((lesson, index) =>

                                            +index === 0 ?
                                                <li key={"lesson_" + lesson.id} id={"lesson_" + lesson.id} value={lesson.id} className="selectedLesson">
                                                    Урок {lesson.lessonId}
                                                </li>
                                                :
                                                <li key={"lesson_" + lesson.id} id={"lesson_" + lesson.id} value={lesson.id}>
                                                    Урок {lesson.lessonId}
                                                </li>
                                        )
                                        }

                                    </ul>
                                </div>
                                <div className="journal-table-container">
                                    <div className="journal-lesson-info">
                                        <div className="journal-lesson-info-item">
                                            {this.state.journalData.groupTitle}
                                            {/* 8-А клас */}
                                        </div>
                                        <div className="journal-lesson-info-item">
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
                                            <button className="general-outline-button upload-button" data-bs-toggle="modal" data-bs-target="#journalNewHomeworkModal">
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
                                        <tbody id="journal-table-body" className="journal-table-body">
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
                            </>
                            :
                            <></>
                        }
                        <div id="modalJournalNewHomeTaskWindow">
                            <div className="modal fade" id="journalNewHomeworkModal" tabIndex="-1" aria-labelledby="journalModalLabel"  >
                                <div className="modal-dialog">
                                    <div className="modal-content generalBackgroundColor">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="journalModalLabel">Завантажити завдання</h1>
                                            <button type="button" id="closeJournalModalWindowButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <form onSubmit={e => this.onNewHomeworkSubmit(e)}>
                                            <div className="modal-body modal-body-content">

                                                <div>
                                                    <label htmlFor="subject">Предмет:</label>
                                                    <select className="form-select" name="subject" id="subject" defaultValue={this.state.journalData.subjectId}>
                                                        <option value={this.state.journalData.subjectId}>{this.state.journalData.subjectTitle}</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="subgroup">Група</label>
                                                    <select className="form-select" name="subgroup" id="subgroup" defaultValue={this.state.journalData.groupId}>
                                                        <option value={this.state.journalData.groupId}>{this.state.journalData.groupTitle}</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="theme">Тема:</label>
                                                    <input type="text" className="form-control" id="theme" name="theme" required></input>
                                                </div>
                                                <div>
                                                    <label htmlFor="comment">Додати коментар</label>
                                                    <textarea className="form-control" id="comment" name="comment"></textarea>
                                                </div>
                                                <div>
                                                    <label htmlFor="file">Додати файл</label>
                                                    <input type="file" className="form-control" id="file" name="file" onChange={(e) => this.saveFile(e)}></input>
                                                </div>
                                                <div>
                                                    <label htmlFor="deadline">Дедлайн</label>
                                                    <input className="form-control" id="deadline" type='date' name="deadline"></input>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="general-button">Відправити</button>
                                                {/* <button type="submit" className="btn btn-primary" onClick={() => this.uploadHomework()}>Відправити</button> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div id="modalSettingsWindow">
                            <div className="modal fade" id="settingsModal" tabIndex="-1" aria-labelledby="settingsModalLabel"  >
                                <div className="modal-dialog">
                                    <div className="modal-content generalBackgroundColor">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="settingsModalLabel">Загальні налаштування</h1>
                                            <button type="button" id="closeSettingsModalWindowButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                       
                                            <div className="modal-body modal-body-content">

                                            </div>
                                            <div className="modal-footer">
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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