import React from 'react'
import { useState, useEffect } from 'react'
import '../../styles/Students.css'

function NewStudyPlan(){

    const [studyYears, setStudyYears] = useState([])
    const [subjectsdate, setSubjects] = useState([])
    const [title, setTitle] = useState("")
    const [Semester, setSemestr] = useState(1)

    useEffect(() => {
        getStudyYears()
        getSubjects()
    }, [])

    async function getStudyYears(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/PlanEducation/Get`)
            const data = await response.json()
            if(response.ok === true){
                setStudyYears(data)
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
        var studyYearsSt = document.getElementById('studyYears').value
        var studyYearId = Number(studyYearsSt)
        var semester = Number(Semester)
        var subjects = []
        var listHouts = []
        var currentStudyPlan = document.getElementById('currentStudyPlan').checked ? true : false
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
                title,
                semester,
                studyYearId,
                currentStudyPlan,
                listHouts,
                subjects,
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
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new study plan</h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column align-items-center justify-content-center'>
                    <div className="mb-3">
                        <select id='studyYears' className='date mb-3'>
                            {studyYears.map((studyYear, i) => {
                                return(
                                    <>
                                        <option key={i} value={studyYear.id}>{studyYear.title}</option>
                                    </>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input style={{ width: '250px' }} type="text" id="title" value={title} onChange={e => onChangeTitle(e)} placeholder="Enter title of study plan"/>
                    </div>                     
                    <div class="mb-3 d-flex flex-row m-3 p-3 align-items-center">
                        <input id="currentStudyPlan" type="checkbox" />
                        <span className="span-text">Current Study Plan</span>
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
                        <div className="mb-3">
                            <span className="span-text">Semester</span>
                            <div class="mb-3">
                                <input id="semestr" type="number" value={Semester} onChange={onChangeSemester}/>
                            </div>
                        </div>
                        <button className='btn btn-primary'>Create</button>
                </form>
            </div>
        </>
    )
}

export default NewStudyPlan