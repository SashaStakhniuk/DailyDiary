import '../scripts/header.js'
// import '../styles/Header.css'
import { useEffect } from 'react'
import useMediaQuery from '../scripts/useMediaQuery'
import React from 'react';

export default function Header(props){
    const  metches = useMediaQuery('(miin-width: 767px)')

    function OnClick(e){
        e.preventDefault()
        console.log('click')
        if(document.body.classList.contains('_touch')){
            console.log('_touch')
            let arrow = document.getElementById('menu__arrow')
            if(arrow){
                console.log()
                arrow.addEventListener('click', function(e){
                    arrow.parentElement.classList.toggle('_active')
                })
            }
        }
    }
    useEffect(() => {
        console.log('window miin-width: 767px: ' + metches)
    }, [metches])
    return(
        <div>
            <header className="header">
                <div className="header__container">
                    <a href="" className="header__logo"></a>
                    <div className="header__menu">
                        <div className="menu__icon">
                            <span></span>
                        </div>
                        <nav className="menu__body">
                            <ul className="menu__list">
                                <li>
                                    <a data-goto=".page__section_1"  href="#" className="menu__linck">Main</a>
                                </li>
                                <li>
                                    <a data-goto=".page__section_2" href="#" className="menu__linck">Rate</a>
                                </li>
                                <li>
                                    <a data-goto=".page__section_3" href="#" className="menu__linck">Hw</a>
                                </li>
                                <li>
                                    <a data-goto=".page__section_4" href="#" className="menu__linck">Profil</a>
                                </li>
                                <li>
                                    <a href="" className="menu__linck">Magazin</a>
                                </li>
                                <li>
                                    <a href="" className="menu__linck">Submenu</a>
                                    <span onClick={e => OnClick(e)} id="menu__arrow" className="menu__arrow"></span> 
                                    <ul className="menu__sub-list">
                                        <li>
                                            <a href="" className="menu__sub-linck">Page 1</a>
                                        </li>
                                        <li>
                                            <a href="" className="menu__sub-linck">Page 2</a>
                                        </li>
                                        <li>
                                            <a href="" className="menu__sub-linck">Page 3</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="" className="menu__linck">Ref 1</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    )
}