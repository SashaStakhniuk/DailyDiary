import { throws } from 'assert';
import React from 'react'
import StudentHeader from '../Headers/StudentHeader';
import { Host } from '../Host'
import logon from '../../images/Photo.png'
import NavigationBarForStudent from '../Navigations/NavigationBarForStudent';

class EditStudyPlan extends React.Component {

    constructor(props) {
        super(props);
        this.getCurrentStudyYears = this.getCurrentStudyYears.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.getRungStudyPlans = this.getRungStudyPlans.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteSubjectFromList = this.deleteSubjectFromList.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);

        this.popupLoginCliseClick = this.popupLoginCliseClick.bind(this);
        this.onClickDetailInfo = this.onClickDetailInfo.bind(this);

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

            studyPlans: [],
            take: 6,
            skip: 0
        }
    }

    async componentDidMount() {
        await this.getRungStudyPlans()
        await this.getCurrentStudyYears();
        await this.getSubjects();
        
    }

    async getRungStudyPlans() {
        try {

            let take = Number(this.take)
            var skip = Number(this.skip)
            const response = await fetch(`${Host}/api/StudyPlan/GetRung/${take}/${skip}`, {
                method: "GET"
            })
            if (response.ok === true) {
                const data = await response.json();
                console.log("data: ", data);
                var skip = this.take
                let take = this.take + 6
                this.setState({ take: take })
                this.setState({ skip: skip })
                this.setState({ studyPlans: data })
            }
        } catch (e) { console.log(e) }

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

    async onClickDetailInfo(e){
        let popup = document.getElementById('popup')
        let popup_content = document.getElementById('popup__content')
        popup.style.visibility = 'visible'
        popup.style.opacity = 1
        popup_content.classList.add('animate')
        popup.style.transition = "all 0.5s";
    }

    async popupLoginCliseClick(){
        let popup = document.getElementById('popup')
        let popup_content = document.getElementById('popup__content')
        popup_content.classList.remove('animate')        
        popup.style.visibility = 'hidden'
        popup.style.opacity = 0
        popup.style.transition = "all 0.5s";
        var b = document.querySelector('b')
        if(b) {
            b.innerText = ''
        }
        var img_new = document.getElementById('img-news')
        if(img_new) {
            img_new.src = ''
        }
    }

    render() {
        return (
            <>
            <div className="main__container">
                <StudentHeader />
                <NavigationBarForStudent />
                <div className="info__container_">
                    <div style={{ margin: '0' }} className="mainpage__container_">
                        <div className="top__container">
                            <h1 className="page__title">Навчальний план</h1>
                            <div className="right__container">
                                <div style={{ marginRight: '23px' }} className="auto__layer__container">
                                    <button onClick={e => this.onClickDetailInfo(e)} className="create__button" >Створити</button>
                                </div>
                                <details id="custom-select" className="custom-select">
                                    <summary id="radios" className="radios">
                                        <input className="default__selected-item" type="radio" name="item" id="default" title="Всі роки" checked />
                                        <input className="default__selected-item" type="radio" name="item" id="item1" title="Item 1" />
                                        <input className="default__selected-item" type="radio" name="item" id="item2" title="Item 2" />
                                        <input className="default__selected-item" type="radio" name="item" id="item3" title="Item 3" />
                                        <input className="default__selected-item" type="radio" name="item" id="item4" title="Item 4" />
                                        <input className="default__selected-item" type="radio" name="item" id="item5" title="Item 5" />
                                    </summary>
                                    <ul className="list">
                                        <li className="item">
                                        <label for="item1">
                                            Item 1
                                            <span></span>
                                        </label>
                                        </li>
                                        <li className="item">
                                        <label for="item2">Item 2</label>
                                        </li>
                                        <li className="item">
                                        <label for="item3">Item 3</label>
                                        </li>
                                        <li className="item">
                                        <label for="item4">Item 4</label>
                                        </li>
                                        <li className="item">
                                        <label for="item5">Item 5</label>
                                        </li>
                                    </ul>
                                </details>
                            </div>
                        </div>
                        <div className="search__container">
                            <div className="serach__input__container">
                                <svg className="search__image" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7C13 8.29583 12.5892 9.49572 11.8907 10.4765L15.7071 14.2929L14.2929 15.7071L10.4765 11.8907C9.49572 12.5892 8.29583 13 7 13ZM7 11C9.20914 11 11 9.20914 11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11Z" fill="#5F6B7A"/>
                                </svg>
                                <textarea className="serach__input" placeholder="Find instances"/>
                            </div>
                            <div className="pagination__container">
                                <div className="pages__numbers__container">
                                    <span className="page__number">1</span>
                                    <span className="page__number">2</span>
                                    <span className="page__number">3</span>
                                    <span className="page__number">4</span>
                                    <span className="page__number">5</span>
                                </div>
                                <div className="settings__container">
                                    <svg  width="2" height="34" viewBox="0 0 2 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="2" height="34" rx="1" fill="#E9EBED"/>
                                    </svg>
                                    <svg className="svg__settings" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5004 25.5H14.4754C14.2588 25.5 14.0671 25.425 13.9004 25.275C13.7338 25.125 13.6338 24.9333 13.6004 24.7L13.3004 22.45C13.0338 22.3667 12.7631 22.2417 12.4884 22.075C12.2131 21.9083 11.9588 21.7333 11.7254 21.55L9.65043 22.45C9.43376 22.5333 9.22143 22.5417 9.01343 22.475C8.80476 22.4083 8.63376 22.275 8.50043 22.075L7.00043 19.45C6.88376 19.25 6.85043 19.0373 6.90043 18.812C6.95043 18.5873 7.05876 18.4083 7.22543 18.275L9.05043 16.9C9.0171 16.75 8.99643 16.6 8.98843 16.45C8.97976 16.3 8.97543 16.15 8.97543 16C8.97543 15.8667 8.97976 15.725 8.98843 15.575C8.99643 15.425 9.0171 15.2667 9.05043 15.1L7.22543 13.725C7.05876 13.5917 6.95043 13.4127 6.90043 13.188C6.85043 12.9627 6.88376 12.75 7.00043 12.55L8.50043 9.95C8.6171 9.75 8.78376 9.61667 9.00043 9.55C9.2171 9.48333 9.42543 9.49167 9.62543 9.575L11.7254 10.45C11.9588 10.2667 12.2131 10.096 12.4884 9.938C12.7631 9.77933 13.0338 9.65 13.3004 9.55L13.6004 7.3C13.6338 7.06667 13.7338 6.875 13.9004 6.725C14.0671 6.575 14.2588 6.5 14.4754 6.5H17.5004C17.7338 6.5 17.9338 6.575 18.1004 6.725C18.2671 6.875 18.3671 7.06667 18.4004 7.3L18.7004 9.55C19.0004 9.66667 19.2711 9.79567 19.5124 9.937C19.7544 10.079 20.0004 10.25 20.2504 10.45L22.3754 9.575C22.5754 9.49167 22.7798 9.48333 22.9884 9.55C23.1964 9.61667 23.3671 9.75 23.5004 9.95L25.0004 12.55C25.1171 12.75 25.1504 12.9627 25.1004 13.188C25.0504 13.4127 24.9421 13.5917 24.7754 13.725L22.9254 15.125C22.9588 15.2917 22.9754 15.4417 22.9754 15.575V16C22.9754 16.1333 22.9711 16.2707 22.9624 16.412C22.9544 16.554 22.9338 16.7167 22.9004 16.9L24.7254 18.275C24.9088 18.4083 25.0254 18.5873 25.0754 18.812C25.1254 19.0373 25.0838 19.25 24.9504 19.45L23.4504 22.05C23.3338 22.25 23.1671 22.3833 22.9504 22.45C22.7338 22.5167 22.5171 22.5083 22.3004 22.425L20.2504 21.55C20.0004 21.75 19.7464 21.925 19.4884 22.075C19.2298 22.225 18.9671 22.35 18.7004 22.45L18.4004 24.7C18.3671 24.9333 18.2671 25.125 18.1004 25.275C17.9338 25.425 17.7338 25.5 17.5004 25.5V25.5ZM16.0004 19C16.8338 19 17.5421 18.7083 18.1254 18.125C18.7088 17.5417 19.0004 16.8333 19.0004 16C19.0004 15.1667 18.7088 14.4583 18.1254 13.875C17.5421 13.2917 16.8338 13 16.0004 13C15.1671 13 14.4588 13.2917 13.8754 13.875C13.2921 14.4583 13.0004 15.1667 13.0004 16C13.0004 16.8333 13.2921 17.5417 13.8754 18.125C14.4588 18.7083 15.1671 19 16.0004 19ZM16.0004 17.5C15.5838 17.5 15.2298 17.354 14.9384 17.062C14.6464 16.7707 14.5004 16.4167 14.5004 16C14.5004 15.5833 14.6464 15.2293 14.9384 14.938C15.2298 14.646 15.5838 14.5 16.0004 14.5C16.4171 14.5 16.7711 14.646 17.0624 14.938C17.3544 15.2293 17.5004 15.5833 17.5004 16C17.5004 16.4167 17.3544 16.7707 17.0624 17.062C16.7711 17.354 16.4171 17.5 16.0004 17.5ZM15.0004 24H16.9754L17.3254 21.325C17.8421 21.1917 18.3088 21 18.7254 20.75C19.1421 20.5 19.5504 20.1833 19.9504 19.8L22.4254 20.85L23.4254 19.15L21.2504 17.525C21.3338 17.2583 21.3881 17 21.4134 16.75C21.4381 16.5 21.4504 16.25 21.4504 16C21.4504 15.7333 21.4381 15.4793 21.4134 15.238C21.3881 14.996 21.3338 14.75 21.2504 14.5L23.4254 12.85L22.4504 11.15L19.9254 12.2C19.5921 11.85 19.1921 11.5373 18.7254 11.262C18.2588 10.9873 17.7921 10.7917 17.3254 10.675L17.0004 8H15.0254L14.6754 10.675C14.1754 10.7917 13.7088 10.975 13.2754 11.225C12.8421 11.475 12.4254 11.7917 12.0254 12.175L9.55043 11.15L8.57543 12.85L10.7254 14.45C10.6421 14.7 10.5838 14.95 10.5504 15.2C10.5171 15.45 10.5004 15.7167 10.5004 16C10.5004 16.2667 10.5171 16.525 10.5504 16.775C10.5838 17.025 10.6421 17.275 10.7254 17.525L8.57543 19.15L9.55043 20.85L12.0254 19.8C12.4088 20.1833 12.8171 20.5 13.2504 20.75C13.6838 21 14.1588 21.1917 14.6754 21.325L15.0004 24Z" fill="#4F4F4F"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="main__cart-content__container">
                            {this.state.studyPlans.map(studyPlan => {
                                return(
                                    <>
                                        <div className="cart__study_year">
                                            <div className="logo_cart__container">
                                                <img src={logon}/> 
                                            </div>
                                            <div className="title-cart__container">
                                                <h3 className="title__cart__study-tear"></h3>
                                                <span className="description__cart__study-tear">ST.y: <br/>F.y: </span >
                                            </div>
                                            <div lang="info__cart__cintainer">
                                                <svg className="svg__info" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.17383 9.25L9.21483 9.23C9.34306 9.16594 9.48696 9.13997 9.62949 9.15516C9.77203 9.17035 9.90722 9.22606 10.0191 9.31571C10.1309 9.40536 10.2147 9.52518 10.2606 9.66099C10.3065 9.79679 10.3124 9.9429 10.2778 10.082L9.56983 12.918C9.53497 13.0572 9.54077 13.2034 9.58652 13.3394C9.63227 13.4754 9.71607 13.5954 9.82796 13.6852C9.93986 13.775 10.0752 13.8308 10.2178 13.846C10.3605 13.8612 10.5045 13.8352 10.6328 13.771L10.6738 13.75M18.9238 10C18.9238 11.1819 18.691 12.3522 18.2387 13.4442C17.7865 14.5361 17.1235 15.5282 16.2878 16.364C15.4521 17.1997 14.4599 17.8626 13.368 18.3149C12.276 18.7672 11.1057 19 9.92383 19C8.74193 19 7.57161 18.7672 6.47968 18.3149C5.38775 17.8626 4.39559 17.1997 3.55987 16.364C2.72414 15.5282 2.0612 14.5361 1.60891 13.4442C1.15662 12.3522 0.923828 11.1819 0.923828 10C0.923828 7.61305 1.87204 5.32387 3.55987 3.63604C5.24769 1.94821 7.53688 1 9.92383 1C12.3108 1 14.6 1.94821 16.2878 3.63604C17.9756 5.32387 18.9238 7.61305 18.9238 10ZM9.92383 6.25H9.93183V6.258H9.92383V6.25Z" stroke="#F2982A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    
                    <div style={{xIndex: '200'}} className="popup" id="popup">
                        <div className="popup__body">
                            <div style={{position: 'relative'}} id="popup__content" class="popup__content">
                                <h2 className="popup__title">Створити навчальній рік</h2>
                                <a className="popup__close" onClick={this.popupLoginCliseClick} >X</a>
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
                        </div>
                    </div>

                </div>
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
