import React from 'react'
import { useState, useEffect } from 'react'
import '../../styles/Teachers.css'
import NavigationBar from '../NavigationBar'
import { useParams } from 'react-router-dom'

function NewsPage(){

    let { id } = useParams()

    useEffect(() => {
        setNewsData()
    }, [])

    const [news, setNews] = useState([])

    async function setNewsData(){
        
        try
        {
            const response = await fetch(`https://localhost:44364/api/News/GetTeacherNewssById/${id}`)
            const data = await response.json()
            if(response.ok === true){
                console.log("Secsesfuly");
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
    }

    async function popupLoginCliseClick(){
        let popup = document.getElementById('popup')
        let popup_content = document.getElementById('popup__content')
        popup_content.classList.remove('animate')        
        popup.style.visibility = 'hidden'
        popup.style.opacity = 0
        popup.style.transition = "all 0.5s";
        document.querySelector('b').innerText = ''
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
                                                    <div className="modal-content">
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
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id={i} key={i} onClick={e => onClickDetailInfo(e, i, value)} className="news-container">
                                            <div id="logo" className='logo'>
                                                {value.title}
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
            </div>
        </>
    )
}

export default NewsPage