import React from 'react'
import { Host } from '../Host'

class SubgroupTeachersSubjectDistribution extends React.Component { // розподілити викладачів в підгрупу по предметах
    constructor(props) {
        super(props);
        this.getSubjects = this.getSubjects.bind(this); // отримую список усіх предметів, якщо такі не були передані в пропс
        this.getAllAuditoriesTypes = this.getAllAuditoriesTypes.bind(this); // отримую список усіх типів аудиторій, якщо такі не були передані в пропс
        this.getSubgroupsPrinciplesOfSeparationByGroupId = this.getSubgroupsPrinciplesOfSeparationByGroupId.bind(this); // отримую усі блоки розділення підгруп групи
        this.getSubgroupsByPrincipleOfSeparationId = this.getSubgroupsByPrincipleOfSeparationId.bind(this); // отримую усі підгрупи групи, розділені за обраним принципом поділу
        this.getTeachersSubjectsDistributionBySubroupId = this.getTeachersSubjectsDistributionBySubroupId.bind(this); //отримую існуючий список розподілених викладачів по предметах підгрупи

        this.deleteSubjectFromSubgroup = this.deleteSubjectFromSubgroup.bind(this); //видаляю предмет з підгрупи

        this.distributeTeachersBySubgroup = this.distributeTeachersBySubgroup.bind(this); // дістаю дані з таблиці і створюю/редагую записи в бд

        this.state = {
            groupId: 0, // ід групи
            subgroupId: 0, // ід підгрупи
            subgroups: [], // усі підгрупи групи обраного блоку розділення
            subgroupBlockId: 0, // ід обраного блоку розділення
            subgroupBlocks: [], // усі блоки розділення підгруп групи
            allSubjects: [],//всі предмети
            auditoriesTypes: [], // всі типи аудиторій 0 або null - не важливо в якій аудиторії буде заняття
            existingSubgroupTeachersSubjects: [], // вже існуючий список розподілених викладачів по предметах підгрупи
            edit: false
        }
    }

    componentDidMount() {
        // console.log(this.props)
        if (this.props.allSubjects !== undefined && this.props.allSubjects.length>0 ) {
            this.setState({
                allSubjects: this.props.allSubjects,
            })
        }
        else {
            this.getSubjects();
        }
        if (this.props.auditoriesTypes !== undefined) {
            this.setState({
                auditoriesTypes: this.props.auditoriesTypes,
            })
        }
        else {
            this.getAllAuditoriesTypes();
        }
        if (this.props.groupId !== undefined && this.props.groupId > 0) {
            this.setState({
                groupId: this.props.groupId
            })
            //this.getGroupSubgroups(this.props.groupId)
            this.getSubgroupsPrinciplesOfSeparationByGroupId(this.props.groupId)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.allSubjects.length !== prevProps.allSubjects.length) {
            this.setState({
                allSubjects: this.props.allSubjects
            })
        }
        if (this.props.auditoriesTypes.length !== prevProps.auditoriesTypes.length) {
            this.setState({
                auditoriesTypes: this.props.auditoriesTypes
            })
        }
        if (this.props.groupId !== prevProps.groupId && this.props.groupId > 0) {
            this.setState({
                groupId: this.props.groupId
            }
                // ,()=>this.getGroupSubgroups()
            )
            //this.getGroupSubgroups(this.props.groupId)
            this.getSubgroupsPrinciplesOfSeparationByGroupId(this.props.groupId)
        }
    }
    async getSubjects() {
        try {
            const response = await fetch(`${Host}/api/subject/GetAll`)
            if (response.ok === true) {
                const data = await response.json()
                this.setState({
                    allSubjects: data
                })
                //console.log(data);
            }
            else {
                const data = await response.text()
                alert(data);
            }
        } catch (e) {
            alert(e);
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
    async getSubgroupsPrinciplesOfSeparationByGroupId(groupId) {
        try {
            const response = await fetch(`${Host}/api/group/getSubgroupsPrinciplesOfSeparationByGroupId/${groupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    subgroupBlocks: data,
                    subgroupBlockId: data[0].id
                })
                this.getSubgroupsByPrincipleOfSeparationId(data[0].id);
                // console.log("recieved subgroupBlocks: ", data)
            }
            else {
                this.setState({
                    subgroupBlockId: 0,
                    subgroupBlocks: [],
                    subgroupId: 0,
                    subgroups: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getSubgroupsByPrincipleOfSeparationId(subgroupBlockId) {
        try {
            // console.log("subgroupBlockId: ", subgroupBlockId);
            const response = await fetch(`${Host}/api/subgroup/getByGroupIdAndSubgroupBlockId/details?groupId=${this.state.groupId}&&subgroupBlockId=${subgroupBlockId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    subgroups: data,
                    subgroupId: data[0].id
                })

                console.log("recieved subgroups: ", data)
                await this.getTeachersSubjectsDistributionBySubroupId(data[0].id);
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
    async distributeTeachersBySubgroup(datasToSend) {
        try {
            if (datasToSend == undefined) {
                window.alert("Not found datas to send");
                return 0;
            }
            console.log("datasToSend: ", datasToSend)
            const response = await fetch(`${Host}/api/planeducation/setTeachersToSubgroupBySubjects`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });

            if (response.ok === true) {
                window.alert("Distributed successfully");
                this.setState({
                    edit: true
                })
                return true;
            }
            else {
                const data = await response.text();
                window.alert(data);
                return false;
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getTeachersBySubjects(subjectId) { // отримую список викладачів, які можуть вести обраний для підгрупи предмет
        let queryString = `${Host}/api/teacher/getTeachersBySubjectsId?subjectsIdArray=${subjectId}`

        const response = await fetch(queryString);
        const data = await response.json();
        if (response.ok === true) {
            // console.log("TeachersSubjects: ", data)
            return data;
        }
        else {
            alert(data.error);
            return null;
        }
    }
    async getTeachersSubjectsDistributionBySubroupId(subgroupId) { // отримую список вже розподілених ід викладачів та предметів (якщо такі існують), які ведуться в обраній підгрупі
        try {
            this.setState({
                existingSubgroupTeachersSubjects: [] // очищаю існуючий список
            })
            const response = await fetch(`${Host}/api/planeducation/GetTeachersSubjectsDistributionBySubgroupId/${subgroupId}`)

            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    existingSubgroupTeachersSubjects: data,
                    edit: true
                })

                console.log("AlreadyDistributedForSubgroupTeachers&Subjects: ", data);

                document.getElementById('subgroupTeachersSubjectDistribution').getElementsByTagName('tbody')[0].innerHTML = '';
                await this.appendRowInTable(data);
            }
            else {
                document.getElementById('subgroupTeachersSubjectDistribution').getElementsByTagName('tbody')[0].innerHTML = '';
                this.setState({
                    edit: false
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async deleteSubjectFromSubgroup(subjectId) {
        try {
            if (+subjectId <= 0) {
                window.alert("subjectId can't be <= 0")
                return 0;
            }
            const response = await fetch(`${Host}/api/planeducation/deleteSubjectFromSubgroup/details?subgroupId=${this.state.subgroupId}&&subjectId=${subjectId}`, {
                method: "DELETE"
            })
            const data = await response.text();
            window.alert(data);
            if (response.ok === true) {
                await this.getTeachersSubjectsDistributionBySubroupId(this.state.subgroupId);
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    deleteSubjectFromTable = (e) => {
        // console.log(e.target.parentElement.parentElement.rowIndex);
        /* 0-subjectId
            1-subjectHours
            2-teacherId 
            3-auditoryType
            4-Delete
        */
        const tr = e.target.parentElement.parentElement.cells;
        const subjectId = tr.item(0).firstChild.value
        console.log(subjectId);
        // if (subjectId === undefined || subjectId <= 0) {
        //     return 0;
        // }

        var oTable = document.getElementById('subgroupTeachersSubjectDistribution');
        var rowLength = oTable.rows.length;
        var arrayOfKeys = new Array();
        for (var i = 1; i < rowLength; i++) {
            arrayOfKeys.push(oTable.rows.item(i).cells.item(0).firstChild.value)
        }

        let hasDublicate = false

        for (let i = 0; i < arrayOfKeys.length; i++) {
            for (let j = 0; j < arrayOfKeys.length; j++) {
                if (i !== j) { // за умови якщо елемент != самому собі
                    if (arrayOfKeys[i] === arrayOfKeys[j]) { // Звіряю усі елементи між собою 
                        // якщо елемент дублюється
                        if (arrayOfKeys[i] == subjectId) {
                            hasDublicate = true;
                            break;
                        }
                    }
                }
            }
        }
        console.log(this.state.existingSubgroupTeachersSubjects);
        console.log("Has dublicate: ", hasDublicate +"\n"+ "element in existingSubgroupTeachersSubjects: ",this.state.existingSubgroupTeachersSubjects.find(x => x.subjectId == subjectId) !== undefined)
       
        if (!hasDublicate && this.state.existingSubgroupTeachersSubjects.find(x => x.subjectId == subjectId) !== undefined) { // якщо предмет один у таблиці (без повторів) і він є у списку вже розподілених
            this.deleteSubjectFromSubgroup(subjectId)
        }
        document.getElementById('subgroupTeachersSubjectDistribution').deleteRow(e.target.parentElement.parentElement.rowIndex);
        // const resultSuccessed = await this.deleteSubjectFromSubgroup(subjectId)
        // if(resultSuccessed)
        // document.getElementById('subgroupTeachersSubjectDistribution').deleteRow(e.target.parentElement.parentElement.rowIndex);
    }
    appendRowInTable = async (teachersSubjectsDistribution) => {
        var tableBody = document.getElementById('subgroupTeachersSubjectDistribution').getElementsByTagName('tbody')[0];

        if (tableBody == undefined) {
            return 0;
        }

        if (teachersSubjectsDistribution !== undefined) {

            if (this.state.allSubjects.length == 0) {
                await this.getSubjects();
            }
            for (let i = 0; i < teachersSubjectsDistribution.length; i++) { // для кожного елементу з отриманого списку

                let tr = document.createElement("tr");
                let tdSubject = document.createElement("td");
                let tdHours = document.createElement("td");
                let tdTeacher = document.createElement("td");
                let tdAuditoryType = document.createElement("td");
                let tdDelete = document.createElement("td");

                let selectSubject = document.createElement('select')
                let selectTeacher = document.createElement('select')
                let selectAuditoryType = document.createElement('select')

                var button = document.createElement('button');
                button.innerHTML = 'Delete';
                button.onclick = (e) => this.deleteSubjectFromTable(e);
                button.setAttribute('class', 'btn btn-danger');
                tdDelete.appendChild(button);


                selectSubject.onchange = (e) => this.onSubjectChange(e)
                selectSubject.setAttribute('class', 'form-select');
                selectSubject.setAttribute('disabled', true);
                selectTeacher.setAttribute('class', 'form-select');
                selectAuditoryType.setAttribute('class', 'form-select');



                //     selectSubject.innerHTML = `
                // ${this.state.allSubjects.map((subject) =>
                //         teachersSubjectsDistribution[i].subjectId == subject.id ?
                //             `<option key={"subject_"${subject.id}} selected value=${subject.id} >${subject.title}</option>`
                //             :
                //             `<option key={"subject_"${subject.id}} value=${subject.id}>${subject.title}</option>`
                //     )}`;
                selectSubject.innerHTML = `
            ${this.state.allSubjects.map((subject) =>
                    teachersSubjectsDistribution[i].subjectId == subject.id ?
                        `<option key={"subject_"${subject.id}} selected value=${subject.id}>${subject.title}</option>`
                        :
                        `<></>`
                )}`;
                tdSubject.appendChild(selectSubject);
                tdHours.innerHTML = `
            <input type="number" class="form-control" value="${teachersSubjectsDistribution[i].additionalHours}" step="0.25" min="0"/>
            `;
                const teachers = await this.getTeachersBySubjects(teachersSubjectsDistribution[i].subjectId);
                if (teachers != null) {
                    selectTeacher.innerHTML = `
            ${teachers.map((teacher) =>
                        teachersSubjectsDistribution[i].teacherId == teacher.teacherId ?
                            `<option key={"teacher_"${teacher.teacherId}} selected value=${teacher.teacherId}>${teacher.name + " " + teacher.lastName}</option>`
                            :
                            `<option key={"teacher_"${teacher.teacherId}} value=${teacher.teacherId}>${teacher.name + " " + teacher.lastName}</option>`
                    )}`;
                }
                else {
                    selectTeacher.innerHTML = ``;
                }

                tdTeacher.appendChild(selectTeacher);

                selectAuditoryType.innerHTML = `
                <option key={"auditory_"${0}} value=${0}>Any auditory</option>
                ${this.state.auditoriesTypes.map((auditory) =>
                    teachersSubjectsDistribution[i].auditoryTypeId == auditory.id ?
                        `<option key={"auditory_"${auditory.id}} selected value=${auditory.id}>${auditory.auditoryTypeDescription}</option>`
                        :
                        `<option key={"auditory_"${auditory.id}} value=${auditory.id}>${auditory.auditoryTypeDescription}</option>`
                )}`;

                tdAuditoryType.appendChild(selectAuditoryType);


                tr.appendChild(tdSubject);
                tr.appendChild(tdHours);
                tr.appendChild(tdTeacher);
                tr.appendChild(tdAuditoryType);
                tr.appendChild(tdDelete);
                tableBody.append(tr);
            }
        }
        else {
            let tr = document.createElement("tr");
            let tdSubject = document.createElement("td");
            let tdHours = document.createElement("td");
            let tdTeacher = document.createElement("td");
            let tdAuditoryType = document.createElement("td");
            let tdDelete = document.createElement("td");

            let selectSubject = document.createElement('select')
            let selectTeacher = document.createElement('select')
            let selectAuditoryType = document.createElement('select')

            var button = document.createElement('button');
            button.innerHTML = 'Delete';
            button.onclick = (e) => this.deleteSubjectFromTable(e);
            button.setAttribute('class', 'btn btn-danger');
            tdDelete.appendChild(button);

            selectSubject.onchange = (e) => this.onSubjectChange(e)

            selectSubject.setAttribute('class', 'form-select');
            selectTeacher.setAttribute('class', 'form-select');
            selectAuditoryType.setAttribute('class', 'form-select');

            selectSubject.innerHTML = `
        ${this.state.allSubjects.map((subject) =>
                `<option key={"subject_"${subject.id}} value=${subject.id}>${subject.title}</option>`
            )}`;
            tdSubject.appendChild(selectSubject);
            tdHours.innerHTML = `
        <input type="number" class="form-control" value="0" step="0.25" min="0"/>
        `;
            const teachers = await this.getTeachersBySubjects(this.state.allSubjects[0].id);
            if (teachers != null) {
                selectTeacher.innerHTML = `
        ${teachers.map((teacher) =>
                    `<option key={"teacher_"${teacher.teacherId}} value=${teacher.teacherId}>${teacher.name + " " + teacher.lastName}</option>`
                )}`;
            }
            else {
                selectTeacher.innerHTML = ``;
            }

            tdTeacher.appendChild(selectTeacher);

            selectAuditoryType.innerHTML = `
            <option key={"auditory_"${0}} value=${0}>Any auditory</option>

            ${this.state.auditoriesTypes.map((auditory) =>
                `<option key={"auditory_"${auditory.id}} value=${auditory.id}>${auditory.auditoryTypeDescription}</option>`
            )}`;

            tdAuditoryType.appendChild(selectAuditoryType);

            tr.appendChild(tdSubject);
            tr.appendChild(tdHours);
            tr.appendChild(tdTeacher);
            tr.appendChild(tdAuditoryType);
            tr.appendChild(tdDelete);
            tableBody.append(tr);

        }
    }
    onDistributionClick = async() => {
        var oTable = document.getElementById('subgroupTeachersSubjectDistribution');

        var rowLength = oTable.rows.length;
        var arrayOfKeys = new Array();
        for (var i = 1; i < rowLength; i++) {

            //gets cells of current row  
            var tr = oTable.rows.item(i).cells; // tr
            // console.log("tr: ", tr)

            /* 0-subjectId
               1-subjectHours
               2-teacherId 
               3-auditoryType
               4-Delete*/

            const subjectId = tr.item(0).firstChild.value;
            const hours = tr.item(1).children[0].value;
            const teacherId = tr.item(2).firstChild.value;
            const auditoryTypeId = tr.item(3).firstChild.value;

            // console.log("subjectId: ", tr.item(0).firstChild.value)
            // console.log("hours: ", tr.item(1).children[0].value)
            // console.log("teacherId: ", tr.item(2).firstChild.value)

            if (subjectId == undefined || subjectId <= 0) {
                alert("SubjectId can't be <= 0");
                return 0;
            }
            if (hours == undefined || hours <= 0) {
                alert("Hours amount can't be <= 0");
                return 0;
            }
            if (teacherId == undefined || teacherId <= 0) {
                let result = window.confirm(`Teacher not found for subject "${this.state.allSubjects.find(x => x.id == subjectId).title}".\nAdd anyway?`);
                if (!result) {
                    return 0;
                }
                teacherId = '0';
            }
            if (auditoryTypeId == undefined) {
                auditoryTypeId = null;
            }
            else if (auditoryTypeId < 0) {
                alert("AuditoryTypeId can't be < 0");
                return 0;
            }
            arrayOfKeys.push({ "subjectId": subjectId, "additionalHours": hours, "teacherId": teacherId, "auditoryTypeId": auditoryTypeId })
        }

        for (let i = 0; i < arrayOfKeys.length; i++) { // nested for loop
            for (let j = 0; j < arrayOfKeys.length; j++) {
                if (i !== j) { // за умови якщо елемент != самому собі
                    if (arrayOfKeys[i].subjectId === arrayOfKeys[j].subjectId) { // Звіряю усі елементи між собою 

                        // якщо елемент дублюється
                        window.alert(` Subject "${this.state.allSubjects.find(x => x.id == arrayOfKeys[j].subjectId).title}" already exist!!!\n You can't add the same subject twice`);
                        return 0;
                    }
                }
            }
        }
        console.log(arrayOfKeys)

        const datasToSend = {
            groupId: this.state.subgroupId,
            teachersSubjectsId: arrayOfKeys
        }
        const deleted = await this.distributeTeachersBySubgroup(datasToSend);
        if(deleted){
            this.setState({
                existingSubgroupTeachersSubjects:arrayOfKeys
            }
            ,()=> tr.item(0).firstChild.setAttribute('disabled',true)
            )
            
        }
    }
    onSubgroupBlockChange = (e) => {
        this.getSubgroupsByPrincipleOfSeparationId(e.target.value);
    }
    onSubgroupChange = (e) => {
        this.setState({
            subgroupId: e.target.value
        })
        this.getTeachersSubjectsDistributionBySubroupId(e.target.value);
    }
    onSubjectChange = async (e) => {

        // console.log(e.target.parentElement.parentElement.cells.item(2));
        const teachers = await this.getTeachersBySubjects(e.target.value) // шукаю викладачів, що можуть вести обраний предмет
        if (teachers == null || teachers == undefined) { // якщо таких немає
            window.alert("No one teacher for selected subject found");
            e.target.parentElement.parentElement.cells.item(2).firstChild.innerHTML = ``;
            return 0;
        }
        // якщо такі існують
        // let selectTeacher = document.createElement('select')
        // selectTeacher.setAttribute('class', 'form-select');
        var teachersList = '';
        var hours = 0;
        var auditoriesTypesList = '';

        if (this.state.existingSubgroupTeachersSubjects.length > 0 && this.state.existingSubgroupTeachersSubjects.find(x => x.subjectId == e.target.value) !== undefined) {
            const existingDistribution = this.state.existingSubgroupTeachersSubjects.find(x => x.subjectId == e.target.value);
            hours = existingDistribution.additionalHours
            teachersList = `
                ${teachers.map((teacher) =>
                existingDistribution.teacherId == teacher.teacherId ?
                    `<option key={"teacher_${teacher.teacherId}"} selected value=${teacher.teacherId}>${teacher.name + " " + teacher.lastName}</option>`
                    :
                    `<option key={"teacher_${teacher.teacherId}"} value=${teacher.teacherId}>${teacher.name + " " + teacher.lastName}</option>`
            )}`;

            auditoriesTypesList = `
                <option key={"auditory_${0}"} value=${0}>${"Any auditory"}</option>
    
                ${this.state.auditoriesTypes.map((auditory) =>
                existingDistribution.auditoryTypeId == auditory.id ?

                    `<option key={"auditory_${auditory.id}"} selected value=${auditory.id}>${auditory.auditoryTypeDescription}</option>`
                    :
                    `<option key={"auditory_${auditory.id}"} value=${auditory.id}>${auditory.auditoryTypeDescription}</option>`
            )}`;
        }
        else {
            teachersList = `
            ${teachers.map((teacher) =>
                `<option key={"teacher_${teacher.teacherId}"} value=${teacher.teacherId}>${teacher.name + " " + teacher.lastName}</option>`
            )}`
            auditoriesTypesList = `
            <option key={"auditory_${0}"} value=${0}>Any auditory</option>

            ${this.state.auditoriesTypes.map((auditory) =>
                `<option key={"auditory_${auditory.id}"} value=${auditory.id}>${auditory.auditoryTypeDescription}</option>`
            )}`;
        }
        // e.target.parentElement.parentElement.cells.item(1).firstChild.value = hours;
        e.target.parentElement.parentElement.cells.item(1).innerHTML =
            `
        <input type="number" class="form-control" value="${hours}" step="0.25" min="0"/>
        `;
        e.target.parentElement.parentElement.cells.item(2).firstChild.innerHTML = teachersList;
        e.target.parentElement.parentElement.cells.item(3).firstChild.innerHTML = auditoriesTypesList;


    }
    render() {
        return (
            <div>
                <div className='d-flex flex-row justify-content-around'>
                    <div className="form-floating col-md">
                        <select id="subgroupBlock" name="subgroupBlock" className="form-select" onChange={(e) => this.onSubgroupBlockChange(e)} required>
                            {this.state.subgroupBlocks.length > 0 ? this.state.subgroupBlocks.map(subgroupBlock =>
                                <option key={"subgroupBlock" + subgroupBlock.id} value={subgroupBlock.id}>{subgroupBlock.subgroupBlockTitle}</option>
                            ) : <option style={{ color: "red" }}>SubgroupsBlocks not found</option>}
                        </select>
                        <label htmlFor="subgroupBlock">subgroupBlocks</label>
                    </div>
                    <div className="form-floating col-md">
                        <select id="subgroup" name="subgroup" className="form-select" onChange={(e) => this.onSubgroupChange(e)} required>
                            {this.state.subgroups.length > 0 ? this.state.subgroups.map(subgroup =>
                                <option key={"subgroup" + subgroup.id} value={subgroup.id}>{subgroup.title}</option>
                            ) : <option style={{ color: "red" }}>Subgroups not found</option>}
                        </select>
                        <label htmlFor="subgroup">Subgroups</label>
                    </div>
                </div>
                <div id="subjectSelection">
                    <table id="subgroupTeachersSubjectDistribution" className='table'>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Hours</th>
                                <th>Teacher</th>
                                <th>Auditory type</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div className='btn btn-primary' onClick={() => this.appendRowInTable()}>Add one more subject</div>
                {this.state.edit === true ?
                    <button className='btn btn-warning' type='submit' onClick={() => this.onDistributionClick()}>Edit</button>
                    :
                    <button className='btn btn-success' type='submit' onClick={() => this.onDistributionClick()}>Create</button>
                }
            </div>
        )
    }
}

export default SubgroupTeachersSubjectDistribution