import React, { useState, useEffect } from "react"
import '../../styles/Students.css'
import { useSelector } from 'react-redux'

function CreateNewStudent(){ 

    //useSelector(state => state.groups)
    const [groups, setGroups] = useState([])

    const[name, setUserName] = useState("")
    const[lastName, setlastName] = useState("")
    const[Birthday, setBirthday] = useState()
    const[Email, setEmail] = useState()
    const[AdmissionDate, setAdmissionDate] = useState()
    const[Age, setAge] = useState(0)

    useEffect(() => {
        getAllGroups()
    }, [])

    async function getAllGroups(){
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

    async function add(){
        var age = Number(Age)
        var groupId = 0;
        groups.forEach(group => {
            var radio = document.getElementById(`ro_${group.id}`)
            if(radio.checked == true) {
                groupId = group.id
            }
        })
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
                AdmissionDate, 
                groupId, 
                Email
            })
        })
        if(request.ok === true){
            //window.location = '/admin'
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

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Group
                                    </button>
                                </h2>

                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className=' d-flex flex-column align-items-center justify-content-start' style={{ margin: '14px 20px', width: '100px' }}>
                                        {groups.map((group, i) => {
                                            return(
                                                <>
                                                    <div key={i} className="w-100 d-flex flex-column">
                                                        <div className="d-flex flex-row w-100 align-items-center justify-content-center"> 
                                                            <input style={{ marginRight: '5px' }} type="radio" id={`ro_${group.id}`} value={group.id} name="scales" placeholder={`hours for ${group.title}`}/>
                                                            <span>{group.title}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
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

                        <button type="submit" class="btn__edit align-self-end">Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewStudent