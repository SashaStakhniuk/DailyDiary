import React from "react"
import '../../styles/Students.css'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import $ from 'jquery'
function EdmitFromTeaher(){

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
    const [base64URL, setBase64Url] = useState(null)
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
                setBase64Url(data.base64URL)
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
        var teacerId = Number(id)
        
    }

    async function onSubmit(e){
        e.preventDefault()
        await edit()
    }

    async function StateGroup(groypId){
        const request = await fetch(`https://localhost:44364/api/Teacher/GroupEzist/${id}/${groypId}`, {
            method: 'POST'
        })
        if(request.ok === true){
            const data = request.json()
            console.log("data: " + data)
            return false
        }else{
        }
    }

    async function StateSubgect(subgectId){

    }

    function onChangeName(e){
        setName(e.target.value)
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

                    </div>
                    <div className="container2">
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
                                                    <label class="container">
                                                        {subject.title}
                                                        <input defaultChecked={ StateSubgect(subject.id) ? "checked" : "" } type="checkbox"
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
                      
                        <button onClick={onClickAddImage} className="btn btn-primary">Edit imgage</button>
                        <button type="submit" className="btn__edit align-self-end">Edit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EdmitFromTeaher