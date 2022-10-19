import { throws } from 'assert';
import React from 'react'
import { Host } from '../Host'
import SubgroupTeachersSubjectDistribution from './SubgroupTeachersSubjectDistribution';

class TeachersDistribution extends React.Component {
    constructor(props) {
        super(props);
        this.getAllGroups = this.getAllGroups.bind(this); // отримую список усіх груп теперішнього року навчання
        this.onSelectionChange = this.onSelectionChange.bind(this); // при зміні групи
        this.getAllSubjects = this.getAllSubjects.bind(this); // отримую список усіх предметів
        this.getAllAuditoriesTypes = this.getAllAuditoriesTypes.bind(this); // отримую список усіх типів аудиторій 
        this.getTeachersBySubjects = this.getTeachersBySubjects.bind(this); // отримую список усіх викладачів, що можуть вести предмети навчального плану групи
        this.getGroupSubjects = this.getGroupSubjects.bind(this); // отримую навчальний план групи

        this.getTeachersSubjectsDistributionByGroupId = this.getTeachersSubjectsDistributionByGroupId.bind(this); // отримую список вже розподілених викладачів по предметах навчального плану групи

        this.distributeTeachersByGroup = this.distributeTeachersByGroup.bind(this);// дістаю дані з таблиці і створюю/редагую записи в бд

        this.state = {
            selectedGroupId: 0,
            existingGroupTeachersSubjects: [], // існуючі записи препод-предмет-група з бд
            teachersSubjects: [], // ід преподів і предметів які вони ведуть
            allSubjects: [], // всі предмети
            auditoriesTypes: [], // всі типи аудиторій 0-не важливо в якій аудиторії буде заняття
            teachers: [],// викладачі, які можуть вести предмети, які вказані в навчальному плані групи
            groupStudyPlan: [], // навчальний план групи предмети години
            groups: [] // усі групи
        }
    }
    async componentDidMount() {
        await this.getAllGroups();
         this.getAllSubjects();
         this.getAllAuditoriesTypes();
    }

    async getAllGroups() { // отримую список усіх груп
        this.setState({
            groups: [],
            selectedGroupId: 0
        })
        const response = await fetch(`${Host}/api/group/getAllGroupsDatasOfCurrentStudyYear`);
        if (response.ok === true) {
            //console.log(response)
            const data = await response.json();
            console.log("Groups: ", data)
            this.setState({ groups: data, selectedGroupId: data[0].groupId }) // записую дані про групи, і обрану ставлю першу з масиву 
            await this.getTeachersSubjectsDistributionByGroupId(data[0].groupId) // перевіряю чи для предметів групи вже бул призначені викладачі, якщо так, отримую список ід викладача - ід предмету
            await this.getGroupSubjects(data[0].groupId) // отримую навчальний план групи
        }
        else {
            const data = await response.text();
            alert(data);
        }
    }
    async getAllAuditoriesTypes() {
        try {
            const response = await fetch(`${Host}/api/auditory/GetAllAuditoriesTypes`)
            if (response.ok === true) {
                const data = await response.json()
                this.setState({
                    auditoriesTypes: data
                })
                console.log("auditoriesTypes", data);
            }
            else {
                const data = await response.text()
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getAllSubjects() { // отримую список усіх предметів (для виведення в таблицю назв предметів по їх ід, які прилітають з навчального плану)
        try {
            this.setState({
                allSubjects: []
            })
            const response = await fetch(`${Host}/api/subject/GetAll`)
            const data = await response.json()
            if (response.ok === true) {
                this.setState({
                    allSubjects: data
                })
                console.log("allSubjects", data);
            }
        } catch { }
    }
    async getGroupSubjects(groupId) {// отримую список усіх предметів навчального плану для групи, в якої рік навчання == року навчання, для якого був створений навчальний план
        this.setState({ groupStudyPlan: [] });
        const response = await fetch(`${Host}/api/group/GetGroupSubjectsById/${groupId}`);
        const data = await response.json();
        if (response.ok === true) {
            //console.log(response)
            console.log("GroupSubject: ", data)
            this.setState({ groupStudyPlan: data }
                , () => this.getTeachersBySubjects());
            // await this.getTeachersBySubjects()
        }
        else {
            this.setState({ groupStudyPlan: [] })
            alert(data.error);
        }
    }
    async getTeachersBySubjects() { // отримую список викладачів, які можуть вести предмети, що вказані в навчальному плані групи
        this.setState({
            teachers: []
        })
        let queryString = `${Host}/api/teacher/getTeachersBySubjectsId?`
        this.state.groupStudyPlan.map(subject =>
            //subjectsIdArray.push(subject.subjectId)
            queryString += `subjectsIdArray=${subject.subjectId}&`
        );
        //console.log(queryString)
        queryString.slice(0, -1);
        //console.log(queryString)

        const response = await fetch(queryString);
        const data = await response.json();
        if (response.ok === true) {
            //console.log(response)
            console.log("TeachersSubjects: ", data)
            this.setState({ teachers: data })
        }
        else {
            alert(data.error);
        }
    }
    async getTeachersSubjectsDistributionByGroupId(groupId) { // отримую список вже розподілених ід викладачів та предметів, які ведуться в обраній групі
        try {
            this.setState({
                existingGroupTeachersSubjects: [] // очищаю існуючий список
            })
            const response = await fetch(`${Host}/api/planeducation/GetTeachersSubjectsDistributionByGroupId/${groupId}`)

            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    existingGroupTeachersSubjects: data
                })
                console.log("AlreadyDistributedForGroupTeachers&Subjects: ", data);
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
    async onSelectionChange(e) {
        e.preventDefault();
        var groupId = e.target.value;
        // console.log("groupId: ",groupId)
        this.setState({
            selectedGroupId: groupId
        });
        await this.getTeachersSubjectsDistributionByGroupId(groupId)
        await this.getGroupSubjects(groupId)
    }
    async distributeTeachersByGroup() {
        try {
            const datasToSend = {
                groupId: this.state.selectedGroupId,
                teachersSubjectsId: this.state.teachersSubjects
            }
            console.log("datasToSend: ", datasToSend)
            const response = await fetch(`${Host}/api/planeducation/setTeachersDistributionToGroupBySubjects`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });

            if (response.ok === true) {
                window.alert("Distributed successfully");
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
    onDistributionClick = () => {
        var oTable = document.getElementById('teacherForSubjectSelectionTable');

        var rowLength = oTable.rows.length;
        var arrayOfKeys = new Array();
        for (var i = 1; i < rowLength; i++) {

            //gets cells of current row  
            var tr = oTable.rows.item(i).cells; // tr

            /* 0-subjectId
               1-subjectHours
               2-teacherId
               3-auditoryTypeId */

            let subjectId = tr.item(0).getAttribute('value'); //td
            let teacherId = tr.item(2).firstChild.value;
            let auditoryTypeId = tr.item(3).firstChild.value;

            // console.log("subjectId: ", subjectId)
            // console.log("teacherId: ", teacherId)

            if (subjectId == undefined || subjectId <= 0) {
                alert("SubjectId can't be <= 0");
                return 0;
            }
            if (teacherId == undefined || teacherId <= 0) {
                let result = window.confirm(`Teacher not found for subject "${this.state.allSubjects.find(x => x.id == subjectId).title}".\nAdd anyway?`);
                if (!result) {
                    return 0;
                }
                teacherId = '0';
            }
            if (auditoryTypeId == undefined ) {
                auditoryTypeId=null;
            }
            else if (auditoryTypeId < 0 ) {
                alert("AuditoryTypeId can't be < 0");
                return 0;
            }
            arrayOfKeys.push({ "teacherId": teacherId, "subjectId": subjectId, "auditoryTypeId" : auditoryTypeId})
            // var cellLength = oCells.length;
            // for (var j = 0; j < cellLength; j++) {
            //     // get your cell info here
            //     var cellVal = oCells.item(j).innerHTML;
            //     console.log(cellVal);
            // }
        }
        console.log(arrayOfKeys)
        this.setState({
            teachersSubjects: arrayOfKeys
        }
            , () => this.distributeTeachersByGroup()
        )
    }
    render() {
        let groupTeachersSubjectsDistributionTable = this.state.groupStudyPlan.length > 0 && this.state.allSubjects.length > 0 && this.state.teachers.length > 0 ?
            <div>
                <table className='table' id="teacherForSubjectSelectionTable">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Hours</th>
                            <th>Teacher</th>
                            <th>Auditory type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.groupStudyPlan.map((subject) => // для кожного предмету з навчального
                            // console.log(this.state.allSubjects.find(x => x.id==subject.subjectId).title)
                            <tr key={`subject_` + subject.subjectId} id={`teacher-subject_` + subject.subjectId}>
                                <td id={"subject_" + subject.subjectId} value={subject.subjectId}>
                                    {this.state.allSubjects.find(x => x.id == subject.subjectId).title}
                                </td>
                                <td id={"subject-hours_" + subject.subjectId} value={subject.hours}>{subject.hours}</td>
                                <td id={"teacherToSelect_for_subject" + subject.subjectId} value={subject.subjectId}>
                                    {/* {console.log("teacherId: ", this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId).teacherId : 0)} */}
                                    {/* <select key={'teacher_for_subject_' + subject.subjectId} defaultValue={this.state.existingGroupTeachersSubjects.length > 0? (this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId).teacherId : 0):0} id={'teacher_for_subject_' + subject.subjectId} name={'teacher_for_subject_' + subject.subjectId} className="form-select"> */}
                                    <select key={'teacher_for_subject_' + subject.subjectId} defaultValue={this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId).teacherId : 0} id={'teacher_for_subject_' + subject.subjectId} name={'teacher_for_subject_' + subject.subjectId} className="form-select">

                                        {this.state.teachers.map((teacher) =>
                                            teacher.teacherSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? // перевіряю чи викладач може вести цей предмет 
                                                <option key={`teacher_${teacher.teacherId}`} value={teacher.teacherId}>
                                                    {teacher.name + " "}
                                                    {teacher.lastName}
                                                    {/* {" (" + teacher.teacherSubjects.map(subject => this.state.allSubjects.find(x => x.id == subject.subjectId).title) + ")"} відображення предметів, що можуть вести викладачі*/}

                                                </option> // якщо так, записую його
                                                :
                                                //якщо ні
                                                <></>
                                            // <option key={`teacher_${0}`} value={0}>No one found</option> // перебираються усі викладачі, і якщо викладач не веде даний предмт виводиться "No one found", що не коректно
                                        )}
                                    </select>
                                </td>
                                <td id={"auditory_types_" + subject.subjectId}>
                                    <select key={'auditory_for_subject_' + subject.subjectId} defaultValue={this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId).auditoryTypeId : 0} id={'auditory_for_subject_' + subject.subjectId} name={'auditory_for_subject_' + subject.subjectId} className="form-select">
                                        <option key={`auditory_${0}`} value={0}>Any auditory</option>
                                        {this.state.auditoriesTypes.map((auditory) =>
                                            <option key={`auditory_${auditory.id}`} value={auditory.id}>{auditory.auditoryTypeDescription}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>

                        )}

                    </tbody>
                </table>
                {this.state.existingGroupTeachersSubjects.length > 0 ?
                    <button className='btn btn-warning' onClick={() => this.onDistributionClick()}>Edit</button>
                    :
                    <button className='btn btn-success' onClick={() => this.onDistributionClick()}>Distribute</button>
                }
            </div>
            :
            this.state.groupStudyPlan.length == 0 ? <div style={{ color: "red" }}>Study plan not found</div> :
                <></>
        return (
            <div className="container">
                <div className="col-md-6">
                    <label htmlFor="group" className="form-label">Group</label>
                    <select id='group' name='group' className="form-select" onChange={this.onSelectionChange}>
                        {this.state.groups.map((group) =>
                            <option key={`group_${group.groupId}`} value={group.groupId}>{group.groupTitle}</option>
                        )}
                    </select>
                </div>
                {groupTeachersSubjectsDistributionTable}
                <div>Subgroups: </div>
                <div id="groupSubgroupsTeachersSubjectDistribution">
                    <SubgroupTeachersSubjectDistribution allSubjects={this.state.allSubjects} auditoriesTypes={this.state.auditoriesTypes} groupId={this.state.selectedGroupId}></SubgroupTeachersSubjectDistribution>
                </div>
            </div>
        )
    }
}

export default TeachersDistribution

// import { throws } from 'assert';
// import React from 'react'
// import { Host } from '../Host'
// import SubgroupTeachersSubjectDistribution from './SubgroupTeachersSubjectDistribution';

// class TeachersDistribution extends React.Component {
//     constructor(props) {
//         super(props);
//         this.getAllGroups = this.getAllGroups.bind(this); // отримую список усіх груп теперішнього року навчання
//         this.onSelectionChange = this.onSelectionChange.bind(this); // при зміні групи
//         this.getAllSubjects = this.getAllSubjects.bind(this); // отримую список усіх предметів
//         this.getTeachersBySubjects = this.getTeachersBySubjects.bind(this); // отримую список усіх викладачів, що можуть вести предмети навчального плану групи
//         this.getGroupSubjects = this.getGroupSubjects.bind(this); // отримую навчальний план групи

//         this.getTeachersSubjectsDistributionByGroupId = this.getTeachersSubjectsDistributionByGroupId.bind(this); // отримую список вже розподілених викладачів по предметах навчального плану групи

//         this.distributeTeachersByGroup = this.distributeTeachersByGroup.bind(this);// дістаю дані з таблиці і створюю/редагую записи в бд

//         this.state = {
//             selectedGroupId: 0,
//             existingGroupTeachersSubjects: [], // існуючі записи препод-предмет-група з бд
//             teachersSubjects: [], // ід преподів і предметів які вони ведуть
//             allSubjects: [], // всі предмети
//             teachers: [],// викладачі, які можуть вести предмети, які вказані в навчальному плані групи
//             groupStudyPlan: [], // навчальний план групи предмети години
//             groups: [] // усі групи
//         }
//     }
//     componentDidMount() {
//         this.getAllGroups();
//         this.getAllSubjects();
//     }

//     async getAllGroups() { // отримую список усіх груп
//         this.setState({
//             groups:[],
//             selectedGroupId:0
//         })
//         const response = await fetch(`${Host}/api/group/getAllGroupsDatasOfCurrentStudyYear`);
//         if (response.ok === true) {
//             //console.log(response)
//             const data = await response.json();
//             console.log("Groups: ", data)
//             this.setState({ groups: data, selectedGroupId: data[0].groupId }) // записую дані про групи, і обрану ставлю першу з масиву 
//             await this.getTeachersSubjectsDistributionByGroupId(data[0].groupId) // перевіряю чи для предметів групи вже бул призначені викладачі, якщо так, отримую список ід викладача - ід предмету
//             await this.getGroupSubjects(data[0].groupId) // отримую навчальний план групи
//         }
//         else {
//             const data = await response.text();
//             alert(data);
//         }
//     }
//     async getAllSubjects() { // отримую список усіх предметів (для виведення в таблицю назв предметів по їх ід, які прилітають з навчального плану)
//         try {
//             this.setState({
//                 allSubjects: []
//             })
//             const response = await fetch(`${Host}/api/subject/GetAll`)
//             const data = await response.json()
//             if (response.ok === true) {
//                 this.setState({
//                     allSubjects: data
//                 })
//                 console.log(data);
//             }
//         } catch { }
//     }
//     async getGroupSubjects(groupId) {// отримую список усіх предметів навчального плану для групи, в якої рік навчання == року навчання, для якого був створений навчальний план
//         this.setState({ groupStudyPlan: [] });
//         const response = await fetch(`${Host}/api/group/GetGroupSubjectsById/${groupId}`);
//         const data = await response.json();
//         if (response.ok === true) {
//             //console.log(response)
//             console.log("GroupSubject: ", data)
//             this.setState({ groupStudyPlan: data }
//                 , () => this.getTeachersBySubjects());
//             // await this.getTeachersBySubjects()
//         }
//         else {
//             this.setState({ groupStudyPlan: [] })
//             alert(data.error);
//         }
//     }
//     async getTeachersBySubjects() { // отримую список викладачів, які можуть вести предмети, що вказані в навчальному плані групи
//         this.setState({
//             teachers: []
//         })
//         let queryString = `${Host}/api/teacher/getTeachersBySubjectsId?`
//         this.state.groupStudyPlan.map(subject =>
//             //subjectsIdArray.push(subject.subjectId)
//             queryString += `subjectsIdArray=${subject.subjectId}&`
//         );
//         //console.log(queryString)
//         queryString.slice(0, -1);
//         //console.log(queryString)

//         const response = await fetch(queryString);
//         const data = await response.json();
//         if (response.ok === true) {
//             //console.log(response)
//             console.log("TeachersSubjects: ", data)
//             this.setState({ teachers: data })
//         }
//         else {
//             alert(data.error);
//         }
//     }
//     async getTeachersSubjectsDistributionByGroupId(groupId) { // отримую список вже розподілених ід викладачів та предметів, які ведуться в обраній групі
//         try {
//             this.setState({
//                 existingGroupTeachersSubjects: [] // очищаю існуючий список
//             })
//             const response = await fetch(`${Host}/api/planeducation/GetTeachersSubjectsDistributionByGroupId/${groupId}`)

//             if (response.ok === true) {
//                 const data = await response.json();
//                 this.setState({
//                     existingGroupTeachersSubjects: data
//                 })
//                 console.log("AlreadyDistributedForGroupTeachers&Subjects: ", data);
//             }
//             else {
//                 const data = await response.text();
//                 window.alert(data);
//             }
//         }
//         catch (e) {
//             window.alert(e);
//         }
//     }
//     async onSelectionChange(e) {
//         e.preventDefault();
//         var groupId = e.target.value;
//         // console.log("groupId: ",groupId)
//         this.setState({
//             selectedGroupId: groupId
//         });
//         await this.getTeachersSubjectsDistributionByGroupId(groupId)
//         await this.getGroupSubjects(groupId)
//     }
//     async distributeTeachersByGroup() {
//         try {
//             const datasToSend = {
//                 groupId: this.state.selectedGroupId,
//                 teachersSubjectsId: this.state.teachersSubjects
//             }
//             console.log("datasToSend: ", datasToSend)
//             const response = await fetch(`${Host}/api/planeducation/setTeachersToGroupBySubjects`, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(datasToSend)
//             });

//             if (response.ok === true) {
//                 window.alert("Distributed successfully");
//             }
//             else {
//                 const data = await response.text();
//                 window.alert(data);
//             }
//         }
//         catch (e) {
//             window.alert(e);
//         }
//     }
//     onDistributionClick = () => {
//         var oTable = document.getElementById('teacherForSubjectSelectionTable');

//         var rowLength = oTable.rows.length;
//         var arrayOfKeys = new Array();
//         for (var i = 1; i < rowLength; i++) {

//             //gets cells of current row  
//             var tr = oTable.rows.item(i).cells; // tr

//             /* 0-subjectId
//                1-subjectHours
//                2-teacherId */

//             let subjectId = tr.item(0).getAttribute('value'); //td
//             let teacherId = tr.item(2).firstChild.value;

//             // console.log("subjectId: ", subjectId)
//             // console.log("teacherId: ", teacherId)

//             if (subjectId == undefined || subjectId <= 0) {
//                 alert("SubjectId can't be <= 0");
//                 return 0;
//             }
//             if (teacherId == undefined || teacherId <= 0) {
//                 let result = window.confirm(`Teacher not found for subject "${this.state.allSubjects.find(x => x.id == subjectId).title}".\nAdd anyway?`);
//                 if (!result) {
//                     return 0;
//                 }
//                 teacherId = '0';
//             }
//             arrayOfKeys.push({ "teacherId": teacherId, "subjectId": subjectId })
//             // var cellLength = oCells.length;
//             // for (var j = 0; j < cellLength; j++) {
//             //     // get your cell info here
//             //     var cellVal = oCells.item(j).innerHTML;
//             //     console.log(cellVal);
//             // }
//         }
//         console.log(arrayOfKeys)
//         this.setState({
//             teachersSubjects: arrayOfKeys
//         }
//             , () => this.distributeTeachersByGroup()
//         )
//     }
//     render() {
//         let groupTeachersSubjectsDistributionTable = this.state.groupStudyPlan.length > 0 && this.state.allSubjects.length > 0 && this.state.teachers.length > 0  ?
//             <div>
//                 <table className='table' id="teacherForSubjectSelectionTable">
//                     <thead>
//                         <tr>
//                             <th>Subject</th>
//                             <th>Hours</th>
//                             <th>Teacher</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.groupStudyPlan.map((subject) => // для кожного предмету з навчального
//                             // console.log(this.state.allSubjects.find(x => x.id==subject.subjectId).title)
//                             <tr key={`subject_` + subject.subjectId} id={`teacher-subject_` + subject.subjectId}>
//                                 <td id={"subject_" + subject.subjectId} value={subject.subjectId}>
//                                     {this.state.allSubjects.find(x => x.id == subject.subjectId).title}
//                                 </td>
//                                 <td id={"subject-hours_" + subject.subjectId} value={subject.hours}>{subject.hours}</td>
//                                 <td id={"teacherToSelect_for_subject" + subject.subjectId} value={subject.subjectId}>
//                                     {/* {console.log("teacherId: ", this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId).teacherId : 0)} */}
//                                     {/* <select key={'teacher_for_subject_' + subject.subjectId} defaultValue={this.state.existingGroupTeachersSubjects.length > 0? (this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId).teacherId : 0):0} id={'teacher_for_subject_' + subject.subjectId} name={'teacher_for_subject_' + subject.subjectId} className="form-select"> */}
//                                     <select key={'teacher_for_subject_' + subject.subjectId} defaultValue={this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? this.state.existingGroupTeachersSubjects.find(x => x.subjectId == subject.subjectId).teacherId : 0} id={'teacher_for_subject_' + subject.subjectId} name={'teacher_for_subject_' + subject.subjectId} className="form-select">

//                                         {this.state.teachers.map((teacher) =>
//                                             teacher.teacherSubjects.find(x => x.subjectId == subject.subjectId) !== undefined ? // перевіряю чи викладач може вести цей предмет 
//                                                 <option key={`teacher_${teacher.teacherId}`} value={teacher.teacherId}>
//                                                     {teacher.name + " "}
//                                                     {teacher.lastName}
//                                                     {/* {" (" + teacher.teacherSubjects.map(subject => this.state.allSubjects.find(x => x.id == subject.subjectId).title) + ")"} відображення предметів, що можуть вести викладачі*/}

//                                                 </option> // якщо так, записую його
//                                                 :
//                                                 //якщо ні
//                                                 <></>
//                                             // <option key={`teacher_${0}`} value={0}>No one found</option> // перебираються усі викладачі, і якщо викладач не веде даний предмт виводиться "No one found", що не коректно
//                                         )}
//                                     </select>
//                                 </td>
//                             </tr>

//                         )}

//                     </tbody>
//                 </table>
//                 {this.state.existingGroupTeachersSubjects.length > 0 ?
//                     <button className='btn btn-warning' onClick={() => this.onDistributionClick()}>Edit</button>
//                     :
//                     <button className='btn btn-success' onClick={() => this.onDistributionClick()}>Distribute</button>
//                 }
//             </div>
//             :
//             this.state.groupStudyPlan.length == 0 ? <div style={{ color: "red" }}>Study plan not found</div> :
//                 <></>
//         return (
//             <div className="container">
//                 <div className="col-md-6">
//                     <label htmlFor="group" className="form-label">Group</label>
//                     <select id='group' name='group' className="form-select" onChange={this.onSelectionChange}>
//                         {this.state.groups.map((group) =>
//                             <option key={`group_${group.groupId}`} value={group.groupId}>{group.groupTitle}</option>
//                         )}
//                     </select>
//                 </div>
//                 {groupTeachersSubjectsDistributionTable}
//                 <div>Subgroups: </div>
//                 <div id="groupSubgroupsTeachersSubjectDistribution">
//                     <SubgroupTeachersSubjectDistribution allSubjects = {this.state.allSubjects} groupId={this.state.selectedGroupId}></SubgroupTeachersSubjectDistribution>
//                 </div>
//             </div>
//         )
//     }
// }

// export default TeachersDistribution
