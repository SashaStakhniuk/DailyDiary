import '../styles/Login.css'
import React from 'react';
import $ from 'jquery'
function Login(){

    function onClickPasswordVisible(e){
        e.preventDefault()
        var inp_password = document.getElementById('password')
        if(inp_password.type == 'password'){
            inp_password.type = 'username'
        }else{
            inp_password.type = 'password'
        }
    }

    return(
        <>
            <div className="login__container">   
                <div className='backgr'></div>
                <img  className='img-logo' src="https://mystat.itstep.org/assets/images/logo.png?v=cce222be7d237f6d95418ecb8c5529b8" />

                <div className="form__container">
                    <form className='d-flec flex-column justify-content-center align-items-center'>
                        <div class="mb-3">
                            <input id="username" type="username" placeholder="Enter your usrname" required="required" title="Your username" />
                        </div>
                        <div class="mb-3">
                            <div className="password-wrapper">
                                <input id="password" type="password"  placeholder="Enter your password" required="required" title="Your password" />
                                <div onClick={e => onClickPasswordVisible(e)} className="eye"></div>
                            </div>
                        </div>
                        <button type="submit" class="btn-login">Submit</button>
                        <span className="span-text"><a href='/'>Forgot your password?</a></span>
                    </form>
                </div>
                
                <div className="languages">
                    <ul className="row">
                        <li className="col-2">ru</li>
                        <li className="col-2">eu</li>
                        <li className="col-2">bg</li>
                        <li className="col-2">pt</li>
                        <li className="col-2">ua</li>
                        <li className="col-2">ro</li>
                        <li className="col-2">ge</li>
                        <li className="col-2">az</li>
                        <li className="col-2">cs</li>
                        <li className="col-2">sk</li>
                        <li className="col-2">es</li>
                        <li className="col-2">pl</li>
                        <li className="col-2">kz</li>
                        <li className="col-2">fr</li>
                        <li className="col-2">uz</li>
                        <li className="col-2">vi</li>
                        <li className="col-2">de</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Login