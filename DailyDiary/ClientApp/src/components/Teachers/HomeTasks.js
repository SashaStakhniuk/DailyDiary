import React, { Component } from "react";
import { connect } from "react-redux";
import { Host } from "../Host"
import "../../styles/index.css"
import "../../styles/Tasks/HomeTasks.css"
import axios from "axios"

import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import GeneralHeader from "../Headers/GeneralHeader";
import TeacherHomeworkCard from "../GeneralComponents/TeacherHomeworkCard";
import { Role } from "../Role";

class HomeTasks extends Component {
    constructor(props) {
        super(props)

        this.uploadHomework = this.uploadHomework.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.getAllTeachersList = this.getAllTeachersList.bind(this);// якщо в системі адмін отримую список усіх викладачів
        this.getTeacherSubjects = this.getTeacherSubjects.bind(this);
        this.getTeacherSubgroupsByTeacherSubject = this.getTeacherSubgroupsByTeacherSubject.bind(this);
        this.getTeacherGivenHomeworks = this.getTeacherGivenHomeworks.bind(this);
        this.getStudentsHomeworksToCheck = this.getStudentsHomeworksToCheck.bind(this);
        this.getCheckedStudentsHomeworksTasks = this.getCheckedStudentsHomeworksTasks.bind(this);
        this.getTeacherGeneralTasksAmount = this.getTeacherGeneralTasksAmount.bind(this);
        this.rateStudentHomework = this.rateStudentHomework.bind(this);

        this.state = {
            studentHomeworkToRateId: 0,
            studentHomeworkToRateMark: undefined,
            studentHomeworkToRateTeacherComment: "",


            tasksToDisplay: <></>,

            teacherId: 0,

            teacherGivenHomeworks: [],
            studentHomeworksToCheck: [],
            studentCheckedHomeworks: [],

            givenTasksAmount: 0,
            toCheckTasksAmount: 0,
            checkedTasksAmount: 0,

            selectedSubjectId: 0,
            selectedSubgroupId: 0,
            comment: "",
            file: "",
            fileName: "",
            fileType: "",
            deadline: "0001-01-01",
            teacherSubjects: [],
            teacherSubgroups: [],

            teachersList: [] // список усіх викладачів якщо в системі адмін
        }
    }
    async componentDidMount() {
        var roles = this.props.credentials.roles
        if (roles !== undefined) {
            roles = new Array(roles);
            console.log(this.props.credentials)
            if (Object.values(roles).indexOf(Role.Admin) > -1 || Object.values(roles).indexOf(Role.MainAdmin) > -1) {
                console.log("Admin in system");
                await this.getAllTeachersList();
            }
            // if (roles[Role.Admin] || roles[Role.MainAdmin]) {
            //     console.log("Admin in system");
            // }
            else if (Object.values(roles).indexOf(Role.Teacher) > -1 ) {
                await this.getTeacherIdByUserId()
                // this.getTeacherSubgroupsByTeacherSubject();
            }
            this.getTeacherSubjects();

        }

    }
    async getAllTeachersList() {
        try {
            const response = await fetch(`${Host}/api/teacher/getAll`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${this.props.credentials.tokenKey}`

                }
            });
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    teachersList: data,
                    teacherId: data[0].teacherId
                })
                console.log("teachersList:", data)
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

    hideCards = (index) => {
        var givenHomeworks = document.getElementById("givenHomeworks");
        var onCheckingHomeworks = document.getElementById("on-checkingHomeworks");
        var checkedHomeworks = document.getElementById("checkedHomeworks");
        if (+index === 0) {
            givenHomeworks.style.display = "block"
            // givenHomeworks.style.animation = "fade 1s ease-in 1s"
            onCheckingHomeworks.style.display = "none"
            checkedHomeworks.style.display = "none"
        }
        if (+index === 1) {
            givenHomeworks.style.display = "none"
            onCheckingHomeworks.style.display = "block"
            // onCheckingHomeworks.style.animation = "fade 1s ease-in 1s"
            checkedHomeworks.style.display = "none"
        }
        if (+index === 2) {
            givenHomeworks.style.display = "none"
            onCheckingHomeworks.style.display = "none"
            checkedHomeworks.style.display = "block"
            // checkedHomeworks.style.animation = "fade 1s ease-in 1s"
        }
        // var cards = document.getElementById('cards');
        // for (let i = 0; i < cards.children; i++) {
        //     if (+index !== i) {
        //         cards.children[i].style.display = "none";
        //     }
        //     else {
        //         cards.children[i].style.display = "block";
        //     }
        // }
    }

    async getTeacherGivenHomeworks(e) {
        try {
            if (e) {
                this.onButtonTasksClick(e);
            }
            this.hideCards(0);
            const response = await fetch(`${Host}/api/teacher/getTeacherGivenHomeworks/details?teacherId=${this.state.teacherId}&&subgroupId=${this.state.selectedSubgroupId}`);
            if (response.ok === true) {
                const data = await response.json();

                const dataToAdd =
                    <div id="homeworks" className="cards-container">
                        <div className="cards">
                            {data.map(homework =>
                                <TeacherHomeworkCard key={"cardGivenTask_" + homework.taskId} task={homework} rateStudentHomework={this.rateStudentHomework} taskType="given"></TeacherHomeworkCard>
                            )}
                        </div>
                    </div>
                this.setState({
                    tasksToDisplay: dataToAdd,
                    teacherGivenHomeworks: data
                })

                console.log(data);
                // this.getStudentsHomeworksToCheck(data);
            }
            else {
                const data = await response.text();
                console.log();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getStudentsHomeworksToCheck(e) {
        try {
            this.hideCards(1);
            if (e) {
                this.onButtonTasksClick(e);
            }
            const response = await fetch(`${Host}/api/teacher/getStudentsHomeworksToCheck/details?teacherId=${this.state.teacherId}&&subgroupId=${this.state.selectedSubgroupId}`);
            if (response.ok === true) {
                const data = await response.json();

                const dataToAdd =
                    <div id="homeworks" className="cards-container">
                        <div className="cards">
                            {data.map(homework =>
                                <TeacherHomeworkCard key={"cardToCheck_" + homework.id} task={homework} rateStudentHomework={this.rateStudentHomework} taskType="on-checking"></TeacherHomeworkCard>
                            )}
                        </div>
                    </div>
                this.setState({
                    studentHomeworksToCheck: data,
                    tasksToDisplay: dataToAdd
                })

                console.log(data);
                // this.getStudentsHomeworksToCheck(data);
            }
            else {
                const data = await response.text();
                console.log();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getCheckedStudentsHomeworksTasks(e) {
        try {
            this.hideCards(2);
            if (e) {
                this.onButtonTasksClick(e);
            }
            const response = await fetch(`${Host}/api/teacher/getCheckedStudentsHomeworksTasks/details?teacherId=${this.state.teacherId}&&subgroupId=${this.state.selectedSubgroupId}`);
            if (response.ok === true) {
                const data = await response.json();

                const dataToAdd =
                    <div id="homeworks" className="cards-container">
                        <div className="cards">
                            {data.map(homework =>
                                <TeacherHomeworkCard key={"cardCheckTask_" + homework.id} task={homework} rateStudentHomework={this.rateStudentHomework} taskType="checked"></TeacherHomeworkCard>
                            )}
                        </div>
                    </div>
                this.setState({
                    tasksToDisplay: dataToAdd,
                    studentCheckedHomeworks: data
                })

                console.log(data);
                // this.getStudentsHomeworksToCheck(data);
            }
            else {
                const data = await response.text();
                console.log();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getTeacherGeneralTasksAmount() {
        try {
            const response = await fetch(`${Host}/api/teacher/getTeacherGeneralHomeworkTasksAmount/details?teacherId=${this.state.teacherId}&&subgroupId=${this.state.selectedSubgroupId}`);
            if (response.ok === true) {
                const data = await response.json();

                // const dataToAdd =
                //     <div id="homeworks" className="cards-container">
                //         <div className="cards">
                //             {data.map(homework =>
                //                 <TeacherHomeworkCard key={"cardToCheck_" + homework.id} task={homework} rateStudentHomework={this.rateStudentHomework}></TeacherHomeworkCard>
                //             )}
                //         </div>
                //     </div>
                this.setState({
                    givenTasksAmount: data.givenTasksAmount,
                    toCheckTasksAmount: data.toCheckTasksAmount,
                    checkedTasksAmount: data.checkedTasksAmount
                })

                console.log(data);
                // this.getStudentsHomeworksToCheck(data);
            }
            else {
                this.setState({
                    givenTasksAmount: 0,
                    toCheckTasksAmount: 0,
                    checkedTasksAmount: 0
                })

                const data = await response.text();
                console.log();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getTeacherSubjects() {
        try {
            const response = await fetch(`${Host}/api/teacher/getTeacherSubjectsByTeacherId/${this.state.teacherId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    selectedSubjectId: data[0].id,
                    teacherSubjects: data
                })
                console.log(data)
                this.getTeacherSubgroupsByTeacherSubject(data[0].id);
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
    // async getTeacherSubjects() {
    //     try {
    //         const response = await fetch(`${Host}/api/teacher/getTeacherSubjectsByUserId/${this.props.credentials.userId}`);
    //         if (response.ok === true) {
    //             const data = await response.json();
    //             this.setState({
    //                 selectedSubjectId: data[0].id,
    //                 teacherSubjects: data
    //             })
    //             console.log(data)
    //             this.getTeacherSubgroupsByTeacherSubject(data[0].id);
    //         }
    //         else {
    //             const data = await response.text();
    //             window.alert(data);

    //         }
    //     }
    //     catch (e) {
    //         window.alert(e);
    //     }
    // }
    // async getTeacherSubgroupsByTeacherSubject(subjectId) {
    //     try {
    //         const response = await fetch(`${Host}/api/teacher/GetTeacherSubgroupsByTeacherSubject/details?userId=${this.props.credentials.userId}&&subjectId=${subjectId}`);
    //         if (response.ok === true) {
    //             const data = await response.json();
    //             this.setState({
    //                 selectedSubgroupId: data[0].id,
    //                 teacherSubgroups: data
    //             })
    //             this.getStudentsHomeworksToCheck();
    //             this.getTeacherGeneralTasksAmount();
    //         }
    //         else {
    //             const data = await response.text();
    //             window.alert(data);

    //         }
    //     }
    //     catch (e) {
    //         window.alert(e);
    //     }
    // }
    async getTeacherSubgroupsByTeacherSubject(subjectId) {
        try {
            const response = await fetch(`${Host}/api/teacher/GetTeacherSubgroupsByTeacherSubject/details?teacherId=${this.state.teacherId}&&subjectId=${subjectId}`);
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
                    selectedSubgroupId: data[0].id,
                    teacherSubgroups: data
                })
                this.getStudentsHomeworksToCheck();
                this.getTeacherGeneralTasksAmount();
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
    saveFile(e) {
        console.log(e.target.files);
        if (e.target.files[0].size <= 104857600) {
            this.setState({
                file: e.target.files[0],
                fileName: e.target.files[0].name,
                fileType: e.target.files[0].type
            }
                , () => console.log(this.state)
            )
        }
        else {
            window.alert("File size can't be > 100Mb");
        }
    }
    async uploadHomework() {
        try {
            const formData = new FormData();
            formData.append("formFile", this.state.file);
            formData.append("fileName", this.state.fileName);
            formData.append("fileType", this.state.fileType);
            formData.append("deadline", this.state.deadline);
            formData.append("theme", this.state.theme);
            formData.append("comment", this.state.comment);
            // formData.append("teacherUserId", this.props.credentials.userId);
            formData.append("teacherId", this.state.teacherId);
            formData.append("subjectId", this.state.selectedSubjectId);
            formData.append("subgroupId", this.state.selectedSubgroupId);

            // console.log(formData.values());

            const response = await axios.post(`${Host}/api/file/AddNewHomework`, formData);
            // .then(function (response) {
            //     console.log(response.data);
            //     console.log(response.status);
            //     console.log(response.statusText);
            //     console.log(response.headers);
            //     console.log(response.config);
            // });
            // console.log(response)
            let data = response.data;
            console.log(data)
            if (response.status === 200) {
                document.getElementById("closeModalWindowButton").click();;
                window.alert(data);
            }
            else {
                window.alert("Task wasn't added");
            }


        }
        catch (e) {
            console.log(e.response);
            const data = e.response.data;
            console.log(data)
            for (var key in data) {
                // skip loop if the property is from prototype
                if (!data.hasOwnProperty(key)) continue;

                var obj = data[key];
                for (var prop in obj) {
                    // skip loop if the property is from prototype
                    if (!obj.hasOwnProperty(prop)) continue;

                    // your code
                    alert(obj[prop]);
                }
            }
        }
    }
    onSubjectChange = (e) => {
        this.getTeacherSubgroupsByTeacherSubject(e.target.value);
        this.setState({
            selectedSubjectId: e.target.value
        });
    }
    onSubgroupChange = (e) => {
        this.setState({
            selectedSubgroupId: e.target.value
        }
        ,()=>this.getCheckedStudentsHomeworksTasks()
        );
        var buttonsList = document.getElementById("buttonsList");
        if(buttonsList!==undefined){
            var buttons = Array.from(buttonsList.children);
            // console.log(buttons)
            for (let i = 1; i < buttons.length; i++) {
                buttons[i].className = "general-outline-button"
                if (i === 2) {
                    buttons[i].className = "general-outline-button button-static"
                }
            }
        }
       
    }
    onNewHomeworkSubmit = (e) => {
        e.preventDefault();
        const { theme, comment, deadline } = e.target;

        this.setState({
            theme: theme.value,
            comment: comment.value,
            deadline: deadline.value
        }
            , () => this.uploadHomework())

    }
    rateStudentHomework(studentHomeworkId, mark, teacherComment) {
        // console.log(studentHomeworkId);
        if (mark !== undefined && teacherComment !== undefined) {
            this.setState({
                studentHomeworkToRateId: studentHomeworkId,
                studentHomeworkToRateMark: mark,
                studentHomeworkToRateTeacherComment: teacherComment
            })
        }
        else {
            this.setState({
                studentHomeworkToRateId: studentHomeworkId,
                studentHomeworkToRateMark: 0,
                studentHomeworkToRateTeacherComment: ""
            })
        }
    }
    onStudentHomeworkRateSubmit = async (e) => {
        e.preventDefault();
        const { mark, comment } = e.target;
        if (+this.state.teacherId === 0 || +this.state.studentHomeworkToRateId === 0) {
            return 0;
        }
        const datasToSend = {
            id: this.state.studentHomeworkToRateId,
            checkIfAlreadyRated: true,
            teacherId: this.state.teacherId,
            mark: mark.value,
            comment: comment.value
        }
        try {
            const response = await fetch(`${Host}/api/teacher/rateStudentHomework`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'bearer ' + this.props.credentials.tokenKey
                },
                body: JSON.stringify(datasToSend)
            })
            if (response.ok === true) {
                document.getElementById("closeModalStudentRatingWindowButton").click();;
            }
            const data = await response.text();
            window.alert(data);

        }
        catch (e) {
            window.alert(e)
        }

    }
    onButtonTasksClick = (e) => {
        // console.log(e.currentTarget.parentNode.children);
        var buttons = Array.from(e.currentTarget.parentNode.children);
        // console.log(buttons)
        for (let i = 1; i < buttons.length; i++) {
            buttons[i].className = "general-outline-button"
            if (buttons[i] === e.currentTarget) {
                buttons[i].className = "general-outline-button button-static"
            }
        }
    }
    onTeacherChange = (e) => {
        this.setState({
            teacherId: e.target.value
        }
            , () => this.getTeacherSubjects())

    }
    render() {
        let subjects = <select className="form-select" name="subject" id="subject" defaultValue={this.state.selectedSubjectId} onChange={e => this.onSubjectChange(e)}>
            {this.state.teacherSubjects.length > 0 ?
                this.state.teacherSubjects.map(subject =>
                    <option key={"subject" + subject.id} value={subject.id}>{subject.title}</option>
                )
                :
                <option value="0">No one subject found</option>
            }
        </select>
        let groups = <select className="form-select" name="subgroup" id="subgroup" defaultValue={this.state.selectedSubgroupId} onChange={e => this.onSubgroupChange(e)}>
            {this.state.teacherSubgroups.length > 0 ?
                this.state.teacherSubgroups.map(subgroup =>
                    <option key={"subgroup" + subgroup.id} value={subgroup.id}>{subgroup.title}</option>
                )
                :
                <option value="0">No one group found</option>
            }
        </select>
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar menuItemToSelect={1} role={this.props.credentials.roles} />
                    </div>
                    <div className="generalSide">
                        <div className="d-flex flex-row justify-content-between m-2 p-2">
                            <div className="d-flex flex-row">
                                <div style={{ margin: "0px 5px 0px 5px", color: "#667080" }}>
                                    Завдання
                                </div>
                                <div style={{ margin: "0px 5px 0px 5px", color: "#667080", fontStyle: "bold" }}>
                                    Домашні завдання
                                </div>
                            </div>

                            <div className="d-flex flex-row" >
                                {
                                    this.props.credentials.roles == Role.Admin || this.props.credentials.roles == Role.MainAdmin ?
                                        <div style={{ margin: "0px 5px 0px 5px" }}>
                                            <select className="form-select" value={this.state.teacherId} onChange={(e) => this.onTeacherChange(e)}>
                                                {this.state.teachersList.length > 0 ?
                                                    this.state.teachersList.map(teacher =>
                                                        <option key={"teacher_" + teacher.teacherId} value={teacher.teacherId}>{teacher.lastName + " " + teacher.name + " " + teacher.middleName}</option>
                                                    )
                                                    :
                                                    <option value={0}>No one teacher found</option>
                                                }
                                            </select>
                                        </div>
                                        :
                                        <></>
                                }

                                <div style={{ margin: "0px 5px 0px 5px" }}>
                                    {subjects}
                                </div>
                                <div style={{ margin: "0px 5px 0px 5px" }}>
                                    {groups}
                                </div>

                            </div>
                        </div>
                        <div className="general-pagination-bar">
                            <div id="buttonsList" className="buttons-inline">
                                <button type="button" className="general-outline-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Нове завдання
                                </button>
                                {/* <button className="general-outline-button" onClick={() => this.getGivenStudentHomeworks(this.state.studentId)}>На перевірці</button> */}
                                <button className="general-outline-button" onClick={(e) => this.getTeacherGivenHomeworks(e)}>
                                    <div className="tip-amount">
                                        <div className="number">
                                            {this.state.givenTasksAmount}
                                        </div>
                                    </div>
                                    Задані
                                </button>
                                <button className="general-outline-button button-static" onClick={(e) => this.getStudentsHomeworksToCheck(e)}>
                                    <div className="tip-amount">
                                        <div className="number">
                                            {this.state.toCheckTasksAmount}
                                        </div>
                                    </div>
                                    На перевірці
                                </button>
                                <button className="general-outline-button" onClick={(e) => this.getCheckedStudentsHomeworksTasks(e)}>
                                    <div className="tip-amount">
                                        <div className="number">
                                            {this.state.checkedTasksAmount}
                                        </div>
                                    </div>
                                    Перевірені
                                </button>
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

                        <div>
                            <div id="givenHomeworks" className="cards-container">
                                <div id="cards" className="cards">
                                    {this.state.teacherGivenHomeworks?.map(homework =>
                                        <TeacherHomeworkCard key={"given_" + homework.taskId} task={homework} rateStudentHomework={this.rateStudentHomework} taskType="given"></TeacherHomeworkCard>
                                    )}
                                </div>
                            </div>
                            <div id="on-checkingHomeworks" className="cards-container">
                                <div id="cards" className="cards">
                                    {this.state.studentHomeworksToCheck?.map(homework =>
                                        <TeacherHomeworkCard key={"on-checking_" + homework.id} task={homework} rateStudentHomework={this.rateStudentHomework} taskType="on-checking"></TeacherHomeworkCard>
                                    )}
                                </div>
                            </div>
                            <div id="checkedHomeworks" className="cards-container">
                                <div id="cards" className="cards">
                                    {this.state.studentCheckedHomeworks?.map(homework =>
                                        <TeacherHomeworkCard key={"checked_" + homework.id} task={homework} rateStudentHomework={this.rateStudentHomework} taskType="checked"></TeacherHomeworkCard>
                                    )}
                                </div>
                            </div>
                            {/* {this.state.tasksToDisplay} */}
                        </div>

                        <div id="modalNewHomeTaskWindow">
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  >
                                <div className="modal-dialog">
                                    <div className="modal-content generalBackgroundColor">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Завантажити завдання</h1>
                                            <button type="button" id="closeModalWindowButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <form onSubmit={e => this.onNewHomeworkSubmit(e)}>
                                            <div className="modal-body modal-body-content">

                                                <div>
                                                    <label htmlFor="subject">Предмет:</label>
                                                    {subjects}
                                                </div>

                                                <div>
                                                    <label htmlFor="subgroup">Група</label>
                                                    {groups}
                                                </div>

                                                {/* <div>
                                                <label htmlFor="theme">Для груп:</label>
                                                <div id="theme">
                                                    {this.state.teacherSubgroups.length > 0 ?
                                                        this.state.teacherSubgroups.map(subgroup =>
                                                            <div key={"subgroup" + subgroup.id} className="form-check">
                                                                <input className="form-check-input" type="checkbox" id={"inlineCheckbox_" + subgroup.id} value={subgroup.id} />
                                                                <label className="form-check-label" htmlFor={"inlineCheckbox_" + subgroup.id}>{subgroup.title}</label>
                                                            </div>
                                                        )
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            </div> */}
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
                                                    <input type="file" className="form-control" id="file" name="file" onChange={this.saveFile}></input>
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
                        <div id="modalRatingStudentHomework">
                            <div className="modal fade" id="ratingStudentHomework" tabIndex="-1" aria-labelledby="ratingStudentHomeworkLabel"  >
                                <div className="modal-dialog">
                                    <div className="modal-content generalBackgroundColor">
                                        <div className="modal-header">
                                            {/* <h1 className="modal-title fs-5" id="ratingStudentHomeworkLabel">Оцінка домашнього завдання студента {this.props.task.studentData.studentFullName}</h1> */}
                                            <h1 className="modal-title fs-5" id="ratingStudentHomeworkLabel">Оцінка домашнього завдання студента</h1>
                                            <button type="button" id="closeModalStudentRatingWindowButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <form onSubmit={e => this.onStudentHomeworkRateSubmit(e)}>
                                            <div className="modal-body modal-body-content">
                                                <div>
                                                    <label htmlFor="mark" style={{ marginRight: "20px" }}>Оцінка:</label>
                                                    <input type="number" min="0" max="100" step="1" id="mark" defaultValue={this.state.studentHomeworkToRateMark} name="mark" required></input>
                                                </div>
                                                <div>
                                                    <label htmlFor="comment">Додати коментар</label>
                                                    <textarea className="form-control" id="comment" defaultValue={this.state.studentHomeworkToRateTeacherComment} name="comment"></textarea>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="general-button">Оцінити</button>
                                                {/* <button type="submit" className="btn btn-primary" onClick={() => this.uploadHomework()}>Відправити</button> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps)(HomeTasks);
