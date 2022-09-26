import React from 'react'
import '../../styles/Students.css'
import { Host } from '../Host'

class NewStudyPlan extends React.Component{
    constructor(props){
        super(props);
        this.getCurrentStudyYears = this.getCurrentStudyYears.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteSubjectFromList = this.deleteSubjectFromList.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);

        this.getYearsOfStudyByStudyYear = this.getYearsOfStudyByStudyYear.bind(this);
        this.onStudyYearChange = this.onStudyYearChange.bind(this);

        this.subjectsAmount=1;//кількість предметів
        this.idExistingBlocksWithSubjects=[1];//ід блоків обраних опредметів

        this.selectedSubjects=[];// ід вже обраних предметів
        this.currentSelectedSubjectId=-1; // останній обраний предмет
        this.arrayWithoutSelectedSubjects=[]; // масив для виводу усіх предметів окрім обраних

        this.state={
            planTitle:"",
            semester:0, // 0-AllYear
            studyYear:"", // обраний навчальний рык
            yearOfStudy:0,// обраний рік навчання
            studyPlanSubjects:[],//обрані для групи
            allSubjects:[],//всі предмети
            studyYears:[],//навчальні роки, які співпадають з теперішнім
            yearsOfStudy:[],//роки навчання певного навчального року
            currentStudyPlan:[]//якщо навчальний план вже існує
        }
    }

async componentDidMount(){
        await this.getCurrentStudyYears();
        await this.getSubjects();
        this.arrayWithoutSelectedSubjects = this.state.allSubjects;
    }
    async getCurrentStudyYears(){
        // try
        // {
            const response = await fetch(`${Host}/api/StudyPlan/GetAllStudyYearsThatIncludeCurrent`)
            if(response.ok === true){
                const data = await response.json();
                console.log(data);
                this.setState({studyYears:data});
                 this.getYearsOfStudyByStudyYear(data[0].id);
            }
            else{
               // window.alert(data.error);
            }
        //}catch(e){console.log(e)}
    }
    onStudyYearChange(e){
        this.getYearsOfStudyByStudyYear(e.target.value);
    }
    async getYearsOfStudyByStudyYear(studyYearId){
        // try
        // {
            const response = await fetch(`${Host}/api/StudyPlan/getYearsOfStudyByStudyYear/${studyYearId}`)
            if(response.ok === true){
                const data = await response.json();
                console.log(data);
                this.setState({yearsOfStudy:data})
            }
            else{
               // window.alert(data.error);
            }
        //}catch(e){console.log(e)}
    }

    async getSubjects(){
        try
        {
            const response = await fetch(`${Host}/api/subject/GetAll`)
            const data = await response.json()
            if(response.ok === true){
                this.setState({
                    allSubjects:data
                })
                //console.log(data);
            }
        }catch{}
    }

    async create(datasToAdd){
        try
        {
            const response = await fetch(`${Host}/api/studyplan/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                datasToAdd
            )
        })
        if(response.ok === true){
            alert("Plan was created");
           // window.location = `/admin/new-study-plan`
        }
        else{
            console.log(response)
            let data = await response.json()
            console.log(data)
            alert(data.error)
            alert("Something goes wrong. Check data then try again");
        }
        }catch(e) {
            alert(e);
        }
    }

    async onSubmit(e){
        e.preventDefault()
        if(this.currentSelectedSubjectId>=0){ //якщо останній вибраний предмет існує
            if(!this.selectedSubjects.find((elem)=>elem==this.currentSelectedSubjectId)) // і його ще немає в списку
            this.selectedSubjects.push(this.currentSelectedSubjectId); //додаю предмет в масив обраних предметів
            console.log("current="+this.selectedSubjects)
        }
      
    let subjectsToAdd = new Array();

        for(let i = 0;i<this.idExistingBlocksWithSubjects.length;i++){
            console.log(this.idExistingBlocksWithSubjects[i]);
            let subject = e.target[`subject_${this.idExistingBlocksWithSubjects[i]+""}`];
            let hours = e.target[`hours_${this.idExistingBlocksWithSubjects[i]+""}`];
            if(subject!=null && hours!=null){
                if(subject.value!=0) // якщо ід елементу != 0
                {
                        subjectsToAdd.push({subjectId:subject.value,hours:hours.value});
                }
            }
        }
        const{ planTitle,semester,studyYear,yearOfStudy} = e.target;
        console.log(planTitle.value,semester.value,studyYear.value,yearOfStudy.value)

        // console.log(pair)
        // this.setState({
        //     studyPlanSubjects:subjectsToAdd
        // }
        // ,
        // ()=>console.log(JSON.stringify(this.state.studyPlanSubjects)))
        if(subjectsToAdd.length==0){
            alert("No one subject was selected");
        }
        else{
            const datasToSend ={
                planTitle:planTitle.value,
                semester:semester.value,
                studyYearId:studyYear.value,
                yearOfStudy:yearOfStudy.value,
                subjectsToAdd
            }
            console.log(JSON.stringify(datasToSend))
            await this.create(datasToSend);
        }

}
        onSelectionChange(event){
            this.currentSelectedSubjectId = event.target.value;
            //console.log(this.currentSelectedSubjectId)
            this.selectedSubjects.push(this.currentSelectedSubjectId);//тимчасово додаю значення в масив

            this.arrayWithoutSelectedSubjects = [...this.state.allSubjects]; // копіюю масив предметів із стейту.
            this.arrayWithoutSelectedSubjects = this.arrayWithoutSelectedSubjects.filter(e => !this.selectedSubjects.find((id) => id == e.id)) //фільтрую вже обрані предмети
             console.log(this.arrayWithoutSelectedSubjects)
            this.selectedSubjects.pop(); //видаляю з масиву (якщо не видалити, і хтось змінить предмет на інший, попередньо обраний предмет не буде відображатись)

            }
        appendSubject (){
            if(this.currentSelectedSubjectId>=0){
                if(!this.selectedSubjects.find((elem)=>elem==this.currentSelectedSubjectId))
                this.selectedSubjects.push(this.currentSelectedSubjectId); //додаю предмет в масив обраних предметів
                console.log("current="+this.selectedSubjects)
            }
        //    this.arrayWithoutSelectedSubjects = [...this.state.allSubjects]; // копіюю масив предметів із стейту.
        //    this.arrayWithoutSelectedSubjects = this.arrayWithoutSelectedSubjects.filter(e => !this.selectedSubjects.find((id) => id == e.id)) //фільтрую вже обрані предмети
        //this.subjectsAmount+=1;
        this.subjectsAmount+=1;
        this.idExistingBlocksWithSubjects.push(this.subjectsAmount);

        console.log('this.idExistingBlocksWithSubjects='+this.idExistingBlocksWithSubjects);

        let subjectSelectionDiv = document.getElementById('subjectSelection');

        let parrentDiv = document.createElement('div');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 = document.createElement('div');
        let select = document.createElement('select')

        var button = document.createElement('button');
        button.innerHTML = 'Delete';
        button.onclick = (e)=>this.deleteSubjectFromList(e);
        select.onchange=(e)=>this.onSelectionChange(e)

        parrentDiv.setAttribute('class','row');
        parrentDiv.setAttribute('id','subjectSelection_'+this.subjectsAmount);
        div1.setAttribute('class','col-md-6');
        div2.setAttribute('class','col-md-4');
        div3.setAttribute('class','col-md-2');
        button.setAttribute('id','delete_'+this.subjectsAmount);
        button.setAttribute('value',this.subjectsAmount);
        button.setAttribute('class','btn btn-danger');
        select.setAttribute('id','subject_'+this.subjectsAmount);
        select.setAttribute('class','form-select');
        select.setAttribute('value','Subjects');


        select.innerHTML=`
            <option value="Subjects">Subjects</option>
            ${this.arrayWithoutSelectedSubjects.map((subject) =>
                `<option key={"subject_"${subject.id}} value=${subject.id}>${subject.title}</option>`
            )}`;
    div1.appendChild(select);
    div2.innerHTML=`
        <input type="number" class="form-control" id=${"hours_"+this.subjectsAmount} step="0.25" min="0" value="0"/>
        `;
    div3.append(button);
    parrentDiv.appendChild(div1);
    parrentDiv.appendChild(div2);
    parrentDiv.appendChild(div3);

    subjectSelectionDiv.appendChild(
        parrentDiv
        );
    }
     deleteSubjectFromList(event){
        event.preventDefault();
        console.log("Selection="+event.target.value);
        let selectionId=event.target.value;
        console.log('indexOf='+this.idExistingBlocksWithSubjects.indexOf(+selectionId));

        this.idExistingBlocksWithSubjects.splice(this.idExistingBlocksWithSubjects.indexOf(+selectionId),1);
        console.log('this.idExistingBlocksWithSubjects='+this.idExistingBlocksWithSubjects);
        
        let subjectSelectionRow = document.getElementById('subjectSelection_'+ selectionId);
        let subjectToDeleteId=undefined;
        let subjectToDelete = document.getElementById('subject_'+selectionId);
        if(subjectToDelete!=undefined){
            subjectToDeleteId = subjectToDelete.value;
            console.log('subjectToDeleteId='+subjectToDeleteId)
        }
        if(subjectSelectionRow!==null){
            console.log("before="+this.selectedSubjects);
            if(this.selectedSubjects.indexOf(subjectToDeleteId)!=-1){
                //console.log(this.selectedSubjects.indexOf(id))
                this.selectedSubjects.splice(this.selectedSubjects.indexOf(subjectToDeleteId),1);
                console.log("after="+this.selectedSubjects);
            }
            console.log(this.arrayWithoutSelectedSubjects);
            this.arrayWithoutSelectedSubjects = [...this.state.allSubjects]; // копіюю масив предметів із стейту.
            this.arrayWithoutSelectedSubjects = this.arrayWithoutSelectedSubjects.filter(e => !this.selectedSubjects.find((id) => id == e.id)) //фільтрую вже обрані предмети
            console.log(this.arrayWithoutSelectedSubjects);

            if (subjectSelectionRow.parentNode) {
                subjectSelectionRow.parentNode.removeChild(subjectSelectionRow);
          }
        //   if(this.subjectsAmount>0){
        //     this.subjectsAmount-=1;
        //   }
        }
    }
    saveDatas(){
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);
        console.log(formData.get('studyYear'));
    }
   
render(){
    return(
        <>  
            <div className="edit__container">
                <div style={{ position: "absolute", top: 120}} className='box-info'>
                    <span style={{ marginBottom: '8px', color: "red", visibility: 'hidden', opacity: '0' }} id="info-text">This study plan alredy exist</span>
                </div>
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new study plan</h2>

                <form onSubmit={e => this.onSubmit(e)} className='form-edit d-flex flex-column align-items-center justify-content-center'>
                    
                    <div className="row g-3" id="formView">
                    <div className="col-md-12">
                            <label htmlFor="planTitle" className="form-label">Description</label>
                            <input type="text" id="planTitle" className="form-control" name = "planTitle" placeholder='etc: Навчальний план для 3 класів'/>
                    </div> 
                        <div className="col-md-6">
                            <label htmlFor="studyYear" className="form-label">Study year</label>
                            <select id="studyYear" name="studyYear" className="form-select" defaultValue={this.state.studyYear.id} onChange={(e)=>this.onStudyYearChange(e)}>
                                {this.state.studyYears.map(studyYear=>
                                      <option key={"studyYear_"+studyYear.id} value={studyYear.id}>{new Date(studyYear.startYear).toLocaleDateString() +" / "+ new Date(studyYear.finishYear).toLocaleDateString()}</option>
                                    )}
                            </select>
                            </div>
                        <div className="col-md-6">
                            <label htmlFor="yearOfStudy" className="form-label">Year of study</label>
                            <select id="yearOfStudy" name="yearOfStudy" className="form-select">
                                {this.state.yearsOfStudy.map(yearOfStudy =>
                                    <option key={"yearOfStudy_"+yearOfStudy.id} value={yearOfStudy.yearStudy}>{yearOfStudy.yearStudy}</option>
                                )}
                                
                            </select>
                        </div>
                        <div className="col-md-12">
                        <label htmlFor="semester" className="form-label">Semester</label>
                        <div></div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="semester" id="inlineRadio1" value="1"/>
                            <label className="form-check-label" htmlFor="semester">1</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="semester" id="inlineRadio2" value="2"/>
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
                            <input className="form-check-input" type="radio" defaultChecked={true} name="semester" id="inlineRadio4" value="0"/> 
                            <label className="form-check-label" htmlFor="semester">All year</label>
                            </div>
                        </div>
                        </div>
                        <div id ="subjectSelection">
                        <div className='row' id={"subjectSelection_1"}>
                            <div className="col-md-6">
                                <label htmlFor={"subject_1"} className="form-label">Subject</label>
                                <select id={'subject_1'} name={"subject_"+this.subjectsAmount} className="form-select" defaultValue="0" onChange={this.onSelectionChange}>
                                    <option value="0">Subjects</option>
                                    {this.state.allSubjects.map((subject) =>
                                        <option key={`subject_${subject.id}`} value={subject.id}>{subject.title}</option>
                                    )}
                                    </select>
                                </div>
                            <div className="col-md-4">
                                <label htmlFor={"hours_1"} className="form-label">Hours</label>
                                <input id={"hours_1"} type="number" step="0.25" className="form-control" min="0" defaultValue={0} />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor={"delete_1"} className="form-label">Delete</label>
                                <button type="button" id={"delete_1"} value={1} onClick={(e)=>this.deleteSubjectFromList(e)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                        </div>
                    <div className='btn btn-primary' onClick={()=>this.appendSubject()}>Add one more subject</div>                    
                    <button className='btn btn-success' type='submit'>Create study plan</button>
                </form>
            </div>
        </>
    )
}
}

export default NewStudyPlan




// import React from 'react'
// import { useState, useEffect } from 'react'
// import '../../styles/Students.css'

// // pach : /admin/new-study-plan
// function NewStudyPlan(){

//     const [studyYears, setStudyYears] = useState([])
//     const [subjectsdate, setSubjects] = useState([])
//     const [title, setTitle] = useState("")
//     const [Semester, setSemestr] = useState(1)

//     useEffect(() => {
//         getStudyYears()
//         getSubjects()
//     }, [])

//     async function getStudyYears(){
//         try
//         {
//             const response = await fetch(`https://localhost:44364/api/PlanEducation/Get`)
//             const data = await response.json()
//             if(response.ok === true){
//                 setStudyYears(data)
//             }
//         }catch{}
//     }

//     async function getSubjects(){
//         try
//         {
//             const response = await fetch(`https://localhost:44364/api/subject/get`)
//             const data = await response.json()
//             if(response.ok === true){
//                 setSubjects(data)
//             }
//         }catch{}
//     }

//     async function create(){
//         var studyYearsSt = document.getElementById('studyYears').value
//         var studyYearId = Number(studyYearsSt)
//         var semester = Number(Semester)
//         var subjects = []
//         var listHouts = []
//         var currentStudyPlan = document.getElementById('currentStudyPlan').checked ? true : false
//         subjectsdate.forEach(subj => {
//             var checkbox = document.getElementById(`ch_${subj.id}`)
//             var  hours_subject = document.getElementById(`hours-subject-${subj.id}`)
            
//             if(checkbox.checked){
//                 var subjectID = Number(checkbox.value)
//                 subjects.push(subjectID); 
//                 var hour = Number(hours_subject.value)
//                 listHouts.push(hour)
//             }
//         })
//         try
//         {
//             const request = await fetch('https://localhost:44364/api/studyplan/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 title,
//                 semester,
//                 studyYearId,
//                 currentStudyPlan,
//                 listHouts,
//                 subjects,
//             })
//         })
//         if(request.ok === true){
//             window.location = `/admin/new-study-plan`
//         }
//         }catch {}
//     }

//     async function onSubmit(e){
//         e.preventDefault()
//         await create()
//     }

//     function onChangeSemester(e){
//         setSemestr(e.target.value)
//     }

//     function onChangeTitle(e){
//         setTitle(e.target.value)
//     }

//     return(
//         <>  
//             <div className="edit__container">
//                 <div style={{ position: "absolute", top: 120}} className='box-info'>
//                     <span style={{ marginBottom: '8px', color: "red", visibility: 'hidden', opacity: '0' }} id="info-text">This study plan alredy exist</span>
//                 </div>
//                 <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new study plan</h2>
//                 <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column align-items-center justify-content-center'>
//                     <div className="mb-3">
//                         <select id='studyYears' className='date mb-3'>
//                             {studyYears.map((studyYear, i) => {
//                                 return(
//                                     <>
//                                         <option key={i} value={studyYear.id}>{studyYear.title}</option>
//                                     </>
//                                 )
//                             })}
//                         </select>
//                     </div>
//                     <div className="mb-3">
//                         <input style={{ width: '250px' }} type="text" id="title" value={title} onChange={e => onChangeTitle(e)} placeholder="Enter title of study plan"/>
//                     </div>                     
//                     <div className="mb-3 d-flex flex-row m-3 p-3 align-items-center">
//                         <input id="currentStudyPlan" type="checkbox" />
//                         <span className="span-text">Current Study Plan</span>
//                     </div>
//                     <div className="mb-3">
//                             <div className="accordion-item">
//                                 <h2 className="accordion-header" id="flush-headingOne">
//                                     <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//                                         Subgects
//                                     </button>
//                                 </h2>
//                                 <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
//                                     <div className='w-100 d-flex flex-column align-items-center justify-content-start' style={{ margin: '14px 20px' }}>
//                                         {subjectsdate.map((subject, i) => {
//                                             return(
//                                                 <>
//                                                     <div  className="d-flex flex-column">
//                                                         <div className="d-flex flex-row w-100 align-items-center justify-content-center"> 
//                                                             <input style={{ marginRight: '5px' }} type="checkbox" id={`ch_${subject.id}`} value={subject.id} name="scales" placeholder={`hours htmlFor ${subject.title}`}/>
//                                                             <span>{subject.title}</span>
//                                                         </div>
//                                                         <input className='none' id={`hours-subject-${subject.id}`} type="number"/>
//                                                     </div>
//                                                 </>
//                                             )
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
                            
//                         </div>
//                         <div className="mb-3">
//                             <span className="span-text">Semester</span>
//                             <div className="mb-3">
//                                 <input id="semestr" type="number" value={Semester} onChange={onChangeSemester}/>
//                             </div>
//                         </div>
//                         <button className='btn btn-primary'>Create</button>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default NewStudyPlan