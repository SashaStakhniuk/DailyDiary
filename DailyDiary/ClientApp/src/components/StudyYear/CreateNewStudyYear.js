import React from "react"
import { useState, useEffect } from 'react'
import StudentHeader from "../Headers/StudentHeader";
import NavigationBarForStudent from "../Navigations/NavigationBarForStudent";
import "../../styles/Admin/CreateNewStudyYear.css"

import logon from '../../images/Photo.png'

function CreateNewStudyYear() {

    useEffect(() => {
        getAllYears()
        NextPage()
    }, [])

    var yyyy = new Date().getFullYear();
    const [startYear, setStartYear] = useState(`${yyyy}-09-01`)
    const [finishYear, setFinishYear] = useState(`${yyyy + 1}-06-30`)
    const [yearsOfStudy, setYearsOfStudy] = useState(11)
    const [yearsData, setYearsData] = useState([])

    async function onSubmit(e) {
        e.preventDefault()
        await create()
    }

    function onYearsOfStudyChange(e) {
        setYearsOfStudy(e.target.value);
    }

    const [takeItems, setTakeItems] = useState(6)
    const [skipItems, setSkipItems] = useState(0)

    async function getAllYears() {
        const response = await fetch(`https://localhost:44364/api/planEducation/GetRung/${takeItems}/${skipItems}`, {
            method: 'GET'
        })
        if (response.ok === true) {
            const data = await response.json();
            var skip = takeItems
            setTakeItems(takeItems+6)
            setSkipItems(skip)
            setYearsData(data)
        }
    }


    async function NextPage() {
        const response = await fetch(`https://localhost:44364/api/planEducation/GetRung/${takeItems}/${skipItems}`, {
            method: 'GET'
        })
        if (response.ok === true) {
            const data = await response.json();
            var skip = takeItems
            setTakeItems(takeItems+6)
            setSkipItems(skip)
            setYearsData(data)
        }
    }

    async function create() {
        const response = await fetch('https://localhost:44364/api/PlanEducation/NewPlanEducation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startYear,
                finishYear,
                yearsOfStudy
            })
        })
        if (response.ok != true) {
            await popupLoginCliseClick();
            const data = await response.text();
            //startYear.substring(0, 4)
            //finishYear.substring(0, 4)
            // let title = startYear + " / " + finishYear
            // var obj = {
            //     title,
            //     startYear,
            //     finishYear,
            //     yearsOfStudy
            // }
            // let years = []
            // yearsData.forEach(yearItem => {
            //     years.push(yearItem)
            // });
            
            //years.push(obj)
        }
    }

    function onChangeStartYear(e) {
        setStartYear(e.target.value)
    }

    function onChangeFinishYear(e) {
        setFinishYear(e.target.value)
    }

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
        var b = document.querySelector('b')
        if(b) {
            b.innerText = ''
        }
        var img_new = document.getElementById('img-news')
        if(img_new) {
            img_new.src = ''
        }
    }


    function osSelectMousEnter(e) {
        console.log("hover");
        let custom_select = e.target.querySelector('#custom-select')
        if(custom_select){
            custom_select.classList.add('open')
        }
        let radios = e.target.querySelector('#radios')
        if(radios) {
            radios.style.content = 'var(--selection);'
            radios.style.display = 'block;'
            radios.style.width = '100vw;'
            radios.style.height = '100vh;'
            radios.style.background = 'transparent;'
            radios.style.position = 'fixed;'
            radios.style.top = '0;'
            radios.style.left = '0;'
        }
    }

    return (
        <>
            <div className="main__container">
                <StudentHeader />
                <NavigationBarForStudent />
                <div className="info__container_">
                    <div style={{ margin: '0' }} className="mainpage__container_">
                        <div className="top__container">
                            <h1 className="page__title">Навчальний рік</h1>
                            <div className="right__container">
                                <div style={{ marginRight: '23px' }} className="auto__layer__container">
                                    <button className="create__button" onClick={e => onClickDetailInfo(e)}>Створити</button>
                                </div>
                                <details onMouseEnter={e => osSelectMousEnter(e)} id="custom-select" className="custom-select">
                                    <summary id="radios" className="radios">
                                        <input className="default__selected-item" type="radio" name="item" id="default" title="Всі роки" checked />
                                        <input className="default__selected-item" type="radio" name="item" id="item1" title="Item 1" />
                                        <input className="default__selected-item" type="radio" name="item" id="item2" title="Item 2" />
                                        <input className="default__selected-item" type="radio" name="item" id="item3" title="Item 3" />
                                        <input className="default__selected-item" type="radio" name="item" id="item4" title="Item 4" />
                                        <input className="default__selected-item" type="radio" name="item" id="item5" title="Item 5" />
                                    </summary>
                                    <ul className="list">
                                        <li className="item">
                                        <label htmlFor="item1">

                                            Item 1
                                            <span></span>
                                        </label>
                                        </li>
                                        <li className="item">
                                        <label htmlFor="item2">Item 2</label>
                                        </li>
                                        <li className="item">
                                        <label htmlFor="item3">Item 3</label>
                                        </li>
                                        <li className="item">
                                        <label htmlFor="item4">Item 4</label>
                                        </li>
                                        <li className="item">
                                        <label htmlFor="item5">Item 5</label>

                                        </li>
                                    </ul>
                                </details>
                            </div>
                        </div>
                        <div className="search__container">

                            <dic className="serach__input__container">
                                <svg className="search__image" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7C13 8.29583 12.5892 9.49572 11.8907 10.4765L15.7071 14.2929L14.2929 15.7071L10.4765 11.8907C9.49572 12.5892 8.29583 13 7 13ZM7 11C9.20914 11 11 9.20914 11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11Z" fill="#5F6B7A"/>
                                </svg>
                                <textarea className="serach__input" placeholder="Find instances"/>
                            </dic>
                            <div className="pagination__container">
                                <div className="pages__numbers__container">
                                    <span className="page__number">1</span>
                                    <span className="page__number">2</span>
                                    <span className="page__number">3</span>
                                    <span className="page__number">4</span>
                                    <span className="page__number">5</span>
                                </div>
                                <div className="settings__container">
                                    <svg  width="2" height="34" viewBox="0 0 2 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="2" height="34" rx="1" fill="#E9EBED"/>
                                    </svg>
                                    <svg className="svg__settings" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5004 25.5H14.4754C14.2588 25.5 14.0671 25.425 13.9004 25.275C13.7338 25.125 13.6338 24.9333 13.6004 24.7L13.3004 22.45C13.0338 22.3667 12.7631 22.2417 12.4884 22.075C12.2131 21.9083 11.9588 21.7333 11.7254 21.55L9.65043 22.45C9.43376 22.5333 9.22143 22.5417 9.01343 22.475C8.80476 22.4083 8.63376 22.275 8.50043 22.075L7.00043 19.45C6.88376 19.25 6.85043 19.0373 6.90043 18.812C6.95043 18.5873 7.05876 18.4083 7.22543 18.275L9.05043 16.9C9.0171 16.75 8.99643 16.6 8.98843 16.45C8.97976 16.3 8.97543 16.15 8.97543 16C8.97543 15.8667 8.97976 15.725 8.98843 15.575C8.99643 15.425 9.0171 15.2667 9.05043 15.1L7.22543 13.725C7.05876 13.5917 6.95043 13.4127 6.90043 13.188C6.85043 12.9627 6.88376 12.75 7.00043 12.55L8.50043 9.95C8.6171 9.75 8.78376 9.61667 9.00043 9.55C9.2171 9.48333 9.42543 9.49167 9.62543 9.575L11.7254 10.45C11.9588 10.2667 12.2131 10.096 12.4884 9.938C12.7631 9.77933 13.0338 9.65 13.3004 9.55L13.6004 7.3C13.6338 7.06667 13.7338 6.875 13.9004 6.725C14.0671 6.575 14.2588 6.5 14.4754 6.5H17.5004C17.7338 6.5 17.9338 6.575 18.1004 6.725C18.2671 6.875 18.3671 7.06667 18.4004 7.3L18.7004 9.55C19.0004 9.66667 19.2711 9.79567 19.5124 9.937C19.7544 10.079 20.0004 10.25 20.2504 10.45L22.3754 9.575C22.5754 9.49167 22.7798 9.48333 22.9884 9.55C23.1964 9.61667 23.3671 9.75 23.5004 9.95L25.0004 12.55C25.1171 12.75 25.1504 12.9627 25.1004 13.188C25.0504 13.4127 24.9421 13.5917 24.7754 13.725L22.9254 15.125C22.9588 15.2917 22.9754 15.4417 22.9754 15.575V16C22.9754 16.1333 22.9711 16.2707 22.9624 16.412C22.9544 16.554 22.9338 16.7167 22.9004 16.9L24.7254 18.275C24.9088 18.4083 25.0254 18.5873 25.0754 18.812C25.1254 19.0373 25.0838 19.25 24.9504 19.45L23.4504 22.05C23.3338 22.25 23.1671 22.3833 22.9504 22.45C22.7338 22.5167 22.5171 22.5083 22.3004 22.425L20.2504 21.55C20.0004 21.75 19.7464 21.925 19.4884 22.075C19.2298 22.225 18.9671 22.35 18.7004 22.45L18.4004 24.7C18.3671 24.9333 18.2671 25.125 18.1004 25.275C17.9338 25.425 17.7338 25.5 17.5004 25.5V25.5ZM16.0004 19C16.8338 19 17.5421 18.7083 18.1254 18.125C18.7088 17.5417 19.0004 16.8333 19.0004 16C19.0004 15.1667 18.7088 14.4583 18.1254 13.875C17.5421 13.2917 16.8338 13 16.0004 13C15.1671 13 14.4588 13.2917 13.8754 13.875C13.2921 14.4583 13.0004 15.1667 13.0004 16C13.0004 16.8333 13.2921 17.5417 13.8754 18.125C14.4588 18.7083 15.1671 19 16.0004 19ZM16.0004 17.5C15.5838 17.5 15.2298 17.354 14.9384 17.062C14.6464 16.7707 14.5004 16.4167 14.5004 16C14.5004 15.5833 14.6464 15.2293 14.9384 14.938C15.2298 14.646 15.5838 14.5 16.0004 14.5C16.4171 14.5 16.7711 14.646 17.0624 14.938C17.3544 15.2293 17.5004 15.5833 17.5004 16C17.5004 16.4167 17.3544 16.7707 17.0624 17.062C16.7711 17.354 16.4171 17.5 16.0004 17.5ZM15.0004 24H16.9754L17.3254 21.325C17.8421 21.1917 18.3088 21 18.7254 20.75C19.1421 20.5 19.5504 20.1833 19.9504 19.8L22.4254 20.85L23.4254 19.15L21.2504 17.525C21.3338 17.2583 21.3881 17 21.4134 16.75C21.4381 16.5 21.4504 16.25 21.4504 16C21.4504 15.7333 21.4381 15.4793 21.4134 15.238C21.3881 14.996 21.3338 14.75 21.2504 14.5L23.4254 12.85L22.4504 11.15L19.9254 12.2C19.5921 11.85 19.1921 11.5373 18.7254 11.262C18.2588 10.9873 17.7921 10.7917 17.3254 10.675L17.0004 8H15.0254L14.6754 10.675C14.1754 10.7917 13.7088 10.975 13.2754 11.225C12.8421 11.475 12.4254 11.7917 12.0254 12.175L9.55043 11.15L8.57543 12.85L10.7254 14.45C10.6421 14.7 10.5838 14.95 10.5504 15.2C10.5171 15.45 10.5004 15.7167 10.5004 16C10.5004 16.2667 10.5171 16.525 10.5504 16.775C10.5838 17.025 10.6421 17.275 10.7254 17.525L8.57543 19.15L9.55043 20.85L12.0254 19.8C12.4088 20.1833 12.8171 20.5 13.2504 20.75C13.6838 21 14.1588 21.1917 14.6754 21.325L15.0004 24Z" fill="#4F4F4F"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="main__cart-content__container">
                            {yearsData.map(item => {
                                return(<>
                                    <div className="cart__study_year">
                                        <div className="logo_cart__container">
                                            <img src={logon}/> 
                                        </div>
                                        <div className="title-cart__container">
                                            <h3 className="title__cart__study-tear">{item.title}</h3>
                                            <span className="description__cart__study-tear">ST.y: {new Date(item.startYear).toLocaleDateString()}<br/>F.y: {new Date(item.finishYear).toLocaleDateString()}</span >
                                        </div>
                                        <div lang="info__cart__cintainer">
                                            <svg className="svg__info" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.17383 9.25L9.21483 9.23C9.34306 9.16594 9.48696 9.13997 9.62949 9.15516C9.77203 9.17035 9.90722 9.22606 10.0191 9.31571C10.1309 9.40536 10.2147 9.52518 10.2606 9.66099C10.3065 9.79679 10.3124 9.9429 10.2778 10.082L9.56983 12.918C9.53497 13.0572 9.54077 13.2034 9.58652 13.3394C9.63227 13.4754 9.71607 13.5954 9.82796 13.6852C9.93986 13.775 10.0752 13.8308 10.2178 13.846C10.3605 13.8612 10.5045 13.8352 10.6328 13.771L10.6738 13.75M18.9238 10C18.9238 11.1819 18.691 12.3522 18.2387 13.4442C17.7865 14.5361 17.1235 15.5282 16.2878 16.364C15.4521 17.1997 14.4599 17.8626 13.368 18.3149C12.276 18.7672 11.1057 19 9.92383 19C8.74193 19 7.57161 18.7672 6.47968 18.3149C5.38775 17.8626 4.39559 17.1997 3.55987 16.364C2.72414 15.5282 2.0612 14.5361 1.60891 13.4442C1.15662 12.3522 0.923828 11.1819 0.923828 10C0.923828 7.61305 1.87204 5.32387 3.55987 3.63604C5.24769 1.94821 7.53688 1 9.92383 1C12.3108 1 14.6 1.94821 16.2878 3.63604C17.9756 5.32387 18.9238 7.61305 18.9238 10ZM9.92383 6.25H9.93183V6.258H9.92383V6.25Z" stroke="#F2982A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                </>
                                )})}
                        </div>
                        <button onClick={NextPage} className="btn__clasic">
                            Show more
                            <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.610346 1.55586L2.76868 3.71419C3.09368 4.03919 3.61868 4.03919 3.94368 3.71419L6.10201 1.55586C6.62701 1.03086 6.25201 0.130859 5.51035 0.130859H1.19368C0.452012 0.130859 0.0853456 1.03086 0.610346 1.55586Z" fill="white"/>
                            </svg>
                        </button>
                    </div>

                    <div style={{xIndex: '200'}} className="popup" id="popup">
                        <div className="popup__body">

                            <div style={{position: 'relative'}} id="popup__content" class="popup__content">
                                <h2 className="popup__title">Створити навчальній рік</h2>
                                <a className="popup__close" onClick={popupLoginCliseClick} >X</a>
                                <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column align-items-center'>
                                        <div className="form__item">
                                            <span className="span-text">Start Year</span>
                                            <input id="date" data-date-format="DD MMMM YYYY" value={startYear} onChange={e => onChangeStartYear(e)} type="date" placeholder="Stary study year" title="stary study year" required />
                                        </div>
                                        <div className="form__item">
                                            <span className="span-text">Finish Year</span>
                                            <input id="date" data-date-format="DD MMMM YYYY" value={finishYear} onChange={e => onChangeFinishYear(e)} type="date" placeholder="Stary finish year" title="stary finish year" required />
                                        </div>
                                        <div className="form__item">
                                            <span className="span-text">Amount of classes in this year:</span>
                                            <input type="number" min={1} max={100} id="input_classes_number" value={yearsOfStudy} onChange={(e) => onYearsOfStudyChange(e)} name="classesAmount" placeholder="Your choice" step={1} />
                                        </div>
                                        <div className="form__item">
                                            <button className="btn__clasic" type="submit">Create</button>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateNewStudyYear

// import React from "react"
// import { useState, useEffect } from 'react'

// function CreateNewStudyYear() {

//     var yyyy = new Date().getFullYear();
//     const [startYear, setStartYear] = useState(`${yyyy}-09-01`)
//     const [finishYear, setFinishYear] = useState(`${yyyy + 1}-06-30`)
//     const [yearsOfStudy, setYearsOfStudy] = useState(11)

//     async function onSubmit(e) {
//         e.preventDefault()
//         await create()
//     }
//     function onYearsOfStudyChange(e) {
//         setYearsOfStudy(e.target.value);
//     }
//     async function create() {
//         console.log(
//             startYear,
//             finishYear,
//             yearsOfStudy)
//         const response = await fetch('https://localhost:44364/api/PlanEducation/NewPlanEducation', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 startYear,
//                 finishYear,
//                 yearsOfStudy
//             })
//         })
//         if (response.ok != true) {
//             const data = await response.text();
//             alert(data)
//         }
//     }

//     function onChangeStartYear(e) {
//         setStartYear(e.target.value)
//     }

//     function onChangeFinishYear(e) {
//         setFinishYear(e.target.value)
//     }

//     return (
//         <>
//             <div className="edit__container">
//                 <h2 style={{ position: "absolute", top: 120 }} className="title-edit">Create new study year</h2>
//                 <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column align-items-center'>
//                     <div className="md-3">
//                         <span className="span-text">Start Year</span>
//                         <div className="mb-3">
//                             <input id="date" data-date-format="DD MMMM YYYY" value={startYear} onChange={e => onChangeStartYear(e)} type="date" placeholder="Stary study year" title="stary study year" required />
//                         </div>
//                     </div>
//                     <div className="md-3">
//                         <span className="span-text">Finish Year</span>
//                         <div className="mb-3">
//                             <input id="date" data-date-format="DD MMMM YYYY" value={finishYear} onChange={e => onChangeFinishYear(e)} type="date" placeholder="Stary finish year" title="stary finish year" required />
//                         </div>
//                     </div>
//                     <div className="md-12">
//                         <span className="span-text">Amount of classes in this year:</span>
//                         <div style={{ margin: "2%" }}>
//                             <input type="number" min={1} max={100} id="input_classes_number" value={yearsOfStudy} onChange={(e) => onYearsOfStudyChange(e)} name="classesAmount" placeholder="Your choice" step={1} />
//                         </div>
//                     </div>
//                     <div className="md-3">
//                         <button className="btn btn-primary" type="submit">Create</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default CreateNewStudyYear