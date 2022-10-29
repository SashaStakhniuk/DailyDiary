import React from 'react'
import { Host } from '../Host'
import { Role } from '../Role'

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
        this.ViewHomework = this.ViewHomework.bind(this);
        this.DeleteHomework = this.DeleteHomework.bind(this);
        this.loadPerformedHomework = this.loadPerformedHomework.bind(this);
        // this.downloadHomeworkTaskTask = this.downloadHomeworkTaskTask.bind(this);
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
    async ViewHomework(taskId) {
        await this.loadPerformedHomework(taskId);
        if (this.state.homework != null) {
            var obj = document.createElement('object');

            obj.style.width = '100%';
            obj.style.height = '100vh';

            obj.type = this.state.homework.fileType;
            obj.data = `data:${this.state.homework.fileType};base64,` + this.state.homework.file;

            let pdfWindow = window.open('');
            // var container = document.createElement('div');
            // container.appendChild(obj)
            pdfWindow.document.body.appendChild(obj);
        }
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
                    method: "DELETE"
                }
            )
            const data = await response.json();
            //  console.log(data);
            if (response.ok === true) {
                this.props.getSomeHomeworks()
            }
            else {
                this.setState({
                    homeworkDeleteMessage: <h3 style={{ color: "red" }}>{data.error}</h3>
                },
                    () => setTimeout(() =>
                        this.setState({
                            homeworkDeleteMessage: ""
                        }), 5000)
                )
            }
        }
        catch {
            this.setState({
                homeworkDeleteMessage: <h3 style={{ color: "red" }}>Something goes wrong</h3>
            },
                () => setTimeout(() =>
                    this.setState({
                        homeworkDeleteMessage: ""
                    }), 5000)
            )
        }
    }
    render() {
        const taskLinks =
            <div className='row-cols-3-view'>

                <button className='general-outline-button button-static' style={{ margin: "0" }} type="button" data-bs-toggle="tooltip" title="View" onClick={() => this.ViewHomework(this.props.task.id)}>
                    Переглянути
                </button>
                <button className='general-outline-button' type="button" style={{ margin: "0" }} data-bs-toggle="tooltip" title="Download" onClick={() => this.downloadPerformedHomework(this.props.task.id)}>
                    Cкачати
                </button>
                <button className='general-outline-button' type="button" style={{ margin: "0" }} title="Rate" onClick={() => this.props.rateStudentHomework(this.props.task.id)}>
                    Оцінити
                </button>
            </div>
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
                        <div>
                            <label htmlFor="teacher">Учень:</label>
                        </div>
                        <div id="student" className='text-thinner'>
                            <div>{this.props.task.studentData.studentFullName}</div>
                        </div>
                    </div>
                    <div className='task-info-item text-bolder'>
                        <div>
                            <label htmlFor="comment">Завдання:</label>
                        </div>
                        <div id="comment" className='text-thinner'>
                            <div>{this.props.task.comment}</div>
                        </div>
                    </div>
                </div>
                <div className="infoicon">
                    <div className="icon">
                        <span className="tooltip">
                                <div className='task-info'>
                                    {/* <div className='task-info-item text-bolder'>
                                            <div>
                                                <label htmlFor="myComment">Мій коментар:</label>
                                            </div>
                                            <div id="myComment" className="text-thinner">
                                                <div>{this.props.task.studentComment}</div>
                                            </div>
                                        </div> */}
                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            <label htmlFor="theme">Тема:</label>
                                        </div>
                                        <div id="theme" className='text-thinner'>
                                            <div>{this.props.task.theme}</div>
                                        </div>
                                    </div>
                                    {this.props.task.studentComment !== undefined && this.props.task.studentComment !== null && this.props.task.studentComment !== "" ?
                                        <div className='task-info-item text-bolder'>
                                            <div>
                                                <label htmlFor="studentComment" style={{whiteSpace:"break-spaces"}}>Коментар студента:</label>
                                            </div>
                                            <div id="studentComment" style={{marginTop:"10px"}} className="text-thinner">
                                                <div>{this.props.task.studentComment}</div>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    }
                                    {this.props.task.mark !== undefined && this.props.task.mark > 0 ?
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
                                                    <div>
                                                        <div>Здано:</div>
                                                        <div>
                                                            <span id="uploadDate" className='text-thinner'>{new Date(this.props.task.passedDate).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                    {this.props.task.mark !== undefined && this.props.task.mark > 0 ?
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
                <div className="card-content">
                    {taskLinks}

                    <section className="bootom-field">
                        {this.props.accessLevel === "teacher" || this.props.accessLevel === "admin" ?
                            <div>
                                {taskToDelete}
                            </div>
                            :
                            <></>
                        }

                    </section>
                </div>
            </section>
        );
    }
}
export default TeacherHomeworkCard;