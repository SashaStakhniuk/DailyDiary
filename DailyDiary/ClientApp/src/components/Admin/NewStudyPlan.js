import React from 'react'
import { useState, useEffect } from 'react'
import '../../styles/Students.css'

function NewStudyPlan(){

    const [groups, setGroups] = useState([])
    const [subjectsdate, setSubjects] = useState([])
    const [title, setTitle] = useState("")
    const [Semester, setSemestr] = useState(1)

    useEffect(() => {
        getGroups()
        getSubjects()
    }, [])

    async function getGroups(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/Teacher/GetAllGroups`)
            const data = await response.json()
            if(response.ok === true){
                setGroups(data)
            }
        }catch{}
    }

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

    async function create(){
        var groupIdString = document.getElementById('groups').value
        var groupId = Number(groupIdString)
        var semester = Number(Semester)
        var subjects = []
        var listHouts = []
        subjectsdate.forEach(subj => {
            var checkbox = document.getElementById(`ch_${subj.id}`)
            var  hours_subject = document.getElementById(`hours-subject-${subj.id}`)
            
            if(checkbox.checked){
                var subjectID = Number(checkbox.value)
                subjects.push(subjectID); 
                var hour = Number(hours_subject.value)
                listHouts.push(hour)
            }
        })
        try
        {
            const request = await fetch('https://localhost:44364/api/studyplan/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId, 
                semester,
                listHouts,
                subjects,
                title
            })
        })
        if(request.ok === true){
                window.location = `/admin`
        }
        }catch {}
    }

    async function onSubmit(e){
        e.preventDefault()
        await create()
    }

    function onChangeSemester(e){
        setSemestr(e.target.value)
    }

    function onChangeTitle(e){
        setTitle(e.target.value)
    }

    return(
        <>  
            <div className="edit__container">
                <div style={{ position: "absolute", top: 120}} className='box-info'>
                    <span style={{ marginBottom: '8px', color: "red", visibility: 'hidden', opacity: '0' }} id="info-text">This study plan alredy exist</span>
                </div>
                <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column align-items-center'>
                    <h2 className="title-edit">Create new study plan</h2>
                    <select id='groups' className='date mb-3'>
                        {groups.map((group, i) => {
                            return(
                                <>
                                    <option key={i} value={group.id}>{group.title}</option>
                                </>
                            )
                        })}
                    </select>
                    <div className="mb-3">
                        <input style={{ width: '250px' }} type="text" id="title" value={title} onChange={e => onChangeTitle(e)} placeholder="Enter title of study plan"/>
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
                                        {subjectsdate.map((subject, i) => {
                                            return(
                                                <>
                                                <div  className="d-flex flex-column">
                                                    <div className="d-flex flex-row w-100 align-items-center justify-content-center"> 
                                                        <input style={{ marginRight: '5px' }} type="checkbox" id={`ch_${subject.id}`} value={subject.id} name="scales" placeholder={`hours for ${subject.title}`}/>
                                                        <span>{subject.title}</span>
                                                    </div>
                                                    <input className='none' id={`hours-subject-${subject.id}`} type="number"/>
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
                        <input id="semestr" type="number" value={Semester} onChange={onChangeSemester}/>
                    </div>
                    <button className='btn btn-primary'>Create</button>
                </form>
            </div>
        </>
    )
}

export default NewStudyPlan