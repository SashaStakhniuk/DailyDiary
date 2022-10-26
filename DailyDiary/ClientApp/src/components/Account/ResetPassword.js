import '../../styles/Login.css'
import React from 'react';
// import { connect } from "react-redux";
// import { Role } from '../Role'
import { Host } from '../Host'

import loadingAnimation from "../../images/Loading_icon.gif"

class ResetPassword extends React.Component {

    constructor(props) {
        super(props)
        this.handleForm = this.handleForm.bind(this)
        this.checkUserByEmailAsync = this.checkUserByEmailAsync.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.onClickPasswordVisible = this.onClickPasswordVisible.bind(this);
        // this.getCookie=this.getCookie.bind(this)

        this.state = {
            email: "",
            password: "",
            token:"",
            error: "",
            loading: "",
            message: "Будь ласка, введіть ваші дані",
            emailConfirmed:false
        }
    }
    componentDidMount() {
         console.log(this.props);
        // let params = queryString.parse(this.props.location.search)
        // console.log(params);
        if( this.props.location.search !==undefined && this.props.location.search !==""){
            var searchString = this.props.location.search;
            let email = (new URLSearchParams(searchString)).get("email")
            // let token = (new URLSearchParams(searchString)).get("token") // + instead of %
            var index = 0;
            // your code here
            for (var i = 0; i < searchString.length; i++) {
              
                if (searchString[i] === '=') {
                    index++;
                }       
                if (index === 2) {
                    index = i;
                    break;
                }
            } 
            const token = searchString.substr(index+1);
            console.log(email);
            console.log(token);
            this.setState({
                email,
                token,
                emailConfirmed:true,
                message:"Особу підтвердженно.\nВведіть новий пароль."
            }
            // ,()=>console.log(this.state)
            )
        }
        else{
            this.setState({
                email:"",
                token:"",
                emailConfirmed:false,
                message:"Будь ласка, введіть ваші дані"
            }
            // ,()=>console.log(this.state)
            )
        }
       
    }

    onClickPasswordVisible(e) {
        e.preventDefault()
        var inp_password = document.getElementById('password')
        if (inp_password.type == 'password') {
            inp_password.type = 'username'
        } else {
            inp_password.type = 'password'
        }
    }
    async checkUserByEmailAsync(email) {
        try {

            // console.log(userNameValue, passwordValue);

            if (email === undefined) {
                return 0;
            }
            const datasToSend = {
                email: email
            }

            const response = await fetch(`${Host}/api/account/CheckUserByEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            })
            const data = await response.text()

            if (response.ok === true) {
                console.log(data)
                this.setState({
                    error: "",
                    // message: data,
                    message:"Посилання для відновлення паролю надіслано на пошту.",
                    loading: ""
                })

            } else {
                this.setState({ error: data, loading: "", message: "" })
                console.log(data);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async resetPassword() {
        try {
            // console.log(userNameValue, passwordValue);
            const datasToSend = {
                email: this.state.email,
                token:this.state.token,
                newPassword:this.state.password
            }
            const response = await fetch(`${Host}/api/account/ResetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            })
            const data = await response.text()

            if (response.ok === true) {
                console.log(data)
                this.setState({
                    error: "",
                    // message: data,
                    message: "Пароль змінено успішно",
                    loading: ""
                }
                ,()=> setTimeout(()=> window.location = '/', 2500)
                )

            } else {
                this.setState({ error: data, loading: "", message: "" })
                console.log(data);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    handleForm(e) {
        e.preventDefault()
        this.setState({ loading: loadingAnimation })
        // console.log(e.target)
        const { email,password } = e.target

        // console.log(userNameValue, passwordValue);
        if(this.state.emailConfirmed){
            this.setState({
                email: email.value,
                password : password.value
            }
            ,()=>this.resetPassword()
            )
        }
        else{
            this.checkUserByEmailAsync(email.value);
            this.setState({
                email: email.value,
            })
        }
      
    

    }
    render() {
        var animation = ""
        if (this.state.loading !== "") {
            animation =
                <div style={{ marginBottom: '10px', width: '50px', height: '50px' }}>
                    <div>
                        <img style={{ width: "40px" }} src={this.state.loading} alt="..." />
                    </div>
                </div>
        }
        return (
            <div>
                <form onSubmit={this.handleForm} className="centered">
                    <div className="header__logo__container">
                        <span className="span" style={{ color: "#333333", borderRadius: "5px", borderColor: "#333333", padding: "5px" }}>Logo</span>
                        <span className="service__name" style={{ color: "#333333" }}>Service name</span>
                    </div>
                   
                   
                    <div style={{ marginBottom: "20px" }}>{this.state.message}</div>

                    {this.state.emailConfirmed?
                    <>
                    <div className="form-input">
                        <div>Пошта</div>
                        <input id="email" type="email" className="inputForm" disabled defaultValue={this.state.email} placeholder="JohnDoe@gmail.com" required="required" title="Your email" name="email" />
                    </div>
                    <div className="form-input">
                        <div>Новий пароль</div>
                        <div className="password-wrapper">
                            <input id="password" type="password" className="inputForm" placeholder="*************" required="required" title="Your password" name="password" />
                            <div onClick={e => this.onClickPasswordVisible(e)} className="eye"></div> 
                        </div>
                    </div>
                    </>
                   :
                   <div className="form-input">
                       <div>Пошта</div>
                       <input id="email" type="email" className="inputForm" defaultValue={this.state.email} placeholder="JohnDoe@gmail.com" required="required" title="Your email" name="email" />
                   </div>
                    }

                    <span className="text-center">
                        {animation}
                    </span>
                    <span className="text-center">
                        <div style={{ color: "red" }} className="text-center"><h3 style={{ fontSize: "0.8em" }}>{this.state.error}</h3></div>
                         {/* <div style={{ color: "green" }} className="text-center"><h3 style={{ fontSize: "0.8em" }}>{this.state.message}</h3></div> */}
                    </span>

                    <div>
                    {this.state.emailConfirmed?
                        <button type="submit" className="general-button">Відновити пароль</button>
                        :
                        <button type="submit" className="general-button">Отримати повідомлення</button>
                        
                    }
                    </div>
    
                    <div>
                        <a className='login-a-back' href='/'>Повернутися на сторінку входу</a>
                    </div>
                </form >
            </div >
        )
    }
}

export default ResetPassword;