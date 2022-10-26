import React, { Component } from "react";
import { connect } from "react-redux";
import { Host } from "../Host"
import "../../styles/index.css"
import "../../styles/Tasks/HomeTasks.css"

import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import GeneralHeader from "../Headers/GeneralHeader";

class HomeTasks extends Component {
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
                        <div className="d-flex flex-row justify-content-between m-2 p-2">
                            <div className="d-flex flex-row">
                                <div style={{ margin: "0px 5px 0px 5px", color: "#667080" }}>
                                    Завдання
                                </div>
                                <div style={{ margin: "0px 5px 0px 5px", color: "#333333", fontStyle: "bold" }}>
                                    Домашні завдання
                                </div>
                            </div>

                            <div className="d-flex flex-row" >
                                <div style={{ margin: "0px 5px 0px 5px" }}>
                                    <select>
                                        <option>Група 1</option>
                                        <option>Група 2</option>
                                    </select>
                                </div>
                                <div style={{ margin: "0px 5px 0px 5px" }}>
                                    <select>
                                        <option>Предмет 1</option>
                                        <option>Предмет 2</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Нове завдання
                            </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Завантажити завдання</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div>
                                                <label htmlFor="subject">Предмет</label>
                                                <select id="subject" name="subject" className="form-select" required={true}>
                                                    {/* <option key={"subject" + subject.id} value={subject.title}>{subject.title}</option> */}
                                                    <option value={1}>Алгебра</option>
                                                    <option value={2}>Геометрія</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="theme">Тема уроку</label>
                                                {/* <select id="theme" name="theme" className="form-select" required={true}>
                                                    <option value={1}>Алгебра</option>
                                                    <option value={2}>Геометрія</option>
                                                </select> */}
                                                <input type="text" className="form-control" id="theme" name="theme" required></input>
                                            </div>
                                            <div>
                                                <label htmlFor="comment">Додати коментар</label>
                                                <textarea className="form-control" id="theme" name="theme"></textarea>
                                            </div>
                                            <div>
                                                <label htmlFor="file">Додати файл</label>
                                                <input type="file" className="form-control" id="file" name="file"></input>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary">Відправити</button>
                                        </div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps)(HomeTasks);
