
import '../styles/Login.css'
import React from 'react';
import $ from 'jquery'
import loadingAnimation from "../images/Loading_icon.gif"

class Login extends React.Component{
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.makeRequest=this.makeRequest.bind(this)
        this.onClickPasswordVisible = this.onClickPasswordVisible.bind(this);
        // this.getCookie=this.getCookie.bind(this)

        this.state={
            email:"",
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
    async makeRequest(){
        try{

            const response = await fetch('https://localhost:44364/api/account/token', {
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
                        //this.props.setCredentials(data.access_token,data.userId);
                        this.setState({error:""})
                        //window.location = '/'
                        console.log('access_token = '+ data.access_token);
                        console.log('userId = '+ data.userId);
                        // <AuthenticationRegistration authorized={true}></AuthenticationRegistration>
                    } else {
                        // window.location = '/authorization'
                        // this.setState({error:"Invalid email or password",loading:""})
                        this.setState({error:data.errorText,loading:""})
                        console.log(data);
                        console.log(response.status, response.errorText)
                    }
        
            //const data = await response.json()
        }
        catch{

        }
       
    }
    handleForm(e) {
        e.preventDefault()
        //console.log(e.target)
        const {email, password} = e.target
        this.setState({
            email:email.value,
            password:password.value,
            loading:loadingAnimation
        }
        ,()=>this.makeRequest())
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
                    <form onSubmit={this.handleForm} className='d-flec flex-column justify-content-center align-items-center'>
                        <div class="mb-3">
                            <input id="username" type="username" placeholder="Enter your username" required="required" title="Your username" name = "email" />
                        </div>
                        <div class="mb-3">
                            <div className="password-wrapper">
                                <input id="password" type="password"  placeholder="Enter your password" required="required" title="Your password" name = "password" />
                                <div onClick={e => this.onClickPasswordVisible(e)} className="eye"></div>
                            </div>
                        </div>
                        <div className="text-center">
                                        {animation}
                                    <div style={{color:"red"}}><h3 style={{fontSize:"1.25em"}}>{this.state.error}</h3></div>
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
}

export default Login


//import '../styles/Login.css'
// import React from 'react';
// import $ from 'jquery'
// function Login(){

//     function onClickPasswordVisible(e){
//         e.preventDefault()
//         var inp_password = document.getElementById('password')
//         if(inp_password.type == 'password'){
//             inp_password.type = 'username'
//         }else{
//             inp_password.type = 'password'
//         }
//     }

//     return(
//         <>
//             <div className="login__container">   
//                 <div className='backgr'></div>
//                 <img  className='img-logo' src="https://mystat.itstep.org/assets/images/logo.png?v=cce222be7d237f6d95418ecb8c5529b8" />

//                 <div className="form__container">
//                     <form className='d-flec flex-column justify-content-center align-items-center'>
//                         <div class="mb-3">
//                             <input id="username" type="username" placeholder="Enter your usrname" required="required" title="Your username" />
//                         </div>
//                         <div class="mb-3">
//                             <div className="password-wrapper">
//                                 <input id="password" type="password"  placeholder="Enter your password" required="required" title="Your password" />
//                                 <div onClick={e => onClickPasswordVisible(e)} className="eye"></div>
//                             </div>
//                         </div>
//                         <button type="submit" class="btn-login">Submit</button>
//                         <span className="span-text"><a href='/'>Forgot your password?</a></span>
//                     </form>
//                 </div>
                
//                 <div className="languages">
//                     <ul className="row">
//                         <li className="col-2">ru</li>
//                         <li className="col-2">eu</li>
//                         <li className="col-2">bg</li>
//                         <li className="col-2">pt</li>
//                         <li className="col-2">ua</li>
//                         <li className="col-2">ro</li>
//                         <li className="col-2">ge</li>
//                         <li className="col-2">az</li>
//                         <li className="col-2">cs</li>
//                         <li className="col-2">sk</li>
//                         <li className="col-2">es</li>
//                         <li className="col-2">pl</li>
//                         <li className="col-2">kz</li>
//                         <li className="col-2">fr</li>
//                         <li className="col-2">uz</li>
//                         <li className="col-2">vi</li>
//                         <li className="col-2">de</li>
//                     </ul>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Login