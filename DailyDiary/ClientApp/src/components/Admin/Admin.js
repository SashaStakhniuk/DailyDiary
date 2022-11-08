import React, { Component } from "react";
import { connect } from "react-redux";
import { Host } from "../Host"
import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import GeneralHeader from "../Headers/GeneralHeader";
//  import jwt_decode from "jwt-decode";

class Admin extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        //  console.log(JSON.parse(Buffer.from(this.props.credentials.tokenKey.split('.')[1], 'base64').toString()));
        // var decoded = jwt_decode(this.props?.credentials?.tokenKey);
        // console.log(decoded);
    }
    setTheme = (e) => {
        const theme = e.target.value
        const root = document.querySelector(':root');
        if (+theme === 0) {
            root.style.setProperty('--white', '#ffffff');
            root.style.setProperty('--background', '#ffffff');
            root.style.setProperty('--headerColor', '#AEB9F1');
            root.style.setProperty('--navMenuColor', '#ffffff');//меню
            root.style.setProperty('--violet', '#AEB9F1');
            root.style.setProperty('--subjectTextColor', '#4F4F4F');
            root.style.setProperty('--selectText', '#A5B0CC');

            root.style.setProperty('--red', '#DC2626');
            root.style.setProperty('--orange', '#F2982A');
            root.style.setProperty('--error', '#F87171');
            root.style.setProperty('--iconsColor', '#black');
            root.style.setProperty('--almostBlack', '#333333');
            root.style.setProperty('--white-icon-color', '#DADADA');
            root.style.setProperty('--text-gray', '#667080');
            root.style.setProperty('--text-gray2', '#333333');
        }
        else {
            root.style.setProperty('--white', '#22253B'); //
            root.style.setProperty('--background', '#2b2e4a');//фон
            root.style.setProperty('--headerColor', '#22253B');//хедер
            root.style.setProperty('--navMenuColor', '#22253B');//меню
            root.style.setProperty('--violet', '#a5b0cc');//іконки і кнопочки
            root.style.setProperty('--subjectTextColor', '#AEB9F1');
            root.style.setProperty('--selectText', '#AEB9F1');

            // root.style.setProperty('--red', '#DC2626');
            // root.style.setProperty('--orange', '#F2982A');
            // root.style.setProperty('--error', '#F87171');
            // root.style.setProperty('--iconsColor', '#black');
            // root.style.setProperty('--almostBlack', '#333333');
            // root.style.setProperty('--white-icon-color', '#DADADA');
            // root.style.setProperty('--subjectTextColor', '#4F4F4F');
            // root.style.setProperty('--text-gray', '#667080');
            // root.style.setProperty('--text-gray2', '#333333');
            // root.style.setProperty('--selectText', '#A5B0CC');
        }
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} menuItemToSelect={0} />
                    </div>
                    <div className="generalSide">

                        <div id="theme" className="m-2">
                            <div>
                                <label htmlFor="lightTheme">Light theme</label>
                                <input type="radio" id="lightTheme" name="theme" value="0" onClick={(e) => this.setTheme(e)} />
                            </div>
                            <div>
                                <label htmlFor="darkTheme">Dark theme</label>
                                <input type="radio" id="darkTheme" name="theme" value="1" onClick={(e) => this.setTheme(e)} />
                            </div>
                        </div>

                        <div className="d-flex flex-wrap justify-content-around m-3">
                            <div >
                                <a href="/admin/new-person" className="general-outline-button">Створити нового користувача</a>
                            </div>
                            <div >
                                <a href="/admin/edit-person" className="general-outline-button">Знайти користувача</a>
                            </div>
                            <div >
                                <a href="/admin/new-study-year" className="general-outline-button">Навчальні роки</a>
                            </div>
                            <div >
                                <a href="/admin/new-study-plan" className="general-outline-button">Навчальні плани</a>
                            </div>
                            <div >
                                <a href="/admin/groups" className="general-outline-button">Усі групи</a>
                            </div>
                            {/* <div >
                                <a href="/admin/edit-group" className="general-outline-button">Редагування груп</a>
                            </div> */}
                            <div >
                                <a href="/admin/teachers-distribution" className="general-outline-button">Розподілення викладачів по групах</a>
                            </div>
                            <div >
                                <a href="/admin/createoreditshedule" className="general-outline-button">Створення розкладу</a>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

// function mapDispatchToProps(dispatch){
//     return{
//         setCredentials:(userId,tokenKey,roles)=>dispatch(setUserCredentials(userId,tokenKey,roles)),
//     }
//   };
// export default connect(mapStateToProps,mapDispatchToProps)(Admin);

function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}
export default connect(mapStateToProps)(Admin);
// export default Admin;