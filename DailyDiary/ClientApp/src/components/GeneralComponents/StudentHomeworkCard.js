import React from 'react'
import { Host } from '../Host'
import { Role } from '../Role'

class HomeworkCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // accessLevel:"",
            // homeworksViewStatus:"",
            // task:undefined,
            homework: undefined,
            homeworkDeleteMessage: ""
        }
        // this.ViewTask=this.ViewTask.bind(this);
        this.loadHomework = this.loadHomework.bind(this);
        this.ViewHomework = this.ViewHomework.bind(this);
        this.DownloadHomework = this.DownloadHomework.bind(this);
        this.DeleteHomework = this.DeleteHomework.bind(this);
        this.loadPerformedHomework = this.loadPerformedHomework.bind(this);
    }
    // componentDidMount(){
    //     if(this.props.accessLevel!==undefined){
    //         this.setState({
    //             accessLevel:this.props.accessLevel
    //         })
    //     }
    //     else{
    //         this.setState({
    //             accessLevel:Role.Student
    //         })
    //     }
    //     if(this.props.task!==undefined){
    //         this.setState({
    //             task:this.props.task
    //         })
    //     }
    //     else{
    //         this.setState({
    //             task:undefined
    //         })
    //     }
    //     if(this.props.homeworksViewStatus!==undefined){
    //         this.setState({
    //             homeworksViewStatus:this.props.homeworksViewStatus
    //         })
    //     }
    //     else{
    //         this.setState({
    //             homeworksViewStatus:undefined
    //         })
    //     }
    //     // this.props.setHomeworkToUploadId
    // }

    async loadHomework(taskId) {
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
        await this.loadHomework(taskId);
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

    async DownloadHomework(taskId) {
        await this.loadHomework(taskId)
        this.downloadFile();

    }
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
        const taskLinks = // якщо не існує taskId, то ід - це ід завдання заданого групі. Якщо taskId існує, то ід це ід зданої роботи студента. taskId - ід завдання заданого групі
            <div className='row-cols-2-view'>
                {this.props.accessLevel === Role.Student ?
                    this.props.task.taskId !== undefined ? // якщо студент вже здав роботу
                        <>
                            <button className='general-outline-button button-static' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download" onClick={() => this.DownloadHomework(this.props.task.taskId)}>
                                Cкачати
                            </button>
                            <button className='general-outline-button' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View" onClick={() => this.ViewHomework(this.props.task.taskId)}>
                                Переглянути
                            </button>
                            <div>
                                {/* в даному випадку, тут знаходиться ід домашки студента */}
                                <button className='general-outline-button button-static' type="button" data-bs-placement="bottom" title="Upload" onClick={() => this.downloadPerformedHomework(this.props.task.id)}>
                                    Скачати виконане
                                </button>
                            </div>
                            <div>
                                {/* в даному випадку, тут знаходиться ід домашки групи */}
                                <button className='general-outline-button' type="button" data-bs-toggle="modal" data-bs-target="#modal" data-bs-placement="bottom" title="Upload" onClick={() => this.props.setHomeworkToUploadId(this.props.task.taskId)}>
                                    Завантажити
                                </button>
                            </div>


                        </>
                        :
                        <>


                            <button className='general-outline-button button-static' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download" onClick={() => this.DownloadHomework(this.props.task.id)}>
                                Cкачати
                            </button>
                            <button className='general-outline-button' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View" onClick={() => this.ViewHomework(this.props.task.id)}>
                                Переглянути
                            </button>
                            <div>

                            </div>
                            <div>
                                {/* в даному випадку, тут знаходиться ід домашки групи */}
                                <button className='general-outline-button' type="button" data-bs-toggle="modal" data-bs-target="#modal" data-bs-placement="bottom" title="Upload" onClick={() => this.props.setHomeworkToUploadId(this.props.task.id)}>
                                    Завантажити
                                </button>
                            </div>
                        </>
                    :
                    <></>
                }
            </div>
        const taskToDelete =
            <div>
                <div className="d-flex justify-content-end">
                    <button className="general-outline-button" onClick={() => this.DeleteHomework(this.props.task.groupHomeworkId)}>
                        {/* <img src={DeleteIcon} alt="..." className='view-image'></img> */}
                    </button>
                </div>
                <div className="text-center">
                    {this.state.homeworkDeleteMessage}
                </div>
            </div>
        return (
            <section className="card">
                <div className="subjectTitle">
                    {this.props.accessLevel === Role.Student ?
                        this.props.task.subject.title
                        :
                        "No subject title found"
                    }
                </div>
                <div className='task-info'>
                    <div className='task-info-item text-bolder'>
                        <div>
                            <label htmlFor="theme">Тема:</label>
                        </div>
                        <div id="theme" className='text-thinner'>
                            <div>{this.props.task ? this.props.task.theme : ""}</div>
                        </div>
                    </div>
                    <div className='task-info-item text-bolder'>
                        <div >
                            <label htmlFor="comment">Завдання:</label>
                        </div>
                        <div id="comment" className='text-thinner'>
                            <div>{this.props.task ? this.props.task.comment : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="infoicon">
                    <div className="icon">
                        <span className="tooltip">
                            {this.props.accessLevel === Role.Student ?
                                <div className='task-info'>
                                    {this.props.task.studentComment !== undefined ?
                                        <div className='task-info-item text-bolder'>
                                            <div>
                                                <label htmlFor="myComment">Мій коментар:</label>
                                            </div>
                                            <div id="myComment" className="text-thinner">
                                                <div>{this.props.task.studentComment}</div>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    }
                                    {this.props.task.teacherComment !== undefined && this.props.task.teacherComment !== null && this.props.task.teacherComment !== "" ?
                                        <div className='task-info-item text-bolder'>
                                            <div>
                                                <label htmlFor="teacherComment">Коментар викладача:</label>
                                            </div>
                                            <div id="teacherComment" className="text-thinner">
                                                <div>{this.props.task.teacherComment}</div>
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

                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            {this.props.task.teacherComment !== undefined && this.props.task.teacherComment !== null && this.props.task.teacherComment !== "" ?
                                                <label htmlFor="teacher">Перевірив:</label>
                                                :
                                                <label htmlFor="teacher">Викладач:</label>
                                            }
                                        </div>
                                        <div id="teacher" className='text-thinner'>
                                            <div>{this.props.task.teacherData.teacherFullName}</div>
                                        </div>
                                    </div>
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

                                        {this.props.task !== undefined && this.props.task.checkedDate !== undefined ?
                                            <section className='task-info'>
                                                <div className='task-info-item text-bolder'>
                                                    <div>
                                                        <div>Завантажено:</div>
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
                                            :
                                            <></>}
                                    </div>

                                </div>

                                :
                                <></>
                            }
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
export default HomeworkCard;