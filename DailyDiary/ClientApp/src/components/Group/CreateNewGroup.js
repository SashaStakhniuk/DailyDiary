import React from 'react'
import { useState, useEffect } from 'react'
import NavigationBar from '../NavigationBar'

function CreateNewGroup(){
    
    const [title, setTitle] = useState("")
    const [students, setStudents] = useState([])
    const [currentCart, setCurrentCart] = useState(null)  

    useEffect(() => {
        getStudents()
    }, [])

    async function getStudents(){
        try {
            const response= await fetch('https://localhost:44364/api/student/get')
                const data = await response.json()
                if (response.ok === true) {
                    setStudents(data)
                } else {
                    console.log("error",data)
                }
            }
        catch{}
    }

    async function create(){
        var id = 0
        var studentsId = []

        students.forEach(student => {
            var checkbox = document.getElementById(`ch_${student.studentId}`)
            if(checkbox) {
                if(checkbox.checked){
                    var studentId = Number(checkbox.value)
                    studentsId.push(studentId); 
                }
            }
        })
        try{
            const response = await fetch('https://localhost:44364/api/Group/Create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    title,
                    studentsId
                })
            })
            if(response.ok === true){
                window.location = `/admin/groups`
            }

        }catch {}
    }

    async function onSubmit(e){
        e.preventDefault()
        await create()
    }

    function onChangeTitle(e){
        setTitle(e.target.value)
    }

    async function getStudentByLastName(lastName){
        if(lastName == ""){
            await getStudents()
        } else {
            try{
                const response= await fetch(`https://localhost:44364/api/student/GetByName/${lastName}`)
    
                 const data = await response.json()
        
                 if (response.ok === true) {

                    setStudents(data)

                 } else {
                     console.log("error",data)
                 }
                }
            catch{}
        }
    }

    async function onChangeHendler(){
        var input = document.getElementById('lastName') 
        await getStudentByLastName(input.value)
    }

    function onClickStudentCart(e, studentId) {
        var studentCart = document.getElementById(`student-${studentId}`)
        var checkbox = document.getElementById(`ch_${studentId}`)
        var fio_container = document.getElementById(`fio-container-${studentId}`)

        if(checkbox.checked === true) {
            checkbox.checked = false
            studentCart.style.backgroundColor = '#fff'
            studentCart.style.color = '#000'
            fio_container.style.color = '#000'
            fio_container.style.backgroundColor = '#fff'
        } else if(checkbox.checked === false) {
            checkbox.checked = true
            studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
            studentCart.style.color = '#fff'
            fio_container.style.color = '#fff'
            fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
        }
    }

    function onDragStartHandler(e, student) {
        setCurrentCart(student)
        var studentCart = document.getElementById(`student-${student.studentId}`)
        var checkbox = document.getElementById(`ch_${student.studentId}`)
        var fio_container = document.getElementById(`fio-container-${student.studentId}`)
        if(checkbox.checked === true) {
            fio_container.style.color = '#fff'
            fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
            studentCart.style.color = '#fff'
            studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
        } else if(checkbox.checked === false) {
            studentCart.style.backgroundColor = '#fff'
            studentCart.style.color = '#000'
            fio_container.style.backgroundColor = '#fff'
            fio_container.style.color = '#000'
        }
    }

    function onDragLeaveHandler(e, student) {
        e.target.style.backgroundColor = '#fff'
        var studentCart = document.getElementById(`student-${student.studentId}`)
        var checkbox = document.getElementById(`ch_${student.studentId}`)
        var fio_container = document.getElementById(`fio-container-${student.studentId}`)
        if(checkbox.checked === true) {
            fio_container.style.color = '#fff'
            fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
            studentCart.style.color = '#fff'
            studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
        } else if(checkbox.checked === false) {
            studentCart.style.backgroundColor = '#fff'
            studentCart.style.color = '#000'
            fio_container.style.backgroundColor = '#fff'
            fio_container.style.color = '#000'
        }
    }

    function onDragEndHandler(e, student) {
        var studentCart = document.getElementById(`student-${student.studentId}`)
        var checkbox = document.getElementById(`ch_${student.studentId}`)
        var fio_container = document.getElementById(`fio-container-${student.studentId}`)
        if(checkbox.checked === true) {
            fio_container.style.color = '#fff'
            fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
            studentCart.style.color = '#fff'
            studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
        } else if(checkbox.checked === false) {
            studentCart.style.backgroundColor = '#fff'
            studentCart.style.color = '#000'
            fio_container.style.backgroundColor = '#fff'
            fio_container.style.color = '#000'
        }
    }

    function onDragOverHandler(e, student) {
        e.preventDefault()
        var fio_container = document.getElementById(`fio-container-${student.studentId}`)
        e.target.style.backgroundColor = 'lightgray'
        fio_container.style.backgroundColor = 'lightgray'
    }

    function onDropHandler(e, student) {
        e.preventDefault()
        setStudents(students.map((stud) => {
            if(stud.studentId === student.studentId) {
                return {...stud, order: currentCart.order}
            }
            if(stud.studentId === currentCart.studentId) { 
                return {...stud, order: student.order}
            }
            return stud
        }))
       
        var checkboxCourrentStudent = document.getElementById(`ch_${currentCart.studentId}`)
        var checkboxStudent = document.getElementById(`ch_${student.studentId}`)
        
        if(checkboxStudent.checked === true && checkboxCourrentStudent.checked === true){
            checkboxCourrentStudent.checked = true
            checkboxStudent.checked = false
        } else {
            checkboxCourrentStudent.checked = false
        }
        if(checkboxStudent.checked === false && checkboxCourrentStudent.checked === false){
            checkboxCourrentStudent.checked = false
            checkboxStudent.checked = false
        } 
        var studentCart = document.getElementById(`student-${student.studentId}`)
        var fio_container = document.getElementById(`fio-container-${student.studentId}`)
        if(checkboxStudent.checked === true) {
            checkboxStudent.checked = false
            studentCart.style.backgroundColor = '#fff'
            studentCart.style.color = '#000'
            fio_container.style.backgroundColor = '#fff'
            fio_container.style.color = '#000'
        } else if(checkboxStudent.checked === false) {
            checkboxStudent.checked = true
            fio_container.style.color = '#fff'
            fio_container.style.backgroundColor = 'rgb(18, 235, 235)'
            studentCart.style.color = '#fff'
            studentCart.style.backgroundColor = 'rgb(18, 235, 235)'
        }
    }

    const sortCards = (a, b) => {
        if(a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return(
        <>
        <div className="edit__container">
                <NavigationBar/>
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new Group</h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column'>
                    <div className="mb-3">
                        <input id="title" type="text" value={title} onChange={onChangeTitle} placeholder="Enter group title" required="required"/>
                    </div>
                    <div className='mb-3'>
                        <div className="stud-container">
                            <div className=''>
                                <input onChange={onChangeHendler} id="lastName" type="lastName" placeholder="Enter student lastNamr" title="Your username" />
                            </div>
                            <div className='sub-stud-container'>
                                {students.sort(sortCards).map((student, i) =>   {
                                    if(student.groupId === null) {
                                        return(  
                                            <>
                                                <div
                                                    draggable={true} 
                                                    onDragStart={e => onDragStartHandler(e, student)}
                                                    onDragLeave={e => onDragLeaveHandler(e, student)}
                                                    onDragEnd={e => onDragEndHandler(e, student)}
                                                    onDragOver={e => onDragOverHandler(e, student)}
                                                    onDrop={e => onDropHandler(e, student)}
                                                    onClick={e => onClickStudentCart(e, student.studentId)} id={`student-${student.studentId}`} className='stud-cart' >
                                                    <input style={{ display: 'none', visibility: 'hidden', opacity: '0' }} value={student.studentId} id={`ch_${student.studentId}`} type='checkbox'/>
                                                    <div style={{ padding: '9px' }} id={`fio-container-${student.studentId}`} className='fio-container'>
                                                        {student.name} {student.lastName} {student.age} year
                                                    </div>
                                                </div>
                                            </>
                                        ) 
                                    }
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn">Create</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewGroup