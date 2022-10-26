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
        return (
            <div>
                <form onSubmit={this.handleForm} className="centered">
                    <div className="header__logo__container">
                        <svg width="125" height="31" viewBox="0 0 125 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.70869 0H0V16.6926L71.8481 16.6927V31H81.7583V28.5815H74.444V16.6927H85.585V31H88.1808V16.6927H93.7807V31H96.3765V18.5676L104.787 31H107.548V16.6927H113.145V31H124.142V28.5815H115.741V23.5305H123.344V21.1341H115.741V16.726H123.876V14.3074H74.4219V9.58201L80.7227 0H77.657L73.1703 7.15788L68.7253 0H65.5252L71.826 9.58201V14.3074H61.1652L57.9615 9.09172C58.9046 8.87431 59.7144 8.4548 60.3741 7.82216C61.2375 7.00868 61.6601 5.94871 61.6601 4.68911C61.6601 3.12226 61.1328 1.89097 60.006 1.10987C58.9333 0.351619 57.5128 0 55.7963 0H50.686V14.3074H44.4L38.2567 0H36.0471L29.8634 14.3074H23.5821V0H20.9863V14.3074H12.0092C12.6861 13.6763 13.2401 12.9039 13.6736 11.9975L13.6748 11.995C14.1968 10.8876 14.4539 9.66866 14.4539 8.34628C14.4539 7.02452 14.197 5.81224 13.6742 4.71846C13.158 3.62399 12.4697 2.73197 11.6034 2.0576C10.762 1.38799 9.83356 0.880698 8.82014 0.537279C7.80789 0.1795 6.76998 0 5.70869 0ZM53.2819 6.98186V2.37421H55.6189C56.8897 2.37421 57.753 2.6036 58.2875 2.98496C58.7909 3.34414 59.0642 3.88246 59.0642 4.68911C59.0642 5.45742 58.7849 5.98905 58.2411 6.35929C57.6628 6.753 56.7873 6.98186 55.5524 6.98186H53.2819ZM2.59585 14.274V2.41854H5.2654C6.34892 2.41854 7.3025 2.59442 8.13447 2.93539L8.14362 2.93894C8.9996 3.27028 9.669 3.7175 10.1698 4.271L10.1739 4.2754C10.6938 4.83637 11.0884 5.46297 11.3606 6.15721C11.6328 6.85134 11.7694 7.57985 11.7694 8.34628C11.7694 9.11271 11.6328 9.84122 11.3606 10.5354C11.0883 11.2299 10.6932 11.8648 10.1718 12.4415C9.66984 12.9824 8.99803 13.4309 8.13908 13.7776C7.30572 14.1051 6.35042 14.274 5.2654 14.274H2.59585ZM39.816 10.1071H34.3982L37.1071 3.5779L39.816 10.1071ZM53.2819 14.3074V9.35607H55.1566L58.0885 14.3074H53.2819ZM32.6659 14.3074L33.3852 12.5699H40.8308L41.5594 14.3074H32.6659ZM104.952 26.6195L98.1692 16.6927H104.952V26.6195Z" fill="#F2F2F2" />
                        </svg>

                        {/* <span className="span" style={{ color: "#333333", borderRadius: "5px", borderColor: "#333333", padding: "5px" }}>Logo</span> */}
                        {/* <span className="service__name" style={{ color: "#333333" }}>Service name</span> */}
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
                            <div onClick={e => this.onClickPasswordVisible(e)} className="eye"></div>
                        </div>
                    </div>
                    <div>
                        <a className='login-a' href='/passwordreset'>Забули пароль?</a>
                    </div>
                    <span className="text-center">
                        {this.state.loading !== "" ?
                            <div style={{ marginBottom: '10px', width: '50px', height: '50px' }}>
                                <div>
                                    <img style={{ width: "40px" }} src={this.state.loading} alt="..." />
                                </div>
                            </div>
                            :
                            <></>
                        }
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