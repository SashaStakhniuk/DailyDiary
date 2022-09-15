import '../styles/Login.css'
import React from 'react';
import { connect } from "react-redux";
import setUserCredentials from '../redux/action_creators/SetUserCredentials';
import { Role } from './Role'
import loadingAnimation from "../images/Loading_icon.gif"

class Login extends React.Component{
    
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.makeRequest=this.makeRequest.bind(this)
        this.onClickPasswordVisible = this.onClickPasswordVisible.bind(this);
        // this.getCookie=this.getCookie.bind(this)

        this.state={
            userName:"",
            password:"",
            error:"",
            loading:""
        }
    }
    onClickPasswordVisible(e){
        e.preventDefault()
        var inp_password = document.getElementById('password')
        if(inp_password.type == 'password'){
            inp_password.type = 'username'
        }else{
            inp_password.type = 'password'
        }
    }
    async makeRequest(username, password){
        // try{
        //     var userName = username
        //     var password = password
        //     var returnUrl = ''
        //     var rememberMe = false;
        //     const response = await fetch('https://localhost:44364/api/account/Login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             userName, 
        //             password,
        //             rememberMe,
        //             returnUrl
        //         })
        //     })
            
        //     const data = await response.json()

        //     if (response.ok === true) {
        //         this.setState({loading:""})
        //         console.log(data)
        //         sessionStorage.setItem('access_token', data.access_token);
        //         sessionStorage.setItem('userId', data.userId);
        //         //  sessionStorage.setItem('userEmail', data.userEmail);
        //         //this.props.setCredentials(data.access_token,data.userId);
        //         //this.setState({error:""})
        //         //window.location = '/'
        //         // <AuthenticationRegistration authorized={true}></AuthenticationRegistration>
        //     } else {
        //         this.setState({loading:""})
        //         // window.location = '/authorization'
        //         // this.setState({error:"Invalid email or password",loading:""})
        //         this.setState({error:data.errorText,loading:""})
        //         console.log(data);
        //         console.log(response.status, response.errorText)
        //     }
        //     this.setState({loading:""})
        //     //const data = await response.json()
        // }
        // catch{

        // }
        try{

        
            const response = await fetch('https://localhost:44364/api/account/Login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                         body: JSON.stringify(this.state)
                    })
                
                    const data = await response.json()
                    if (response.ok === true) {
                        console.log(data)
                        //  sessionStorage.setItem('access_token', data.access_token);
                        //  sessionStorage.setItem('userId', data.userId);
                        //  sessionStorage.setItem('userEmail', data.userEmail);
                        // this.setState({error:"",loading:""})
                        this.setState({error:""})
                        this.props.setCredentials(data.access_token,data.userId,data.roles);
                        data.roles.forEach(role=>{
                            if(role==Role.MainAdmin || role==Role.Admin){
                                window.location = '/admin'                          
                            }
                        })                      
                        // else{
                        //     window.location = `/student-page/${data.userId}`
                        // }

                        // console.log('access_token = '+ data.access_token);
                        // console.log('userId = '+ data.userId);
                        // console.log('userrole = '+ data.role);
                    } else {
                        // window.location = '/authorization'
                        // this.setState({error:"Invalid email or password",loading:""})
                        this.setState({error:data.error,loading:""})
                        console.log(data);
                        console.log(response.status, response.error)
                    }
                }
                catch(e){
                    console.log(e);
                }
               
    }
    handleForm(e) {
        e.preventDefault()
        this.setState({loading: loadingAnimation})
        //console.log(e.target)
        const {userName, password} = e.target
        this.setState({
            userName:userName.value,
            password:password.value,
            loading:loadingAnimation
        }
        ,()=>this.makeRequest(userName.value, password.value))
    }
    render(){
        var animation=""
        if(this.state.loading!==""){
            animation=
            <div>
                <img style={{width:"40px"}} src={this.state.loading} alt="..."/>
            </div>
        }
        return(
            <>
                <div className="login__container">   
                    <div className='backgr'></div>
                    <img  className='img-logo' src="https://mystat.itstep.org/assets/images/logo.png?v=cce222be7d237f6d95418ecb8c5529b8" />
                    <div className="form__container">
                        <form onSubmit={this.handleForm} className='d-flec flex-column justify-content-center align-items-center' style={{position: "relative"}}>
                            <div className="mb-3">
                                <input id="username" type="username" placeholder="Enter your username" required="required" title="Your username" name = "userName" />
                            </div>
                            <div className="mb-3">
                                <div className="password-wrapper">
                                    <input id="password" type="password" value="Qwerty1!"  placeholder="Enter your password" required="required" title="Your password" name = "password" />
                                    <div onClick={e => this.onClickPasswordVisible(e)} className="eye"></div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div style={{ position: 'absolute', marginBottom: '10px', width: '50px', height: '50px', top: '137px', left: '45%'}}>
                                    {animation}
                                </div>
                                <div style={{color:"red"}}><h3 style={{fontSize:"1.25em"}}>{this.state.error}</h3></div>
                            </div>                
                            <button type="submit" className="btn-login">Submit</button>
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
}

function mapStateToProps(state){
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}
function mapDispatchToProps(dispatch){
    return{
        setCredentials:(userId,tokenKey,roles)=>dispatch(setUserCredentials(userId,tokenKey,roles)),
    }
  };
export default connect(mapStateToProps,mapDispatchToProps)(Login);