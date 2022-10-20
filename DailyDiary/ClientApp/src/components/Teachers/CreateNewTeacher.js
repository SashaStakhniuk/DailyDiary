// import React from "react"
// import AdminNavigationBar from '../AdminNavigationBar'
// import '../../styles/Students.css'
// import { useState, useEffect } from 'react'

// function CreateNewTeacher(){
    
//     useEffect(() => {
//         getSubjects()
//     }, [])

//     const [dataSpecialty, setDayaSpecialty] = useState(["Teacher", "Pro Teacher"])
//     const [dataCategory, setDataCategory] = useState(["Specialist", "First category specialist"])
//     const [dataDegree, setDatDegree] = useState(["Master", "Profesional PHP"])
//     const [dataEducation, setDataEducation] = useState(["Higher"])

//     const [name, setName] = useState('Empty')
//     const [lastName, setLastName] = useState('Empty')
//     const [age, setAge] = useState(0)
//     const [birthday, setBirthday] = useState()
//     const [specialty, setSpecialty] = useState('Empty')
//     const [category, setCategory] = useState('Empty')
//     const [degree, setDegree] = useState('Empty')
//     const [education, setEducation] = useState('Empty')
//     const [experience, setExperience] = useState(0)
//     const [salary, setSalary] = useState(0)
//     const [rate, setRate] = useState(0)
//     const [email, setEmail] = useState('Empty')
//     const [base64URL, setBase64URL] = useState("")
//     const [id, setId] = useState(0)
//     const [subjectsdate, setSubjects] = useState([])

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
    
//     async function add(){
//         var subjectsId = []
//         subjectsdate.forEach(subj => {
//             var checkbox = document.getElementById(`ch_${subj.id}`)            
//             if(checkbox.checked){
//                 var subjectId = Number(checkbox.value)
//                 subjectsId.push(subjectId); 
//             }
//         })
//         var Specialty = document.getElementById('dataSpecialty').value
//         var Category = document.getElementById('dataCategory').value
//         var Degree = document.getElementById('dataDegree').value
//         var Education = document.getElementById('dataEducation').value
        
//         console.log("name: " + name +" ", typeof(name))
//         console.log("id: " + id +" ", typeof(id))
//         console.log("lastName: " + lastName +" ", typeof(lastName))
//         console.log("age: " + age +" ", typeof(age))
//         console.log("birthday: " + birthday +" ", typeof(birthday))
//         console.log("specialty: " + specialty +" ", typeof(specialty))
//         console.log("category: " + category +" ", typeof(category))
//         console.log("degree: " + degree +" ", typeof(category))
//         console.log("education: " + education +" ", typeof(education))
//         console.log("experience: " + experience +" ", typeof(experience))
//         console.log("salary: " + salary +" ", typeof(salary))
//         console.log("rate: " + rate +" ", typeof(rate))
//         console.log("email: " + email +" ", typeof(email))

//         const response = await fetch('https://localhost:44364/api/Teacher/CreateNew', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 id, 
//                 name,
//                 lastName,
//                 age,
//                 birthday,
//                 Specialty,
//                 Category,
//                 Degree,
//                 Education,
//                 experience,
//                 salary,
//                 base64URL,
//                 rate,
//                 email, 
//                 subjectsId
//             })
//         })
//         const data = await response.json()
//         if(response.ok === true){
//             console.log("Secsesfuly: " + data)
//         } else {
//             console.log("Error: " + data)
//         }
//     }

//     async function onSubmit(e){
//         e.preventDefault()
//         await add()
//     }

//     function onChangeUserName(e){
//         setName(e.target.value)
//     }

//     function onChangelastName(e){
//         setLastName(e.target.value)
//     }

//     function onChangeAge(e){
//         setAge(e.target.value)
//     }

//     function onChangeBirthday(e){
//         setBirthday(e.target.value)
//     }

//     function onChangeSpecialty(e){
//         setSpecialty(e.target.value)
//     }

//     function onChangeCategory(e){
//         setCategory(e.target.value)
//     }

//     function onChangeDegree(e){
//         setDegree(e.target.value)
//     }

//     function onChangeEducation(e){
//         setEducation(e.target.value)
//     }

//     function onChangeExperience(e){
//         setExperience(e.target.value)
//     }

//     function onChangeRate(e){
//         setRate(e.target.value)
//     }

//     function onChangeSalary(e){
//         setSalary(e.target.value)
//     }

//     function onChangeEmail(e){
//         setEmail(e.target.value)
//     }

//     const getBase64 = file => {
//         return new Promise(resolve => {
//             let fileInfo;
//             let baseURL = "";
//             let reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => {
//             baseURL = reader.result;
//             resolve(baseURL);
//             };
//         });
//     };

//     function handleFileInputChange(e){
//         var file = e.target.files[0]
//         getBase64(file)
//             .then(result => {
//                 file["base64"] = result;
//                 setBase64URL(result)
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     return(
//         <>
//             <div key={id} className="edit__container">
//                 <AdminNavigationBar/>
//                 <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new Teacher</h2>
//                 <form onSubmit={e => onSubmit(e)} className='form-edit'>
//                     <div className="container1">
//                         <span className="span-text">Name</span>
//                         <div className="mb-3">
//                             <input id="username" value={name} onChange={e => onChangeUserName(e)} type="text" placeholder="Enter teacher name" title="" />
//                         </div>

//                         <span className="span-text">Last name</span>
//                         <div className="mb-3">
//                             <input id="username" value={lastName} onChange={e => onChangelastName(e)} type="text" placeholder="Enter teacher last name" title=" " />
//                         </div>

//                         <span className="span-text">Age</span>
//                         <div className="mb-3">
//                             <input id="number" value={age} onChange={e => onChangeAge(e)} type="number" placeholder="Enter teacher birthday" title="" />
//                         </div>

//                         <span className="span-text">Birthday</span>
//                         <div className="mb-3">
//                             <input id="date" data-date-format="DD MMMM YYYY" value={birthday} onChange={e => onChangeBirthday(e)} type="date" placeholder="Enter teacher birthday" title="teacher birthday" />
//                         </div>

//                         <span className="span-text">Email</span>
//                         <div className="mb-3">
//                             <input id="username" value={email} onChange={e => onChangeEmail(e)} type="email" placeholder="Enter teacher email" title="" />
//                         </div>
//                         <div className="mb-3">
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
//                                                     <div style={{ justifyContent: 'flex-start' }} className="d-flex flex-column">
//                                                         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} > 
//                                                             <input style={{ marginRight: '5px' }} type="checkbox" id={`ch_${subject.id}`} value={subject.id} name="scales" placeholder={`hours for ${subject.title}`}/>
//                                                             <span>{subject.title}</span>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                   
//                     <div className="container2">

//                         <span className="span-text">Specialty</span>
//                         <select onChange={e => onChangeSpecialty(e)} type="date" id="dataSpecialty" className="dataSpecialty">
//                             {dataSpecialty.map((specialty, i) => {
//                                 return(
//                                     <>
//                                         <option key={i} value={specialty} defaultValue={i == 0 ? "selected" : ""}>{specialty}</option>
//                                     </>
//                                 )
//                             })}
//                         </select >

//                         <span className="span-text">Category</span>
//                         <select onChange={e => onChangeCategory(e)} type="date" id="dataCategory" className="dataCategory">
//                             {dataCategory.map((category, i) => {
//                                 return(
//                                     <>
//                                         <option key={i}  defaultValue={i == 0 ? "selected" : ""} value={category}>{category}</option>
//                                     </>
//                                 )
//                             })}
//                         </select>

//                         <div style={{ display: 'flex', flexDirection: 'column', disabled: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                             <div className="mb-3" style={{ display: 'flex', flexDirection: 'column'}}>
//                                 <label style={{ color: 'gray' }} htmlFor="floatingTextarea">Сhoose a picture student</label>
//                                 <input style={{  }} className="btn btn-primary" type="file" name="file" onChange={e => handleFileInputChange(e)} />
//                             </div>
//                         </div>

//                         <span className="span-text">degree</span>
//                         <select onChange={e => onChangeDegree(e)} type="date" id="dataDegree" className="dataDegree">
//                             {dataDegree.map((degree, i) => {
//                                 return(
//                                     <>
//                                         <option key={i}  defaultValue={i == 0 ? "selected" : ""} value={degree}>{degree}</option>
//                                     </>
//                                 )
//                             })}
//                         </select>

//                         <span className="span-text">Education</span>
//                         <select onChange={e => onChangeEducation(e)} type="date" id="dataEducation" className="dataEducation">
//                             {dataEducation.map((education, i) => {
//                                 return(
//                                     <>
//                                         <option key={i}  defaultValue={i == 0 ? "selected" : ""} value={education}>{education}</option>
//                                     </>
//                                 )
//                             })}
//                         </select>

//                         <span className="span-text">Experience</span>
//                         <div className="mb-3">
//                             <input id="number" value={experience} onChange={e => onChangeExperience(e)} type="number" placeholder="Enter teacher experience" title="" />
//                         </div>

//                         <span className="span-text">Rate</span>
//                         <div className="mb-3">
//                             <input id="number" value={rate} onChange={e => onChangeRate(e)} type="number" placeholder="Enter teacher rate" title="" />
//                         </div>
                        
//                         <span className="span-text">Salary</span>
//                         <div class="mb-3">
//                             <input id="number" value={salary} onChange={e => onChangeSalary(e)} type="number" placeholder="Enter teacher rate" title="" />
//                         </div>

//                         <button type="submit" className="btn__edit align-self-end">Add</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }
// export default CreateNewTeacher