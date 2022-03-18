import React from 'react'
import '../styles/LoginChildrens.css'
import { useState } from "react"

function LoginChildrens(){
    const [username, setUsername] = useState("Denis")
    const [passValue, setPassValue] = useState("password123")

    async function onFormSubmit(e){
        e.preventDefault();
        console.log("Button submit")

        var passwordRlrment = document.getElementById('password')
        if(passwordRlrment.value == passValue){
            window.location = '/admin'
        }
    }

    return(
        <>
            <div className="login-children__container">
                <img src="https://mystat.itstep.org/assets/images/logo.png?v=cce222be7d237f6d95418ecb8c5529b8" style={{ marginBottom: '10px' }} />
                <form onSubmit={(e) => onFormSubmit(e)} >
                    <label for="password">Password</label>
                    <input id="username" type="username" pattern={username} placeholder="Enter your usrname" required="required" title="Your username" />
                    <input id="password" type="password" pattern={passValue} placeholder="Enter your password" required="required" title="Your password" />
                    <input id="login" type="checkbox" />
                    <button type="submit" class="login-button" for="login">
                        <span>Enter</span>
                        <svg>
                            <path d="M10,17V14H3V10H10V7L15,12L10,17M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16H7V20H17V4H7V8H5V4A2,2 0 0,1 7,2Z"></path>
                        </svg>
                    </button>
                    <span><a href='/' style={{ color: "#fff", textDecoration: 'none' }}>Forgot your password?</a></span>
        
                    <div class="padlock">
                        <div class="padlock__hook">
                            <div class="padlock__hook-body"></div>
                            <div class="padlock__hook-body"></div>
                        </div>
                        <div class="padlock__body">
                            <div class="padlock__face">
                                <div class="padlock__eye padlock__eye--left"></div>
                                <div class="padlock__eye padlock__eye--right"></div>
                                <div class="padlock__mouth padlock__mouth--one"></div>
                                <div class="padlock__mouth padlock__mouth--two"></div>
                                <div class="padlock__mouth padlock__mouth--three"></div>
                            </div>
                        </div>
                    </div>
                    <div class="app">
                        <h1>You logged in! 🎉</h1><button class="logout-button" type="reset">Logout</button>
                    </div><span class="logout-message">You have logged out.</span>
                </form>
            </div>  
        </>
    )
}

export default LoginChildrens