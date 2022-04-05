import React from 'react'
import { useState, useEffect } from 'react'
import '../../styles/Teachers.css'
import NavigationBar from '../NavigationBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function NewsPage(){

    let { id } = useParams()
    const [stateData, setStateData] = useState(true)
    const [newsSkip, setNewsSkip] = useState(0)
    const [loading, setLoading] = useState(true) 
    const [news, setNews] = useState([])

    useEffect(() => {
        var loader_container = document.getElementById('loader-container')

        if(loading){
            if(stateData){
                loader_container.style.visibility = 'visible'
                loader_container.style.opacity = 1
                loader_container.style.height = '100px' 
                
                axios.get(`https://localhost:44364/api/News/GetRangTeacherNewssById/${id}/${newsSkip}`)
                    .then(response => {
                        if(response.data == false){
                            setStateData(false)
                            loader_container.style.visibility = 'hidden'
                            loader_container.style.opacity = 0
                            loader_container.style.height = '0px'
                        } else {
                            setNews([...news, ...response.data])
                            setNewsSkip(prevCourBlogs => prevCourBlogs +5)
                        }
                    }).finally(() => setLoading(false))
            }
        }
    }, [])

    useEffect(() => {
        var loader_container = document.getElementById('loader-container')

        if(loading){
            if(stateData){
                loader_container.style.visibility = 'visible'
                loader_container.style.opacity = 1
                loader_container.style.height = '100px' 
                
                axios.get(`https://localhost:44364/api/News/GetRangTeacherNewssById/${id}/${newsSkip}`)
                    .then(response => {
                        if(response.data == false){
                            setStateData(false)
                            loader_container.style.visibility = 'hidden'
                            loader_container.style.opacity = 0
                            loader_container.style.height = '0px'
                        } else {
                            setNews([...news, ...response.data])
                            setNewsSkip(prevCourBlogs => prevCourBlogs +5)
                        }
                    }).finally(() => setLoading(false))
            }
        }
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

    async function setNewsData(){
        var loader_container = document.getElementById('loader-container')

        try
        {
            const response = await fetch(`https://localhost:44364/api/News/GetTeacherNewssById/${id}`)
            const data = await response.json()
            if(response.ok === true){
                setNews(data)
                
            }else{
                console.log('Error ', data)
            }

        }catch{}
    }

    async function onClickDetailInfo(e, i, value){
        console.log("Id: " + i)
        let popup = document.getElementById('popup')
        let popup_content = document.getElementById('popup__content')
        popup.style.visibility = 'visible'
        popup.style.opacity = 1
        popup_content.classList.add('animate')
        popup.style.transition = "all 0.5s";
        document.getElementById('mainInfo').innerText = value.mainInfo
        document.getElementById('title').innerText = value.title
        document.getElementById('img-news').src = value.base64Url
        var NewsId = value.id

        const response = await fetch(`https://localhost:44364/api/News/NewsIsRead/${NewsId}`)
    }

    async function popupLoginCliseClick(){
        let popup = document.getElementById('popup')
        let popup_content = document.getElementById('popup__content')
        popup_content.classList.remove('animate')        
        popup.style.visibility = 'hidden'
        popup.style.opacity = 0
        popup.style.transition = "all 0.5s";
        document.querySelector('b').innerText = ''
        document.getElementById('img-news').src = ''
    }

    return(
        <>
            <div id='all-container' className="cont">
                <NavigationBar />
                    <div className='all-container'>
                        <div className="heaber"></div>
                        <div className='container-title'>
                            <p className='text-uppercase title'>News</p>
                        </div>
                        <div className='wraper'>
                            {news.map((value, i) => {
                                return(
                                    <>
                                        <div className="popup" id="popup">
                                            <div className="popup__body">
                                                <div style={{position: 'relative'}} id="popup__content" class="popup__content">
                                                    <a className="popup__close" onClick={popupLoginCliseClick} >X</a>
                                                    <div id="modal-content" className="modal-content">
                                                        <div className="big-news-container">
                                                            <p>
                                                                <br />
                                                            </p>
                                                            <p>
                                                                <span>
                                                                    <b id='title' className="title">
                                                                        
                                                                    </b>
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <br />
                                                                <span>
                                                                    <b id='mainInfo' className='mainInfo'></b>
                                                                    <hr />
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <p>
                                                                <br />
                                                                <span>
                                                                    <img id="img-news" className="img-news" />       
                                                                </span>
                                                            </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id={i} key={i} onClick={e => onClickDetailInfo(e, i, value)} className="news-container">
                                            <div id="logo" className='logo'>
                                                {value.isRed === true ? "" : <span id={'new-message'+i} className='new-message' >New!</span>}
                                                <div className="d-flex flex-row jusify-content-center">
                                                    <div className="d-flex flex-column jusify-content-center">
                                                        {value.title}
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="date">
                                                {value.dataPublication}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}                          
                        </div>
                    </div>
                <div id="loader-container" className='loader-container'>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </>
    )
}

export default NewsPage