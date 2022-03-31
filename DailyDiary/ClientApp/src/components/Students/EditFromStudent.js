import React from "react"
import '../../styles/Students.css'
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import {moment} from 'moment/moment';

function EditFromStudent(props){
    
    const [student,  setStudent] = useState({})

    const[Name, setUserName] = useState()
    const[LastName, setlastName] = useState()
    const[Password, setPassword] = useState()
    const[Birthday, setBirthday] = useState()
    const[Login, setLogin] = useState()
    const[Email, setEmail] = useState()
    const[AdmissionDate, setAdmissionDate] = useState()
    const[age, setAge] = useState(0)
    const[studyYear, setStudyYear] = useState()
    const[groupId, setGroupId] = useState()
    const[subgroupId, setSubgroupId] = useState()
    
    useEffect(() => {
        getStudent()
    }, [id])

    let { id } = useParams();

    async function edit(){
        var StudentId = Number(id)
        var Age = Number(age)
        var GroupId = Number(groupId)
        var SubgroupId = Number(subgroupId)
        var StudyYear = Number(studyYear)
        console.log("StudentId: " + typeof(StudentId) + " " + StudentId)
        console.log("Age: " + typeof(Age) + " " + Age)
        console.log("GroupId: " + typeof(GroupId) + " " + GroupId)
        console.log("SubgroupId: " + typeof(SubgroupId) + " " + SubgroupId)
        console.log("StudyYear: " + typeof(StudyYear) + " " + StudyYear)

        const request = await fetch('https://localhost:44364/api/student/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                Name,
                LastName,
                Birthday,
                AdmissionDate,
                Age,
                GroupId,
                SubgroupId,
                Login,
                Password,
                Email,
                StudyYear
            })
        })
        if(request.ok === true){

        }
    }

    async function getStudent(){
        try{
            const response= await fetch(`https://localhost:44364/api/student/Get/${id}`)

             const data = await response.json()
    
             if (response.ok === true) { 

               setStudent(data)
               setUserName(data.name) 
               setlastName(data.lastName)
               setPassword(data.password)
               setBirthday(data.birthday)
               setLogin(data.login)
               setEmail(data.email)
               setAdmissionDate(data.admissionDate)
               setAge(data.age)
               setStudyYear(data.studyYear)
               setGroupId(data.groupId)
               setSubgroupId(data.subgroupId)

             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }

    async function onSubmit(e){
        e.preventDefault();
        await edit()
    }
    function onChangeUserName(e){
        setUserName(e.target.value)
    }
    function onChangeLastName(e){
        setlastName(e.target.value)
    }
    function onChangePassword(e){
        setPassword(e.target.value)
    }
    function onChangeBirthday(e){
        setBirthday(e.target.value)
    }
    function onChangeAdmissionDate(e){
        setAdmissionDate(e.target.value)
    }
    function onChangeAge(e){
        setAge(e.target.value)
        var age = Number(age)
        console.log("age: " + typeof(age)) 
    }
    function onChangeStudyYear(e){
        setStudyYear(e.target.value)
    }
    function onChangeGroup(e){
        setGroupId(e.target.value)
    }
    function onChangessubgroupId(e){
        setSubgroupId(e.target.value)
    }
    function onChangeEmail(e){
        setEmail(e.target.value)
    }
    function onChangeLogin(e){
        setLogin(e.target.value)
    }
    function onClickAddImage(){
        window.location = `/admin/add-image/${id}`
    }


    return(
        <>
            <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Edit student: {student.name} {student.lastName} </h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit'>

                    <div className="container1">
                        <span className="span-text">UserName</span>
                        <div class="mb-3">
                            <input id="username" value={Name} onChange={e => onChangeUserName(e)} type="text" placeholder="Enter student usrname" required="required" title="Your username" />
                        </div>

                        <span className="span-text">lastName</span>
                        <div class="mb-3">
                            <input type="text" id="lastName" value={LastName} onChange={e => onChangeLastName(e)}  placeholder="Enter student lastName" required="required" title="Your username" />
                        </div>

                        <span className="span-text">Password</span>
                        <div class="mb-3">
                            <input id="password" value={Password} onChange={e => onChangePassword(e)} type="password"  placeholder="Enter student password" required="required" title="Your password" />
                        </div>
                 
                        <span className="span-text">Birthday</span>
                        <div class="mb-3">
                            <span class="datepicker-toggle">
                                <input required type="date" id="birthday"  data-date-format="DD MMMM YYYY" value={Birthday} onChange={e => onChangeBirthday(e)} />
                            </span>
                        </div>
                        <span className="span-text">Login</span>
                        <div class="mb-3">
                            <input required type="text" id="login_" value={Login} onChange={e => onChangeLogin(e)} />
                        </div>

                        <span className="span-text">Email</span>
                        <div class="mb-3">
                            <input required type="email" id="email" value={Email} onChange={e => onChangeEmail(e)} />
                        </div>
                    </div>
                   
                    <div className="container2">
                        <span className="span-text">Admission Date</span>
                        <div class="mb-3">
                            <span class="datepicker-toggle">
                                <input required type="date" id="admissionDate"  data-date-format="DD MMMM YYYY" value={AdmissionDate} onChange={e => onChangeAdmissionDate(e)} />
                            </span>
                        </div>

                        <span className="span-text">Age</span>
                        <div class="mb-3">
                            <input id="age" type="number" value={age} onChange={e => onChangeAge(e)}/>
                        </div>

                        <span className="span-text">Study year</span>
                        <div class="mb-3">
                            <input id="studyYear" type="number" value={studyYear} onChange={e => onChangeStudyYear(e)}/>
                        </div>

                        <span className="span-text">Group</span>
                        <div class="mb-3">
                            <input id="studyYear" type="number" value={groupId} onChange={e => onChangeGroup(e)}/>
                        </div>

                        <span className="span-text">Subgroup</span>
                        <div class="mb-3">
                            <input id="subgroupId" type="number" value={subgroupId} onChange={e => onChangessubgroupId(e)}/>
                        </div>
                        <button onClick={onClickAddImage} className="btn btn-primary">Edit imgage</button>
                        <button type="submit" className="btn__edit align-self-end">Edit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditFromStudent