import React from 'react'
import { Host } from '../Host'
import { Role } from '../Role'
import "../../styles/Tasks/HomeworkCard.css"
class TeacherHomeworkCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // accessLevel:"",
            // homeworksViewStatus:"",
            // task:undefined,
            homework: undefined,
            homeworkDeleteMessage: ""
        }
        this.viewGivenHomework = this.viewGivenHomework.bind(this);
        this.viewHomework = this.viewHomework.bind(this);
        this.DeleteHomework = this.DeleteHomework.bind(this);
        this.loadPerformedHomework = this.loadPerformedHomework.bind(this);
        this.loadGivenHomework = this.loadGivenHomework.bind(this);
        // this.downloadHomeworkTaskTask = this.downloadHomeworkTaskTask.bind(this);
    }

    componentDidMount() {
        console.log("this.props.taskType", this.props.taskType);
    }

    async loadHomeworkTask(taskId) {
        try {
            const response = await fetch(`${Host}/api/GroupHomeworks/Get/${taskId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    homework: data
                })
                console.log(data);
            }
            else {
                const data = await response.text();
                console.log(data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async loadGivenHomework(taskId) {
        try {
            const response = await fetch(`${Host}/api/GroupHomeworks/Get/${taskId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    homework: data
                })
                console.log(data);
            }
            else {
                const data = await response.text();
                console.log(data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async loadPerformedHomework(studentWorkId) {
        try {
            const response = await fetch(`${Host}/api/studentsHomeworks/getByHomeworkId/${studentWorkId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    homework: data
                })
                console.log(data);
            }
            else {
                const data = await response.text();
                console.log(data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async viewGivenHomework(taskId) {
        await this.loadGivenHomework(taskId);
        if (this.state.homework != null) {
            var obj = document.createElement('object');

            // obj.style.width = '100%';
            // obj.style.height = '100vh';
            obj.style = `
            width:100%;
            height:100vh;
            position:absolute;
            top:0;
            left:0;
            `
            obj.type = this.state.homework.fileType;
            obj.data = `data:${this.state.homework.fileType};base64,` + this.state.homework.file;

            let pdfWindow = window.open('', "Task");
            // var container = document.createElement('div');
            // container.appendChild(obj)
            pdfWindow.document.body.appendChild(obj);
        }
    }
    async viewHomework(taskId) {
        await this.loadPerformedHomework(taskId);
        if (this.state.homework != null) {
            var obj = document.createElement('object');

            // obj.style.width = '100%';
            // obj.style.height = '100vh';
            obj.style = `
            width:100%;
            height:100vh;
            position:absolute;
            top:0;
            left:0;
            `
            obj.type = this.state.homework.fileType;
            obj.data = `data:${this.state.homework.fileType};base64,` + this.state.homework.file;

            let pdfWindow = window.open('', "Task");
            // var container = document.createElement('div');
            // container.appendChild(obj)
            pdfWindow.document.body.appendChild(obj);
        }
    }
    downloadGivenHomework = async (taskId) => {
        await this.loadGivenHomework(taskId)
        this.downloadFile();
    }
    downloadPerformedHomework = async (taskId) => {
        await this.loadPerformedHomework(taskId)
        this.downloadFile();
    }
    // async downloadHomeworkTaskTask(taskId) {
    //     await this.loadHomeworkTask(taskId)
    //     this.downloadFile();
    // }
    downloadFile = () => {
        if (this.state.homework != null) {
            const linkSource = `data:application/octet-stream;base64,` + this.state.homework.file;
            const downloadLink = document.createElement("a");
            const fileName = this.state.homework.fileName;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        }
    }
    async DeleteHomework(id) {
        try {
            const response = await fetch(`${Host}/api/groupHomeworks/delete/${id}`,
                {
                    method: "DELETE",
                    headers:{
                        
                    }
                }
            )
            const data = await response.json();
            //  console.log(data);
            if (response.ok === true) {
                // this.props.getSomeHomeworks()
            }
            else {
                
            }
        }
        catch {

        }
    }
    render() {

        // const taskToDelete =
        //     <div>
        //         <div className="d-flex justify-content-end">
        //             <button className="general-outline-button" onClick={() => this.DeleteHomework(this.props.task.groupHomeworkId)}>Видалити</button>
        //         </div>
        //         <div className="text-center">
        //             {this.state.homeworkDeleteMessage}
        //         </div>
        //     </div>
        return (
            <section className="card">
                <div className="subjectTitle">
                    {this.props.task.subject.title}
                </div>
                <div className='task-info'>
                    <div className='task-info-item text-bolder'>
                        {this.props.taskType !== "given" ?
                            <>
                                <div>
                                    <label htmlFor="student">Учень:</label>
                                </div>
                                <div id="student" className='text-thinner'>
                                    <div>{this.props.task.studentData.studentFullName}</div>
                                </div>
                            </>
                            :
                            <div className='task-info-item text-bolder'>
                                <div>
                                    <label htmlFor="theme">Тема:</label>
                                </div>
                                <div id="theme" className='text-thinner'>
                                    <div>{this.props.task.theme}</div>
                                </div>
                            </div>
                        }

                    </div>
                    {this.props.taskType !== "given" ?
                        <div className='task-info-item text-bolder'>
                            <div>
                                <label htmlFor="theme">Тема:</label>
                            </div>
                            <div id="theme" className='text-thinner'>
                                <div>{this.props.task.theme}</div>
                            </div>
                        </div>
                        :
                        <div></div>
                    }

                </div>
                <div className="infoicon">
                    <div className="icon">
                        <span className="tooltip">
                            <div className='task-info'>

                                <div className='task-info-item text-bolder'>
                                    <div>
                                        <label htmlFor="comment">Завдання:</label>
                                    </div>
                                    <div id="comment" className='text-thinner'>
                                        <div>{this.props.task.comment}</div>
                                    </div>
                                </div>

                                {this.props.taskType !== "given" && this.props.task?.studentComment ?
                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            <label htmlFor="studentComment" style={{ whiteSpace: "break-spaces" }}>Коментар студента:</label>
                                        </div>
                                        <div id="studentComment" style={{ whiteSpace: "break-spaces" }} className="text-thinner">
                                            <div>{this.props.task.studentComment}</div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                                {this.props.taskType !== "given" && this.props.task?.teacherComment ?
                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            <label htmlFor="teacherComment" style={{ whiteSpace: "break-spaces" }}>Мій коментар:</label>
                                        </div>
                                        <div id="teacherComment" style={{ whiteSpace: "break-spaces" }} className="text-thinner">
                                            <div>{this.props.task.teacherComment}</div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                                {this.props.taskType === "checked" && this.props.task.mark > 0 ?
                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            <label htmlFor="mark">Оцінка:</label>
                                        </div>
                                        <div id="mark" className='text-thinner'>
                                            <div>{this.props.task.mark}</div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                                <div className='grid-row-cols-4'>
                                    <section className='task-info'>
                                        <div className='task-info-item text-bolder'>
                                            <div>
                                                <div>Опубліковано:</div>
                                                <div>
                                                    <span id="published" className='text-thinner'>{new Date(this.props.task.publishDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div>Дедлайн:</div>
                                                <div>
                                                    <span id="deadline" className='text-thinner'>{new Date(this.props.task.deadline).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className='task-info'>
                                        <div className='task-info-item text-bolder'>
                                            {this.props.taskType !== "given" ?
                                                <div>
                                                    <div>Здано:</div>
                                                    <div>
                                                        <span id="uploadDate" className='text-thinner'>{new Date(this.props.task.passedDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                            }

                                            {this.props.taskType === "checked" ?
                                                <div>
                                                    <div>Перевірено:</div>
                                                    <div>
                                                        <span id="checkedDate" className='text-thinner'>{new Date(this.props.task.checkedDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                            }
                                        </div>
                                    </section>
                                </div>

                            </div>
                        </span>
                    </div>
                </div>

                <div className='card-buttons'>
                    {this.props.taskType === "given" ?
                        <button className='general-outline-button button-static' style={{ margin: "0" }} type="button" data-bs-toggle="tooltip" title="View" onClick={() => this.viewGivenHomework(this.props.task.taskId)}>
                            Переглянути
                        </button>
                        :
                        <button className='general-outline-button button-static' style={{ margin: "0" }} type="button" data-bs-toggle="tooltip" title="View" onClick={() => this.viewHomework(this.props.task.id)}>
                            Переглянути
                        </button>
                    }
                    {this.props.taskType === "given" ?

                        <button className='general-outline-button' type="button" style={{ margin: "0" }} data-bs-toggle="tooltip" title="Download" onClick={() => this.downloadGivenHomework(this.props.task.taskId)}>
                            Cкачати
                        </button>
                        :
                        <button className='general-outline-button' type="button" style={{ margin: "0" }} data-bs-toggle="tooltip" title="Download" onClick={() => this.downloadPerformedHomework(this.props.task.id)}>
                            Cкачати
                        </button>
                    }


                    {this.props.taskType !== "given" ?
                        this.props.taskType === "checked" ?
                            <button className='general-outline-button' type="button" data-bs-toggle="modal" data-bs-target="#ratingStudentHomework" style={{ margin: "0", lineHeight: "15px", whiteSpace: "normal" }} title="Rate" onClick={() => this.props.rateStudentHomework(this.props.task.id, this.props.task?.mark, this.props.task?.teacherComment)}>
                                Оцінити повторно
                            </button>
                            :
                            < button className='general-outline-button' type="button" data-bs-toggle="modal" data-bs-target="#ratingStudentHomework" style={{ margin: "0", whiteSpace: "normal" }} title="Rate" onClick={() => this.props.rateStudentHomework(this.props.task.id)}>
                                Оцінити
                            </button>
                        :
                        <div></div>
                    }

                </div>
                {/* 
                    <section className="bootom-field">
                        {this.props.accessLevel === "teacher" || this.props.accessLevel === "admin" ?
                            <div>
                                {taskToDelete}
                            </div>
                            :
                            <></>
                        }
                    </section> */}
            </section >
        );
    }
}
export default TeacherHomeworkCard;