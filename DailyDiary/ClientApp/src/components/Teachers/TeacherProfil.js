import React from 'react'
import { useEffect, useState } from 'react'
// import '../../styles/Students.css'
import { useParams } from "react-router-dom"
import NavigationBar from '../NavigationBar'
import $ from 'jquery'
function TeacherProfil(){

    let { id } = useParams()
    const[teacher, setTeacher] = useState({})
    const[subgects, setSubgects] = useState([])
    const[groups, setGroups] = useState([])

    useEffect(() => {
        getTeacher()
        getSubgects()
        getGroups()
    }, [id])

    async function getGroups(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/Teacher/GetTeacherGroupsById/${id}`)
            const data = await response.json()
            if(response.ok === true){
                setGroups(data)
            }else{
                console.log('Error ', data)
            }

        }catch{}
    }

    async function getSubgects(){
        console.log("ID = " + id)
        try
        {
            const response = await fetch(`https://localhost:44364/api/Teacher/GetTeacherSubjectsById/${id}`)
            const data = await response.json()
            if(response.ok === true){
                setSubgects(data)
            }else{
                console.log('Error ', data)
            }

        }catch{}
    }
    
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

    async function onClickDelete(e){
        e.preventDefault()
        try{
            const response = await fetch(`https://localhost:44364/api/Teacher/Delete/${id}`)
            const data = await response.json()
            if(response.ok === true){
                window.location = '/admin/teachers'
            }else{
                console.log('Error ', data)
            }
        }catch{}
    }

    function onClickEditButton(){
        window.location = `/admin/edit-teacher/${id}`
    }
    
    var sendButton = function() {
    var button = $('.sendButton');
    button.on('click', function() {
        $(this).hide().html('Sending <span class="loading"></span>').fadeIn('fast');
        setTimeout( function() {
        button.hide().html('Message sent &#10003;').fadeIn('fast');
        }, 3000);
    });
    };
      
    function onClickSenpMessage(){
        var button = $('.sendButton');
        $('.sendButton').hide().html('Sending <span class="loading"></span>').fadeIn('fast');
        
        window.location = `/admin/send-for-teacher/${id}`
        
        setTimeout(() => {
            if(true){
                button.hide().html('Message sent &#10003;').fadeIn('fast');
            }
        }, 3500)
        
    }

    return(
        <>
            <div id="all-container" className="all-container">
                <div className="card-group p-3 d-flex justify-content-center">
                    <NavigationBar/>
                    <div className="cart-student">
                        <div className="image-cart-teacher">
                            {teacher.base64URL ? <img 
                                style={{ width: '120px', borderRadius: '25%', height: 'auto' }}
                                className="img-fluid " 
                                src={teacher.base64URL} alt="..."/> : <img 
                                style={{ width: '120px', borderRadius: '25%' }}
                                className="img-fluid rounded-start"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png" alt="..."/>
                            }
                        </div>
                        <div style={{ marginLeft: '-10px', padding: '10px' }} className="col-md-8 d-flex flex-column  align-items-center justify-content-center">
                            <div className="card-body">
                                <h4 style={{ color: 'black' }} className="title-block-text">{teacher.name} {teacher.lastName}</h4> 

                                <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                    <span style={{ marginRight: '10px' }}>Category</span>
                                    <span style={{ color: 'black' }}>{teacher.category}</span>
                                </div>

                                <div style={{ marginLeft: '10px', marginTop: '20px'  }}>
                                    <span style={{ marginRight: '10px' }}>Specialty</span>
                                    <span style={{ color: 'black' }}>{teacher.specialty}</span>
                                </div>

                                <div style={{ marginLeft: '10px', marginTop: '20px'  }}>
                                    <span style={{ marginRight: '10px' }}>Degree</span>
                                    <span style={{ color: 'black' }}>{teacher.degree}</span>
                                </div>
                                
                                <div style={{ marginLeft: '10px', marginTop: '20px'  }}>
                                    <span style={{ marginRight: '10px' }}>Education</span>
                                    <span style={{ color: 'black' }}>{teacher.education}</span>
                                </div>

                                <div style={{ marginLeft: '10px', marginTop: '20px'  }}>
                                    <span style={{ marginRight: '10px' }}>Experience</span>
                                    <span style={{ color: 'black' }}>{teacher.experience}</span>
                                </div>

                                <div style={{ marginLeft: '10px', marginTop: '20px'  }}>
                                    <span style={{ marginRight: '10px' }}>Salary</span>
                                    <span style={{ color: 'black' }}>{teacher.salary}</span>
                                </div>

                                <div style={{ marginLeft: '10px', marginTop: '20px'  }}>
                                    <span style={{ marginRight: '10px' }}>Rate</span>
                                    <span style={{ color: 'black' }}>{teacher.rate}</span>
                                </div>
                            </div>
                        </div>        
                    </div>
                    <div className="info-container">
                        <div>
                            <div className="cart-info-teacer">
                                <div className='header-title-block'>
                                    <span className="title-block">Subjects</span>
                                </div>
                                <div className="block-info">
                                    {subgects.map((subject, i) => {
                                        return(
                                            <>
                                                <div className="subject-title-box" key={i}>{subject.title}</div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="cart-info-teacer">
                                <div className='header-title-block'>
                                    <span className="title-block">Groups</span>
                                </div>
                                <div className="block-info">
                                    {groups.map((group, i) => {
                                        return(
                                            <>
                                                <div className="subject-title-box" key={i}>{group.title}</div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="container-buttons">
                            <button  onClick={onClickEditButton} className="button-edit">Edit</button>
                            <button style={{ borderRadius: '10%', color: '#fff', backgroundColor: '#7d4852' }} onClick={e => onClickDelete(e)} className="btn">Delete</button>
                            <button onClick={onClickSenpMessage} class="sendButton">Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeacherProfil