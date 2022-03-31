import React from "react"
import { useState } from 'react'
import '../../styles/Students.css'

function CartStudent(props){

    function onClick(id) {
        window.location = `/student/${id}`
    }

    return(
        <>
            <div onClick={() => onClick(props.infoStudent.studentId)} style={{  height: '150px', cursor: 'pointer' }}  className="cart-student">
                <div className="col-md-4">
                    {props.infoStudent.base64URL ? <img 
                        style={{ width: '120px', borderRadius: '25%', height: 'auto' }}
                        className="img-fluid " 
                        src={props.infoStudent.base64URL} /> : <img 
                        style={{ width: '120px', borderRadius: '25%' }}
                        className="img-fluid rounded-start"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png" />
                    }
                </div>
                <div style={{ marginLeft: '10px' }} className="col-md-8 d-flex flex-column  align-items-center justify-content-center">
                    <div className="card-body">
                        <h5 className="card-title stud-text">{props.infoStudent.name} {props.infoStudent.lastName}</h5>
                        {props.dataGroups.map(group=>
                            group.id===props.infoStudent.groupId?      
                                <div className="card-text">   
                                    <p className="stud-text">{group.title}</p>
                                </div>
                                :
                                <></>                           
                            )} 
                    </div>
                </div>                   
            </div>
        </>
    )
}

export default CartStudent

