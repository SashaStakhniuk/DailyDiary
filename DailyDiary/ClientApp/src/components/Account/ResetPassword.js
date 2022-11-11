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
            token: "",
            error: "",
            loading: "",
            message: "Будь ласка, введіть ваші дані",
            emailConfirmed: false
        }
    }
    componentDidMount() {
        console.log(this.props);
        // let params = queryString.parse(this.props.location.search)
        // console.log(params);
        if (this.props.location.search !== undefined && this.props.location.search !== "") {
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
            const token = searchString.substr(index + 1);
            console.log(email);
            console.log(token);
            this.setState({
                email,
                token,
                emailConfirmed: true,
                message: "Особу підтвердженно.\nВведіть новий пароль."
            }
                // ,()=>console.log(this.state)
            )
        }
        else {
            this.setState({
                email: "",
                token: "",
                emailConfirmed: false,
                message: "Будь ласка, введіть ваші дані"
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
                    message: "Посилання для відновлення паролю надіслано на пошту.",
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
                token: this.state.token,
                newPassword: this.state.password
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
                    , () => setTimeout(() => window.location = '/', 2500)
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
        const { email, password } = e.target

        // console.log(userNameValue, passwordValue);
        if (this.state.emailConfirmed) {
            this.setState({
                email: email.value,
                password: password.value
            }
                , () => this.resetPassword()
            )
        }
        else {
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
                        <svg width="125" height="31" viewBox="0 0 125 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.70869 0H0V16.6926L71.8481 16.6927V31H81.7583V28.5815H74.444V16.6927H85.585V31H88.1808V16.6927H93.7807V31H96.3765V18.5676L104.787 31H107.548V16.6927H113.145V31H124.142V28.5815H115.741V23.5305H123.344V21.1341H115.741V16.726H123.876V14.3074H74.4219V9.58201L80.7227 0H77.657L73.1703 7.15788L68.7253 0H65.5252L71.826 9.58201V14.3074H61.1652L57.9615 9.09172C58.9046 8.87431 59.7144 8.4548 60.3741 7.82216C61.2375 7.00868 61.6601 5.94871 61.6601 4.68911C61.6601 3.12226 61.1328 1.89097 60.006 1.10987C58.9333 0.351619 57.5128 0 55.7963 0H50.686V14.3074H44.4L38.2567 0H36.0471L29.8634 14.3074H23.5821V0H20.9863V14.3074H12.0092C12.6861 13.6763 13.2401 12.9039 13.6736 11.9975L13.6748 11.995C14.1968 10.8876 14.4539 9.66866 14.4539 8.34628C14.4539 7.02452 14.197 5.81224 13.6742 4.71846C13.158 3.62399 12.4697 2.73197 11.6034 2.0576C10.762 1.38799 9.83356 0.880698 8.82014 0.537279C7.80789 0.1795 6.76998 0 5.70869 0ZM53.2819 6.98186V2.37421H55.6189C56.8897 2.37421 57.753 2.6036 58.2875 2.98496C58.7909 3.34414 59.0642 3.88246 59.0642 4.68911C59.0642 5.45742 58.7849 5.98905 58.2411 6.35929C57.6628 6.753 56.7873 6.98186 55.5524 6.98186H53.2819ZM2.59585 14.274V2.41854H5.2654C6.34892 2.41854 7.3025 2.59442 8.13447 2.93539L8.14362 2.93894C8.9996 3.27028 9.669 3.7175 10.1698 4.271L10.1739 4.2754C10.6938 4.83637 11.0884 5.46297 11.3606 6.15721C11.6328 6.85134 11.7694 7.57985 11.7694 8.34628C11.7694 9.11271 11.6328 9.84122 11.3606 10.5354C11.0883 11.2299 10.6932 11.8648 10.1718 12.4415C9.66984 12.9824 8.99803 13.4309 8.13908 13.7776C7.30572 14.1051 6.35042 14.274 5.2654 14.274H2.59585ZM39.816 10.1071H34.3982L37.1071 3.5779L39.816 10.1071ZM53.2819 14.3074V9.35607H55.1566L58.0885 14.3074H53.2819ZM32.6659 14.3074L33.3852 12.5699H40.8308L41.5594 14.3074H32.6659ZM104.952 26.6195L98.1692 16.6927H104.952V26.6195Z" fill="#AEB9F1" />
                        </svg>
                    </div>


                    <div style={{ marginBottom: "20px" }}>{this.state.message}</div>

                    {this.state.emailConfirmed ?
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
                        {this.state.emailConfirmed ?
                            <button type="submit" className="enter-button" >Відновити пароль</button>
                            :
                            <button type="submit" className="enter-button" >Отримати повідомлення</button>

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