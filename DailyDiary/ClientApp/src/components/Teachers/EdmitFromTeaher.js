import React from "react"
// import '../../styles/Students.css'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import $ from 'jquery'
function EdmitFromTeaher(){

    const [dataSpecialty, setDayaSpecialty] = useState(["Teacher", "Pro Teacher"])
    const [dataCategory, setDataCategory] = useState(["Specialist", "First category specialist"])
    const [dataDegree, setDatDegree] = useState(["Master", "Profesional PHP"])
    const [dataEducation, setDataEducation] = useState(["Higher"])

    let { id } = useParams()
    
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
                setEmail(data.email)
                console.log(data.login)
                console.log(data.birthday)
                        
            }else{
                console.log('Error ', data)
            }
        }catch{}
    }

    async function GetAllGroups(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/group/get`)
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
        const response = await fetch('https://localhost:44364/api/Teacher/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id, 
                name,
                lastName,
                age,
                birthday,
                specialty,
                category,
                degree,
                education,
                experience,
                salary,
                rate,
                email,
                login
            })
            
        })
        const data = await response.json()
        if(response.ok === true){
            console.log("Sexesfuly: " + data)
        } else { 
            console.log("Error: " + data)
        }
    }

    async function onSubmit(e){
        e.preventDefault()
        await edit()
    }
    
    function onChangeName(e){
        setName(e.target.value)
    }

    function onChangelastName(e){
        setLastName(e.target.value)
    }

    function onChangeSpecialty(e){
        setSpecialty(e.target.value)
    }

    function onChangeCategory(e){
        setCategory(e.target.value)
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

    function onChangeLogin(e){
        setLogin(e.target.value)
    }

    function onChangeDegree(e){
        setDegree(e.target.value)
    }

    function onChangeEducation(e){
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

    async function onClickCreateLogin(){
        const response = await fetch(`https://localhost:44364/api/Teacher/CreateLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                name,
            })
        })
    }
    
    return(
        <>
            <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Edit teacher: {teacher.name} {teacher.lastName} </h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit'>
                    <div className="container1">

                        <span className="span-text">Name</span>
                        <div class="mb-3">
                            <input id="username" value={name} onChange={e => onChangeName(e)} type="text" placeholder="Enter teacher usrname" required="required" title="Your username" />
                        </div>

                        <span className="span-text">Last name</span>
                        <div className="mb-3">
                            <input id="username" value={lastName} onChange={e => onChangelastName(e)} type="text" placeholder="Enter teacher last name" title=" " />
                        </div>

                        <span className="span-text">Age</span>
                        <div className="mb-3">
                            <input id="number" value={age} onChange={e => onChangeAge(e)} type="number" placeholder="Enter teacher birthday" title="" />
                        </div>

                        <span className="span-text">Birthday</span>
                        <div className="mb-3">
                            <input id="date" data-date-format="DD MMMM YYYY" defaultValue={birthday} value={birthday} onChange={e => onChangeBirthday(e)} type="date" placeholder="Enter teacher birthday" title="teacher birthday" />
                        </div>

                        <span className="span-text">Email</span>
                        <div className="mb-3">
                            <input id="username" value={email} onChange={e => onChangeEmail(e)} type="email" placeholder="Enter teacher email" title="" />
                        </div>

                        <span className="span-text">Specialty</span>
                        <select onChange={e => onChangeSpecialty(e)} type="date" id="dataSpecialty" className="dataSpecialty">
                            {dataSpecialty.map((specialtyValue, i) => {
                                return(
                                    <>
                                        <option key={i} value={specialtyValue} selected={specialty.includes(specialtyValue) ? "selected" : ""}>{specialtyValue}</option>
                                    </>
                                )
                            })}
                        </select >

                    </div>
                    <div className="container2">

                        <span className="span-text">Login</span>
                        <div className="mb-3">
                            {login 
                                ? 
                                    <input id="number" value={login} onChange={e => onChangeLogin(e)} type="text" placeholder="Enter teacher login" required="required" title="Your login" />
                                :
                                    <a onClick={onClickCreateLogin} className="btn btn-primary">Create random</a>
                            }
                        </div>

                        <span className="span-text">Category</span>
                        <select onChange={e => onChangeCategory(e)} type="date" id="dataCategory" className="dataCategory">
                            {dataCategory.map((categoryValue, i) => {
                                return(
                                    <>
                                        <option key={i} value={categoryValue} selected={category.includes(categoryValue) ? "selected" : ""}>{categoryValue}</option>
                                    </>
                                )
                            })}
                        </select >

                        <span className="span-text">Degree</span>
                        <select onChange={e => onChangeDegree(e)} type="date" id="datadergee" className="datadergee">
                            {dataDegree.map((degreeValue, i) => {
                                return(
                                    <>
                                        <option key={i} value={degreeValue} selected={degree.includes(degreeValue) ? "selected" : ""}>{degreeValue}</option>
                                    </>
                                )
                            })}
                        </select>

                        <span className="span-text">Education</span>
                        <select onChange={e => onChangeEducation(e)} type="date" id="dataEducation" className="dataEducation">
                            {dataEducation.map((educationValue, i) => {
                                return(
                                    <>
                                        <option key={i} value={educationValue} selected={education.includes(educationValue) ? "selected" : ""}>{educationValue}</option>
                                    </>
                                )
                            })}
                        </select >

                        <span className="span-text">Experience</span>
                        <div className="mb-3">
                            <input id="number" value={experience} onChange={e => onChangeExperience(e)} type="number" placeholder="Enter teacher experience" title="" />
                        </div>

                        <span className="span-text">Salary</span>
                        <div className="mb-3">
                            <input id="number" value={salary} onChange={e => onChangeSalary(e)} type="number" placeholder="Enter teacher salary" title="" />
                        </div>

                        <span className="span-text">Rate</span>
                        <div className="mb-3">
                            <input id="number" value={rate} onChange={e => onChangeRate(e)} type="number" placeholder="Enter teacher rate" title="" />
                        </div>

                        <div className="mb-3">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Subgects
                                    </button>
                                </h2>

                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div style={{ margin: '14px 20px' }}>
                                        {subjecs.map((subject, i) => {
                                            return(
                                                <>
                                                    <label className="container">
                                                        {subject.title}
                                                        <input 
                                                        value={subject.id}/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="mb-3">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Groups
                                </button>

                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div style={{ margin: '14px 20px' }}>
                                        {groups.map((group, i) => {
                                            return(
                                                <>
                                                    <label className="container">
                                                        {group.title}
                                                        <input type="checkbox"
                                                        value={group.id}/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </>              
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                        <button onClick={onClickAddImage} className="btn btn-primary">Edit imgage</button>
                        <button type="submit" className="btn__edit align-self-end">Edit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EdmitFromTeaher