import React from 'react'
import '../../styles/Students/Review.css'
import StudentHeader from '../Headers/StudentHeader';
import NavigationBarForStudent from '../Navigations/NavigationBarForStudent';

function Review () {

    async function onClickDetailInfo(e){
        let popup = document.getElementById('popup')
        let popup_content = document.getElementById('popup__content')
        popup.style.visibility = 'visible'
        popup.style.opacity = 1
        popup_content.classList.add('animate')
        popup.style.transition = "all 0.5s";
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
            <div className='main__container'>
                <StudentHeader />
                <NavigationBarForStudent />
                <div className="container">
                    <h1 className="page__title">Відгуки</h1>
                    <div className="card_review">
                        <span className="info__text"> 
                            Щось пішло не так на занятті? <br/>
                            Залиш свій відгук і ми виправимо це!
                        </span>
                        <button onClick={(e) => onClickDetailInfo(e)} style={{marginRight: '44px'}} className="btn__clasic">Залишити відгук</button>
                    </div>
                    <div className='review__cart'>
                        <div className='text__container'>
                            <span className='title_msg'>Title</span>
                            <span className="main__info">Main information</span>
                        </div>
                        <button style={{marginRight: '44px'}} className="btn__clasic">Переглянути</button>
                    </div>
                    <div className='review__cart'>
                        <div className='text__container'>
                            <span className='title_msg'>Title</span>
                            <span className="main__info">Main information</span>
                        </div>
                        <button style={{marginRight: '44px'}} className="btn__clasic">Переглянути</button>
                    </div>
                    <div className='review__cart'>
                        <div className='text__container'>
                            <span className='title_msg'>Title</span>
                            <span className="main__info">Main information</span>
                        </div>
                        <button style={{marginRight: '44px'}} className="btn__clasic">Переглянути</button>
                    </div>
                </div>
                <div style={{xIndex: '200'}} className="popup" id="popup">
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
            </div>
        </>
    )
}

export default Review