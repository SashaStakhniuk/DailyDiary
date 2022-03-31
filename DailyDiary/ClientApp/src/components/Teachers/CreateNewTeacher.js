import React from 'react'
import '../../styles/Students.css'
import { useState, useEffect } from "react"

function CreateNewTeacher(){

    const [categoryArr, setCategoryArr] = useState(["First category specialist", "Specialist"])
    const [specialtyArr, setSpecialtyArr] = useState(["Teacher"])
    const [degreeArr, setDegreeArr] = useState(["Master, PHP", "Master"])
    const [educationArr, setEducationArr] = useState(["Higher"])

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

    async function add(){

        var teacherId = 0

        var Category = document.getElementById('category').value
        var Specialty = document.getElementById('specialty').value
        var Degree = document.getElementById('degree').value
        var Education = document.getElementById('education').value
        const request = await fetch('https://localhost:44364/api/teacher/CreateNew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teacherId,
                name,
                lastName, 
                birthday,
                age, 
                Specialty,
                Category, 
                Degree,
                Education,
                experience,
                salary,
                rate,
                email
            })
        })
        if(request.ok === true){
            window.location = '/admin'
        }
    }

    async function onSubmit(e){
        e.preventDefault()
        await add()
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
    return(
        <>
             <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120, zIndex: '10'}} className="title-edit">Create new Student</h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit'>
                    <div className="container1">

                        <span className="span-text">Name</span>
                        <div class="mb-3">
                            <input id="username" value={name} onChange={e => onChangeName(e)} type="text" placeholder="Enter student usrname" required="required" title="Your username" />
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

                        <select type="select" id="specialty" onChange={e => onChangeSpecialty(e)}>
                            {specialtyArr.map((element, i) => {
                                return(
                                    <>
                                        <option key={i} selected={i == 0 ? "selected" : ""} value={element}>{element}</option>
                                    </>
                                )
                            })}
                        </select>

                        <select type="select" id="category" onChange={e => onChangeCategory(e)}>
                            {categoryArr.map((element, i) => {
                                return(
                                    <>
                                        <option key={i} selected={i == 0 ? "selected" : ""} value={element}>{element}</option>
                                    </>
                                )
                            })} 
                        </select>

                        <select type="select" id="degree" onChange={e => onChangeDegree(e)}>
                            {degreeArr.map((element, i) => {
                                return(
                                    <>
                                        <option key={i} selected={i == 0 ? "selected" : ""} value={element}>{element}</option>
                                    </>
                                )
                            })} 
                        </select>

                        <select type="select" id="education" onChange={e => onChangEeducation(e)}>
                            {educationArr.map((element, i) => {
                                return(
                                    <>
                                        <option key={i} selected={i == 0 ? "selected" : ""} value={element}>{element}</option>
                                    </>
                                )
                            })}
                        </select>
                        <button style={{ marginTop: '10px' }} type="submit" className="btn__edit">Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewTeacher