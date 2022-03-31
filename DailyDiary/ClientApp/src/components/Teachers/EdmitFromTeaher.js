import React from "react"
import '../../styles/Students.css'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import $ from 'jquery'
function EdmitFromTeaher(){

    let { id } = useParams()

    const [categoryArr, setCategoryArr] = useState(["First category specialist", "Specialist"])
    const [specialtyArr, setSpecialtyArr] = useState(["Teacher"])
    const [degreeArr, setDegreeArr] = useState(["Master, PHP", "Master"])
    const [educationArr, setEducationArr] = useState(["Higher"])
    
    const[teacher, setTeacher] = useState({})

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState(null)
    const [age, setAge] = useState(null)

    const [specialty, setSpecialty] = useState("")
    const [category, setCategory] = useState("")
    const [degree, setDegree] = useState("")
    const [education, setEducation] = useState("")
    const [experience, setExperience] = useState(null)
    const [salary, setSalary] = useState(null)
    const [rate, setRate] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState("")

    const [subjecs, setSubjects] = useState([])
    const [groups, setGroups] = useState([])
    const [groupCW, setGroupCW] = useState([])
    const [groupHW, setGroupHW] = useState([])

    useEffect(() => {
        getTeacher()
        GetAllGroups()
        GetAllSubjects()
    }, [id])

    async function getTeacher(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/Teacher/Get/${id}`)
            const data = await response.json()
            if(response.ok === true){
                setTeacher(data)

                setAge(data.age)
                setName(data.name)
                setLastName(data.lastName)
                setBirthday(data.birthday)
                setSpecialty(data.specialty)
                setCategory(data.category)
                setDegree(data.degree)
                setEducation(data.education)
                setExperience(data.experience)
                setSalary(data.salary)
                setRate(data.rate)
                setLogin(data.login)
                setPassword(data.password)
                setEmail(data.email)
            }else{
                console.log('Error ', data)
            }
        }catch{}
    }

    async function GetAllGroups(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/Teacher/GetAllGroups`)
            const data = await response.json()
            if(response.ok === true){
                setGroups(data)
            }else{
                console.log('Error ', data)
            }
        }catch{}
    }

    async function GetAllSubjects(){
        try{
            const response = await fetch(`https://localhost:44364/api/Teacher/GetAllSubjects`)
            const data = await response.json()
            if(response.ok === true){
                setSubjects(data)
            }else{
                console.log('Error ', data)
            }
        }catch{}
    }

    function onClickAddImage(){
        window.location = `/admin/add-image-teacher/${id}`
    }

    async function edit(){

        var teacherId = Number(id)
        var TeacherId = Number(teacherId)
        console.log("teacerId " + teacherId + " " + typeof(teacherId))
        console.log("name " + name + " " + typeof(name))
        console.log("lastName " + lastName + " " + typeof(lastName))
        console.log("Age " + age + " " + typeof(age))
        console.log("birthday " + birthday + " " + typeof(birthday))
        console.log("specialty " + specialty + " " + typeof(specialty))
        console.log("category " + category + " " + typeof(category))
        console.log("degree " + degree + " " + typeof(degree))
        console.log("education " + education + " " + typeof(education))
        console.log("salary " + salary + " " + typeof(salary))
        console.log("experience " + experience + " " + typeof(experience))
        console.log("email " + email + " " + typeof(email))
        console.log("rate " + rate + " " + typeof(rate))
        console.log("password " + password + " " + typeof(password))

        const request = await fetch('https://localhost:44364/api/teacher/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TeacherId,
                name,
                lastName, 
                birthday,
                age, 
                specialty,
                category, 
                degree,
                education,
                experience,
                salary,
                rate,
                login,
                email
            })
        })
        if(request.ok === true){
            window.location = '/admin'
        }
    }

    async function onSubmit(e){
        e.preventDefault()
        await edit()
    }

    async function StateGroup(groypId){
    }

    async function StateSubject(subjectId){
        //var subjectId = e.target.value
        const response = fetch(`https://localhost:44364/api/Teacher/SubjectsExizst/${id}/${subjectId}`, { method: "POST" })
        const data  = response.JSON()
        if(response.ok === true){
            console.log("response ok \n json: " + data + " " + subjectId)
            return data
        }
    }

    function onChangeName(e){
        setName(e.target.value)
    }
    function onChangeLastName(e){
        setLastName(e.target.value)
    }
    function onChangeAge(e){
        setAge(e.target.value)
    }
    function onChangeBirthday(e){
        setBirthday(e.target.value)
    }
    function onChangeEmail(e){
        setEmail(e.target.value)
    }
    function onChangeRate(e){
        setRate(e.target.value)
    }
    function onChangeSpecialty(e){
        var element = document.getElementById('specialty') 
        if(element.value == "Specialty"){
            console.log('Not choosed value')
        }else{
            setSpecialty(element.value)
        }
    }
    function onChangeCategory(e){
        setCategory(e.target.value)
    }
    function onChangeDegree(e){
        setDegree(e.target.value)
    }
    function onChangEeducation(e){
        setEducation(e.target.value)
    }
    function onChangeExperience(e){
        setExperience(e.target.value)
    }
    function onChangeSalary(e){
        setSalary(e.target.value)
    }
    function onChangeRate(e){
        setRate(e.target.value)
    }
    function onChangeLogin(e){
        setLogin(e.target.value)
    }

    return(
        <>
            <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Edit teacher: {teacher.name} {teacher.lastName} </h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit'>
                    <div className="container1">

                        <span className="span-text">Name</span>
                        <div class="mb-3">
                            <input id="username" value={name} onChange={e => onChangeName(e)} type="text" placeholder="Enter student usrname" required="required" title="Your username" />
                        </div>

                        <span className="span-text">Login</span>
                        <div class="mb-3">
                            <input id="username" value={login} onChange={e => onChangeLogin(e)} type="text" placeholder="Enter student usrname" required="required" title="Your username" />
                        </div>

                        <span className="span-text">Last name</span>
                        <div class="mb-3">
                            <input id="username" value={lastName} onChange={e => onChangeLastName(e)} type="text" placeholder="Enter teacer lastname" required="required" title="Your teacher lastname" />
                        </div>

                        <span className="span-text">Birthday</span>
                        <div class="mb-3">
                            <span class="datepicker-toggle">
                                <input required type="date" id="admissionDate"  data-date-format="DD MMMM YYYY" value={birthday} onChange={e => onChangeBirthday(e)} />
                            </span>
                        </div>

                        <span className="span-text">Age</span>
                        <div class="mb-3">
                            <input id="age" type="number" value={age} onChange={e => onChangeAge(e)}/>
                        </div>

                        <span className="span-text">Email</span>
                        <div class="mb-3">
                            <input id="username" value={email} onChange={e => onChangeEmail(e)} type="email" placeholder="Enter teacer lastname" required="required" title="Your teacher lastname" />
                        </div>

                        <span className="span-text">Experience</span>
                        <div class="mb-3">
                            <input id="age" type="number" value={experience} onChange={e => onChangeExperience(e)}/>
                        </div>

                        <span className="span-text">Salary</span>
                        <div class="mb-3">
                            <input id="age" type="number" value={salary} onChange={e => onChangeSalary(e)}/>
                        </div>

                        <span className="span-text">Rate</span>
                        <div class="mb-3">
                            <input id="age" type="number" value={rate} onChange={e => onChangeRate(e)}/>
                        </div>

                    </div>
                    <div className="container2">

                        <span className="span-text">Rate</span>
                        <div class="mb-3">
                            <input id="age" type="number" value={rate} onChange={e => onChangeRate(e)}/>
                        </div>

                        <select type="select" id="specialty" onChange={e => onChangeSpecialty(e)}>
                            {specialtyArr.map((element, i) => {
                                return(
                                    <>
                                        <option key={i} selected={specialty == element ? "selected": ""} value={element}>{element}</option>
                                    </>
                                )
                            })}
                        </select>

                        <select type="select" id="category" onChange={e => onChangeCategory(e)}>
                            {categoryArr.map((element, i) => {
                                return(
                                    <>
                                        <option key={i} selected={category == element ? "selected": ""} value={element}>{element}</option>
                                    </>
                                )
                            })} 
                        </select>

                        <select type="select" id="degree" onChange={e => onChangeDegree(e)}>
                            {degreeArr.map((element, i) => {
                                return(
                                    <>
                                        <option key={i} selected={degree == element ? "selected": ""} value={element}>{element}</option>
                                    </>
                                )
                            })} 
                        </select>

                        <select type="select" id="education" onChange={e => onChangEeducation(e)}>
                            {educationArr.map((element, i) => {
                                return(
                                    <>
                                        <option key={i} selected={education == element ? "selected": ""} value={element}>{element}</option>
                                    </>
                                )
                            })}
                        </select>

                        <div class="mb-3">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Subgects
                                    </button>
                                </h2>

                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div style={{ margin: '14px 20px' }}>
                                        {subjecs.map((subject, i) => {
                                            return(
                                                <>
                                                    <label key={i} class="container">
                                                        {subject.title}
                                                        <input type="checkbox"
                                                        checked={StateSubject(subject.id)} 
                                                        value={subject.id}/>
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="mb-3">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Groups
                                </button>

                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div style={{ margin: '14px 20px' }}>
                                        {groups.map((group, i) => {
                                            return(
                                                <>
                                                    <label class="container">
                                                        {group.title}
                                                        <input defaultChecked={ StateGroup(group.id) ? "checked" : "" } type="checkbox"
                                                        value={group.id}/>
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </>              
                                            )
                                        })}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                      
                        <button onClick={onClickAddImage} className="btn__edit">Edit imgage</button>
                        <button style={{ marginTop: '10px' }} type="submit" className="btn__edit">Edit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EdmitFromTeaher