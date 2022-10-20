import '../../styles/Login.css'
import React from 'react';
import { connect } from "react-redux";
import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import { Role } from '../Role'
import loadingAnimation from "../../images/Loading_icon.gif"

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.handleForm = this.handleForm.bind(this)
        this.makeRequest = this.makeRequest.bind(this)
        this.onClickPasswordVisible = this.onClickPasswordVisible.bind(this);
        // this.getCookie=this.getCookie.bind(this)

        this.state = {
            userName: "",
            password: "",
            error: "",
            loading: ""
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
    async makeRequest(userNameValue, passwordValue) {
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
        try {

            // console.log(userNameValue, passwordValue);

            if (userNameValue === undefined || passwordValue === undefined) {
                return 0;
            }
            const datasToSend = {
                username: userNameValue,
                password: passwordValue
            }

            const response = await fetch('https://localhost:44364/api/account/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            })

            const data = await response.json()
            if (response.ok === true) {
                console.log(data)
                sessionStorage.setItem('access_token', data.access_token);
                sessionStorage.setItem('userId', data.userId);
                sessionStorage.setItem('roles', data.roles);
                //  sessionStorage.setItem('userEmail', data.userEmail);
                // this.setState({error:"",loading:""})
                this.setState({ error: "" })
                // this.props.setCredentials(data.access_token,data.userId,data.roles);
                data.roles.forEach(role => {
                    if (role == Role.MainAdmin || role == Role.Admin) {
                        window.location = '/admin'
                    }
                    else if (role == Role.Student) {
                        window.location = `/student-page`
                    }
                    else if (role == Role.Teacher) {
                        window.location = '/teacher-page'
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
                this.setState({ error: data.error, loading: "" })
                console.log(data);
                console.log(response.status, response.error)
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
        const { userName, password } = e.target
        const userNameValue = userName.value;
        const passwordValue = password.value;
        // console.log(userNameValue, passwordValue);
        this.setState({
            userName: userNameValue,
            password: passwordValue,
            loading: loadingAnimation
        }
        )
        this.makeRequest(userNameValue, passwordValue);

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
                    <div style={{ marginBottom: "20px" }}>Будь ласка, введіть свою інформацію для входу</div>
                    <div className="form-input">
                        <div>Логін</div>
                        <input id="username" type="username" className="inputForm" defaultValue={"SashaLogin"} placeholder="JohnDoe_123123" required="required" title="Your username" name="userName" />
                    </div>
                    <div className="form-input">
                        <div>Пароль</div>
                        <div className="password-wrapper">
                            <input id="password" type="password" className="inputForm" defaultValue={"Qwerty1!"} placeholder="*************" required="required" title="Your password" name="password" />
                            {/* <div onClick={e => this.onClickPasswordVisible(e)} className="eye"></div> */}
                        </div>
                    </div>
                    <div>
                        <a className='login-a' href='/passwordreset'>Забули пароль?</a>
                    </div>
                    <span className="text-center">
                            {animation}
                        <div style={{ color: "red" }}><h3 style={{ fontSize: "1.25em" }}>{this.state.error}</h3></div>
                    </span>
                    <div>
                        <button type="submit" className="general-button">Вхід</button>
                    </div>
                </form >
            </div >
        )
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setCredentials: (userId, tokenKey, roles) => dispatch(setUserCredentials(userId, tokenKey, roles)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);