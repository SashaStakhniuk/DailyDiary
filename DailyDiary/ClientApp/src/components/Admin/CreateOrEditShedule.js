import React from 'react'
import { connect } from "react-redux";
import GeneralHeader from '../Headers/GeneralHeader';
import { Host } from '../Host'
import GeneralNavigationBar from '../Navigations/GeneralNavigationBar';
import "../../styles/shedule.css"
class CreateOdEditShedule extends React.Component {
    constructor(props) {
        super(props);

        this.getAllSubjects = this.getAllSubjects.bind(this); // отримую список усіх предметів
        this.getAllGroups = this.getAllGroups.bind(this); //всі групи теперішнього навчального року
        this.getStudyPlanByGroupId = this.getStudyPlanByGroupId.bind(this); //навчальний план групи
        this.getLessonsShedule = this.getLessonsShedule.bind(this); // розклад уроків (дзвінків) 1 урок 8:30 - 9:15...
        this.getAllDaysOfStudy = this.getAllDaysOfStudy.bind(this); //всі групи теперішнього навчального року (пн-нд)
        this.getTeacherSubjectDistributionBySubjectIdAndGroupId = this.getTeacherSubjectDistributionBySubjectIdAndGroupId.bind(this); //розділення викладач-група-предмет-тип аудиторії
        this.createOrEditShedule = this.createOrEditShedule.bind(this); // перевіряю помилки, якщо немає, викликаю setGroupShedule()
        this.getSheduleIfExistByGroupIdAndDayId = this.getSheduleIfExistByGroupIdAndDayId.bind(this); // перевіряю чи розклад для групи на обраний день вже було створено
        this.deleteSubjectFromSheduleOfSelectedDay = this.deleteSubjectFromSheduleOfSelectedDay.bind(this);

        this.setGroupShedule = this.setGroupShedule.bind(this);

        this.state = {
            existingSheduleForGroupByDay: [],
            groupDistributionData: [],
            allSubjects: [], // усі предмети
            subjectIdToAdd: 0, // ід проедмету для додання в розклад
            groupId: 0,// ід групи
            groups: [], // усі групи теперішнього навчального року
            groupStudyPlan: [],// навчальний план групи
            // subgroupId:0,// ід підгрупи
            // subgroups:[], // усі підгрупи групи
            lessonId: 0,// ід уроку
            lessonsShedule: [], // розклад дзвінків
            dayId: 0,// ід дня, коли буде проведений урок
            days: [], // дні тижня
            weekId: 0// ід тижня 0-без поділу на тижні 1-непарний 2-парний
        }
    }
    async componentDidMount() {
        await this.getAllSubjects(); // отримую усі предмети
        await this.getLessonsShedule(); // розклад дзвінків
        await this.getAllDaysOfStudy(); // дні навчання
        await this.getAllGroups(); // отримую усі групи і одразу навчальний план першої групи
        await this.getSheduleIfExistByGroupIdAndDayId(this.state.dayId); // існуючий розклад для обраної групи для конкретного дня
    }
    async getAllSubjects() {
        try {
            const response = await fetch(`${Host}/api/subject/GetAll`)
            const data = await response.json()
            if (response.ok === true) {
                this.setState({
                    allSubjects: data
                })
                console.log("received allSubjects: ", data);
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
                this.setState({
                    groups: data
                }
                    // , () => this.getGroupSubgroups(data[0].groupId)
                )
                this.setState({
                    groupId: data[0].groupId
                })

                this.getStudyPlanByGroupId(data[0].groupId);

                console.log("recieved groups: ", data)
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
    async getStudyPlanByGroupId(groupId) {
        try {
            const response = await fetch(`${Host}/api/studyPlan/GetStudyPlanByGroupId/${groupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    groupStudyPlan: data,
                    subjectIdToAdd: data.subjectsToAdd[0].subjectId
                })
                console.log("received groupStudyPlan: ", data)
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
    async getLessonsShedule() {
        try {
            const response = await fetch(`${Host}/api/planeducation/getAllLessonsShedule`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    lessonsShedule: data,
                    lessonId: data[0].id
                }
                )
                console.log("recieved lessons: ", data)
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
    async getAllDaysOfStudy() {
        try {
            const response = await fetch(`${Host}/api/planeducation/getDaysOfStudy`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    days: data,
                    dayId: data[1].id
                })

                console.log("recieved days: ", data)
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
    async getTeacherSubjectDistributionBySubjectIdAndGroupId(subjectIdToAdd) {
        try {
            // const subjectIdToAdd = this.state.subjectIdToAdd;
            if (subjectIdToAdd == 0 || subjectIdToAdd == undefined) {
                return 0;
            }
            const response = await fetch(`${Host}/api/planeducation/getTeacherSubjectDistributionBySubjectIdAndGroupId/details?subjectId=${subjectIdToAdd}&&groupId=${this.state.groupId}`)
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    groupDistributionData: data
                })

                console.log("recieved groupDistributionData: ", data)
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

    async getSheduleIfExistByGroupIdAndDayId(dayId) {
        try {
            const groupId = this.state.groupId;
            // const dayId = this.state.dayId;

            if (groupId == undefined || groupId == 0) {
                console.log("Group id is: ", groupId);
                return 0;
            }
            if (dayId == undefined || dayId == 0) {
                console.log("Day id is: ", dayId);
                return 0;
            }

            const response = await fetch(`${Host}/api/shedule/getSheduleIfExistByGroupIdAndDayId/details?groupId=${groupId}&&dayId=${dayId}`);

            var oTable = document.getElementById('sheduleTable');
            if (oTable) {
                var tableBody = oTable.getElementsByTagName('tbody')[0];
                if (tableBody !== undefined) {
                    tableBody.innerHTML = "";
                }

            }

            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    existingSheduleForGroupByDay: data
                })
                console.log("existingSheduleForGroupByDay: ", data);
                if (data.length > 0)
                    await this.appendSubjectInShedule(data);
            }
            else {
                this.setState({
                    existingSheduleForGroupByDay: []
                })
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    appendSubjectInShedule = async (existingData) => {

        var oTable = document.getElementById('sheduleTable');
        if (!oTable) {
            return 0;
        }

        var tableBody = oTable.getElementsByTagName('tbody')[0];
        if (tableBody == undefined) {
            return 0;
        }

        if (existingData == undefined) {

            await this.getTeacherSubjectDistributionBySubjectIdAndGroupId(this.state.subjectIdToAdd);

            if (this.state.groupDistributionData.subgroupDistributionId <= 0) {
                return 0;
            }
            else {
                const arrayOfKeys = this.getArrayOfKeysFromTable(); // дістаю усі елементи з таблиці
                console.log(arrayOfKeys);
                if (arrayOfKeys !== undefined) { // якщо існують
                    if (arrayOfKeys == 0) { // якщо 0
                        return 0;
                    }

                    for (let i = 0; i < arrayOfKeys.length; i++) { // для кожного елементу таблиці
                        for (let j = 0; j < arrayOfKeys.length; j++) {

                            if (i !== j) { // за умови якщо елемент != самому собі

                                if (arrayOfKeys[i].teacherSubgroupDistributionId === arrayOfKeys[j].teacherSubgroupDistributionId) { // якщо предмет дублюється
                                    if (arrayOfKeys[i].lessonId == arrayOfKeys[j].lessonId) { // якщо уроки на 1 час
                                        if (arrayOfKeys[i].weekId == 1 && arrayOfKeys[j].weekId == 2) { //якщо 1 предмет ведеться і в парні і в непарні тижні
                                            alert("Однаковий предмет не може вестись і в парні і в непарні тижні на той же час!!!\nВидаліть 1 з них і оберіть тиждень 'Без поділу'");
                                            return 0;
                                        }
                                        if (arrayOfKeys[i].weekId == arrayOfKeys[j].weekId) { //якщо ід тижня співпадає
                                            alert("Неможливо додати предмети в розклад на однаковий час (урок)!!!\nОберіть для одного з таких предметів інший час проведення заняття");
                                            return 0;
                                        }
                                        if ((arrayOfKeys[i].weekId == 0 && arrayOfKeys[j].weekId > 0) || (arrayOfKeys[i].weekId > 0 && arrayOfKeys[j].weekId == 0)) { // якщо 1 урок сталий і кожного тижня йде в 1 час, інший такий же, який йде парними або непарними тижнями не може стояти на цей час
                                            alert("Однакові предмети не можуть стояти на ті ж години, якщо один з них ділиться по тижнях, а інший проводиться щотижня!!!");
                                            return 0;
                                        }
                                    }
                                }

                                // якщо предмети різні
                                else {
                                    if (arrayOfKeys[i].lessonId == arrayOfKeys[j].lessonId) { // якщо уроки на 1 час
                                        if ((arrayOfKeys[i].weekId == arrayOfKeys[j].weekId) || (arrayOfKeys[i].weekId == 0 && arrayOfKeys[j].weekId > 0) || (arrayOfKeys[i].weekId > 0 && arrayOfKeys[j].weekId == 0)) {
                                            alert("Неможливо додати предмети в розклад на однаковий час (урок)!!!\nОберіть для одного з таких предметів інший час проведення заняття або виставте для 1 предмету парний тиждень, для іншого - непарний");
                                            return 0;
                                        }
                                    }
                                }

                            }
                        }
                        if (arrayOfKeys[i].teacherSubgroupDistributionId == this.state.groupDistributionData.subgroupDistributionId) { // якщо це той же предмет, що я хочу додати
                            let result = window.confirm(`Subject already present in shedule.\nAdd one more?`);
                            if (!result) {
                                return 0;
                            }
                        }
                        // if (arrayOfKeys.length >= this.state.groupStudyPlan.maxAllowedLessonsPerDay) { // якщо кількість вже доданих предметів >= максимально дозволеній з навчального плану цієї групи
                        //     // if(countOfOddWeeks===countOfEvenWeeks){ // якщо кількість парних тижнів = кількості непарних
                        //     window.alert("You can't add more subject's amount than study plan allowed");
                        //     return 0;
                        //     //}
                        // }
                    }

                }

                let tr = document.createElement("tr");
                tr.setAttribute('value', this.state.groupDistributionData.subgroupDistributionId);
                tr.setAttribute('class', "shedule-table-body-tr");

                let tdSubject = document.createElement("td");
                let tdTeacher = document.createElement("td");
                let tdAuditory = document.createElement("td");
                let tdWeek = document.createElement("td");
                let tdLesson = document.createElement("td");
                let tdDelete = document.createElement("td");

                var button = document.createElement('button');
                button.innerHTML = 'Delete';
                button.onclick = (e) => this.deleteItemFromTable(e);
                button.setAttribute('class', 'general-outline-button');
                tdDelete.appendChild(button);

                let selectAuditory = document.createElement('select')
                let selectWeek = document.createElement('select')
                let selectLesson = document.createElement('select')

                selectAuditory.setAttribute('class', 'form-select');
                selectAuditory.setAttribute('id', 'auditory');
                selectAuditory.setAttribute('name', 'auditory');

                selectWeek.setAttribute('class', 'form-select');
                selectWeek.setAttribute('id', 'week');
                selectWeek.setAttribute('name', 'week');

                selectLesson.setAttribute('class', 'form-select');
                selectLesson.setAttribute('id', 'lesson');
                selectLesson.setAttribute('name', 'lesson');

                tdSubject.setAttribute("value", this.state.groupDistributionData.subjectId);
                tdSubject.innerHTML = this.state.groupDistributionData.subjectTitle;

                tdTeacher.setAttribute("value", this.state.groupDistributionData.teacherId);
                tdTeacher.innerHTML = this.state.groupDistributionData.teacherName + " " + this.state.groupDistributionData.teacherLastName

                selectAuditory.innerHTML = `
            ${this.state.groupDistributionData.auditories != undefined ?
                        this.state.groupDistributionData.auditories.map((auditory) =>
                            // `<option key={"auditory_${auditory.id}"} value=${auditory.id}>${auditory.title} ${this.state.groupDistributionData.auditoryTypeTitle}</option>`
                            `<option key={"auditory_${auditory.id}"} value=${auditory.id}>${auditory.title}</option>`
                        ) : "Not found"}`;
                tdAuditory.appendChild(selectAuditory);

                selectWeek.innerHTML = `
            <option value="0"> Without separation </option>
            <option value="1">Odd week</option>
            <option value="2">Even week</option>
            `
                tdWeek.appendChild(selectWeek);

                selectLesson.innerHTML = `
            ${this.state.lessonsShedule.map(lesson =>
                    `<option key={"lesson_number_${lesson.id}"} value=${lesson.id}>${lesson.lessonNumber}. ${lesson.startTime} - ${lesson.endTime}</option>`
                )
                    } `
                tdLesson.appendChild(selectLesson);

                tr.appendChild(tdSubject);
                tr.appendChild(tdTeacher);
                tr.appendChild(tdAuditory);
                tr.appendChild(tdWeek);
                tr.appendChild(tdLesson);
                tr.appendChild(tdDelete);

                tableBody.appendChild(tr);
            }
        }
        else {
            if (this.state.existingSheduleForGroupByDay.length > 0) {
                const existingShedule = this.state.existingSheduleForGroupByDay;
                for (let i = 0; i < existingShedule.length; i++) {
                    let tr = document.createElement("tr");
                    tr.setAttribute('value', existingShedule[i].teacherSubgroupDistributionId);
                    tr.setAttribute('sheduleId', existingShedule[i].id);
                    tr.setAttribute('class', "shedule-table-body-tr");

                    let tdSubject = document.createElement("td");
                    let tdTeacher = document.createElement("td");
                    let tdAuditory = document.createElement("td");
                    let tdWeek = document.createElement("td");
                    let tdLesson = document.createElement("td");
                    let tdDelete = document.createElement("td");

                    var button = document.createElement('button');
                    button.innerHTML = 'Видалити';
                    button.onclick = (e) => this.deleteItemFromTable(e);
                    button.setAttribute('class', 'general-outline-button');
                    tdDelete.appendChild(button);

                    let selectAuditory = document.createElement('select')
                    let selectWeek = document.createElement('select')
                    let selectLesson = document.createElement('select')

                    selectAuditory.setAttribute('class', 'form-select');
                    selectAuditory.setAttribute('id', 'auditory');
                    selectAuditory.setAttribute('name', 'auditory');

                    selectWeek.setAttribute('class', 'form-select');
                    selectWeek.setAttribute('id', 'week');
                    selectWeek.setAttribute('name', 'week');

                    selectLesson.setAttribute('class', 'form-select');
                    selectLesson.setAttribute('id', 'lesson');
                    selectLesson.setAttribute('name', 'lesson');

                    tdSubject.setAttribute("value", existingShedule[i].subjectId);
                    tdSubject.innerHTML = existingShedule[i].subjectTitle;

                    tdTeacher.setAttribute("value", existingShedule[i].teacherId);
                    tdTeacher.innerHTML = existingShedule[i].teacherName + " " + existingShedule[i].teacherLastName
                    this.setState({
                        subjectIdToAdd: existingShedule[i].subjectId
                    }
                        // , await this.getTeacherSubjectDistributionBySubjectIdAndGroupId(existingShedule[i].subjectId)
                    )
                    await this.getTeacherSubjectDistributionBySubjectIdAndGroupId(existingShedule[i].subjectId)

                    selectAuditory.innerHTML = `
                ${this.state.groupDistributionData.auditories != undefined ?
                            this.state.groupDistributionData.auditories.map((auditory) =>
                                // `<option key={"auditory_${auditory.id}"} value=${auditory.id}>${auditory.title} ${this.state.groupDistributionData.auditoryTypeTitle}</option>`
                                auditory.id == existingShedule[i].auditoryId ?
                                    `<option key={"auditory_${auditory.id}"} selected value=${auditory.id}>${auditory.title}</option>`
                                    :
                                    `<option key={"auditory_${auditory.id}"} value=${auditory.id}>${auditory.title}</option>`
                            ) : "Not found"}`;
                    tdAuditory.appendChild(selectAuditory);


                    //     selectWeek.innerHTML = `
                    // <option value="0"> Without separation </option>
                    // <option value="1">Odd week</option>
                    // <option value="2">Even week</option>
                    // `
                    // selectWeek.setAttribute('value', existingShedule[i].weekId);
                    if (existingShedule[i].weekId == 0) {
                        selectWeek.innerHTML += `<option selected value="0"> Without separation </option>`
                    }
                    else {
                        selectWeek.innerHTML += `<option value="0"> Without separation </option>`
                    }
                    if (existingShedule[i].weekId == 1) {
                        selectWeek.innerHTML += `<option selected value="1">Odd week</option>`
                    }
                    else {
                        selectWeek.innerHTML += `<option value="1">Odd week</option>`
                    }
                    if (existingShedule[i].weekId == 2) {
                        selectWeek.innerHTML += `<option selected value="2">Even week</option>`
                    }
                    else {
                        selectWeek.innerHTML += `<option value="2">Even week</option>`
                    }
                    tdWeek.appendChild(selectWeek);

                    selectLesson.innerHTML = `
                ${this.state.lessonsShedule.map(lesson =>
                        lesson.id == existingShedule[i].lessonId ?
                            `<option key={"lesson_number_${lesson.id}"} selected value=${lesson.id}>${lesson.lessonNumber}. ${lesson.startTime} - ${lesson.endTime}</option>`
                            :
                            `<option key={"lesson_number_${lesson.id}"} value=${lesson.id}>${lesson.lessonNumber}. ${lesson.startTime} - ${lesson.endTime}</option>`
                    )
                        } `
                    tdLesson.appendChild(selectLesson);

                    tr.appendChild(tdSubject);
                    tr.appendChild(tdTeacher);
                    tr.appendChild(tdAuditory);
                    tr.appendChild(tdWeek);
                    tr.appendChild(tdLesson);
                    tr.appendChild(tdDelete);

                    tableBody.appendChild(tr);
                }
            }
            else {
                tableBody.innerHTML = "No one subject for this day found";
            }
        }

    }
    async deleteSubjectFromSheduleOfSelectedDay(sheduleId) {

        try {
            if (sheduleId == undefined && sheduleId <= 0) {
                return 0;
            }
            const dayId = this.state.dayId;
            if (dayId == undefined && dayId <= 0) {
                return 0;
            }
            const response = await fetch(`${Host}/api/shedule/deleteByIdFromDay/details?sheduleId=${sheduleId}&&dayId=${dayId}`, {
                method: "DELETE"
            })

            const data = await response.text();
            window.alert(data);

        }
        catch (e) {
            window.alert(e);
        }
    }
    deleteItemFromTable = (e) => {
        document.getElementById('sheduleTable').deleteRow(e.target.parentElement.parentElement.rowIndex);
        const sheduleId = e.target.parentElement.parentElement.getAttribute("sheduleId");
        console.log(sheduleId);
        if (sheduleId !== undefined && sheduleId > 0) {
            this.deleteSubjectFromSheduleOfSelectedDay(sheduleId)
        }
    }
    getArrayOfKeysFromTable = () => {
        var oTable = document.getElementById('sheduleTable');
        if (!oTable) {
            return 0;
        }
        var rowLength = oTable.rows.length;
        var arrayOfKeys = new Array();
        for (var i = 1; i < rowLength; i++) {
            /* 
               2-AuditoryId 
               3-WeekId
               4-LessonId*/

            const teacherSubgroupDistributionId = oTable.rows.item(i).getAttribute("value");
            const sheduleId = oTable.rows.item(i).getAttribute("sheduleId");

            var tr = oTable.rows.item(i).cells; // tr  

            const auditoryId = tr.item(2).firstChild.value;
            const weekId = tr.item(3).firstChild.value;
            const dayId = this.state.dayId;
            const lessonId = tr.item(4).firstChild.value;

            // console.log("teacherSubgroupDistributionId: ", teacherSubgroupDistributionId)
            // console.log("auditoryId: ", auditoryId)
            // console.log("weekId: ", weekId)
            // console.log("dayId: ", dayId)
            // console.log("lessonId: ", lessonId)

            if (sheduleId == undefined) {
                sheduleId = 0;
            }
            if (teacherSubgroupDistributionId == undefined || teacherSubgroupDistributionId <= 0) {
                alert("teacherSubgroupDistributionId can't be <= 0");
                return 0;
            }
            if (auditoryId == undefined || auditoryId <= 0) {
                alert("AuditoryId can't be <= 0");
                return 0;
            }
            if (weekId == undefined || weekId < 0) {
                alert("WeekId can't be < 0");
                return 0;
            }
            if (lessonId == undefined || lessonId <= 0) {
                alert("LessonId can't be <= 0");
                return 0;
            }
            // else if (arrayOfKeys.find(x => x.lessonId == lessonId) !== undefined) { // перевіряю чи є 2 предмети на 1 урок
            //     alert("You can't add more than 1 lesson at the same time !!!");
            //     return 0;
            // }

            arrayOfKeys.push({ "id": sheduleId, "teacherSubgroupDistributionId": teacherSubgroupDistributionId, "weekId": weekId, "dayId": dayId, "auditoryId": auditoryId, "lessonId": lessonId })
        }
        console.log(arrayOfKeys)
        if (arrayOfKeys.length > 0) {
            return arrayOfKeys;
        }
        return undefined;
    }
    createOrEditShedule = async () => {
        const arrayOfKeys = this.getArrayOfKeysFromTable(); // дістаю усі елементи з таблиці
        console.log(arrayOfKeys);

        if (arrayOfKeys !== undefined) { // якщо існують
            if (arrayOfKeys == 0) { // якщо 0
                return 0;
            }
            for (let i = 0; i < arrayOfKeys.length; i++) { // для кожного елементу таблиці
                for (let j = 0; j < arrayOfKeys.length; j++) {

                    if (i !== j) { // за умови якщо елемент != самому собі

                        if (arrayOfKeys[i].teacherSubgroupDistributionId === arrayOfKeys[j].teacherSubgroupDistributionId) { // якщо предмет дублюється
                            if (arrayOfKeys[i].lessonId == arrayOfKeys[j].lessonId) { // якщо уроки на 1 час
                                if (arrayOfKeys[i].weekId == 1 && arrayOfKeys[j].weekId == 2) { //якщо 1 предмет ведеться і в парні і в непарні тижні
                                    alert("Однаковий предмет не може вестись і в парні і в непарні тижні на той же час!!!\nВидаліть 1 з них і оберіть тиждень 'Без поділу'");
                                    return 0;
                                }
                                if (arrayOfKeys[i].weekId == arrayOfKeys[j].weekId) { //якщо ід тижня співпадає
                                    alert("Неможливо додати предмети в розклад на однаковий час (урок)!!!\nОберіть для одного з таких предметів інший час проведення заняття");
                                    return 0;
                                }
                                if ((arrayOfKeys[i].weekId == 0 && arrayOfKeys[j].weekId > 0) || (arrayOfKeys[i].weekId > 0 && arrayOfKeys[j].weekId == 0)) { // якщо 1 урок сталий і кожного тижня йде в 1 час, інший такий же, який йде парними або непарними тижнями не може стояти на цей час
                                    alert("Однакові предмети не можуть стояти на ті ж години, якщо один з них ділиться по тижнях, а інший проводиться щотижня!!!");
                                    return 0;
                                }
                            }
                        }
                        // якщо предмети різні
                        else {
                            if (arrayOfKeys[i].lessonId == arrayOfKeys[j].lessonId) { // якщо уроки на 1 час
                                if ((arrayOfKeys[i].weekId == arrayOfKeys[j].weekId) || (arrayOfKeys[i].weekId == 0 && arrayOfKeys[j].weekId > 0) || (arrayOfKeys[i].weekId > 0 && arrayOfKeys[j].weekId == 0)) {
                                    alert("Неможливо додати предмети в розклад на однаковий час (урок)!!!\nОберіть для одного з таких предметів інший час проведення заняття або виставте для 1 предмету парний тиждень, для іншого - непарний");
                                    return 0;
                                }
                            }
                        }
                    }
                }
            }
            console.log('Ok')
            await this.setGroupShedule(arrayOfKeys);
        }
    }

    async setGroupShedule(datas) {
        try {
            if (datas == undefined) {
                window.alert("Not found datas to send");
                return 0;
            }
            const datasToSend = {
                sheduleDatas: datas
            }
            console.log("datasToSend: ", datasToSend)
            const response = await fetch(`${Host}/api/shedule/setGroupShedule`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });

            if (response.ok === true) {
                // window.alert("Distributed successfully");
                await this.getSheduleIfExistByGroupIdAndDayId(this.state.dayId); // існуючий розклад для обраної групи для конкретного дня

            }
            // else {
            //     const data = await response.text();
            //     window.alert(data);
            // }
            const data = await response.text();
            window.alert(data);
        }
        catch (e) {
            window.alert(e);
        }
    }
    onGroupChange = async (e) => {
        const groupId = e.target.value;
        this.setState({
            groupId: groupId
        })
        await this.getStudyPlanByGroupId(groupId);
        await this.getSheduleIfExistByGroupIdAndDayId(this.state.dayId)
    }
    onGroupSubjectChange = (e) => {
        this.setState({
            subjectIdToAdd: e.target.value
        })
    }
    onLessonChange = (e) => {
        this.setState({
            lessonId: e.target.value
        })
    }
    onWeekChange = (e) => {
        this.setState({
            weekId: e.target.value
        })
    }
    onDayClick = async (e) => {
        this.setState({
            dayId: e.target.value,
            subjectIdToAdd: this.state.groupStudyPlan.subjectsToAdd[0].subjectId
        })
        // console.log(e.target)
        var listsOfLi = e.target?.parentNode?.children;
        // console.log(listsOfLi.className)

        if (listsOfLi === undefined || e.target.tagName == "UL") {
            return 0;
        }
        for (let i = 0; i < listsOfLi.length; i++) {
            listsOfLi[i].className = "";
            if (listsOfLi[i].id == e.target.id) {
                listsOfLi[i].className = "selectedDay";
            }
        }
        await this.getSheduleIfExistByGroupIdAndDayId(e.target.value)
        // console.log(e.target.value)
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} menuItemToSelect={2} />
                    </div>
                    <div className="generalSide">

                        <div className="form-floating col-md">
                            <select id="group" name="group" className="form-select" style={{ marginTop: "10px" }} onChange={(e) => this.onGroupChange(e)} required>
                                {this.state.groups.map(group =>
                                    <option key={"group" + group.groupId} value={group.groupId}>{group.groupTitle}</option>
                                )}
                            </select>
                            <label htmlFor="group">Група:</label>
                        </div>

                        <div className="form-floating d-flex flex-row justify-content-around" style={{ margin: "10px 0px 10px 0px" }} onClick={(e) => this.onDayClick(e)}>
                            <div className="dayOfWeek-bar">
                                <ul className="dayOfWeek-list">
                                    {this.state.days.map(day =>
                                        day.id == 2 ?
                                            <li key={`dayOfWeek_${day.id}`} id={"day_" + day.id} name="day" className='selectedDay' value={day.id}>
                                                {day.uaTitle}
                                            </li>
                                            :
                                            <li key={`dayOfWeek_${day.id}`} id={"day_" + day.id} name="day" value={day.id}>
                                                {day.uaTitle}
                                            </li>

                                    )}
                                    {/* {this.state.days.map(day =>
                                        <li key={`dayOfWeek_${day.id}`}>
                                            {day.id == 2 ?
                                                <input type="radio" checked id="day" name="day" value={day.id} onChange={(e) => this.onDaySelectChange(e)} />
                                                :
                                                <input type="radio" id="day" name="day" value={day.id} onChange={(e) => this.onDaySelectChange(e)} />
                                            }
                                            <label htmlFor="day">{day.uaTitle}</label>
                                        </li>
                                    )} */}
                                </ul>
                            </div>
                            {/* {this.state.days.map(day =>
                                <div key={`dayOfWeek_${day.id}`}>
                                    {day.id == 2 ?
                                        <input type="radio" defaultChecked id="day" name="day" value={day.id} />
                                        :
                                        <input type="radio" id="day" name="day" value={day.id} />
                                    }
                                    <label style={{ color: "black" }} htmlFor="day">{day.uaTitle}</label>
                                </div>
                            )} */}
                        </div>
                        <div style={{ margin: "10px 0px 10px 0px" }}>

                            <div style={{ margin: "0px 0px 10px 0px" }}>Предмети групи</div>
                            <div className="d-flex flex-row align-items-center">
                                <select id="groupSubjects" name="groupSubjects" className="form-select" onChange={(e) => this.onGroupSubjectChange(e)} required>
                                    {this.state.groupStudyPlan.subjectsToAdd !== undefined ?
                                        this.state.groupStudyPlan.subjectsToAdd.map((studyPlanSubject) =>
                                            <option key={"subjectToAdd_" + studyPlanSubject.subjectId} value={studyPlanSubject.subjectId}>{this.state.allSubjects.find(x => x.id == studyPlanSubject.subjectId).title}</option>
                                        )
                                        :
                                        <></>
                                    }
                                </select>
                                <button className='general-outline-button' onClick={() => this.appendSubjectInShedule()} >Додати в розклад</button>
                            </div>
                        </div>

                        <div className='shedule-table-container'>
                            <table className="shedule-table" id="sheduleTable">
                                <thead className="shedule-table-head">
                                    <tr>
                                        <th>Предмет</th>
                                        <th>Викладач</th>
                                        <th>Аудиторія</th>
                                        <th>Тиждень</th>
                                        <th>Урок</th>
                                    </tr>
                                </thead>
                                <tbody className="shedule-table-body">

                                    {/* <div className="form-floating col-md">
                                    {this.state.lessonsShedule.map(lesson =>
                                        <div key={`lesson_number_${ lesson.id } `}>
                                            <input type="radio" id="lesson" name="lesson" value={lesson.id} />
                                            <label style={{ color: "black" }} htmlFor="lesson"> {"  " + lesson.lessonNumber}. {lesson.startTime} - {lesson.endTime}</label>
                                        </div>
                                    )}
                                </div> */}

                                </tbody>
                            </table>
                            <div className='d-flex flex-row justify-content-end'>
                                <button className='general-outline-button button-static' onClick={() => this.createOrEditShedule()}>Створити / редагувати</button>
                            </div>
                        </div>

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
export default connect(mapStateToProps)(CreateOdEditShedule);
// export default CreateOdEditShedule;