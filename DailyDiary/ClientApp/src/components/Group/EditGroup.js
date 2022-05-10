import React from "react"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EditGroup(){

    let { id } = useParams()
    const [group, setGroup] = useState({})
    const [groupId, setGroupId] = useState(id)
    const [title, setTitle] = useState("")
    const [subjects, setSubjects] = useState([])
    const [semester, setSemester] = useState(0)
    const [subjectsId, setSubjectsId] = useState([])
    const [hours, setHours] = useState([])

    useEffect(() => {
        getGroupById()
        GetSubgectsId()
    }, [groupId])

    useEffect(() => {
        getSubjects()
        getGroupById()
        GetSubgectsId()
    }, [])

    async function getSubjects(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/subject/get`)
            const data = await response.json()
            if(response.ok === true){
                setSubjects(data)
            }
        }catch{}
    }

    async function getGroupById(){
        try{
            var groupId = id
            const request = await fetch(`https://localhost:44364/api/group/get/${groupId}`)
            if(request.ok === true){
                const date = await request.json();
                setGroup(date)
                setGroupId(date.id)
                setTitle(date.title)
            }
        }catch{}
    }

    async function GetSubgectsId(){
        try{
            const request = await fetch(`https://localhost:44364/api/StudyPlan/GetSubgectsId/${groupId}`)
            if(request.ok === true){
                const date = await request.json();
                setSubjectsId(date.subjectsId)
                setHours(date.hours)
                setSemester(date.semester)
                defaultValueHours(date.subjectsId, date.hours)
            }
        }catch{ }
    }

    function defaultValueHours(dataSubjectsId, dataHours) {
        dataSubjectsId.forEach((id, i) => {
            dataHours.forEach((hour, j) => {
                if(i === j){
                    document.getElementById(`hours-subject-${id}`).value = hour
                }
            })
        })
    }

    async function edit(){
        var hours = []
        subjects.forEach(subject => {
            var input = document.getElementById(`hours-subject-${subject.id}`)
            var checkbox = document.getElementById(`ch_${subject.id}`)
            if(checkbox.checked){
                var hour = Number(input.value)
                hours.push(hour)
            }
        });
        var subjsId = []
        subjectsId.forEach((subj, i) => {
            subjsId.push(subj)
        })
        subjsId = subjsId.sort(function (a, b) {  return a - b;  });

        const response = await fetch('https://localhost:44364/api/Group/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId,
                title,
                semester,
                subjsId,
                hours
            })
        })
        if(response.ok === true){
            window.location = `/admin/edit-group/${groupId}`
        }
    }

    async function onSubmit(e){
        e.preventDefault()
        await edit()
    }

    function onChangeTitle(e){
        setTitle(e.target.value)
    }

    function onChangeSemester(e){
        setSemester(e.target.value)
    }

    async function oncChangeSubjectId(e, curState){
        var el = Number(e.target.value)
        var checkbox = document.getElementById(`ch_${el}`)
        var tem = curState
        if(checkbox.checked === true){
            tem.push(el)
            var input = document.getElementById(`hours-subject-${el}`)
            if(input.value === ""){
                input.classList.add("invalid")
            }
        } else if(checkbox.checked !== true) {
            tem.pop(el)
            var input = document.getElementById(`hours-subject-${el}`)
            input.classList.remove("invalid")
            document.getElementById(`hours-subject-${el}`).value = ''
        }
        tem = tem.sort(function (a, b) {  return a - b;  });
        setSubjectsId(tem)
    }

    function onChangeHour(e, subjId){
        var input = document.getElementById(`hours-subject-${subjId}`)
        if(input.value < 10){
            input.classList.add("invalid")
        }
        if(input.value < 0){
            input.classList.add("invalid")
        }
        if(input.value != null && input.value > 10 && input.value > 0) {
            input.classList.remove("invalid")
        }
    } 

    return(
        <>
            <div className="edit__container">
                
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Edit group: {group.title} </h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column justify-content-center align-items-center'>
                    <div className="mb-3">
                        <input style={{ width: '250px' }} type="text" id="title" value={title} onChange={e => onChangeTitle(e)} />
                    </div>
                    
                    <div className="mb-3">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Subgects
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className='w-100 d-flex flex-column align-items-center justify-content-start' style={{ margin: '14px 20px' }}>
                                        {subjects.map((subject, i) => {
                                            return(
                                                <>
                                                    <div className="d-flex flex-column">
                                                        <div className="d-flex flex-row w-100 align-items-center justify-content-center"> 
                                                            <input onChange={e => {
                                                                var arrId = []
                                                                subjectsId.forEach(subjId => {
                                                                    arrId.push(subjId)
                                                                })
                                                                oncChangeSubjectId(e, arrId)
                                                            }} checked={subjectsId.includes(subject.id) ? "checked" : ""} type="checkbox" id={`ch_${subject.id}`} value={subject.id} name="scales" />
                                                            <span>{subject.title}</span>
                                                        </div>
                                                        <input onChange={e => onChangeHour(e, subject.id)}
                                                            className='none' id={`hours-subject-${subject.id}`} type="number" placeholder={`hours for ${subject.title}`}/>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    <span className="span-text">Semester</span>
                    <div class="mb-3">
                        <input id="semestr" type="number" value={semester} onChange={onChangeSemester}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Edit</button>
                </form> 
            </div>
        </>
    )
}

export default EditGroup