import React from 'react'
import StudentsTable from './StudentsTable';
import { Host } from '../Host'
import GeneralHeader from '../Headers/GeneralHeader';
import GeneralNavigationBar from '../Navigations/GeneralNavigationBar';
import { connect } from "react-redux";
import "../../styles/index.css"
import "../../styles/Tasks/HomeworkCard.css"


class GroupEditing extends React.Component { //розбиття студентів по підгрупах, створення нової підгрупи для групи, розподілення студентів по групах
    constructor(props) {
        super(props);

        this.getAllGroups = this.getAllGroups.bind(this); //всі групи теперішнього навчального року
        this.getGroupSubgroups = this.getGroupSubgroups.bind(this); //всі підгрупи групи

        this.getYearsOfStudyCurrentStudyYear = this.getYearsOfStudyCurrentStudyYear.bind(this); // всі роки навчання теперішнього навчального року
        this.getAllStudyPlansByYearOfStudyId = this.getAllStudyPlansByYearOfStudyId.bind(this); // всі навчальні плани обраного року навчання
        this.getFreeAuditories = this.getFreeAuditories.bind(this);// всі вільні аудиторії

        this.getAllStudentsWithoutGroupThisStudyYear = this.getAllStudentsWithoutGroupThisStudyYear.bind(this);
        this.getAllStudentsBySubroupId = this.getAllStudentsBySubroupId.bind(this); // всі студенти підгрупи
        this.getAllStudentsByGroupId = this.getAllStudentsByGroupId.bind(this); // всі студенти групи
        this.getSubgroupBlocks = this.getSubgroupBlocks.bind(this); // принципи розбиття групи на підгрупи

        this.addStudentsIntoGroup = this.addStudentsIntoGroup.bind(this); // додати обраних студентів без групи в групу
        this.addSelectedStudentsInSubgroup = this.addSelectedStudentsInSubgroup.bind(this); // додати обраних студентів групи до підгрупи
        this.addSubgroupIntoGroup = this.addSubgroupIntoGroup.bind(this); // додати нову підгрупу в групу

        // this.editGroupData = this.editGroupData.bind(this); // редагування даних групи

        this.removeStudentFromGroup = this.removeStudentFromGroup.bind(this); // видалення студента з групи
        this.removeStudentFromSubgroup = this.removeStudentFromSubgroup.bind(this); // видалення студента з підгрупи
        this.deleteGroup = this.deleteGroup.bind(this); // видалення групи
        this.deleteSubgroup = this.deleteSubgroup.bind(this); // видалення підгрупи

        this.onSubmitNewSubgroupForm = this.onSubmitNewSubgroupForm.bind(this); // створення нової групи
        this.onGroupChange = this.onGroupChange.bind(this); // заміна ід обраної групи
        this.onSubgroupChange = this.onSubgroupChange.bind(this); // заміна ід обраної підгрупи
        this.onSubgroupBlockChange = this.onSubgroupBlockChange.bind(this); // заміна/обрання/створення нового принципу поділу групи
        this.onSubgroupTitleChange = this.onSubgroupTitleChange.bind(this);// валідація назви нової підгрупи

        // this.ChildElementStudentsArrayIntoGroup = React.createRef();
        // this.ChildElementStudentsArrayIntoSubgroup = React.createRef();

        this.state = {
            groupId: 0,// ід групи
            subgroupId: 0, // ід підгрупи
            studentToAddGroupId: 0,// ід підгрупи для додання студентів

            isCurrentDisplaySubgroup: false,

            studentsToAddId: [], // масив ід студентів для додання в підгрупу
            studentsToGroupAddId: [], // масив ід студентів для додання в групу

            studentsWithoutGroup: [], //список студентів без групи
            subgroupTitle: "", // назва нової підгрупи
            subgroupBlockTitle: "", // назва принципу поділу
            subgroupBlocks: [], // масив вже існуючих принципів поділу
            groups: [], // масив усіх груп теперішнього навчального року
            subgroups: [], // масив підгруп обраної групи 
            groupStudents: [], // масив студентів групи
            subgroupStudents: [], // масив студентів підгрупи

        }
    };
    async componentDidMount() {
        await this.getAllGroups();
        this.getYearsOfStudyCurrentStudyYear();
        this.getFreeAuditories();

        if (this.props.location?.state !== undefined) {

            const recievedGroupId = this.props.location.state.group.groupId;
            console.log("recievedGroupId", recievedGroupId)

            this.getGroupSubgroups(recievedGroupId);
            this.getAllStudentsByGroupId(recievedGroupId);
            this.getAllStudyPlansByYearOfStudyId(this.props.location.state.group.yearOfStudyId);

            console.log("this.props.location.state", this.props.location.state)

            this.setState({
                groupId: recievedGroupId,
                studentToAddGroupId: recievedGroupId
                // title: this.props.location.state.group.groupTitle,
                // yearOfStudyId: this.props.location.state.group.yearOfStudyId,
                // studyPlanId: this.props.location.state.group.studyPlanId,
                // preferedAuditoryId: this.props.location.state.group.auditoryId,
                // groups: [{ "groupId": recievedGroupId, "groupTitle": this.props.location.state.group.groupTitle }]
            }
                , () => console.log(this.state)
            );

        }
        else {
            this.getGroupSubgroups(this.state.groupId);
            this.getAllStudentsByGroupId(this.state.groupId);
        }
        this.getSubgroupBlocks();
    }

    async getYearsOfStudyCurrentStudyYear() {
        try {
            const response = await fetch(`${Host}/api/yearOfStudy/getYearsOfStudyByCurrentStudyYear`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved yearsofStudy: ", data)
                this.setState({
                    yearsOfStudy: data
                }
                    // , () => this.getAllStudyPlansByYearOfStudyId(data[0].id)
                )
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
    async getAllStudyPlansByYearOfStudyId(yearOfStudyId) {
        try {
            const response = await fetch(`${Host}/api/studyPlan/getAllStudyPlansByYearOfStudyId/${yearOfStudyId}`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved studyPlans: ", data)
                this.setState({
                    studyPlans: data,
                    studyPlanId: data[0].id
                })
            }
            else {
                this.setState({
                    studyPlans: [],
                    studyPlanId: 0
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getFreeAuditories() {
        try {
            const response = await fetch(`${Host}/api/auditory/getFreeAuditories`); // getFreeAuditories // getAllAuditories
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved auditories: ", data)
                this.setState({
                    auditories: data
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
    onSelectStudentToSubgroup = (studentId) => {
        const indexOfExistingStudentId = this.state.studentsToAddId.indexOf(studentId);
        if (indexOfExistingStudentId === -1) {
            this.setState(previousState => ({
                studentsToAddId: [...previousState.studentsToAddId, studentId]
            }
            )
                , () => console.log(this.state.studentsToAddId)
            );
        }
        else {
            this.setState({
                studentsToAddId: this.state.studentsToAddId.filter(function (id) {
                    return id !== studentId;
                })
            }
                , () => console.log(this.state.studentsToAddId)
            );
        }
    }
    getDatasToSubgroupAdd = () => { // отримання масиву ід обраних студентів із дочірнього компонента
        // const childelement = this.ChildElementStudentsArrayIntoSubgroup.current;
        // if (childelement.state.studentsToAdd != null && childelement.state.studentsToAdd <= 0) {
        //     alert("No one student selected!");
        // }
        if (this.state.studentsToAddId.length <= 0) {
            alert("No one student selected!");
        }
        else {
            const groupId = document.getElementById('group');
            if (groupId == undefined) {
                alert("Group not found");
                return 0;
            }
            const subgroupId = document.getElementById('subgroup');
            if (subgroupId == undefined) {
                alert("Subgroup not found");
                return 0;
            }
            this.setState({
                groupId: groupId.value,
                subgroupId: subgroupId.value
            },
                () => this.addSelectedStudentsInSubgroup())
            alert("Selected students id:  " + this.state.studentsToAddId);
        }
    }
    onSelectStudentToGroup = (e) => {
        const studentId = e.target.value;

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
            // const groupId = document.getElementById('group');
            if (this.state.studentToAddGroupId === undefined || +this.state.studentToAddGroupId === 0) {
                alert("Group not found");
                return 0;
            }
            this.addStudentsIntoGroup()

            alert("Selected students id:  " + this.state.studentsToGroupAddId);
        }
    }
    async addSelectedStudentsInSubgroup() {
        try {
            const datasToSend = {
                groupId: this.state.groupId,
                subgroupId: this.state.subgroupId,
                studentsId: this.state.studentsToAddId
            }
            console.log(datasToSend)
            const response = await fetch(`${Host}/api/subgroup/addStudents`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });
            const data = await response.text();
            window.alert(data);
            if (response.ok === true) {
                this.getAllStudentsBySubroupId(this.state.subgroupId)
            }
            // else {
            //     const data = await response.text();
            //     window.alert(data);
            // }
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
                this.setState({
                    groups: data
                }
                    //    , () => this.getGroupSubgroups(data[0].groupId)
                )
                // this.getAllStudentsByGroupId(data[0].groupId);
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
    async getGroupSubgroups(groupId) {
        try {
            const response = await fetch(`${Host}/api/subgroup/getAllExceptDefaultByGroupId/${groupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    subgroups: data
                }
                    // , () => this.getAllStudentsBySubroupId(data[0].id)
                )
                if (data.length > 0) {
                    this.getAllStudentsBySubroupId(data[0].id)
                    this.setState({
                        subgroupId: data[0].id
                    })
                }
                else {
                    this.setState({
                        subgroups: [],
                        subgroupStudents: [],
                        subgroupId: 0
                    })
                }

                console.log("recieved subgroups: ", data)
            }
            else {
                this.setState({
                    subgroups: [],
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

    async getAllStudentsByGroupId(groupId) {
        try {
            const response = await fetch(`${Host}/api/student/getAllByGroupId/${groupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    groupStudents: data
                })
                console.log("recieved groupStudents: ", data)
            }
            else {
                this.setState({
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
    async getAllStudentsBySubroupId(subgroupId) {
        try {
            const response = await fetch(`${Host}/api/student/getAllBySubroupId/${subgroupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    subgroupStudents: data
                })
                console.log("recieved subgroupStudents: ", data)
            }
            else {
                this.setState({
                    subgroupStudents: []
                })
                // const data = await response.text();
                // window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getSubgroupBlocks() {
        try {
            const response = await fetch(`${Host}/api/subgroupBlock/getAll`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    subgroupBlocks: data
                })
                console.log("recieved subgroupBlocks: ", data)
            }
            else {
                this.setState({
                    subgroupBlocks: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async addSubgroupIntoGroup() {
        try {
            const datasToSend = {
                subgroupId: 0,
                subgroupTitle: this.state.subgroupTitle,
                subgroupBlockTitle: this.state.subgroupBlockTitle,
                groupId: this.state.groupId
            }
            const response = await fetch(`${Host}/api/subgroup/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });
            if (response.ok === true) {
                window.alert("Subgroup created successfully");
                this.getGroupSubgroups(this.state.groupId);
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
    async addStudentsIntoGroup() {
        try {
            const datasToSend = {
                groupId: this.state.studentToAddGroupId,
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

    async removeStudentFromSubgroup(studentId) {
        try {
            const response = await fetch(`${Host}/api/student/deleteStudentFromSubgroup/details?studentId=${studentId}&&subgroupId=${this.state.subgroupId}`, {
                method: "DELETE"
            })
            const data = await response.text();
            window.alert(data);
            if (response.ok === true) {
                await this.getAllStudentsBySubroupId(this.state.subgroupId)
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async removeStudentFromGroup(studentId) {
        try {
            const response = await fetch(`${Host}/api/student/deleteStudentFromGroup/details?studentId=${studentId}&&groupId=${this.state.groupId}`, {
                method: "DELETE"
            })
            const data = await response.text();
            window.alert(data);
        }
        catch (e) {
            window.alert(e);
        }
    }
    async deleteGroup(groupId) {
        try {
            if (groupId <= 0) {
                alert("Group id can't be <= 0");
                return 0;
            }
            const response = await fetch(`${Host}/api/group/delete/${groupId}`, {
                method: "DELETE"
            })
            if (response.ok === true) {
                window.alert("Group include subgroups deleted successfully");
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
    async deleteSubgroup(subgroupId) {
        try {
            if (subgroupId <= 0) {
                alert("Subgroup id can't be <= 0");
                return 0;
            }
            const response = await fetch(`${Host}/api/subgroup/delete/${subgroupId}`, {
                method: "DELETE"
            })
            if (response.ok === true) {
                const data = await response.text();
                window.alert(data);
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
        console.log(e.target.value);
        const group = this.state.groups.find(x => x.groupId == e.target.value);
        console.log(group);
        if (group !== undefined) {
            if (this.state.yearOfStudyId != group.yearOfStudyId) {
                this.getAllStudyPlansByYearOfStudyId(group.yearOfStudyId)
            }
            this.setState({
                groupId: group.groupId,
                title: group.groupTitle,
                studyPlanId: group.studyPlanId,
                yearOfStudyId: group.yearOfStudyId,
                auditoryId: group.auditoryId
            })
        }
        // this.setState({
        //     groupId: e.target.value
        // })
        this.getGroupSubgroups(e.target.value)
        this.getAllStudentsByGroupId(e.target.value);
    }

    onModalGroupChange(e) {
        // console.log(e.target.value);

        this.setState({
            studentToAddGroupId: e.target.value,
        })
    }

    onSubgroupChange(e) {
        this.setState({
            subgroupId: e.target.value
        })
        this.getAllStudentsBySubroupId(e.target.value)
    }
    onSubmitNewSubgroupForm(e) {
        e.preventDefault();
        // console.log(e.target.elements);
        const { newSubgroup, subgroupBlock } = e.target
        this.setState({
            subgroupTitle: newSubgroup.value,
            subgroupBlockTitle: subgroupBlock.value
        }
            , () => this.addSubgroupIntoGroup()
        )
    }
    onSubgroupTitleChange(e) {
        console.log(e.target.value)
        var output = e.target.value.split('');
        for (let i = 0; i < output.length; i++) {
            if (output[i] === ' ') {
                output[i] = '_'
            }
        }
        e.target.value = output.join('');
        console.log(e.target.value)
    }
    onSubgroupBlockChange(e) {
        console.log(e.target.value)
    }
    // onCreateNewSubgroupFormSubmit = (e) => {
    //     e.preventDefault();

    //     const { groupTitle, yearOfStudy, studyPlan, auditory } = e.target;
    //     this.setState({
    //         title: groupTitle.value,
    //         yearOfStudyId: yearOfStudy.value,
    //         studyPlanId: studyPlan.value,
    //         preferedAuditoryId: auditory.value
    //     }
    //         , () => this.editGroupData()
    //     )

    // }
    onYearOfStudyChange = (e) => {
        this.setState({
            yearOfStudyId: e.target.value
        })
        this.getAllStudyPlansByYearOfStudyId(e.target.value);
    }
    onAuditoryChange = (e) => {
        this.setState({
            preferedAuditoryId: e.target.value
        }
            // ,()=>console.log(this.state)
        )
    }
    onStudyPlanChange = (e) => {
        this.setState({
            studyPlanId: e.target.value
        })
    }

    makeButtonActive = (e) => {
        // console.log(e.currentTarget.parentNode.children);
        var buttons = Array.from(e.currentTarget.parentNode.children);
        // console.log(buttons)
        for (let i = 0; i < buttons.length - 1; i++) {
            buttons[i].className = "general-outline-button"
            if (buttons[i] === e.currentTarget) {
                buttons[i].className = "general-outline-button button-static"
            }
        }
    }
    onStudentsClick(e) {

        var students = document.getElementById("students");
        if (students === undefined || students === null) {
            return 0;
        }
        this.makeButtonActive(e);
        this.setState({
            isCurrentDisplaySubgroup: false
        })
        if (students.style.display == "none") {
            var subgroups = document.getElementById("subgroups");
            if (subgroups === undefined || subgroups === null) {
                return 0;
            }
            subgroups.style.display = "none"
            students.style.display = "block";
        }
    }
    onSubgroupsClick(e) {

        var subgroups = document.getElementById("subgroups");
        if (subgroups === undefined || subgroups === null) {
            return 0;
        }

        this.makeButtonActive(e);
        this.setState({
            isCurrentDisplaySubgroup: true
        })

        console.log(subgroups.style.display)
        if (subgroups.style.display == "none") {
            var students = document.getElementById("students");
            console.log(students)

            if (students === undefined || students === null) {
                return 0;
            }
            students.style.display = "none"
            subgroups.style.display = "block";
        }
    }
    onSearchStudentChange = (e) => {
        // console.log(e.target.value)
        var studentTitle = e.target.value.toLowerCase();

        const cardsParrent = document.getElementById('students-cards');

        var cards = cardsParrent?.children;
        var students = this.state.groupStudents.filter(x => x.name.toLowerCase().includes(studentTitle) || x.middleName.toLowerCase().includes(studentTitle) || x.lastName.toLowerCase().includes(studentTitle))

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
    onSearchSubgroupChange = (e) => {
        // console.log(e.target.value)
        // var studentTitle = e.target.value.toLowerCase();

        // const cardsParrent = document.getElementById('students-cards');

        // var cards = cardsParrent?.children;
        // var students = this.state.groupStudents.filter(x => x.name.toLowerCase().includes(studentTitle) || x.middleName.toLowerCase().includes(studentTitle) || x.lastName.toLowerCase().includes(studentTitle))

        // console.log(students)

        // if (cardsParrent?.children.length > 0) {

        //     for (let i = 0; i < cards.length; i++) {
        //         cards[i].style.display = "none";
        //     }
        //     students.forEach(student => {
        //         for (let j = 0; j < cards.length; j++) {
        //             if (cards[j].id == "student_" + student.studentId) {
        //                 cards[j].style.display = "flex";
        //                 break;
        //             }
        //         }
        //     })
        // }
    }
    onFindStudentModal = (e) => {
        // console.log(e.target.value)
        var studentTitle = e.target.value.toLowerCase();

        const modalStudentsList = document.getElementById('modalStudentsList');

        var items = modalStudentsList?.children;
        var students = this.state.studentsWithoutGroup.filter(x => x.name.toLowerCase().includes(studentTitle) || x.middleName.toLowerCase().includes(studentTitle) || x.lastName.toLowerCase().includes(studentTitle))

        console.log(students)

        if (modalStudentsList?.children.length > 0) {

            for (let i = 0; i < items.length; i++) {
                items[i].style.display = "none";
            }
            students.forEach(student => {
                for (let j = 0; j < items.length; j++) {
                    if (items[j].id == "modalStudent_" + student.studentId) {
                        items[j].style.display = "flex";
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
                        <GeneralNavigationBar role={this.props.credentials.roles} menuItemToSelect={4} />
                    </div>
                    <div className="generalSide">
                        <div className="general-info-actions-bar">
                            <div className="d-flex flex-row align-items-center">
                                <div style={{ margin: "0px 5px 0px 5px", color: "#667080" }}>
                                    Групи
                                </div>
                                <div className='general-info-actions-bar-text-bold' style={{ margin: "0px 5px 0px 5px", color: "#333333" }}>
                                    {this.props.location.state.group.groupTitle}
                                </div>
                            </div>
                            <div>
                                {this.state.isCurrentDisplaySubgroup ?
                                    <button type="button" className='general-button'>
                                        Додати підгрупу
                                    </button>
                                    :
                                    <button type="button" className='general-button' data-bs-toggle="modal" data-bs-target="#addStudentModal" onClick={() => this.getAllStudentsWithoutGroupThisStudyYear()}>
                                        Додати учня
                                    </button>
                                }

                            </div>
                        </div>

                        <div className="general-pagination-bar">
                            <div className="buttons-inline">
                                <button id="showStudents" className="general-outline-button button-static" onClick={(e) => this.onStudentsClick(e)}>
                                    <div className="tip-amount">
                                        <div className="number">
                                            {this.state.groupStudents.length}
                                        </div>
                                    </div>
                                    Учні
                                </button>
                                <button id="showSubgroups" className="general-outline-button" onClick={(e) => this.onSubgroupsClick(e)}>
                                    <div className="tip-amount">
                                        <div className="number">
                                            {this.state.subgroups.length}
                                        </div>
                                    </div>
                                    Підгрупи
                                </button>
                                <div>
                                    {this.state.isCurrentDisplaySubgroup ?
                                        <input style={{ margin: "0px 10px 0px 10px", width: "100%" }} type="search" className="form-control" placeholder='Пошук підгруп' onChange={(e) => this.onSearchSubgroupChange(e)}></input>
                                        :
                                        <input style={{ margin: "0px 10px 0px 10px", width: "100%" }} type="search" className="form-control" placeholder='Пошук студентів' onChange={(e) => this.onSearchStudentChange(e)}></input>
                                    }
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
                            {/*________________Список студентів групи_________________________*/}

                            <div style={{ margin: "20px 0px 20px 0px" }}>Список студентів:</div>
                            <div id="groupStudents" className="cards-container" style={{ margin: "20px 0px 20px 0px" }}>
                                <div id="students-cards" className="cards">
                                    {this.state.groupStudents.length > 0 ?
                                        this.state?.groupStudents?.map(student =>
                                            <StudentsTable key={"student_" + student.studentId} onStudentSelect={this.onSelectStudentToSubgroup} removeStudentFromGroup={this.removeStudentFromGroup} student={student} withoutGroup={false}></StudentsTable>
                                        )
                                        :
                                        <></>
                                    }
                                </div>
                            </div>

                            {/* <button className='btn btn-primary justify-self-end' onClick={this.getDatasToSubgroupAdd}>Add selected in subgroup</button> */}
                            {/*________________Список студентів групи_________________________*/}
                        </div>
                        <div id="subgroups" style={{ display: "none" }}>
                            {/*________________Створення нової підгрупи_________________________*/}
                            <div style={{ marginTop: "20px" }}>Створення нової підгрупи:</div>

                            <form onSubmit={this.onSubmitNewSubgroupForm} className='d-flex flex-row'>
                                <div className='form-group d-flex justify-content-around'>
                                    <div className="form-floating">
                                        <input type='text' id='newSubgroup' name='newSubgroup' className="form-control" onChange={(e) => this.onSubgroupTitleChange(e)} />
                                        <label htmlFor="newSubgroup">Subgroup</label>
                                    </div>
                                    <div className="form-floating">
                                        <datalist id="subgroupBlock">
                                            {this.state.subgroupBlocks.map(subgroupBlock =>
                                                <option key={"subgroupBlock_" + subgroupBlock.id} value={subgroupBlock.subgroupBlockTitle} />
                                                // <option key={"subgroupBlock_" + subgroupBlock.id} value={subgroupBlock.subgroupBlockTitle + subgroupBlock.id}>{subgroupBlock.subgroupBlockTitle}</option>
                                            )}
                                            {/* value='{"values":[subgroupBlock.subgroupBlockTitle,subgroupBlock.subgroupBlockTitle]}' */}
                                        </datalist>
                                        <input type="text" name="subgroupBlock" autoComplete="on" className="form-control" list="subgroupBlock" onChange={(e) => this.onSubgroupBlockChange(e)} />
                                        <label htmlFor="subgroupBlock">Subgroup block</label>
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-success" value="Create new subgroup" />
                            </form>
                            {/*________________Створення нової підгрупи_________________________*/}
                            <hr />
                            <div style={{ marginTop: "20px" }}>Підгрупи:</div>
                            {/*________________Підгрупи групи_________________________*/}
                            <div className="d-flex flex-row justify-content-between">
                                <div className="form-floating col-md">
                                    <select id="subgroup" name="subgroup" className="form-select" onChange={(e) => this.onSubgroupChange(e)} required>
                                        {this.state.subgroups.length > 0 ? this.state.subgroups.map(subgroup =>
                                            <option key={"subgroup" + subgroup.id} value={subgroup.id}>{subgroup.title}</option>
                                        ) : <></>}
                                    </select>
                                    <label htmlFor="subgroup">Subgroups</label>
                                </div>
                                <button className='btn btn-danger' style={{ textSize: "1.25em" }} onClick={() => this.deleteSubgroup(this.state.subgroupId)}>Remove subgroup</button>
                            </div>
                            {/*________________Підгрупи групи_________________________*/}

                            <div style={{ margin: "20px 0px 20px 0px" }}>Список студентів підгрупи:</div>
                            {/*________________Список студентів підгрупи_________________________*/}
                            <div id="groupStudents" className="cards-container">
                                <div className="cards">
                                    {this.state.subgroupStudents.length > 0 ?
                                        this.state?.subgroupStudents?.map(student =>
                                            <StudentsTable key={"student_" + student.studentId} removeStudentFromGroup={this.removeStudentFromSubgroup} onStudentSelect={undefined} student={student} withoutGroup={false}></StudentsTable>
                                        )

                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                            {/*________________Список студентів підгрупи_________________________*/}
                        </div>
                        <div id="modalAddStudentWindow">
                            <div className="modal fade" id="addStudentModal" tabIndex="-1" aria-labelledby="addStudentModalLabel"  >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="addStudentModalLabel"> Додання студента</h1>
                                            <button type="button" id="closemodalAddStudentWindowButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div>
                                            <div className="modal-body modal-body-content">
                                                <div>
                                                    <input type="search" className="form-control" placeholder='Шукати студента' onChange={(e) => this.onFindStudentModal(e)}></input>
                                                </div>
                                                <div>
                                                    <div style={{ margin: "0px 0px 10px 0px" }}>Група:</div>

                                                    <select className="form-control" value={this.state.studentToAddGroupId} onChange={(e) => this.onModalGroupChange(e)}>
                                                        {this.state.groups.map(group =>
                                                            <option key={"group_" + group.groupId} value={group.groupId}>{group.groupTitle}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                {/*________________Список студентів без групи_________________________*/}
                                                <div style={{ margin: "0px 0px 10px 0px" }}>Список нерозподілених студентів:</div>
                                                {this.state.studentsWithoutGroup.length > 0 ?
                                                    // <select className="form-control" onChange={(e) => this.onSelectStudentToGroup(e)}>
                                                    //     {this.state?.studentsWithoutGroup?.map(student =>
                                                    //     (
                                                    //         // <StudentsTable key={"student_" + student.studentId} onStudentSelect={this.onSelectStudentToGroup} student={student} withoutGroup={true}></StudentsTable>
                                                    //         <option key={"student_" + student.studentId} value={student.studentId}>
                                                    //             {student.name + " " + student.middleName + " " + student.lastName + ", дн: " + new Date(student.birthday).toLocaleDateString()}
                                                    //         </option>
                                                    //     )
                                                    //     )}

                                                    // </select>

                                                    <div id="modalStudentsList" className="checkBoxs-container checkBox-text-thinner">
                                                        {
                                                            this.state?.studentsWithoutGroup?.map(student =>
                                                                <label key={"student_" + student.studentId} id={"modalStudent_" + student.studentId} className="check-container">
                                                                    <div className='checkBox-text-hover'>
                                                                        {student.name + " " + student.middleName + " " + student.lastName + ", дн: " + new Date(student.birthday).toLocaleDateString()}
                                                                    </div>
                                                                    <div style={{ position: "absolute", top: "2px", right: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                        <input type="checkbox" id={"student_" + student.studentId} name="students" value={student.studentId} onClick={(e) => this.onSelectStudentToGroup(e)} />
                                                                        <span className="check-checkmark"></span>
                                                                    </div>
                                                                </label>
                                                                // <div key={"student_" + student.studentId} className="row-cols-1-3-view">
                                                                //     <input type="checkbox" id={"student_" + student.studentId} name="students" value={student.studentId} />
                                                                //     <label htmlFor={"student_" + student.studentId}>
                                                                //         {student.name + " " + student.middleName + " " + student.lastName + ", дн: " + new Date(student.birthday).toLocaleDateString()}
                                                                //     </label>
                                                                // </div>
                                                            )
                                                        }
                                                    </div>

                                                    :
                                                    <></>
                                                }
                                                {/* <div id="groupStudents" className="cards-container">
                                                    <div className="cards">
                                                        {this.state.studentsWithoutGroup.length > 0 ?
                                                            this.state?.studentsWithoutGroup?.map(student =>
                                                                <StudentsTable key={"student_" + student.studentId} onStudentSelect={this.onSelectStudentToGroup} student={student} withoutGroup={true}></StudentsTable>
                                                            )
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                </div> */}
                                                {/* <button className='btn btn-primary justify-self-end' onClick={this.getDatasToGroupAdd}>Add selected in group</button> */}
                                                {/*________________Список студентів без групи_________________________*/}
                                            </div>
                                            <div className="modal-footer">
                                                <button className="general-button" onClick={this.getDatasToGroupAdd}>Додати в групу</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
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
export default connect(mapStateToProps)(GroupEditing);
