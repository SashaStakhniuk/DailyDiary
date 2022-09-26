import React from "react"
import { useState, useEffect } from 'react'

function CreateNewStudyYear() {

    var yyyy = new Date().getFullYear();
    const [startYear, setStartYear] = useState(`${yyyy}-09-01`)
    const [finishYear, setFinishYear] = useState(`${yyyy + 1}-06-30`)
    const [yearsOfStudy, setYearsOfStudy] = useState(11)

    async function onSubmit(e) {
        e.preventDefault()
        await create()
    }
    function onYearsOfStudyChange(e) {
        setYearsOfStudy(e.target.value);
    }
    async function create() {
        console.log(
            startYear,
            finishYear,
            yearsOfStudy)
        const response = await fetch('https://localhost:44364/api/PlanEducation/NewPlanEducation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startYear,
                finishYear,
                yearsOfStudy
            })
        })
        if (response.ok != true) {
            const data = await response.text();
            alert(data)
        }
    }

    function onChangeStartYear(e) {
        setStartYear(e.target.value)
    }

    function onChangeFinishYear(e) {
        setFinishYear(e.target.value)
    }

    return (
        <>
            <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120 }} className="title-edit">Create new study year</h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column align-items-center'>
                    <div className="md-3">
                        <span className="span-text">Start Year</span>
                        <div className="mb-3">
                            <input id="date" data-date-format="DD MMMM YYYY" value={startYear} onChange={e => onChangeStartYear(e)} type="date" placeholder="Stary study year" title="stary study year" required />
                        </div>
                    </div>
                    <div className="md-3">
                        <span className="span-text">Finish Year</span>
                        <div className="mb-3">
                            <input id="date" data-date-format="DD MMMM YYYY" value={finishYear} onChange={e => onChangeFinishYear(e)} type="date" placeholder="Stary finish year" title="stary finish year" required />
                        </div>
                    </div>
                    <div className="md-12">
                        <span className="span-text">Amount of classes in this year:</span>
                        <div style={{ margin: "2%" }}>
                            <input type="number" min={1} max={100} id="input_classes_number" value={yearsOfStudy} onChange={(e) => onYearsOfStudyChange(e)} name="classesAmount" placeholder="Your choice" step={1} />
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