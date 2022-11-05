import React from 'react'
import StudentsTable from './StudentsTable';
import { Host } from '../Host'
import GeneralHeader from '../Headers/GeneralHeader';
import GeneralNavigationBar from '../Navigations/GeneralNavigationBar';
import { connect } from "react-redux";
import "../../styles/Tasks/HomeworkCard.css"

class FullGroupEditing extends React.Component { //розбиття студентів по підгрупах, створення нової підгрупи для групи, розподілення студентів по групах
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

            /*______________________Зміна назви, навч.року, аудиторії, студ.плану__________________*/
            // title: "",
            // yearOfStudyId: 0,
            // studyPlanId: 0,
            // preferedAuditoryId: 0,
            // studyPlans: [],
            // auditories: [],
            // yearsOfStudy: [],
            /*______________________Редагування групи__________________*/


            subgroupId: 0, // ід підгрупи

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
            console.log("recievedGroupId",recievedGroupId)

            this.getGroupSubgroups(recievedGroupId);
            this.getAllStudentsByGroupId(recievedGroupId);
            this.getAllStudyPlansByYearOfStudyId(this.props.location.state.group.yearOfStudyId);

            console.log("this.props.location.state",this.props.location.state)

            this.setState({
                groupId: recievedGroupId,
                title: this.props.location.state.group.groupTitle,
                yearOfStudyId: this.props.location.state.group.yearOfStudyId,
                studyPlanId: this.props.location.state.group.studyPlanId,
                preferedAuditoryId: this.props.location.state.group.auditoryId,
                // groups: [{ "groupId": recievedGroupId, "groupTitle": this.props.location.state.group.groupTitle }]
            }
                , () => console.log(this.state)
            );

        }
        else{
            this.getGroupSubgroups(this.state.groupId);
            this.getAllStudentsByGroupId(this.state.groupId);
        }
        this.getSubgroupBlocks();
        // this.getAllStudentsWithoutGroupThisStudyYear();
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
                    yearOfStudyId:0,
                    auditoryId: 0,
                    groups:[],
                    groupStudents:[]
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
                        subgroups:[],
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

    // async editGroupData() {
    //     try {
    //         const datasToSend = {
    //             title: this.state.title,
    //             studyPlanId: this.state.studyPlanId,
    //             yearOfStudyId: this.state.yearOfStudyId,
    //             preferedAuditoryId: this.state.preferedAuditoryId,
    //             groupId: this.state.groupId

    //         }
    //         const response = await fetch(`${Host}/api/group/edit`, {
    //             method: "PUT",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(datasToSend)
    //         });
    //         if (response.ok === true) {
    //             window.alert("Edited");
    //             this.getFreeAuditories();
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
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} menuItemToSelect={4} />
                    </div>
                    <div className="generalSide">
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
                        <hr />
                        <div style={{ marginTop: "20px" }}>Редагування даних групи:</div>
                        {/*________________Редагування даних групи_________________________*/}
                        {/* <form onSubmit={(e) => this.onCreateNewSubgroupFormSubmit(e)}>
                            <div>
                                <label htmlFor="groupTitle" className="form-label">Назва групи</label>
                                <input type="text" className="form-control" id="groupTitle" name="groupTitle" defaultValue={this.state.title} required />
                            </div>
                            <div>
                                <label htmlFor="yearOfStudy" className="form-label">Рік навчання</label>
                                <select className="form-control" id="yearOfStudy" name="yearOfStudy" value={this.state.yearOfStudyId} onChange={this.onYearOfStudyChange} required >
                                    {this.state.yearsOfStudy.map(yearOfStudy =>
                                        <option key={"yearOfStudy_" + yearOfStudy.id} value={yearOfStudy.id}>{yearOfStudy.yearStudy}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="studyPlan" className="form-label">Навчальний план</label>
                                <select className="form-control" id="studyPlan" name="studyPlan" value={this.state.studyPlanId} onChange={this.onStudyPlanChange} required >
                                    {this.state.studyPlans.map(studyPlan =>
                                        <option key={"studyPlan_" + studyPlan.id} value={studyPlan.id}>{studyPlan.title}</option>
                                        // <option key={"studyPlan_"+studyPlan.id} value={studyPlan.id}>{studyPlan.title+". Lessons per day: "+studyPlan.maxAllowedLessonsPerDay}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="auditory" className="form-label">Аудиторія</label>
                                <select className="form-control" id="auditory" name="auditory" value={this.state.preferedAuditoryId} onChange={this.onAuditoryChange} required >
                                    <option value={0}>Не призначено</option>
                                    {this.state?.auditories?.map(auditory =>
                                        <option key={"auditory_" + auditory.id} value={auditory.id}>{auditory.title}</option>
                                    )}
                                </select>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <input className='btn btn-warning' value="Редагувати" type="submit"></input>
                            </div>
                        </form> */}
                        {/*________________Редагування даних групи_________________________*/}

                        {/*________________Список студентів без групи_________________________*/}
                        {/* <hr />
                        <div style={{ marginTop: "20px" }}>Список нерозподілених студентів:</div>
                        <hr />

                        <div id="groupStudents" className="cards-container">
                            <div className="cards">
                                {this.state.studentsWithoutGroup.length > 0 ?
                                    this.state?.studentsWithoutGroup?.map(student =>
                                        <StudentsTable key={"student_" + student.studentId} onStudentSelect={this.onSelectStudentToGroup} student={student} withoutGroup={true}></StudentsTable>
                                    )

                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <button className='btn btn-primary justify-self-end' onClick={this.getDatasToGroupAdd}>Add selected in group</button>
                         */}
                        {/*________________Список студентів без групи_________________________*/}
                        <hr />
                        <div style={{ margin: "20px 0px 20px 0px" }}>Список студентів:</div>
                        {/*________________Список студентів групи_________________________*/}
                        <div id="groupStudents" className="cards-container">
                            <div className="cards">
                                {this.state.groupStudents.length > 0 ?
                                    // <div className='d-flex flex-column'>
                                    //     <StudentsTable ref={this.ChildElementStudentsArrayIntoSubgroup} removeStudentFromGroup={this.removeStudentFromGroup} students={this.state.groupStudents}></StudentsTable>
                                    //     <button className='btn btn-primary justify-self-end' onClick={this.getDatasToSubgroupAdd}>Add selected in subgroup</button>
                                    // </div>
                                    this.state?.groupStudents?.map(student =>
                                        <StudentsTable key={"student_" + student.studentId} onStudentSelect={this.onSelectStudentToSubgroup} removeStudentFromGroup={this.removeStudentFromGroup} student={student} withoutGroup={false}></StudentsTable>
                                    )

                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <button className='btn btn-primary justify-self-end' onClick={this.getDatasToSubgroupAdd}>Add selected in subgroup</button>
                        {/*________________Список студентів групи_________________________*/}

                        {/*________________Створення нової підгрупи_________________________*/}
                        <hr />
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
                        {/* {this.state.subgroupStudents.length > 0 ?
                            <div>
                                <div>Students in subgroup:</div>
                                
                                <StudentsTable removeStudentFromGroup={this.removeStudentFromSubgroup} students={this.state.subgroupStudents}></StudentsTable>
                            </div>
                            :
                            <></>
                        } */}
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
export default connect(mapStateToProps)(FullGroupEditing);
// export default FullGroupEditing;