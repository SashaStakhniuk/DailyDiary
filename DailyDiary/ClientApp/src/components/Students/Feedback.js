import React from "react"
import '../../styles/Students.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavigationBar from '../NavigationBar'

function Feedback(){

    let { id } = useParams()
    const [feedbacks, setfeedbacks] = useState([])
    const [loading, setLoading] = useState(true) 
    const [stateData, setStateData] = useState(true)
    const [feedbackSkip, setFeedbacksSkip] = useState(0)

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
                    axios.get(`https://localhost:44364/api/Student/GetRangStudentFeedbackById/${StudentId}/${feedbackSkip}`)
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
                    }).finally(() => setLoading(false))
                }, 100)
            }
        }
    }, [])

    useEffect(() => {

    }, [loading])


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
            <div id='all-container' className="cont">
                <NavigationBar />
                <div className='sub-all-container'>
                        <div className="heaber">

                        </div>
                        <div className='container-title'>
                            <p className='text-uppercase title'>FEEDBACK</p>
                        </div>
                        <div className="feedback-container">
                            {feedbacks.map((feedback, i) => {
                                    return(
                                        <>
                                            <div className="card-feedback">
                                                <div className="title-beedback">
                                                    <span>{feedback.teacherName}  {feedback.teacherLastName} {feedback.subjectTitle}</span>
                                                </div>
                                                <div className="main-info">
                                                    {feedback.mainInformation} 
                                                </div>
                                                <div className="data-info">
                                                    {new Date(feedback.dataPublication).toLocaleDateString()}
                                                </div>
                                                {feedback.isRed === true ? "" : <span id={'new-message'+i} className='new-message' >New!</span>}
                                            </div>
                                        </>
                                    )
                            })}
                            
                        </div>
                        {/* <div className='wraper'>
                            {feedbacks.map((feedback, i) => {
                                return(
                                    <>
                                        <div id={i} key={i} className="news-container">
                                            <div id="logo" className='logo'>
                                                {feedback.isRed === true ? "" : <span id={'new-message'+i} className='new-message' >New!</span>}
                                                <div className="d-flex flex-row jusify-content-center">
                                                    <div className="d-flex flex-column jusify-content-center">
                                                        {feedback.mainInformation}
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="date">
                                                {new Date(feedback.dataPublication).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}                          
                        </div> */}
                </div>
                <div id="loader-container" className='loader-container'>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </>
    )
}

export default Feedback