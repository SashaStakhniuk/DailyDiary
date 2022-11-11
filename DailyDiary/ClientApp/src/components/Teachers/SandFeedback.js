import React from "react"
// import '../../styles/Teachers.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavigationBar from "../NavigationBar"
import $ from 'jquery'
import { Host } from "../Host"

function SandFeedback(){

    let {studentId, teacherId, subjectId, studentName } = useParams()
    const [mainInformation, setMessage] = useState('')

    async function onSubmit(e){
        e.preventDefault()
        var button = $('.sendButton');
        $('.sendButton').hide().html('Sending <span class="loading"></span>').fadeIn('fast');
        await send()
    }

    async function send(){
        var dataPublication = new Date()
        var button = $('.sendButton');
        try{
            const response = await fetch(`${Host}/api/Teacher/SendFeedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dataPublication, 
                    mainInformation, 
                    subjectId, 
                    teacherId, 
                    studentId
                })
            })
            if(response.ok === true){
                setTimeout(() => {
                    if(true){
                        button.hide().html('Message sent &#10003;').fadeIn('fast');
                    }
                }, 900)
            } 
        }
        catch{}
        finally{
            ///window.location = '/teacher-page'
        }
    }

    function onChangeMessage(e){
        setMessage(e.target.value)
    }

    return(
        <>
            <div className="all-container">
                <NavigationBar />
                <form onSubmit={e => onSubmit(e)} className='form-edit'>
                    <div className="d-flex flex-column jusify-content-center align-items-center">
                        <span>Send feedback fro {studentName}</span>
                        <div className="d-flex flex-column m-3 p-2">
                            <div className="d-flex flex-column align-items-center">
                            <div className="mb-3 w-100 d-flex justify-content-center flex-column align-items-center">
                                <span className="span-text">Message</span>
                                <div className="mb-3">
                                    <textarea style={{ width: '400px' }} id="title" value={mainInformation} onChange={e => onChangeMessage(e)} type="text" placeholder="Enter message" title="Your message" />
                                </div>
                            </div>
                            <button style={{ width: '150px', height: '60px' }} type="submit" className="sendButton">Send</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SandFeedback