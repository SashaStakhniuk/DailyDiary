import React from "react"
import { useState } from "react"
import NavigationBar from '../NavigationBar'
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import "../../styles/StudentProfil.css"

function StudentProfil(props){
    const [student, setStudent] = useState({})
    const [groups, setGroups] = useState([])
    let { id } = useParams();

    useEffect(() => {
         getStudent()
         getGroups()
    },[id])

    async function getStudent(){
        try{
            const response= await fetch(`https://localhost:44364/api/student/get/${id}`)

             const data = await response.json()
    
             if (response.ok === true) { 
                setStudent(data)
             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }

    async function getGroups() {
        try{
            const response= await fetch("https://localhost:44364/api/group/get")

             const data = await response.json()
    
             if (response.ok === true) {

                setGroups(data)

             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }

    async function Delete() {
        try{
            const response= await fetch(`https://localhost:44364/api/student/Delete/${id}`, {method: "delete"})

             const data = await response.json()
    
             if (response.ok === true) {
                 console.log("Deleted")
              
             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }

    function onClickEditButton(){
        window.location = `/edit-student/${id}`
    }
    
    function onClickDelete(){
        Delete()
        window.location = `/students/`
    }

    return(
        <>
            <div id="all-container" className="all-container">
                <div className="card-group p-3 d-flex justify-content-center">
                    <NavigationBar/>
                    <div className="cart-student">
<<<<<<< HEAD
                            <div className="col-md-4">
                            {student.base64URL ? <img 
                                style={{ width: '120px', borderRadius: '25%', height: 'auto' }}
                                className="img-fluid " 
                                src={student.base64URL} alt="..."/> : <img 
                                style={{ width: '120px', borderRadius: '25%' }}
                                className="img-fluid rounded-start"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png" alt="..."/>
                            }
=======
                            <div style={{ zIndex: '0' }} className="col-md-4">
                                {student.base64URL ? <img 
                                    style={{ width: '120px', borderRadius: '25%', height: 'auto' }}
                                    className="img-fluid " 
                                    src={student.base64URL} /> : <img 
                                    style={{ width: '120px', borderRadius: '25%' }}
                                    className="img-fluid rounded-start"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png" />
                                }
>>>>>>> ecd71480669503514892726ce84bed31585f47ac
                            </div>
                            <div className="col-md-8 d-flex flex-column  align-items-center justify-content-center">
                                <div className="card-body">
                                    <h5 className="card-title stud-text">{student.name} {student.lastName}</h5>
                                    {groups.map(group =>
                                        group.id === student.groupId?      
                                            <div className="card-text">   
                                                <p className="stud-text">{group.title}</p>
                                            </div>
                                            :
                                            <></>                           
                                        )} 
                                </div>
                                <div className="d-flex flex-row">
                                    <button style={{ marginRight: '7px', color: '#fff', borderRadius: '10%' }} onClick={onClickEditButton} className="button-edit">Edit</button>
                                    <button style={{ borderRadius: '10%', color: '#fff', backgroundColor: '#7d4852' }} onClick={onClickDelete} className="btn">Delete</button>
                                </div>
                            </div>                     
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentProfil