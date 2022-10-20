import { throws } from 'assert';
import React from 'react'
// import '../../styles/Students.css'
import { Host } from '../Host'

class EditStudyPlan extends React.Component {
    constructor(props) {
        super(props);
        this.getCurrentStudyYears = this.getCurrentStudyYears.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteSubjectFromList = this.deleteSubjectFromList.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);

        this.getExistingStudyPlan = this.getExistingStudyPlan.bind(this);
        this.getYearsOfStudyByStudyYear = this.getYearsOfStudyByStudyYear.bind(this);
        this.onStudyYearChange = this.onStudyYearChange.bind(this);
        this.onYearOfStudyChange = this.onYearOfStudyChange.bind(this);
        this.onMaxLessonsChange = this.onMaxLessonsChange.bind(this);

        this.subjectsAmount = 0;//кількість предметів
        this.idExistingBlocksWithSubjects = [];//ід блоків обраних опредметів

        this.selectedSubjects = [];// ід вже обраних предметів
        this.currentSelectedSubjectId = -1; // останній обраний предмет

        this.state = {
            planTitle: "",
            semester: 0, // 0-AllYear
            studyYearId: 0, // обраний навчальний рік
            yearOfStudyId: 0,// обраний рік навчання
            maxAllowedLessonsPerDay: 8,// максимальна кількість уроків на день,
            message: "",
            edit: false,
            allSubjects: [],//всі предмети
            studyYears: [],//навчальні роки, які співпадають з теперішнім
            yearsOfStudy: [],//роки навчання певного навчального року
            currentStudyPlan: [],//якщо навчальний план вже існує,
        }
    }

    async componentDidMount() {
        await this.getCurrentStudyYears();
        await this.getSubjects();
    }
    async getCurrentStudyYears() {
        try {
            const response = await fetch(`${Host}/api/StudyPlan/GetAllStudyYearsThatIncludeCurrent`)
            if (response.ok === true) {
                const data = await response.json();
                console.log(data);
                this.setState({
                    studyYears: data,
                    studyYearId: data[0].id
                }
                    // , () => this.getYearsOfStudyByStudyYear(this.state.studyYearId)
                );
                this.getYearsOfStudyByStudyYear(data[0].id); // отримую роки навчання конкретного навчального року
                //this.getExistingStudyPlan(1);  // отримую навчальний план 1 групи із списку певного року навчання
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        } catch (e) { console.log(e) }
    }
    onStudyYearChange(e) {
        this.setState({ studyYearId: e.target.value })
        this.getYearsOfStudyByStudyYear(e.target.value);
    }
    onYearOfStudyChange(e) {
        this.setState({ yearOfStudyId: e.target.value })
        this.getExistingStudyPlan(e.target.value);
    }
    onMaxLessonsChange(e) {
        this.setState({ maxAllowedLessonsPerDay: e.target.value })
    }
    async getYearsOfStudyByStudyYear(studyYearId) {
        try {
            const response = await fetch(`${Host}/api/YearOfStudy/getYearsOfStudyByStudyYear/${studyYearId}`)
            if (response.ok === true) {
                const data = await response.json();
                // console.log(data);
                this.setState({
                    yearsOfStudy: data,
                    yearOfStudyId: data[0].id
                }
                    , () => this.getExistingStudyPlan(this.state.yearOfStudyId)
                );
            }
            else {
                const data = await response.text();
                alert(data);
            }
        } catch (e) {
            console.log(e)
        }
    }
    async getExistingStudyPlan(yearOfStudyId) {
        try {
            let subjectSelection = document.getElementById("subjectSelection");
            subjectSelection.innerHTML = "";

            this.subjectsAmount = 0;
            this.selectedSubjects = [];
            this.currentSelectedSubjectId = -1; // останній обраний предмет,
            this.idExistingBlocksWithSubjects = [];

            const response = await fetch(`${Host}/api/StudyPlan/GetExistingStudyPlan/${yearOfStudyId}`)
            if (response.ok === true) {
                const data = await response.json();
                //console.log(data);
                console.log(
                    "this.subjectsAmount: " + this.subjectsAmount,
                    "this.idExistingBlocksWithSubjects" + this.idExistingBlocksWithSubjects,
                    "this.selectedSubjects" + this.selectedSubjects
                )
                this.setState({
                    maxAllowedLessonsPerDay: data.maxAllowedLessonsPerDay,
                    currentStudyPlan: data,
                    yearStudy: data.yearOfStudyId,
                    planTitle: data.planTitle,
                    semester: data.semester,
                    message: <div style={{ color: "green" }}>Study plan alredy exist</div>,
                    edit: true
                }
                    , () => console.log(
                        "this.subjectsAmount: " + this.subjectsAmount,
                        "this.idExistingBlocksWithSubjects" + this.idExistingBlocksWithSubjects,
                        "this.selectedSubjects" + this.selectedSubjects
                    )
                )

                data.subjectsToAdd.map(subjectFromDB => this.appendSubject(subjectFromDB));
            }
            else {
                const studyYear = this.state.studyYears.find(x => x.id == this.state.studyYearId);
                this.setState({
                    planTitle: `Навчальний план для усіх класів ` +
                        `${this.state.yearsOfStudy.find(x => x.id == this.state.yearOfStudyId).yearStudy} ` +
                        `року навчання ` +
                        `${new Date(studyYear.startYear).getFullYear() + "/" + new Date(studyYear.finishYear).getFullYear()} ` +
                        `навчального року`,
                    message: <div style={{ color: "red" }}>Study plan doesn't exist</div>,
                    currentStudyPlan: [],
                    maxAllowedLessonsPerDay: 8,
                    edit: false
                })
                //const data = await response.text();
                //window.alert(data);
            }
        } catch (e) {
            console.log(e)
        }
    }
    async getSubjects() {
        try {
            const response = await fetch(`${Host}/api/subject/GetAll`)
            const data = await response.json()
            if (response.ok === true) {
                this.setState({
                    allSubjects: data
                })
                //console.log(data);
            }
        } catch { }
    }

    async create(datasToAdd) {
        try {
            const response = await fetch(`${Host}/api/studyplan/createOrEdit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    datasToAdd
                )
            })
            if (response.ok === true) {
                this.setState({
                    message: <div style={{ color: "green" }}>Study plan alredy exist</div>,
                    edit: true
                }
                    , () => alert("Plan was created")
                )
                // window.location = `/admin/new-study-plan`
            }
            else {
                console.log(response)
                let data = await response.json()
                console.log(data)
                alert(data.error)
                //alert("Something goes wrong. Check data then try again");
            }
        } catch (e) {
            alert(e);
        }
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.currentSelectedSubjectId >= 0) { //якщо останній вибраний предмет існує
            if (!this.selectedSubjects.find((elem) => elem == this.currentSelectedSubjectId)) // і його ще немає в списку
                this.selectedSubjects.push(this.currentSelectedSubjectId); //додаю предмет в масив обраних предметів
            console.log("selectedSubjects=" + this.selectedSubjects)
        }

        let subjectsToAdd = new Array(); // масив ключ - значення (предмет : к-сть годин)
        console.log("this.idExistingBlocksWithSubjects: " + this.idExistingBlocksWithSubjects)
        for (let i = 0; i < this.idExistingBlocksWithSubjects.length; i++) { // для кожного згенерованого блоку предмету (предмет - години - видалити)
            console.log(this.idExistingBlocksWithSubjects[i]); // перевіряю ід об'єктів
            let subject = e.target[`subject_${this.idExistingBlocksWithSubjects[i] + ""}`]; // шукаю предмет
            let hours = e.target[`hours_${this.idExistingBlocksWithSubjects[i] + ""}`]; // шукаю години
            if (subject != null && hours != null)  // якщо обидва існують
            {
                if (subject.value > 0 && hours.value > 0) // якщо ід елементу != 0
                {
                    // console.log("ід предмету: " + subject.value + "\n",
                    //     "масив предметів: ", subjectsToAdd, "\n",
                    //     "предмет існує?: " , subjectsToAdd.find(x => x.subjectId == subject.value)); // перевіряю чи предмет вже додано в масив

                    if (subjectsToAdd.find(x => x.subjectId == subject.value) !== undefined) { // якщо елемент вже існує в масиві
                        window.alert(` Subject "${this.state.allSubjects.find(x => x.id == subject.value).title}" already exist!!!\n You can't add the same subject twice`);
                        return 0;
                    }
                    else {
                        subjectsToAdd.push({ subjectId: subject.value, hours: hours.value });
                    }
                }
                else {
                    window.alert("Hours amount must be > 0");
                    return 0;
                }
            }
        }
        console.log("subjectsToAdd: ", subjectsToAdd)
        const { planTitle, semester, yearOfStudy, maxAllowedLessonsPerDay } = e.target;
        console.log("datas to send: " + planTitle.value, semester.value, yearOfStudy.value, maxAllowedLessonsPerDay.value)

        if (subjectsToAdd.length == 0) {
            alert("No one subject was selected");
        }
        else {
            const datasToSend = {
                planTitle: planTitle.value,
                semester: semester.value,
                yearOfStudyId: yearOfStudy.value,
                maxAllowedLessonsPerDay: maxAllowedLessonsPerDay.value,
                subjectsToAdd
            }
            console.log(JSON.stringify(datasToSend))
            this.create(datasToSend);
        }

    }
    onSelectionChange(event) {
        this.currentSelectedSubjectId = event.target.value;
        //console.log(this.currentSelectedSubjectId)
        this.selectedSubjects.push(this.currentSelectedSubjectId);// додаю значення в масив
    }




    appendSubject(subjectToEdit) {
        console.log(subjectToEdit)

        if (this.currentSelectedSubjectId >= 0) {
            if (!this.selectedSubjects.find((elem) => elem == this.currentSelectedSubjectId))
                this.selectedSubjects.push(this.currentSelectedSubjectId); //додаю предмет в масив обраних предметів
            console.log("current=" + this.selectedSubjects)
        }
        this.subjectsAmount += 1;
        this.idExistingBlocksWithSubjects.push(this.subjectsAmount);

        console.log('this.idExistingBlocksWithSubjects=' + this.idExistingBlocksWithSubjects);

        let subjectSelectionDiv = document.getElementById('subjectSelection');

        let parrentDiv = document.createElement('div');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 = document.createElement('div');
        let select = document.createElement('select')

        var button = document.createElement('button');
        button.innerHTML = 'Delete';
        button.onclick = (e) => this.deleteSubjectFromList(e);
        select.onchange = (e) => this.onSelectionChange(e)

        parrentDiv.setAttribute('class', 'row');
        parrentDiv.setAttribute('id', 'subjectSelection_' + this.subjectsAmount);
        div1.setAttribute('class', 'col-md-6');
        div2.setAttribute('class', 'col-md-4');
        div3.setAttribute('class', 'col-md-2');
        button.setAttribute('id', 'delete_' + this.subjectsAmount);
        button.setAttribute('value', this.subjectsAmount);
        button.setAttribute('class', 'btn btn-danger');
        select.setAttribute('id', 'subject_' + this.subjectsAmount);
        select.setAttribute('class', 'form-select');
        select.setAttribute('value', 'Subjects');

        if (subjectToEdit !== undefined) {

            select.innerHTML = `
            ${this.state.allSubjects.map((subject) =>
                subject.id == subjectToEdit.subjectId ?
                    `<option key={"subject_"${subject.id}} selected value=${subject.id}>${subject.title}</option>`
                    :
                    `<option key={"subject_"${subject.id}} value=${subject.id}>${subject.title}</option>`
            )}`;
            div1.appendChild(select);
            div2.innerHTML = `
        <input type="number" class="form-control" id=${"hours_" + this.subjectsAmount} step="0.25" min="0" value="${subjectToEdit.hours}"/>
        `;
        }
        else {
            select.innerHTML = `
            ${this.state.allSubjects.map((subject) =>
                `<option key={"subject_"${subject.id}} value=${subject.id}>${subject.title}</option>`
            )}`;
            div1.appendChild(select);
            div2.innerHTML = `
        <input type="number" class="form-control" id=${"hours_" + this.subjectsAmount} step="0.25" min="0" value="0"/>
        `;
        }
        div3.append(button);
        parrentDiv.appendChild(div1);
        parrentDiv.appendChild(div2);
        parrentDiv.appendChild(div3);

        subjectSelectionDiv.appendChild(
            parrentDiv
        );
    }

    deleteSubjectFromList(event) {
        event.preventDefault();
        console.log("SelectedBlockId=" + event.target.value);
        let selectionId = event.target.value;
        console.log('idExistingBlocksWithSubjects.indexOf(SelectedBlockId):' + this.idExistingBlocksWithSubjects.indexOf(+selectionId));

        this.idExistingBlocksWithSubjects.splice(this.idExistingBlocksWithSubjects.indexOf(+selectionId), 1);
        console.log('this.idExistingBlocksWithSubjects=' + this.idExistingBlocksWithSubjects);

        let subjectSelectionRow = document.getElementById('subjectSelection_' + selectionId);
        let subjectToDeleteId = undefined;
        let subjectToDelete = document.getElementById('subject_' + selectionId);
        if (subjectToDelete != undefined) {
            subjectToDeleteId = subjectToDelete.value;
            console.log('subjectToDeleteId=' + subjectToDeleteId)
        }
        if (subjectSelectionRow !== null) {
            console.log("before=" + this.selectedSubjects);
            if (this.selectedSubjects.indexOf(subjectToDeleteId) != -1) {
                //console.log(this.selectedSubjects.indexOf(id))
                this.selectedSubjects.splice(this.selectedSubjects.indexOf(subjectToDeleteId), 1);
                console.log("after=" + this.selectedSubjects);
            }

            if (subjectSelectionRow.parentNode) {
                subjectSelectionRow.parentNode.removeChild(subjectSelectionRow);
            }
            //   if(this.subjectsAmount>0){
            //     this.subjectsAmount-=1;
            //   }
        }
    }
    saveDatas() {
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);
        console.log(formData.get('studyYear'));
    }

    render() {
        return (
            <>
                <div className="edit__container">
                    <div style={{ position: "absolute", top: 120 }} className='box-info'>
                        <span style={{ marginBottom: '8px', color: "red", visibility: 'hidden', opacity: '0' }} id="info-text">This study plan alredy exist</span>
                    </div>
                    <h2 style={{ position: "absolute", top: 120 }} className="title-edit">Create new study plan</h2>

                    <form onSubmit={this.onSubmit} className='form-edit d-flex flex-column align-items-center justify-content-center'>

                        <div className="row g-3" id="formView">
                            <div className="col-md-12">
                                <label htmlFor="planTitle" className="form-label">Description</label>
                                <input type="text" id="planTitle" className="form-control" name="planTitle" defaultValue={this.state.planTitle} placeholder='etc: Навчальний план для усіх класів 1 року навчання 2022/2023 навчального року' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="studyYear" className="form-label">Study year</label>
                                <select id="studyYear" name="studyYear" className="form-select" defaultValue={this.state.studyYearId} onChange={(e) => this.onStudyYearChange(e)}>
                                    {this.state.studyYears.map(studyYear =>
                                        <option key={"studyYear_" + studyYear.id} value={studyYear.id}>{new Date(studyYear.startYear).toLocaleDateString() + " / " + new Date(studyYear.finishYear).toLocaleDateString()}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="yearOfStudy" className="form-label">Year of study</label>
                                <select id="yearOfStudy" name="yearOfStudy" onChange={this.onYearOfStudyChange} className="form-select">
                                    {this.state.yearsOfStudy.map(yearOfStudy =>
                                        <option key={"yearOfStudy_" + yearOfStudy.id} value={yearOfStudy.id}>{yearOfStudy.yearStudy}</option>
                                    )}

                                </select>
                            </div>
                            <div className="col-md-12">
                                <div className="col-md-4">
                                    <label htmlFor="maxAllowedLessonsPerDay" className="form-label">Max lessons per day</label>
                                    <input type="number" className="form-control" step="1" id="maxAllowedLessonsPerDay" name="maxAllowedLessonsPerDay" value={this.state.maxAllowedLessonsPerDay} onChange={this.onMaxLessonsChange} required />
                                </div>
                                <div className="col-md-8 d-flex flex-column">
                                    <label htmlFor="semester" className="form-label">Semester</label>
                                    <div className='d-flex flex-row'>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="semester" id="inlineRadio1" value="1" />
                                            <label className="form-check-label" htmlFor="semester">1</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="semester" id="inlineRadio2" value="2" />
                                            <label className="form-check-label" htmlFor="semester">2</label>
                                        </div>
                                        {/* <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="semester" id="inlineRadio3" value="3"/>
                                <label className="form-check-label" htmlFor="semester">3</label>
                                </div>
                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="semester" id="inlineRadio4" value="4"/>
                                <label className="form-check-label" htmlFor="semester">4</label>
                                </div> */}
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" defaultChecked={true} name="semester" id="inlineRadio4" value="0" />
                                            <label className="form-check-label" htmlFor="semester">All year</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>{this.state.message}</div>
                        <div id="subjectSelection">
                        </div>
                        <div className='btn btn-primary' onClick={() => this.appendSubject()}>Add one more subject</div>
                        {this.state.edit === true ?
                            <button className='btn btn-warning' type='submit'>Edit study plan</button>
                            :
                            <button className='btn btn-success' type='submit'>Create study plan</button>
                        }
                    </form>
                </div>
            </>
        )
    }
}

export default EditStudyPlan


{/* {this.state.currentStudyPlan.subjectsToAdd==undefined? 
                    // <ol className='list-group'>
                    //     <li className='list-group-item col-md-12 d-flex justify-content-between'>
                    //         <div className='col-md-4'>
                    //             <label htmlFor={"subject_1"} className="form-label">Subject</label>
                    //             <select id={'subject_1'} name={"subject_"+this.subjectsAmount} className="form-select" defaultValue="0" onChange={this.onSelectionChange}>
                    //                 <option value="0">Subjects</option>
                    //                 {this.state.allSubjects.map((subject) =>
                    //                 <option key={`subject_${subject.id}`} value={subject.id}>{subject.title}</option>
                    //             )}
                    //             </select>
                    //         </div>
                    //         <div className="col-md-4">
                    //             <label htmlFor={"hours_1"} className="form-label">Hours</label>
                    //             <input id={"hours_1"} type="number" step="0.25" className="form-control" min="0" defaultValue={0} />
                    //         </div>
                    //         <div className="col-md-2">
                    //             <label htmlFor={"delete_1"} className="form-label">Delete</label>
                    //             <button type="button" id={"delete_1"} value={1} onClick={(e)=>this.deleteSubjectFromList(e)} className="btn btn-danger">Delete</button>
                    //         </div>
                    //     </li>
                    // </ol>
                   // :
                    // <ol className='list-group'>
                    //  {this.state.currentStudyPlan.subjectsToAdd.map(subjectFromBase =>
                     
                    //  this.subjectsAmount++,
                    //  <li key ={"fieldSubjectToAdd"+this.subjectsAmount} id={"subjectSelection_"+this.subjectsAmount} className='list-group-item col-md-12 d-flex justify-content-between'>
                    //         <div className='col-md-4'>
                    //             <label htmlFor={"subject_"+this.subjectsAmount} className="form-label">Subject</label>
                    //             <select id={'subject_'+this.subjectsAmount} name={"subject_"+this.subjectsAmount} className="form-select" defaultValue={subjectFromBase.subjectId} onChange={this.onSelectionChange}>
                    //                 <option value="0">Subjects</option>
                    //                 {this.state.allSubjects.map((subject) =>
                    //                 <option key={`subjectKey_${subject.id}`} value={subject.id}>{subject.title}</option>
                    //             )}
                    //             </select>
                    //         </div>
                    //         <div className="col-md-4">
                    //             <label htmlFor={"hours_"+this.subjectsAmount} className="form-label">Hours</label>
                    //             <input id={"hours_"+this.subjectsAmount} type="number" step="0.25" className="form-control" min="0" defaultValue={subjectFromBase.hours} />
                    //         </div>
                    //         <div className="col-md-2">
                    //             <label htmlFor={"delete_"+this.subjectsAmount} className="form-label">Delete</label>
                    //             <button type="button" id={"delete_"+this.subjectsAmount} value={this.subjectsAmount} onClick={(e)=>this.deleteSubjectFromList(e)} className="btn btn-danger">Delete</button>
                    //         </div>          
                    //     </li>
                     
                       
                    // )}
                    // </ol>
                        */}
{/* {this.state.currentStudyPlan.subjectsToAdd.forEach((subjectFromBase)=>
                           
                         <div key ={"fieldSubjectToAdd"+subjectFromBase.subjectId} className='row' id={"subjectSelection_"+subjectFromBase.subjectId}>
                             <div className="col-md-6">
                                 <label htmlFor={"subject_"+subjectFromBase.subjectId} className="form-label">Subject</label>
                                 <select id={'subject_'+subjectFromBase.subjectId} name={"subject_"+subjectFromBase.subjectId} className="form-select" defaultValue={subjectFromBase.subjectId} onChange={this.onSelectionChange}>
                                     {this.state.allSubjects.map((subject) =>
                                         <option key={`subject_${subject.id}`} value={subject.id}>{subject.title}</option>
                                     )}
                                     </select>
                                 </div>
                             <div className="col-md-4">
                                 <label htmlFor={"hours_"+subjectFromBase.subjectId} className="form-label">Hours</label>
                                 <input id={"hours_"+subjectFromBase.subjectId} type="number" step="0.25" className="form-control" min="0" defaultValue={subjectFromBase.hours} />
                             </div>
                             <div className="col-md-2">
                                 <label htmlFor={"delete_"+subjectFromBase.subjectId} className="form-label">Delete</label>
                                 <button type="button" id={"delete_"+subjectFromBase.subjectId} value={1} onClick={(e)=>this.deleteSubjectFromList(e)} className="btn btn-danger">Delete</button>
                             </div>
                         </div>
                      )} */}
