import React from "react"
import '../../styles/Students.css'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import $ from 'jquery'
function EdmitFromTeaher(){

    let { id } = useParams()
    
    const[teacher, setTeacher] = useState({})
   
    const [specialty, setSpecialty] = useState("")
    const [category, setCategory] = useState("")
    const [degree, setDegree] = useState("")
    const [education, setEducation] = useState("")
    const [experience, setExperience] = useState(null)
    const [salary, setSalary] = useState(null)
    const [base64URL, setBase64Url] = useState(null)
    const [rate, setRate] = useState(null)

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

                setSpecialty(data.specialty)
                setCategory(data.category)
                setDegree(data.degree)
                setEducation(data.education)
                setExperience(data.experience)
                setSalary(data.salary)
                setBase64Url(data.base64URL)
                setRate(data.rate)

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

    }

    async function onSubmit(e){
        e.preventDefault()
        //await edit()
    }

    async function State(groypId){
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
    
    return(
        <>
            <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Edit teacher: {teacher.name} {teacher.lastName} </h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit'>
                    <div className="container1">
                    </div>
                    <div className="container2">

                        {groups.map((group, i) => {
                            return(
                                <>
                                    <label class="container">
                                        {group.title}
                                        <input defaultChecked={ State(group.id) ? "checked" : "" } type="checkbox"
                                        value={group.id}/>
                                        <span class="checkmark"></span>
                                    </label>
                                </>              
                            )
                        })}

                        <button onClick={onClickAddImage} className="btn btn-primary">Edit imgage</button>
                        <button type="submit" className="btn__edit align-self-end">Edit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EdmitFromTeaher