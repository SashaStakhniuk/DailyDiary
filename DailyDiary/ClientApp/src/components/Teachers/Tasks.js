import React, { Component } from "react";
import { connect } from "react-redux";
import { Host } from "../Host"
import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import GeneralHeader from "../Headers/GeneralHeader";

class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} />
                    </div>
                    <div className="generalSide">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                Завдання
                            </div>
                            <div>
                                <select>
                                    <option>Мої предмети</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <div>
                                <a href="/teacher-page/home-tasks"> Домашні завдання</a>
                            </div>
                            <div>
                                <a href="/teacher-page/home-tasks"> Класні завдання</a>
                            </div>
                            <div>
                                <a href="/teacher-page/home-tasks"> Контрольні роботи</a>
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
