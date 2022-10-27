import GeneralHeader from "../Headers/GeneralHeader";
import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Host } from "../Host";
import HomeworkClassworkView from "../GeneralComponents/HomeworkClassworkView";

class Student extends Component {
    constructor(props) {
        super(props);
        this.getStudentIdByUserId = this.getStudentIdByUserId.bind(this);
        this.getStudentHomeworks = this.getStudentHomeworks.bind(this);

        this.state = {
            studentId: 0,
            homeworks: []
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
                this.getStudentHomeworks(data);
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
    async getStudentHomeworks(studentId) {
        try {
            if (studentId == undefined || studentId == 0) {
                return 0;
            }
            const response = await fetch(`${Host}/api/grouphomeworks/getHomeworksByStudentId/${studentId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    homeworks: data
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
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} />
                    </div>
                    <div className="generalSide">
                        <div className="d-flex flex-row flex-wrap">
                            {this.state.homeworks.map(homework =>
                                <HomeworkClassworkView key={"homework_"+homework.id} homework={true} accessLevel="student" task={homework} homeworksViewStatus="not-passed"></HomeworkClassworkView>
                                )}
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
//             //                      <h1>No homeworks yet...</h1>
//             //                  </div>,

//             // passed_homeworks: [],
//             // homeworks_under_review: [],
//             homeworksViewStatus: "",

//             homeworks: [],
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
//         //     homeworksToView: this.state.homeworks.length <= 0 ?
//         //         <div className="text-center" style={{ color: "red" }}>
//         //             <h1>No homeworks yet...</h1>
//         //         </div>
//         //         :
//         //         <div className="my-container">
//         //             <div className="cards">
//         //                 {this.state.homeworks.map(async (homework) =>
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


//         this.state.homeworks.map((homework) =>
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
//     //                 homeworks: [...this.state.homeworks, ...data],
//     //                 // homeworks: data,
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
//                     homeworks: [...this.state.homeworks, ...data],
//                     // homeworks: data,
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
//         // const homeworks = this.state.homeworks.length <= 0 ?
//         //     <div className="text-center" style={{ color: "red" }}><h1>No homeworks yet...</h1>
//         //     </div>
//         //     :
//         //     <div className="my-container">
//         //         <div className="cards">
//         //             {this.state.homeworks.map((homework) =>
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
//                 <div>Homeworks:</div>
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