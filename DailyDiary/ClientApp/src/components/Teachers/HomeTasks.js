import React, { Component } from "react";
import { connect } from "react-redux";
import { Host } from "../Host"
import "../../styles/index.css"
import "../../styles/Tasks/HomeTasks.css"
import axios from "axios"

import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import GeneralHeader from "../Headers/GeneralHeader";

class HomeTasks extends Component {
    constructor(props) {
        super(props)

        this.uploadHomework = this.uploadHomework.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.getTeacherSubjects = this.getTeacherSubjects.bind(this);
        this.getTeacherSubgroupsByTeacherSubject = this.getTeacherSubgroupsByTeacherSubject.bind(this);

        this.state = {
            selectedSubjectId: 0,
            selectedSubgroupId: 0,
            comment: "",
            file: "",
            fileName: "",
            deadline: "0001-01-01",
            teacherSubjects: [],
            teacherSubgroups: []
        }
    }
    componentDidMount() {
        this.getTeacherSubjects();
        // this.getTeacherSubgroupsByTeacherSubject();
    }
    async getTeacherSubjects() {
        try {
            const response = await fetch(`${Host}/api/teacher/getTeacherSubjectsByUserId/${this.props.credentials.userId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    selectedSubjectId: data[0].id,
                    teacherSubjects: data
                })
                console.log(data)
                this.getTeacherSubgroupsByTeacherSubject(data[0].id);
            }
            else {
                const data = await response.text();
                window.alert(data);

            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getTeacherSubgroupsByTeacherSubject(subjectId) {
        try {
            const response = await fetch(`${Host}/api/teacher/GetTeacherSubgroupsByTeacherSubject/details?userId=${this.props.credentials.userId}&&subjectId=${subjectId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    selectedSubgroupId: data[0].id,
                    teacherSubgroups: data
                })
            }
            else {
                const data = await response.text();
                window.alert(data);

            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    saveFile(e) {
        console.log(e.target.files);
        if (e.target.files[0].size <= 104857600) {
            this.setState({
                file: e.target.files[0],
                fileName: e.target.files[0].name
            }
                , () => console.log(this.state)
            )
        }
        else {
            window.alert("File size can't be > 100Mb");
        }
    }
    async uploadHomework() {
        try {
            const formData = new FormData();
            formData.append("formFile", this.state.file);
            formData.append("fileName", this.state.fileName);
            formData.append("deadline", this.state.deadline);
            formData.append("theme", this.state.theme);
            formData.append("comment", this.state.comment);
            formData.append("teacherUserId", this.props.credentials.userId);
            formData.append("subjectId", this.state.selectedSubjectId);
            formData.append("subgroupId", this.state.selectedSubgroupId);

            // console.log(formData.values());

            const response = await axios.post(`${Host}/api/file/AddNewHomework`, formData);
                // .then(function (response) {
                //     console.log(response.data);
                //     console.log(response.status);
                //     console.log(response.statusText);
                //     console.log(response.headers);
                //     console.log(response.config);
                // });
            let data = response.data;
            console.log(data)

        }
        catch (e) {
            console.log(e.response);
            const data = e.response.data;
            console.log(data)
            for (var key in data) {
                // skip loop if the property is from prototype
                if (!data.hasOwnProperty(key)) continue;
            
                var obj = data[key];
                for (var prop in obj) {
                    // skip loop if the property is from prototype
                    if (!obj.hasOwnProperty(prop)) continue;
            
                    // your code
                    alert(obj[prop]);
                }
            }
        }
    }
    onSubjectChange = (e) => {
        this.getTeacherSubgroupsByTeacherSubject(e.target.value);
        this.setState({
            selectedSubjectId: e.target.value
        });
    }
    onSubgroupChange = (e) => {
        this.setState({
            selectedSubgroupId: e.target.value
        });
    }
    onNewHomeworkSubmit = (e) => {
        e.preventDefault();
        const { theme, comment, deadline } = e.target;

        this.setState({
            theme: theme.value,
            comment: comment.value,
            deadline: deadline.value
        }
            , () => this.uploadHomework())

    }
    render() {
        let subjects = <select className="form-select" name="subject" id="subject" defaultValue={this.state.selectedSubjectId} onChange={e => this.onSubjectChange(e)}>
            {this.state.teacherSubjects.length > 0 ?
                this.state.teacherSubjects.map(subject =>
                    <option key={"subject" + subject.id} value={subject.id}>{subject.title}</option>
                )
                :
                <option value="0">No one subject found</option>
            }
        </select>
        let groups = <select className="form-select" name="subgroup" id="subgroup" defaultValue={this.state.selectedSubgroupId} onChange={e => this.onSubgroupChange(e)}>
            {this.state.teacherSubgroups.length > 0 ?
                this.state.teacherSubgroups.map(subgroup =>
                    <option key={"subgroup" + subgroup.id} value={subgroup.id}>{subgroup.title}</option>
                )
                :
                <option value="0">No one group found</option>
            }
        </select>
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
                                    {subjects}
                                </div>
                                <div style={{ margin: "0px 5px 0px 5px" }}>
                                    {groups}
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
                                        <form onSubmit={e => this.onNewHomeworkSubmit(e)}>
                                            <div className="modal-body modal-body-content">

                                                <div>
                                                    <label htmlFor="subject">Предмет:</label>
                                                    {subjects}
                                                </div>

                                                <div>
                                                    <label htmlFor="subgroup">Група</label>
                                                    {groups}
                                                </div>

                                                {/* <div>
                                                <label htmlFor="theme">Для груп:</label>
                                                <div id="theme">
                                                    {this.state.teacherSubgroups.length > 0 ?
                                                        this.state.teacherSubgroups.map(subgroup =>
                                                            <div key={"subgroup" + subgroup.id} className="form-check">
                                                                <input className="form-check-input" type="checkbox" id={"inlineCheckbox_" + subgroup.id} value={subgroup.id} />
                                                                <label className="form-check-label" htmlFor={"inlineCheckbox_" + subgroup.id}>{subgroup.title}</label>
                                                            </div>
                                                        )
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            </div> */}
                                                <div>
                                                    <label htmlFor="theme">Тема:</label>
                                                    <input type="text" className="form-control" id="theme" name="theme" required></input>
                                                </div>
                                                <div>
                                                    <label htmlFor="comment">Додати коментар</label>
                                                    <textarea className="form-control" id="comment" name="comment"></textarea>
                                                </div>
                                                <div>
                                                    <label htmlFor="file">Додати файл</label>
                                                    <input type="file" className="form-control" id="file" name="file" onChange={this.saveFile}></input>
                                                </div>
                                                <div>
                                                    <label htmlFor="deadline">Дедлайн</label>
                                                    <input className="form-control" id="deadline" type='date' name="deadline"></input>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-primary">Відправити</button>
                                                {/* <button type="submit" className="btn btn-primary" onClick={() => this.uploadHomework()}>Відправити</button> */}
                                            </div>
                                        </form>
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
