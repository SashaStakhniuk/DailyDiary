import React, { useState, useEffect } from "react"
// import '../../styles/Students.css'
import { useSelector } from 'react-redux'
import { Host } from "../Host"

function CreateNewStudent(){ 

    //useSelector(state => state.groups)
    const [groups, setGroups] = useState([])
    const [errors, setErrors] = useState([])

    const[name, setUserName] = useState("SomeStudentName")
    const[middleName, setMiddleName] = useState("SomeStudentMiddleName")
    const[lastName, setLastName] = useState("SomeStudentLastName")
    const[phoneNumber, setPhoneNumber] = useState("+380985655355")
    const[Birthday, setBirthday] = useState("2000.09.01")
    const[Email, setEmail] = useState("someStudent@gmail.com")
    const[AdmissionDate, setAdmissionDate] = useState("2022.09.01")

    useEffect(() => {
        getAllGroups()
    }, [])

    async function getAllGroups(){
        try
        {
            const response = await fetch(`${Host}/api/group/get`)
            const data = await response.json()
            if(response.ok === true){
                setGroups(data)
            }else{
                console.log('Error ', data)
            }
        }catch{}
    }

    async function add(){
        var groupId = 0;
        groups.forEach(group => {
            var radio = document.getElementById(`ro_${group.id}`)
            if(radio.checked == true) {
                groupId = group.id
            }
        })
        const response  = await fetch(`${Host}/api/student/CreateNew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                middleName, 
                lastName, 
                Birthday,
                AdmissionDate, 
                Email,
                phoneNumber
            })
        })
        if(response.ok === true){
            //window.location = '/admin'
            window.alert("Student was created");

        }
        else{
            var data = await response.json();
           // console.log(data)
            if(data.errors!==undefined){
                for (var key in data.errors) {
                    console.log(data.errors[key]);
                    //setErrors(errors => [...errors, <div><h2 style={{color: "red"}}>{data.errors[key]}</h2></div>]);
                    // errors.map((error) =>
                    // <div><h2 style={{color: "red"}}>{error[0]}</h2></div>)
                }
            }
            if(data.error !== undefined){
                window.alert(data.error);
            }
            else{
                console.log(response.errorText);
             console.log("Error feching data")
            }
        }
    }

    async function onSubmit(e){
        e.preventDefault();
        await add()
    }

    function onChangeUserName(e){
        setUserName(e.target.value)
    }
    function onChangeMiddleName(e){
        setMiddleName(e.target.value)
    }
    function onChangeLastName(e){
        setLastName(e.target.value)
    }

    function onChangeBirthday(e){
        setBirthday(e.target.value)
    }

    function onChangeAdmissionDate(e){
        setAdmissionDate(e.target.value)
    }

    function onChangeEmail(e){
        setEmail(e.target.value)
    }

    function onChangePhoneNuumber(e){
        setPhoneNumber(e.target.value)
    }

    return(
        <>
            <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new Student</h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit'>

                    <div className="container1">
                        <span className="span-text">FirstName</span>
                        <div className="mb-3">
                            <input id="username" value={name} onChange={e => onChangeUserName(e)} type="text" placeholder="Enter student username" title="Your username" required />
                        </div>
                        <span className="span-text">MiddleName</span>
                        <div className="mb-3">
                            <input id="middlename" value={middleName} onChange={e => onChangeMiddleName(e)} type="text" placeholder="Enter student middlename" title="Your middlename" />
                        </div>
                        <span className="span-text">LastName</span>
                        <div className="mb-3">
                            <input type="text" id="lastName" value={lastName} onChange={e => onChangeLastName(e)}  placeholder="Enter student lastName" title="Your lastname" required />
                        </div>

                        <span className="span-text">Birthday</span>
                        <div className="mb-3">
                            <span className="datepicker-toggle">
                                <input type="date" id="birthday"  data-date-format="DD MMMM YYYY" defaultValue={Birthday} onChange={e => onChangeBirthday(e)} required />
                            </span>
                        </div>

                        <span className="span-text">Email</span>
                        <div className="mb-3">
                            <input type="email" id="email" defaultValue={Email} onChange={e => onChangeEmail(e)} required/>
                        </div>
                    </div>

                    <div className="container2">
                        <div className='mb-3'>
                            <span className="span-text">Phone Number</span>
                            <div className="mb-3">
                                <input type="phone" id="phone" defaultValue={phoneNumber} onChange={e => onChangePhoneNuumber(e)} required/>
                            </div>
                        </div>
                        <div className='mb-3'>

                            {/* <div className="accordion-item">
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
                                                            <input style={{ marginRight: '5px' }} type="radio" id={`ro_${group.id}`} value={group.id} name="scales" placeholder={`hours for ${group.title}`} required/>
                                                            <span>{group.title}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div> 
                            </div> */}
                        </div>
                        <span className="span-text">Admission Date</span>
                        <div className="mb-3">
                            <span className="datepicker-toggle">
                                <input type="date" id="admissionDate" defaultValue={AdmissionDate} onChange={e => onChangeAdmissionDate(e)} required />
                            </span>
                        </div>

                        {errors}

                        <button type="submit" className="btn__edit align-self-end">Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewStudent