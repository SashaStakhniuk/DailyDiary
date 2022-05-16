import React, { useState } from "react"
import '../../styles/Students.css'
import { useSelector } from 'react-redux'

function CreateNewStudent(){ 

    const [groups, setGroups] = useState(useSelector(state => state.groups))
    const[name, setUserName] = useState("")
    const[lastName, setlastName] = useState("")
    const[Birthday, setBirthday] = useState()
    const[Email, setEmail] = useState()
    const[AdmissionDate, setAdmissionDate] = useState()
    const[Age, setAge] = useState(0)
    const[StudyYear, setStudyYear] = useState(0)
    const[GroupId, setGroupId] = useState(0)
    const[SubgroupId, setSubgroupId] = useState(0)

    async function add(){
        var age = Number(Age)
        var groupId = Number(GroupId)
        var studyYear = Number(StudyYear)
        var subgroupId = Number(SubgroupId)
        
        const request = await fetch('https://localhost:44364/api/student/CreateNew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                lastName, 
                Birthday,
                age, 
                studyYear, 
                AdmissionDate, 
                groupId, 
                subgroupId, 
                Email
            })
        })
        if(request.ok === true){
            window.location = '/admin'
        }
        else{

            console.log("Error feching data")
        }
    }

    async function onSubmit(e){
        e.preventDefault();
        await add()
    }

    function onChangeUserName(e){
        setUserName(e.target.value)
    }

    function onChangeLastName(e){
        setlastName(e.target.value)
    }

    function onChangeBirthday(e){
        setBirthday(e.target.value)
    }

    function onChangeAdmissionDate(e){
        setAdmissionDate(e.target.value)
    }

    function onChangeAge(e){
        setAge(e.target.value)
    }

    function onChangeStudyYear(e){
        setStudyYear(e.target.value)
    }

    function onChangeGroup(e){
        setGroupId(e.target.value)
    }

    function onChangessubgroupId(e){
        setSubgroupId(e.target.value)
    }

    function onChangeEmail(e){
        setEmail(e.target.value)
    }

    return(
        <>
            <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new Student</h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit'>

                    <div className="container1">
                        <span className="span-text">UserName</span>
                        <div class="mb-3">
                            <input id="username" value={name} onChange={e => onChangeUserName(e)} type="text" placeholder="Enter student usrname" title="Your username" />
                        </div>
                        
                        <span className="span-text">lastName</span>
                        <div class="mb-3">
                            <input type="text" id="lastName" value={lastName} onChange={e => onChangeLastName(e)}  placeholder="Enter student lastName" title="Your username" />
                        </div>

                        <span className="span-text">Birthday</span>
                        <div class="mb-3">
                            <span class="datepicker-toggle">
                                <input type="date" id="birthday"  data-date-format="DD MMMM YYYY" value={Birthday} onChange={e => onChangeBirthday(e)} />
                            </span>
                        </div>

                        <span className="span-text">Email</span>
                        <div class="mb-3">
                            <input type="email" id="email" value={Email} onChange={e => onChangeEmail(e)} />
                        </div>
                    </div>

                    <div className="container2">
                        <div className='mb-3'>
                            <div className="stud-container">
                                <div className='sub-stud-container'>
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
                        <span className="span-text">Admission Date</span>
                        <div class="mb-3">
                            <span class="datepicker-toggle">
                                <input type="date" id="admissionDate"  data-date-format="DD MMMM YYYY" value={AdmissionDate} onChange={e => onChangeAdmissionDate(e)} />
                            </span>
                        </div>

                        <span className="span-text">Age</span>
                        <div class="mb-3">
                            <input id="age" type="number" value={Age} onChange={onChangeAge}/>
                        </div>

                        <span className="span-text">Study year</span>
                        <div class="mb-3">
                            <input id="studyYear" type="number" value={StudyYear} onChange={e => onChangeStudyYear(e)}/>
                        </div>

                        <span className="span-text">Group</span>
                        <div class="mb-3">
                            <input id="studyYear" type="number" value={GroupId} onChange={e => onChangeGroup(e)}/>
                        </div>

                        <span className="span-text">Subgroup</span>
                        <div class="mb-3">
                            <input id="subgroupId" type="number" value={SubgroupId} onChange={e => onChangessubgroupId(e)}/>
                        </div>

                        <button type="submit" class="btn__edit align-self-end">Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewStudent