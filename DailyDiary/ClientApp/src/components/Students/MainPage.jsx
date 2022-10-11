import React from 'react'
import StudentHeader from '../Headers/StudentHeader'
import NavigationBarForStudent from '../Navigations/NavigationBarForStudent'
import '../../styles/Students/MainPage.css'
import { useState } from 'react'
import { useEffect } from 'react'

function MainPage() {

    useEffect(() => {
        let progrss__carts = document.querySelectorAll('.progrss__cart')
        let corners = document.querySelectorAll('#corner')
        corners.forEach(corner => {
            corner.innerHTML = `
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 14.7071C-0.0976311 14.3166 -0.0976312 13.6834 0.292893 13.2929L6.08579 7.5L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L7.5 6.08579C8.28105 6.86684 8.28105 8.13317 7.5 8.91421L1.70711 14.7071C1.31658 15.0976 0.683418 15.0976 0.292893 14.7071Z" fill="#AEB9F1"/>
                </svg>
            `
        })
        progrss__carts.forEach(cart => {
            cart.addEventListener('mouseover', function(e) {
                    let corner = e.target.querySelector('#corner')
                    if(corner){
                        corner.innerHTML = `
                            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 14.7071C-0.0976311 14.3166 -0.0976312 13.6834 0.292893 13.2929L6.08579 7.5L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L7.5 6.08579C8.28105 6.86684 8.28105 8.13317 7.5 8.91421L1.70711 14.7071C1.31658 15.0976 0.683418 15.0976 0.292893 14.7071Z" fill="white"/>
                            </svg>
                        `
                    }
            })
            cart.addEventListener('mouseleave', function(e) {
                let corner = e.target.querySelector('#corner')
                if(corner){
                    corner.innerHTML = `
                        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 14.7071C-0.0976311 14.3166 -0.0976312 13.6834 0.292893 13.2929L6.08579 7.5L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L7.5 6.08579C8.28105 6.86684 8.28105 8.13317 7.5 8.91421L1.70711 14.7071C1.31658 15.0976 0.683418 15.0976 0.292893 14.7071Z" fill="#AEB9F1"/>
                        </svg>
                     `
                }
            })
        });
    })

    const[days, setdays] = useState('15')

    useEffect(() => {
        window.addEventListener('load', windowLoad)
        function windowLoad(){
            function digitsCounterInit(digitsCounterItems) {
                let digitCounters = digitsCounterItems ? digitsCounterItems : document.querySelectorAll("#day-number_")
                if(digitCounters) {
                    console.log("ready");
                    digitCounters.forEach(digitCounter => {
                        digitsCountersAnimate(digitCounter)
                    });
                }
            }
            function digitsCountersAnimate(digitCounter) {
                let startTimestamp = null;
                const duration = parseInt(digitCounter.dataset.digitCounter) ? parseInt(digitCounter.dataset.digitCounter) : 1000
                const startValue = parseInt(days)
                const startPosition = 0
                const step = (timestamp) => {
                    if(!startTimestamp) startTimestamp = timestamp
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
                    digitCounter.innerHTML = Math.floor(progress * (startPosition + startValue))
                    if(progress < 1){
                        window.requestAnimationFrame(step)
                    }
                }
                window.requestAnimationFrame(step)
            }
            digitsCounterInit()
        }
    }, [])

    return(
        <>
            <div style={{ overflowX: 'hidden' }} className='main__container'>
                <StudentHeader />
                <NavigationBarForStudent />
                <div className='info__container'>
                    <div className="mainpage__container">
                        <div className='rating__container'>
                            <div className='raiting'>
                                <span className='rate__title'>Рейтинг</span>
                                <div style={{marginRight: '38px'}} className='st_rait-pleace__container'>
                                   <span className="st-position__rate">5</span> 
                                   <span className='rate-text__desctiption'>Місце в класі</span>
                                </div>
                                <div className='st_thread-pleace__container'>
                                    <span style={{color: '#AEB9F1'}} className="st-position__rate">9</span> 
                                    <span className='rate-text__desctiption'>Місце в школі</span>
                                </div>
                            </div>
                            <div className='the-end__semestr'>
                                <span style={{marginBottom: '32px'}} className='rate__title'>До кінця семестру</span>
                                <div className='the-end_-semestr-sub__container'>
                                    <div className='day-bar__container'>
                                        <div id='timer__container' className='timer__container'>
                                            <div className='timer'>
                                                <div className='timer__line'></div>
                                                <div className='timer__body'>
                                                    <div className='timer__coounter'>
                                                        <span id='day-number_' className='day-number_'></span>
                                                        <span className='day-text_'>Днів</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='end-semester__info'>
                                        <span style={{marginBottom: '15px'}}>Найближчі контрольні роботи:</span>
                                        <span>Фізика 21 грудня Математика 22 грудня Хімія 25 грудня</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='liders-table__container'>
                            <span style={{ marginBottom: '13px' }} className='rate__title'>Таблиця лідерів</span>
                            <div className="menu-container">
                                <span id='first' className="first active">Місце в класі</span>
                                <span className="second">Місце в школі</span>
                            </div>
                            <div className="student-list__container">
                                <div className='student__cart'>
                                    <span className='student__id'>1</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart'>
                                    <span className='student__id'>2</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart'>
                                    <span className='student__id'>3</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart'>
                                    <span className='student__id'>4</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart active'>
                                    <span className='student__id'>5</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart'>
                                    <span className='student__id'>6</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart'>
                                    <span className='student__id'>7</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart'>
                                    <span className='student__id'>8</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart'>
                                    <span className='student__id'>9</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                                <div className='student__cart'>
                                    <span className='student__id'>10</span>
                                    <span className='student__fio'>Сікорський Іван</span>
                                </div>
                            </div>
                        </div>
                        <div className='progresss__container_stops'>
                            <div className='progresss-absolute__container'>
                                <span style={{marginTop: '-67px', marginLeft: '-20px'}} className='rate__title'>Прогрес</span>
                                <div className='progrss__sub-container_stops'>
                                    <div className='progrss__cart'>
                                        <div className='progrss__cart__container'>
                                            <div className='timer__pogress'>
                                                <div className='timer__line__pogress'></div>
                                                <div className='timer__body__pogress'>
                                                    <div className='timer__coounter__pogress'>
                                                        <span id='day-number_' className='day-number_'></span>
                                                        <span className='persents'>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text__info__progress'>
                                            <span>Математика</span>
                                            <span>5 Домашніх завдань</span>
                                        </div>
                                        <span id='corner'>C</span>
                                    </div>
                                    <div className='progrss__cart'>
                                        <div className='progrss__cart__container'>
                                            <div className='timer__pogress'>
                                                <div className='timer__line__pogress'></div>
                                                <div className='timer__body__pogress'>
                                                    <div className='timer__coounter__pogress'>
                                                        <span id='day-number_' className='day-number_'></span>
                                                        <span className='persents'>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text__info__progress'>
                                            <span>Математика</span>
                                            <span>5 Домашніх завдань</span>
                                        </div>
                                        <span id='corner'>C</span>
                                    </div>
                                    <div className='progrss__cart'>
                                        <div className='progrss__cart__container'>
                                            <div className='timer__pogress'>
                                                <div className='timer__line__pogress'></div>
                                                <div className='timer__body__pogress'>
                                                    <div className='timer__coounter__pogress'>
                                                        <span id='day-number_' className='day-number_'></span>
                                                        <span className='persents'>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text__info__progress'>
                                            <span>Математика</span>
                                            <span>5 Домашніх завдань</span>
                                        </div>
                                        <span id='corner'>C</span>
                                    </div>
                                    <div className='progrss__cart'>
                                        
                                        <div className='progrss__cart__container'>
                                            <div className='timer__pogress'>
                                                <div className='timer__line__pogress'></div>
                                                <div className='timer__body__pogress'>
                                                    <div className='timer__coounter__pogress'>
                                                        <span id='day-number_' className='day-number_'></span>
                                                        <span className='persents'>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{width: 'auto'}} className='text__info__progress'>
                                            <span>Математика</span>
                                            <span>5 Домашніх завдань</span>
                                        </div>
                                        <span id='corner'>C</span>
                                    </div>
                                    <div className='progrss__cart'>
                                        <div className='progrss__cart__container'>
                                            <div className='timer__pogress'>
                                                <div className='timer__line__pogress'></div>
                                                <div className='timer__body__pogress'>
                                                    <div className='timer__coounter__pogress'>
                                                        <span id='day-number_' className='day-number_'></span>
                                                        <span className='persents'>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text__info__progress'>
                                            <span>Математика</span>
                                            <span>5 Домашніх завдань</span>
                                        </div>
                                        <span id='corner'>C</span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mainpage__container__grafics'>
                        <div style={{marginRight: '33px'}} className='cart__success'>
                            <div className='success-first__sub__container'>
                                <span className="text__success">Успішність</span>
                                <div className="dropdown__container">
                                </div>
                            </div>
                        </div>
                        <div className='cart__visit'>
                        <span className="text__visit">Відвідування</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage