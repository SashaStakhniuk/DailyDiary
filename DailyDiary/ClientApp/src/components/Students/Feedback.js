import React from "react"
// import '../../styles/Students.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
 import NavigationBar from '../NavigationBar'
import { Host } from "../Host"

function Feedback(){

    let { id } = useParams()
    const [feedbacks, setfeedbacks] = useState([])
    const [loading, setLoading] = useState(true) 
    const [stateData, setStateData] = useState(true)
    const [feedbackSkip, setFeedbacksSkip] = useState(0)

    useEffect(() => {
        isRead()
    }, [id])

    useEffect(() => {

        var loader_container = document.getElementById('loader-container')
        loader_container.style.visibility = 'hidden'
        loader_container.style.opacity = 0
        loader_container.style.height = '0px'
        if(loading){
            if(stateData){
                loader_container.style.visibility = 'visible'
                loader_container.style.opacity = 1
                loader_container.style.height = '100px' 
                var StudentId = id
                setTimeout(() => {
                    axios.get(`${Host}/api/Student/GetRangStudentFeedbackById/${StudentId}/${feedbackSkip}`)
                    .then(response => {
                        if(response.data == false){
                            setStateData(false)
                            loader_container.style.visibility = 'hidden'
                            loader_container.style.opacity = 0
                            loader_container.style.height = '0px'
                        } else {
                            setfeedbacks([...feedbacks, ...response.data])
                            setFeedbacksSkip(prevCourBlogs => prevCourBlogs +4)
                            loader_container.style.visibility = 'hidden'
                            loader_container.style.opacity = 0
                            loader_container.style.height = '0px'
                        }
                    }).finally(() => {
                      
                        setLoading(false)
                    })
                }, 100)
            }
        }
    }, [])

    useEffect(() => {
        var loader_container = document.getElementById('loader-container')
        loader_container.style.visibility = 'hidden'
        loader_container.style.opacity = 0
        loader_container.style.height = '0px'
        if(loading){
            if(stateData){
                loader_container.style.visibility = 'visible'
                loader_container.style.opacity = 1
                loader_container.style.height = '100px' 
                var StudentId = id
                setTimeout(() => {
                    axios.get(`${Host}/api/Student/GetRangStudentFeedbackById/${StudentId}/${feedbackSkip}`)
                    .then(response => {
                        if(response.data == false){
                            setStateData(false)
                            loader_container.style.visibility = 'hidden'
                            loader_container.style.opacity = 0
                            loader_container.style.height = '0px'
                        } else {
                            setfeedbacks([...feedbacks, ...response.data])
                            setFeedbacksSkip(prevCourBlogs => prevCourBlogs +4)
                            loader_container.style.visibility = 'hidden'
                            loader_container.style.opacity = 0
                            loader_container.style.height = '0px'
                            
                        }
                    }).finally(() => {
                        setTimeout(() => {
                          
                        }, 0)
                        setLoading(false)
                    })
                }, 100)
            }
        }
    }, [loading])

    async function isRead(){

        const response = await fetch(`${Host}/api/Student/IsReadAllStudentFeedbacks`, {
            method: "POST"
        })
        if(response.ok === true){
            //window.location = `/student/feedback/${id}`
        }
    }


    function scrollHendler(e){
        if(e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<100){
            setLoading(true)
        }
    }

    useState(() =>{
        document.addEventListener('scroll', scrollHendler)
        return function(){
            document.removeEventListener('scroll', scrollHendler)
        }
    }, [])

    return(
        <>
            <div id='all-container' className="all-container">
                <NavigationBar />
                <div className="heaber"></div>
                <div className='container-title'>
                    <p className='text-uppercase title'>FEEDBACK</p>
                </div>
                <div className="feedback-container">
                    {feedbacks.map((feedback, i) => {
                        return(
                            <>
                                <div className="card-feedback">
                                    <div className="title-beedback">
                                        <span>{feedback.teacherName} {feedback.teacherLastName}  ({feedback.subjectTitle})</span>
                                    </div>
                                    <div className="main-info">
                                        {feedback.mainInformation}
                                    </div>
                                    <div className="data-info">
                                        {new Date(feedback.dataPublication).toLocaleDateString()}
                                    </div>
                                    {feedback.isRed === false ? <span id={'new-message'+i} className='new-message' >New!</span>: ""}
                                </div>
                            </>
                        )
                    })
                    // : 
                    // <div className="card-notfound">
                    //     <span style={{fontSize: '23px', color: 'red'}}>No feedbacks yet</span>
                    // </div>
                }


                </div> 
                <div id="loader-container" className='loader-container'>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </>
    )
}

export default Feedback