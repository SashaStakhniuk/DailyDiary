import React from 'react'
import { Host } from '../Host'
 class CreateNewGroup extends React.Component{
    constructor(props){
        super(props);

        this.getAllStudyPlansByYearOfStudyId=this.getAllStudyPlansByYearOfStudyId.bind(this);
        this.getAllAuditories=this.getAllAuditories.bind(this);
        this.getYearsOfStudyCurrentStudyYear=this.getYearsOfStudyCurrentStudyYear.bind(this);
        this.onYearOfStudyChange=this.onYearOfStudyChange.bind(this);
        this.onFormSubmit=this.onFormSubmit.bind(this);
        this.createOrEdit=this.createOrEdit.bind(this);


        this.state={
            title:"",
            groupId:0,
            yearOfStudyId:0,
            studyPlanId:0,
            preferedAuditoryId:0,
            studyPlans:[],
            auditories:[],
            yearsOfStudy:[]
        }
    };
    componentDidMount(){
       // this.getAllStudyPlansByYearOfStudyId();
        this.getAllAuditories();
        this.getYearsOfStudyCurrentStudyYear();
    }
    async getAllStudyPlansByYearOfStudyId(yearOfStudyId){
        try{
            const response = await fetch(`${Host}/api/studyPlan/getAllStudyPlansByYearOfStudyId/${yearOfStudyId}`);
            if(response.ok===true){
                const data = await response.json();
                console.log("recieved studyPlans: ", data)
                this.setState({
                    studyPlans:data 
                })
            }
            else{
                this.setState({
                    studyPlans:[]
                })
                const data = await response.text();
                window.alert(data);
              
            }
        }
        catch(e){
            window.alert(e);
        }
    }
    async getAllAuditories(){
        try{
            const response = await fetch(`${Host}/api/auditory/getAllAuditories`);
            if(response.ok===true){
                const data = await response.json();
                console.log("recieved auditories: ", data)
                this.setState({
                    auditories:data 
                })
            }
            else{
                const data = await response.text();
                window.alert(data);
            }
        }
        catch(e){
            window.alert(e);
        }
    }
    async getYearsOfStudyCurrentStudyYear(){
        try{
            const response = await fetch(`${Host}/api/yearOfStudy/getYearsOfStudyByCurrentStudyYear`);
            if(response.ok===true){
                const data = await response.json();
                console.log("recieved yearsofStudy: ", data)
                this.setState({
                    yearsOfStudy:data 
                }
                ,()=>this.getAllStudyPlansByYearOfStudyId(data[0].id)
                )
            }
            else{
                const data = await response.text();
                window.alert(data);
            }
        }
        catch(e){
            window.alert(e);
        }
    }
    onYearOfStudyChange(e){
        this.getAllStudyPlansByYearOfStudyId(e.target.value);
    }
    async createOrEdit(){
        try{
            const datasToSend= {
                title:this.state.title,
                studyPlanId:this.state.studyPlanId,
                yearOfStudyId:this.state.yearOfStudyId,
                preferedAuditoryId:this.state.preferedAuditoryId,
                groupId:this.state.groupId

            }
            const response = await fetch(`${Host}/api/group/create`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });
            if(response.ok===true){
                window.alert("Created");
            }
            else{
                const data = await response.text();
                window.alert(data);
            }
        }
        catch(e){
            window.alert(e);
        }
    }
    onFormSubmit(e){
        e.preventDefault();

        const { groupTitle, yearOfStudy, studyPlan,auditory } = e.target;
        this.setState({
            title:groupTitle.value,
            yearOfStudyId:yearOfStudy.value,
            studyPlanId:studyPlan.value,
            preferedAuditoryId:auditory.value
        }
        ,()=>this.createOrEdit()
        )
    }
    render(){
        return(
                <form onSubmit={this.onFormSubmit} className='container'>
                    <div className="col-md-12">
                        <label htmlFor="groupTitle" className="form-label">Group title</label>
                        <input type="text" className="form-control" id="groupTitle" name="groupTitle" defaultValue={this.state.title} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="yearOfStudy" className="form-label">YearOfStudy</label>
                        <select type="text" className="form-control" id="yearOfStudy" name="yearOfStudy" defaultValue={this.state.yearOfStudyId} onChange={this.onYearOfStudyChange} required >
                            {this.state.yearsOfStudy.map(yearOfStudy=>
                                <option key={"yearOfStudy_"+yearOfStudy.id} value={yearOfStudy.id}>{yearOfStudy.yearStudy}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="studyPlan" className="form-label">Study Plan</label>
                        <select type="text" className="form-control" id="studyPlan" name="studyPlan" defaultValue={this.state.studyPlanId} required >
                            {this.state.studyPlans.map(studyPlan=>
                                <option key={"studyPlan_"+studyPlan.id} value={studyPlan.id}>{studyPlan.title}</option>
                                // <option key={"studyPlan_"+studyPlan.id} value={studyPlan.id}>{studyPlan.title+". Lessons per day: "+studyPlan.maxAllowedLessonsPerDay}</option>
                            )}
                        </select>
                    </div>
                    <div>Prefered auditory:</div>
                    <fieldset className='d-flex flex-column'>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="auditory" id={"auditory_0"} value={0} defaultChecked />
                            <label className="form-check-label" htmlFor={"auditory_0"}>None</label>
                        </div>
                        {this.state.auditories.map(auditory=>
                            <div key={"auditory_"+auditory.id} className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="auditory" id={"auditory_"+auditory.id} value={auditory.id} />
                            <label className="form-check-label" htmlFor={"auditory_"+auditory.id}>{auditory.title + ". " + auditory.auditoryType.auditoryTypeDescription}</label>
                            </div>
                        )}
                    </fieldset>
                    <div className='d-flex justify-content-end'>
                        <input className='btn btn-success' type="submit"></input>
                    </div>
                </form>
        )
    }
 }
export default CreateNewGroup;
// import React from 'react'
// import { useState, useEffect } from 'react'
// import AdminNavigationBar from '../AdminNavigationBar'

// function CreateNewGroup(){
    
//     const [title, setTitle] = useState("")
//     const [students, setStudents] = useState([])
//     const [currentCart, setCurrentCart] = useState(null)  
//     const [studyYears, setStudyYears] = useState([])  

//     useEffect(() => {
//         getStudents()
//         getStudyYears()
//     }, [])

//     async function getStudyYears(){
//         try
//         {
//             const response = await fetch(`https://localhost:44364/api/PlanEducation/Get`)
//             const data = await response.json()
//             if(response.ok === true){
//                 setStudyYears(data)
//             }
//         }catch { }
//     }

//     async function getStudents(){
//         try {
//             const response= await fetch('https://localhost:44364/api/student/get')
//                 const data = await response.json()
//                 if (response.ok === true) {
//                     setStudents(data)
//                 } else {
//                     console.log("error",data)
//                 }
//             }
//         catch{}
//     }

//     async function create(){
//         var id = 0
//         var studentsId = []
//         var studyYearsSt = document.getElementById('studyYears').value
//         var studyYearId = Number(studyYearsSt)
//         students.forEach(student => {
//             var checkbox = document.getElementById(`ch_${student.studentId}`)
//             if(checkbox) {
//                 if(checkbox.checked){
//                     var studentId = Number(checkbox.value)
//                     studentsId.push(studentId); 
//                 }
//             }
//         })
//         try{
//             const response = await fetch('https://localhost:44364/api/Group/Create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     id,
//                     title,
//                     studyYearId,
//                     studentsId
//                 })
//             })
//             if(response.ok === true){
//                 window.location = `/admin/groups`
//             }
//         }catch {}
//     }

//     async function onSubmit(e){
//         e.preventDefault()
//         await create()
//     }

//     function onChangeTitle(e){
//         setTitle(e.target.value)
//     }

//     async function getStudentByLastName(lastName){
//         if(lastName == ""){
//             await getStudents()
//         } else {
//             try{
//                 const response= await fetch(`https://localhost:44364/api/student/GetByName/${lastName}`)
    
//                  const data = await response.json()
        
//                  if (response.ok === true) {

//                     setStudents(data)

//                  } else {
//                      console.log("error",data)
//                  }
//                 }
//             catch{}
//         }
//     }

//     async function onChangeHendler(){
//         var input = document.getElementById('lastName') 
//         await getStudentByLastName(input.value)
//     }

//     function onClickStudentCart(e, studentId) {
//         var studentCart = document.getElementById(`student-${studentId}`)
//         var checkbox = document.getElementById(`ch_${studentId}`)
//         var fio_container = document.getElementById(`fio-container-${studentId}`)

//         if(checkbox.checked === true) {
//             checkbox.checked = false
//             studentCart.style.backgroundColor = '#fff'
//             studentCart.style.color = '#000'
//             fio_container.style.color = '#000'
//             fio_container.style.backgroundColor = '#fff'
//         } else if(checkbox.checked === false) {
//             checkbox.checked = true
//             studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
//             studentCart.style.color = '#fff'
//             fio_container.style.color = '#fff'
//             fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
//         }
//     }

//     function onDragStartHandler(e, student) {
//         setCurrentCart(student)
//         var studentCart = document.getElementById(`student-${student.studentId}`)
//         var checkbox = document.getElementById(`ch_${student.studentId}`)
//         var fio_container = document.getElementById(`fio-container-${student.studentId}`)
//         if(checkbox.checked === true) {
//             fio_container.style.color = '#fff'
//             fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
//             studentCart.style.color = '#fff'
//             studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
//         } else if(checkbox.checked === false) {
//             studentCart.style.backgroundColor = '#fff'
//             studentCart.style.color = '#000'
//             fio_container.style.backgroundColor = '#fff'
//             fio_container.style.color = '#000'
//         }
//     }

//     function onDragLeaveHandler(e, student) {
//         e.target.style.backgroundColor = '#fff'
//         var studentCart = document.getElementById(`student-${student.studentId}`)
//         var checkbox = document.getElementById(`ch_${student.studentId}`)
//         var fio_container = document.getElementById(`fio-container-${student.studentId}`)
//         if(checkbox.checked === true) {
//             fio_container.style.color = '#fff'
//             fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
//             studentCart.style.color = '#fff'
//             studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
//         } else if(checkbox.checked === false) {
//             studentCart.style.backgroundColor = '#fff'
//             studentCart.style.color = '#000'
//             fio_container.style.backgroundColor = '#fff'
//             fio_container.style.color = '#000'
//         }
//     }

//     function onDragEndHandler(e, student) {
//         var studentCart = document.getElementById(`student-${student.studentId}`)
//         var checkbox = document.getElementById(`ch_${student.studentId}`)
//         var fio_container = document.getElementById(`fio-container-${student.studentId}`)
//         if(checkbox.checked === true) {
//             fio_container.style.color = '#fff'
//             fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
//             studentCart.style.color = '#fff'
//             studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
//         } else if(checkbox.checked === false) {
//             studentCart.style.backgroundColor = '#fff'
//             studentCart.style.color = '#000'
//             fio_container.style.backgroundColor = '#fff'
//             fio_container.style.color = '#000'
//         }
//     }

//     function onDragOverHandler(e, student) {
//         e.preventDefault()
//         var fio_container = document.getElementById(`fio-container-${student.studentId}`)
//         e.target.style.backgroundColor = 'lightgray'
//         fio_container.style.backgroundColor = 'lightgray'
//     }

//     function onDropHandler(e, student) {
//         e.preventDefault()
//         setStudents(students.map((stud) => {
//             if(stud.studentId === student.studentId) {
//                 return {...stud, order: currentCart.order}
//             }
//             if(stud.studentId === currentCart.studentId) { 
//                 return {...stud, order: student.order}
//             }
//             return stud
//         }))
       
//         var checkboxCourrentStudent = document.getElementById(`ch_${currentCart.studentId}`)
//         var checkboxStudent = document.getElementById(`ch_${student.studentId}`)
        
//         if(checkboxStudent.checked === true && checkboxCourrentStudent.checked === true){
//             checkboxCourrentStudent.checked = true
//             checkboxStudent.checked = false
//         } else {
//             checkboxCourrentStudent.checked = false
//         }
//         if(checkboxStudent.checked === false && checkboxCourrentStudent.checked === false){
//             checkboxCourrentStudent.checked = false
//             checkboxStudent.checked = false
//         } 
//         var studentCart = document.getElementById(`student-${student.studentId}`)
//         var fio_container = document.getElementById(`fio-container-${student.studentId}`)
//         if(checkboxStudent.checked === true) {
//             checkboxStudent.checked = false
//             studentCart.style.backgroundColor = '#fff'
//             studentCart.style.color = '#000'
//             fio_container.style.backgroundColor = '#fff'
//             fio_container.style.color = '#000'
//         } else if(checkboxStudent.checked === false) {
//             checkboxStudent.checked = true
//             fio_container.style.color = '#fff'
//             fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
//             studentCart.style.color = '#fff'
//             studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
//         }
//     }

//     const sortCards = (a, b) => {
//         if(a.order > b.order) {
//             return 1
//         } else {
//             return -1
//         }
//     }

//     return(
//         <>
//         <div className="edit__container">
//                 <AdminNavigationBar />
//                 <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new Group</h2>
//                 <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column'>
//                     <div className="mb-3">
//                         <input id="title" type="text" value={title} onChange={onChangeTitle} placeholder="Enter group title" required="required"/>
//                     </div>
//                     <div className='mb-3'>
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
//                     <div className='mb-3'>
//                         <div className="stud-container">
//                             <div className=''>
//                                 <input onChange={onChangeHendler} id="lastName" type="lastName" placeholder="Enter student lastNamr" title="Your username" />
//                             </div>
//                             <div className='sub-stud-container'>
//                                 {students.sort(sortCards).map((student, i) =>   {
//                                     if(student.groupId === null) {
//                                         return(  
//                                             <>
//                                                 <div
//                                                     draggable={true} 
//                                                     onDragStart={e => onDragStartHandler(e, student)}
//                                                     onDragLeave={e => onDragLeaveHandler(e, student)}
//                                                     onDragEnd={e => onDragEndHandler(e, student)}
//                                                     onDragOver={e => onDragOverHandler(e, student)}
//                                                     onDrop={e => onDropHandler(e, student)}
//                                                     onClick={e => onClickStudentCart(e, student.studentId)} id={`student-${student.studentId}`} className='stud-cart' >
//                                                     <input style={{ display: 'none', visibility: 'hidden', opacity: '0' }} value={student.studentId} id={`ch_${student.studentId}`} type='checkbox'/>
//                                                     <div style={{ padding: '9px' }} id={`fio-container-${student.studentId}`} className='fio-container'>
//                                                         {student.name} {student.lastName} {student.age} year
//                                                     </div>
//                                                 </div>
//                                             </>
//                                         ) 
//                                     }
//                                     }
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mb-3">
//                         <button type="submit" className="btn">Create</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default CreateNewGroup