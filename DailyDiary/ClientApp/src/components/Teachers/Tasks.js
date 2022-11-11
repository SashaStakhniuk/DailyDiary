import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import '../../styles/Navigations/TaskLink.css'
import { Host } from "../Host"
import homePhoto from "../../images/bx_home-heart.png"
import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import GeneralHeader from "../Headers/GeneralHeader";

class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            svg: <></>
        }
    }
    componentDidMount() {
        // const incomingRole = this.props?.location?.state?.role;
        // if(incomingRole!==undefined){

        // }
        this.setState({
            svg: <img src={homePhoto} alt=" "></img>
        })
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar menuItemToSelect={1} role={this.props.credentials.roles} />
                    </div>
                    <div className="generalSide">
                        <div className="d-flex flex-row justify-content-between m-2 p-2">
                            <div>
                                Завдання
                            </div>
                            <div>
                                <select>
                                    <option>Мої предмети</option>
                                </select>
                            </div>
                        </div>
                        <div className="links-container">
                            {/* <div className="task-link"> */}
                            <div>
                                <NavLink to="/teacher-page/home-tasks" className="task-link">
                                    <span >Домашні завдання</span>
                                    {this.state.svg}
                                </NavLink>
                            </div>
                            {/* <a href="/teacher-page/home-tasks"> Домашні завдання</a> */}
                            {/* </div> */}
                            <div>
                                <NavLink to="/teacher-page/home-tasks" className="task-link">
                                    <span>Класні завдання</span>
                                    {this.state.svg}
                                </NavLink>
                                {/* <a href="/teacher-page/home-tasks"> Класні завдання</a> */}
                            </div>
                            <div>
                                <NavLink to="/teacher-page/home-tasks" className="task-link">
                                    <span>Контрольні роботи</span>
                                    {this.state.svg}
                                </NavLink>
                                {/* <a href="/teacher-page/home-tasks"> Контрольні роботи</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}

export default connect(mapStateToProps)(Tasks);
