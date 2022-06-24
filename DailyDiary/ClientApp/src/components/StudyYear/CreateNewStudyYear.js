import React from "react"
import { useState, useEffect } from 'react'

function CreateNewStudyYear() {

    const [startYear, setStartYear] = useState(new Date())
    const [finishYea, setFinishYea] = useState(new Date())

    async function onSubmit(e) {
        e.preventDefault()
        await create()
    }

    async function create() {
        const request = await fetch('https://localhost:44364/api/PlanEducation/NewPlanEducation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startYear,
                finishYea
            })
        })
    } 

    function onChangeStartYear(e) {
        setStartYear(e.target.value)
    }

    function onChangeFinishYea(e) {
        setFinishYea(e.target.value)
    }

    return(
        <>
             <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new study year</h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column align-items-center'>
                    <div className="md-3">
                        <span className="span-text">Start Year</span>
                        <div className="mb-3">
                            <input id="date" data-date-format="DD MMMM YYYY" value={startYear} onChange={e => onChangeStartYear(e)} type="date" placeholder="Stary study year" title="stary study year" />
                        </div>
                    </div>
                    <div className="md-3">
                        <span className="span-text">Finish Year</span>
                        <div className="mb-3">
                            <input id="date" data-date-format="DD MMMM YYYY" value={finishYea} onChange={e => onChangeFinishYea(e)} type="date" placeholder="Stary finish year" title="stary finish year" />
                        </div>
                    </div>
                    <div className="md-3">
                        <button className="btn btn-primary" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewStudyYear