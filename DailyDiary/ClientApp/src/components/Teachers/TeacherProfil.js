import React from 'react'
import { useEffect, useState } from 'react'
import '../../styles/Students.css'
import { useParams } from "react-router-dom"
import NavigationBar from '../NavigationBar'
 
function TeacherProfil(){

    let { id } = useParams()
    const[teacher, setTeacher] = useState({})

    useEffect(() => {
        getTeacher()
    }, [id])

    async function getTeacher(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/Teacher/Get/${id}`)
            const data = await response.json()
            if(response.ok === true){
                setTeacher(data)
            }else{
                console.log('Error ', data)
            }
        }catch{}
    }

    return(
        <>
            <div id="all-container" className="all-container">
                <div className="card-group p-3 d-flex justify-content-center">
                    <NavigationBar/>
                    <div className="cart-student">
                        <div className="col-md-4">
                            {teacher.base64URL ? <img 
                                style={{ width: '120px', borderRadius: '25%', height: 'auto' }}
                                className="img-fluid " 
                                src={teacher.base64URL} alt="..."/> : <img 
                                style={{ width: '120px', borderRadius: '25%' }}
                                className="img-fluid rounded-start"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png" alt="..."/>
                            }
                        </div>
                        <div style={{ marginLeft: '10px' }} className="col-md-8 d-flex flex-column  align-items-center justify-content-center">
                            <div className="card-body">
                                <h5 className="card-title stud-text">{teacher.name} {teacher.lastName}</h5> 
                                
                            </div>
                        </div>        
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeacherProfil