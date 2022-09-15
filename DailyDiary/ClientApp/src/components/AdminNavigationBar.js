import React from 'react'
import '../styles/Navigations/NavigatinBars.css'

function AdminNavigationBar() {
    return(
        <>
            <div className="menu__container" style={{backgroundColor: 'gray'}}>        
                    <div id="font_all_page" className="font_all_page"></div>
                    <nav className="menu__main-admin">
                    <div id="img__menu-admin" className="img__menu-admin"></div>
                    <div id="backgr" className="backgr"></div>
                    <div className="d-flex flex-row">
                        <div className="header-logo">
                        <div id="login-img" className="login-img">
                            <div>
                            <a href="/">
                                <img src="https://mystat.itstep.org/assets/images/logo.png?v=cce222be7d237f6d95418ecb8c5529b8" style={{ color: 'black' }} width="100%" alt="..."/>
                            </a>
                            </div>
                        </div>
                        </div>
                    <i className="point"></i>
                    </div>
                    <div className="settings"></div>
                    <div className="scrollbar" id="style-1">
                    <ul>
                        <li>
                        <a href="/">
                            <i className="fa fa-home fa-lg"></i>
                            <span className="nav-text">Home</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li>
                        <a href="/students">
                            <i className="fa fa-user fa-lg"></i>
                            <span className="nav-text">Students</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li>
                        <a href="/">
                            <i className="fa fa-envelope-o fa-lg"></i>
                            <span className="nav-text">Contact</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-clock-o fa-lg"></i>
                            <span className="nav-text">News</span>
                            <span id="news-badge-counter" className="news-badge-counter"></span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-clock-o fa-lg"></i>
                            <span className="nav-text">Feedback</span>
                            <span id="feedback-badge-counter" className="feedback-badge-counter"></span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-desktop fa-lg"></i>
                            <span className="nav-text">Technology</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-plane fa-lg"></i>
                            <span className="nav-text">Travel</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>

                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-shopping-cart"></i>
                            <span className="nav-text">Shopping</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-microphone fa-lg"></i>
                            <span className="nav-text">Film & Music</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-flask fa-lg"></i>
                            <span className="nav-text">Web Tools</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-picture-o fa-lg"></i>
                            <span className="nav-text">Art & Design</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-align-left fa-lg"></i>
                            <span className="nav-text">Magazines
                            </span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>

                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-gamepad fa-lg"></i>
                            <span className="nav-text">Games</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                        <li className="darkerli">
                        <a href="/">
                            <i className="fa fa-glass fa-lg"></i>
                            <span className="nav-text">Life & Style
                            </span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>

                        <li className="darkerlishadowdown">
                        <a href="/">
                            <i className="fa fa-rocket fa-lg"></i>
                            <span className="nav-text">Fun</span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                    <li>
                        <a href="/">
                        <i className="fa fa-question-circle fa-lg"></i>
                        <span className="nav-text">Help</span>
                        <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                    </li>
                    </ul>
                    <ul className="logout">
                        <li>
                        <a href="/">
                            <i className="fa fa-lightbulb-o fa-lg"></i>
                            <span className="nav-text">
                            BLOG
                            </span>
                            <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
                        </a>
                        </li>
                    </ul>
                    </div>
                    </nav>
                </div>
        </>
    )
}

export default AdminNavigationBar