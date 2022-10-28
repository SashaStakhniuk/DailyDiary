import GeneralHeader from "../Headers/GeneralHeader";
import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Host } from "../Host";
import { Role } from "../Role";
import HomeworkCard from "../GeneralComponents/HomeworkCard";
import '../../styles/Tasks/HomeworkCard.css'


class Student extends Component {
    constructor(props) {
        super(props);
        this.getStudentIdByUserId = this.getStudentIdByUserId.bind(this);
        this.getGivenStudentHomeworks = this.getGivenStudentHomeworks.bind(this);
        this.getCheckedHomeworksByStudentId = this.getCheckedHomeworksByStudentId.bind(this);
        this.getOnCheckingHomeworksByStudentId = this.getOnCheckingHomeworksByStudentId.bind(this);
        this.getOverdueStudentHomeworks = this.getOverdueStudentHomeworks.bind(this);
        this.setHomeworkToUploadId = this.setHomeworkToUploadId.bind(this)
        this.uploadStudentHomework = this.uploadStudentHomework.bind(this)
        this.state = {
            studentId: 0,
            uploadTaskId: 0,
            comment: "",
            file: "",
            fileName: "",
            fileType: "",
            givenHomeworks: [],
            checkedHomeworks: [],
            onCheckingHomeworks: [],
            overdueHomeworks: []
        }

    }
    componentDidMount() {
        this.getStudentIdByUserId();
    }
    async getStudentIdByUserId() {
        try {
            const response = await fetch(`${Host}/api/student/getStudentIdByUserId/${this.props.credentials.userId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    studentId: data,
                })
                this.getGivenStudentHomeworks(data);
                // this.getCheckedHomeworksByStudentId(data);
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getGivenStudentHomeworks(studentId) {
        try {
            if (studentId == undefined || studentId == 0) {
                return 0;
            }
            const response = await fetch(`${Host}/api/studentshomeworks/getHomeworksByStudentId/details?studentId=${studentId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    givenHomeworks: data,
                    checkedHomeworks: [],
                    onCheckingHomeworks: [],
                    overdueHomeworks: []
                })
                console.log(data);
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getOverdueStudentHomeworks(studentId) {
        try {
            if (studentId == undefined || studentId == 0) {
                return 0;
            }
            const response = await fetch(`${Host}/api/studentshomeworks/getHomeworksByStudentId/details?studentId=${studentId}&&overdue=${true}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    overdueHomeworks: data,
                    checkedHomeworks: [],
                    onCheckingHomeworks: [],
                    givenHomeworks: []
                })
                console.log(data);
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getCheckedHomeworksByStudentId(studentId) {
        try {
            if (studentId == undefined || studentId == 0) {
                return 0;
            }
            const response = await fetch(`${Host}/api/studentshomeworks/getCheckedHomeworksByStudentId/${studentId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    checkedHomeworks: data,
                    givenHomeworks: [],
                    onCheckingHomeworks: [],
                    overdueHomeworks: []
                })
                console.log(data);
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    async getOnCheckingHomeworksByStudentId(studentId) {
        try {
            if (studentId == undefined || studentId == 0) {
                return 0;
            }
            const response = await fetch(`${Host}/api/studentshomeworks/getOnCheckingHomeworksByStudentId/${studentId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    onCheckingHomeworks: data,
                    givenHomeworks: [],
                    checkedHomeworks: [],
                    overdueHomeworks: []
                })
                console.log(data);
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            console.log(e);
            window.alert(e);
        }
    }
    setHomeworkToUploadId(taskId) {
        console.log(taskId);
        this.setState({
            uploadTaskId: taskId
        })
    }
    async uploadStudentHomework() {
        try {
            const formData = new FormData();
            formData.append("taskId", this.state.uploadTaskId);
            formData.append("studentId", this.state.studentId);
            formData.append("fileName", this.state.fileName);
            formData.append("fileType", this.state.fileType);
            formData.append("formFile", this.state.file);
            formData.append("studentComment", this.state.comment);

            // console.log(formData.values());
            const response = await fetch(`${Host}/api/studentshomeworks/AddDoneHomework`,
                {
                    method: "post",
                    body: formData
                });
            const data = await response.text();
            // if (response.ok === true) {
            window.alert(data);
            // }
        }
        catch (e) {
            // console.log(e.response);
            // const data = e.response.data;
            console.log(e)
        }
    }
    onPassHomeworkSubmit = (e) => {
        e.preventDefault();
        const { comment } = e.target;
        this.setState({
            comment: comment.value
        }
            , () => this.uploadStudentHomework())
    }
    saveFile = (e) => {
        console.log(e.target.files);
        if (e.target.files[0].size <= 104857600) {
            this.setState({
                file: e.target.files[0],
                fileName: e.target.files[0].name,
                fileType: e.target.files[0].type
            }
                , () => console.log(this.state)
            )
        }
        else {
            window.alert("File size should be <= 100Mb");
        }
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
                        <div className="general-pagination-bar">
                            <div className="buttons-inline">
                                <button className="general-outline-button" onClick={() => this.getGivenStudentHomeworks(this.state.studentId)}>Поточні</button>
                                <button className="general-outline-button" onClick={() => this.getOverdueStudentHomeworks(this.state.studentId)}>Прострочені</button>
                                <button className="general-outline-button" onClick={() => this.getOnCheckingHomeworksByStudentId(this.state.studentId)}>На перевірці</button>
                                <button className="general-outline-button" onClick={() => this.getCheckedHomeworksByStudentId(this.state.studentId)}>Перевірені</button>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <svg style={{ transform: "rotate(180deg)" }} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.28448 0L2.19345e-05 1.28446L5.71484 7L2.19345e-05 12.7155L1.28448 14L8.28448 7L1.28448 0Z" fill="#4F4F4F" />
                                </svg>
                                <ul className="pagination-ul">
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                </ul>

                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.28448 0L2.19345e-05 1.28446L5.71484 7L2.19345e-05 12.7155L1.28448 14L8.28448 7L1.28448 0Z" fill="#4F4F4F" />
                                </svg>
                                <div style={{ marginLeft: "14px" }} className="d-flex flex-row align-items-center">
                                    <svg width="2" height="34" viewBox="0 0 2 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="2" height="34" rx="1" fill="#E9EBED" />
                                    </svg>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5004 25.5H14.4754C14.2588 25.5 14.0671 25.425 13.9004 25.275C13.7338 25.125 13.6338 24.9333 13.6004 24.7L13.3004 22.45C13.0338 22.3667 12.7631 22.2417 12.4884 22.075C12.2131 21.9083 11.9588 21.7333 11.7254 21.55L9.65043 22.45C9.43376 22.5333 9.22143 22.5417 9.01343 22.475C8.80476 22.4083 8.63376 22.275 8.50043 22.075L7.00043 19.45C6.88376 19.25 6.85043 19.0373 6.90043 18.812C6.95043 18.5873 7.05876 18.4083 7.22543 18.275L9.05043 16.9C9.0171 16.75 8.99643 16.6 8.98843 16.45C8.97976 16.3 8.97543 16.15 8.97543 16C8.97543 15.8667 8.97976 15.725 8.98843 15.575C8.99643 15.425 9.0171 15.2667 9.05043 15.1L7.22543 13.725C7.05876 13.5917 6.95043 13.4127 6.90043 13.188C6.85043 12.9627 6.88376 12.75 7.00043 12.55L8.50043 9.95C8.6171 9.75 8.78376 9.61667 9.00043 9.55C9.2171 9.48333 9.42543 9.49167 9.62543 9.575L11.7254 10.45C11.9588 10.2667 12.2131 10.096 12.4884 9.938C12.7631 9.77933 13.0338 9.65 13.3004 9.55L13.6004 7.3C13.6338 7.06667 13.7338 6.875 13.9004 6.725C14.0671 6.575 14.2588 6.5 14.4754 6.5H17.5004C17.7338 6.5 17.9338 6.575 18.1004 6.725C18.2671 6.875 18.3671 7.06667 18.4004 7.3L18.7004 9.55C19.0004 9.66667 19.2711 9.79567 19.5124 9.937C19.7544 10.079 20.0004 10.25 20.2504 10.45L22.3754 9.575C22.5754 9.49167 22.7798 9.48333 22.9884 9.55C23.1964 9.61667 23.3671 9.75 23.5004 9.95L25.0004 12.55C25.1171 12.75 25.1504 12.9627 25.1004 13.188C25.0504 13.4127 24.9421 13.5917 24.7754 13.725L22.9254 15.125C22.9588 15.2917 22.9754 15.4417 22.9754 15.575V16C22.9754 16.1333 22.9711 16.2707 22.9624 16.412C22.9544 16.554 22.9338 16.7167 22.9004 16.9L24.7254 18.275C24.9088 18.4083 25.0254 18.5873 25.0754 18.812C25.1254 19.0373 25.0838 19.25 24.9504 19.45L23.4504 22.05C23.3338 22.25 23.1671 22.3833 22.9504 22.45C22.7338 22.5167 22.5171 22.5083 22.3004 22.425L20.2504 21.55C20.0004 21.75 19.7464 21.925 19.4884 22.075C19.2298 22.225 18.9671 22.35 18.7004 22.45L18.4004 24.7C18.3671 24.9333 18.2671 25.125 18.1004 25.275C17.9338 25.425 17.7338 25.5 17.5004 25.5V25.5ZM16.0004 19C16.8338 19 17.5421 18.7083 18.1254 18.125C18.7088 17.5417 19.0004 16.8333 19.0004 16C19.0004 15.1667 18.7088 14.4583 18.1254 13.875C17.5421 13.2917 16.8338 13 16.0004 13C15.1671 13 14.4588 13.2917 13.8754 13.875C13.2921 14.4583 13.0004 15.1667 13.0004 16C13.0004 16.8333 13.2921 17.5417 13.8754 18.125C14.4588 18.7083 15.1671 19 16.0004 19ZM16.0004 17.5C15.5838 17.5 15.2298 17.354 14.9384 17.062C14.6464 16.7707 14.5004 16.4167 14.5004 16C14.5004 15.5833 14.6464 15.2293 14.9384 14.938C15.2298 14.646 15.5838 14.5 16.0004 14.5C16.4171 14.5 16.7711 14.646 17.0624 14.938C17.3544 15.2293 17.5004 15.5833 17.5004 16C17.5004 16.4167 17.3544 16.7707 17.0624 17.062C16.7711 17.354 16.4171 17.5 16.0004 17.5ZM15.0004 24H16.9754L17.3254 21.325C17.8421 21.1917 18.3088 21 18.7254 20.75C19.1421 20.5 19.5504 20.1833 19.9504 19.8L22.4254 20.85L23.4254 19.15L21.2504 17.525C21.3338 17.2583 21.3881 17 21.4134 16.75C21.4381 16.5 21.4504 16.25 21.4504 16C21.4504 15.7333 21.4381 15.4793 21.4134 15.238C21.3881 14.996 21.3338 14.75 21.2504 14.5L23.4254 12.85L22.4504 11.15L19.9254 12.2C19.5921 11.85 19.1921 11.5373 18.7254 11.262C18.2588 10.9873 17.7921 10.7917 17.3254 10.675L17.0004 8H15.0254L14.6754 10.675C14.1754 10.7917 13.7088 10.975 13.2754 11.225C12.8421 11.475 12.4254 11.7917 12.0254 12.175L9.55043 11.15L8.57543 12.85L10.7254 14.45C10.6421 14.7 10.5838 14.95 10.5504 15.2C10.5171 15.45 10.5004 15.7167 10.5004 16C10.5004 16.2667 10.5171 16.525 10.5504 16.775C10.5838 17.025 10.6421 17.275 10.7254 17.525L8.57543 19.15L9.55043 20.85L12.0254 19.8C12.4088 20.1833 12.8171 20.5 13.2504 20.75C13.6838 21 14.1588 21.1917 14.6754 21.325L15.0004 24Z" fill="#4F4F4F" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div id="homeworks" className="cards-container">

                            <div className="cards">
                                {this.state.givenHomeworks ?
                                    this.state.givenHomeworks.map(homework =>
                                        <HomeworkCard key={"homework_" + homework.id} task={homework} accessLevel={Role.Student} setHomeworkToUploadId={this.setHomeworkToUploadId} homeworksViewStatus="not-passed"></HomeworkCard>
                                    )
                                    :
                                    <></>}
                                {this.state.overdueHomeworks ?

                                    this.state.overdueHomeworks.map(homework =>
                                        <HomeworkCard key={"homework_" + homework.id} task={homework} accessLevel={Role.Student} setHomeworkToUploadId={this.setHomeworkToUploadId} homeworksViewStatus="not-passed"></HomeworkCard>
                                    )
                                    :
                                    <></>
                                }

                                {this.state.onCheckingHomeworks ?

                                    this.state.onCheckingHomeworks.map(homework =>
                                        <HomeworkCard key={"homework_" + homework.id} task={homework} accessLevel={Role.Student} setHomeworkToUploadId={this.setHomeworkToUploadId} homeworksViewStatus="on-checking"></HomeworkCard>
                                    )
                                    :
                                    <></>
                                }
                                {this.state.checkedHomeworks ?
                                    this.state.checkedHomeworks.map(homework =>
                                        <HomeworkCard key={"homework_" + homework.id} task={homework} accessLevel={Role.Student} setHomeworkToUploadId={this.setHomeworkToUploadId} homeworksViewStatus="passed"></HomeworkCard>
                                    )
                                    :
                                    <></>}
                            </div>
                        </div>
                        <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="modal">Завантажити завдання</h1>
                                        <button type="button" id="closeModalWindowButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form onSubmit={e => this.onPassHomeworkSubmit(e)}>
                                        <div className="modal-body modal-body-content">
                                            <div>
                                                <label htmlFor="file">Додати файл</label>
                                                <input type="file" className="form-control" id="file" name="file" onChange={this.saveFile}></input>
                                            </div>
                                            <div>
                                                <label htmlFor="comment">Додати коментар</label>
                                                <textarea className="form-control" id="comment" name="comment"></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer d-flex justify-content-end">
                                            <button type="submit" className="general-button">Відправити</button>
                                            {/* <button type="submit" className="btn btn-primary" onClick={() => this.uploadHomework()}>Відправити</button> */}
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}
export default connect(mapStateToProps)(Student);


// // import Header from '../Header'
// import React from 'react';
// // import '../../styles/App.css'
// // import '../../styles/HomeworkClassworkCard.css'
// // import { render } from 'pug';
// import NavigationBar from '../NavigationBar'
// import HomeworkClassworkView from '../GeneralComponents/HomeworkClassworkView';


// class Student extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             studentId: 0,
//             groupHomeworkId: 0,
//             studentComment: "",
//             performedHomeworkBase64: "",
//             homeworksToView: "",
//             // homeworksToView: <div className="text-center" style={{ color: "red" }}>
//             //                      <h1>No givenHomeworks yet...</h1>
//             //                  </div>,

//             // passed_homeworks: [],
//             // homeworks_under_review: [],
//             homeworksViewStatus: "",

//             givenHomeworks: [],
//             homeworksToSkip: 0,
//             homeworksToDisplay: 4,
//             statusMessage: ""
//         }
//         this.getSomeHomeworks = this.getSomeHomeworks.bind(this);
//         this.viewHomeworks = this.viewHomeworks.bind(this);
//         this.checkHomeworkDone = this.checkHomeworkDone.bind(this);
//         this.setHomeworkToUploadId = this.setHomeworkToUploadId.bind(this);
//         this.getBase64 = this.getBase64.bind(this);
//         this.handleFileInputChange = this.handleFileInputChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.UploadHomework = this.UploadHomework.bind(this);

//     }
//     componentDidMount() {
//         //console.log(this.props)
//         if (this.props.match && this.props.match.params.id) {
//             this.setState({
//                 studentId: this.props.match.params.id
//             }
//                 //,()=>console.log(this.checkHomeworkDone(1))
//                 , () => this.viewHomeworks()
//                 // ,()=> this.getSomeClassworks()
//             );
//         }
//     }
//     async viewHomeworks() {
//         await this.getSomeHomeworks();
//         // this.setState({
//         //     homeworksToView: this.state.givenHomeworks.length <= 0 ?
//         //         <div className="text-center" style={{ color: "red" }}>
//         //             <h1>No givenHomeworks yet...</h1>
//         //         </div>
//         //         :
//         //         <div className="my-container">
//         //             <div className="cards">
//         //                 {this.state.givenHomeworks.map(async (homework) =>
//         //                     await this.checkHomeworkDone(homework.groupHomeworkId) === true ?
//         //                         <HomeworkClassworkView
//         //                             key={'homework_' + homework.groupHomeworkId}
//         //                             homeworksViewStatus={"on-checking"}
//         //                             task={homework}
//         //                             accessLevel="student"
//         //                             getSomeHomeworks={this.getSomeHomeworksFromChild}
//         //                             setHomeworkToUploadId={this.setHomeworkToUploadId}
//         //                             homework={true}
//         //                         />
//         //                         :
//         //                         <HomeworkClassworkView
//         //                             key={'homework_' + homework.groupHomeworkId}
//         //                             homeworksViewStatus={"not-passed"}
//         //                             task={homework}
//         //                             accessLevel="student"
//         //                             getSomeHomeworks={this.getSomeHomeworksFromChild}
//         //                             setHomeworkToUploadId={this.setHomeworkToUploadId}
//         //                             homework={true}
//         //                         />
//         //                 )}
//         //             </div>
//         //             <button className="btn btn-secondary" onClick={() => this.getMoreHomeworks()}>View more</button>
//         //         </div>
//         // })


//         this.state.givenHomeworks.map((homework) =>
//             this.checkHomeworkDone(homework.groupHomeworkId, homework)
//         )

//     }
//     async checkHomeworkDone(groupHomeworkId, homework) {
//         try {
//             const response = await fetch(`https://localhost:44364/api/studentsHomeworks/GetByStudentAndHomeworkId/details?studentId=${this.state.studentId}&&id=${groupHomeworkId}`)
//             const data = await response.json();

//             const gethomeworksToView = data ?
//                 <HomeworkClassworkView
//                     key={'homework_' + homework.groupHomeworkId}
//                     homeworksViewStatus={"on-checking"}
//                     task={homework}
//                     accessLevel="student"
//                     getSomeHomeworks={this.getSomeHomeworksFromChild}
//                     setHomeworkToUploadId={this.setHomeworkToUploadId}
//                     homework={true}
//                 />
//                 :
//                 <HomeworkClassworkView
//                     key={'homework_' + homework.groupHomeworkId}
//                     homeworksViewStatus={"not-passed"}
//                     task={homework}
//                     accessLevel="student"
//                     getSomeHomeworks={this.getSomeHomeworksFromChild}
//                     setHomeworkToUploadId={this.setHomeworkToUploadId}
//                     homework={true}
//                 />

//             this.setState({
//                 homeworksToView: [...this.state.homeworksToView, gethomeworksToView],
//             }
//                 //,()=>console.log(this.state.homeworksToView)
//             )

//             // fetch(`https://localhost:44364/api/studentsHomeworks/GetByStudentAndHomeworkId/details?studentId=${this.state.studentId}&&id=${groupHomeworkId}`)
//             // .then((response) => {
//             //     return response.json();
//             //   })
//             //   .then((data) => {
//             //     console.log(data);
//             //     return data
//             //   });
//         }
//         catch {
//             console.log("error")
//         }
//     }
//     getBase64 = file => {
//         return new Promise(resolve => {
//             //let fileInfo;
//             let baseURL = "";
//             // Make new FileReader
//             let reader = new FileReader();

//             // Convert the file to base64 text
//             reader.readAsDataURL(file);

//             reader.onload = () => {
//                 baseURL = reader.result;
//                 resolve(baseURL);
//             };
//         });
//     };

//     handleFileInputChange = e => {
//         //console.log(e.target.files[0]);
//         let { file } = this.state;
//         file = e.target.files[0];
//         this.getBase64(file)
//             .then(result => {
//                 file["base64"] = result;
//                 this.setState({
//                     performedHomeworkBase64: result,
//                 }
//                     //,()=>console.log(this.state)
//                 );

//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };
//     onSubmit(e) {
//         e.preventDefault();
//         const { studentComment } = e.target;
//         this.setState({
//             studentComment: studentComment.value,
//         }
//             , () => this.UploadHomework()
//             //,()=>console.log(this.state)
//         );
//     }
//     async UploadHomework() {
//         try {

//             // const datas={
//             //     studentId: this.state.studentId,
//             //     groupHomeworkId:this.state.groupHomeworkId,
//             //     studentComment: this.state.studentComment,
//             //     performedHomeworkBase64: this.state.performedHomeworkBase64
//             // }
//             const response = await fetch(`https://localhost:44364/api/studentsHomeworks/AddDoneHomework`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(this.state)
//             })

//             const data = await response.json()
//             //console.log(response.status, response.errorText)

//             if (response.ok === true) {
//                 // console.log(data.success)
//                 this.setState({
//                     statusMessage: <div style={{ color: "green" }}>{data.success}</div>,
//                     groupHomeworkId: 0,
//                     studentComment: "",
//                     performedHomeworkBase64: ""
//                 }, () =>
//                     setTimeout(() =>
//                         this.setState({
//                             statusMessage: ""
//                         }), 3000)
//                 )
//             } else {

//                 console.log(data.error)
//                 this.setState({
//                     statusMessage: <div style={{ color: "red" }}>{data.error}</div>,
//                     groupHomeworkId: 0,
//                     studentComment: "",
//                     performedHomeworkBase64: ""
//                 }, () =>
//                     setTimeout(() =>
//                         this.setState({
//                             statusMessage: ""
//                         }), 3000)
//                 )

//             }
//         }
//         catch {

//         }
//     }
//     setHomeworkToUploadId(id) {
//         this.setState({
//             studentComment: "",
//             performedHomeworkBase64: "",
//             groupHomeworkId: id
//         }
//             , () => console.log(this.state.groupHomeworkId))
//         //console.log(this.state.groupHomeworkId)
//     }
//     // async getSomeHomeworks() // по ід студента знаходимо групу і дістаємо кілька домашок групи за її ід
//     // {
//     //     const response = await fetch(`https://localhost:44364/api/StudentsHomeworks/GetAssignedHomeworks/details?studentId=${this.state.studentId}`);

//     //     try {

//     //         const data = await response.json();
//     //         console.log(data)

//     //         if (response.ok === true) {
//     //             this.setState({
//     //                 givenHomeworks: [...this.state.givenHomeworks, ...data],
//     //                 // givenHomeworks: data,
//     //                 //homeworksToSkip: data.length + this.state.homeworksToSkip
//     //             }
//     //                 //,()=> console.log(this.state)
//     //             )
//     //             //console.log(data)

//     //         } else {
//     //             console.log("error", data)
//     //         }
//     //     }
//     //     catch {
//     //         // console.log("getSomeHomeworks  ERROR !!!")
//     //         console.log(response);
//     //     }
//     // }
//     async getSomeHomeworks() // по ід студента знаходимо групу і дістаємо кілька домашок групи за її ід
//     {
//         const response = await fetch(`https://localhost:44364/api/GroupHomeworks/GetSomeHomeworksByStudentId/details?studentId=${this.state.studentId}&&skip=${this.state.homeworksToSkip}&&take=${this.state.homeworksToDisplay}`);

//         try {

//             const data = await response.json();
//             // console.log(data)

//             if (response.ok === true) {
//                 this.setState({
//                     givenHomeworks: [...this.state.givenHomeworks, ...data],
//                     // givenHomeworks: data,
//                     homeworksToSkip: data.length + this.state.homeworksToSkip
//                 }
//                     //,()=> console.log(this.state)
//                 )
//                 //console.log(data)

//             } else {
//                 console.log("error", data)
//             }
//         }
//         catch {
//             // console.log("getSomeHomeworks  ERROR !!!")
//             console.log(response);
//         }
//     }
//     render() {
//         // const givenHomeworks = this.state.givenHomeworks.length <= 0 ?
//         //     <div className="text-center" style={{ color: "red" }}><h1>No givenHomeworks yet...</h1>
//         //     </div>
//         //     :
//         //     <div className="my-container">
//         //         <div className="cards">
//         //             {this.state.givenHomeworks.map((homework) =>
//         //                 this.checkHomeworkDone(homework.groupHomeworkId)?
//         //                     <HomeworkClassworkView
//         //                         key={'homework_' + homework.groupHomeworkId}
//         //                         homeworksViewStatus={"on-checking"}
//         //                         task={homework}
//         //                         accessLevel="student"
//         //                         getSomeHomeworks={this.getSomeHomeworksFromChild}
//         //                         setHomeworkToUploadId={this.setHomeworkToUploadId}
//         //                         homework={true}
//         //                     />
//         //                     :
//         //                     <HomeworkClassworkView
//         //                         key={'homework_' + homework.groupHomeworkId}
//         //                         homeworksViewStatus={"not-passed"}
//         //                         task={homework}
//         //                         accessLevel="student"
//         //                         getSomeHomeworks={this.getSomeHomeworksFromChild}
//         //                         setHomeworkToUploadId={this.setHomeworkToUploadId}
//         //                         homework={true}
//         //                     />
//         //             )}
//         //         </div>
//         //         <button className="btn btn-secondary" onClick={() => this.getMoreHomeworks()}>View more</button>
//         //     </div>
//         return (
//             <div>
//                 <NavigationBar />
//                 <div>givenHomeworks:</div>
//                 <div className="my-container">
//                     <div className="cards">
//                         {this.state.homeworksToView}
//                     </div>
//                     <button className="btn btn-secondary" onClick={() => this.getMoreHomeworks()}>View more</button>
//                 </div>

//                 <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title" id="exampleModalLabel">Upload performed homework form:</h5>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form onSubmit={this.onSubmit}>
//                                     <div className="row">
//                                         <div className="form-group col-md-6">
//                                             <label htmlFor="performedHomeworkBase64">Performed homework:</label>
//                                             <input required="required" id="performedHomeworkBase64" name="performedHomeworkBase64" type="file" placeholder="Add performed homework file" title="Performed homework File"
//                                                 onChange={(e) => this.handleFileInputChange(e)} />
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="form-group col-md-6">
//                                             <label htmlFor="studentComment">Comment for teacher:</label>
//                                             <input defaultValue={""} id="studentComment" name="studentComment" type="text" placeholder="Enter your comment" />
//                                         </div>
//                                     </div>
//                                     {this.state.statusMessage}

//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
//                                         <div style={{ textAlign: "center" }}>
//                                             <button id="submit" type="submit" className="btn btn-success" style={{ minWidth: "80%", margin: "10px" }}>Send</button>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         )
//     }
// }
// export default Student