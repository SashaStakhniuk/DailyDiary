import React from 'react'
// import ViewIcon from '../../images/view.webp'
import ViewIcon from '../../images/view1.png'
// import DownloadIcon from '../../images/Download-Icon.png'
import DownloadIcon from '../../images/Download-Icon1.png'
import UploadIcon from '../../images/UploadIcon.png'
import DeleteIcon from '../../images/Delete-Icon1.png'
import '../../styles/HomeworkClassworkCard.css'

class HomeworkClassworkView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homework: null,
            classwork: null,
            homeworkDeleteMessage: "",
            classworkDeleteMessage: ""
        }
        // this.ViewTask=this.ViewTask.bind(this);
        this.loadClasswork = this.loadClasswork.bind(this);
        this.loadHomework = this.loadHomework.bind(this);
        this.ViewClasswork = this.ViewClasswork.bind(this);
        this.ViewHomework = this.ViewHomework.bind(this);
        this.DownloadClasswork = this.DownloadClasswork.bind(this);
        this.DownloadHomework = this.DownloadHomework.bind(this);
        this.DeleteClasswork = this.DeleteClasswork.bind(this);
        this.DeleteHomework = this.DeleteHomework.bind(this);
    }
    // componentDidMount(){
    // }

    async loadClasswork(id) {
        try {
            const response = await fetch(`https://localhost:44364/api/GroupClassworks/Get/${id}`);
            const data = await response.json();
            if (response.ok === true) {
                this.setState({
                    classwork: data
                })
            }
            else {
                console.log(data.error)
            }
        }
        catch {

        }
        // console.log("click")
    }
    async ViewClasswork(id) {
        await this.loadClasswork(id);
        if (this.state.classwork != null) {
            var obj = document.createElement('object');
            obj.style.width = '100%';
            obj.style.height = '842pt';
            obj.type = `application/${this.state.classwork.fileName.split('.').pop()}`;
            obj.data = this.state.classwork.classwork;
            let pdfWindow = window.open('');
            // var container = document.createElement('div');
            // container.appendChild(obj)
            pdfWindow.document.body.appendChild(obj);
        }
    }
    async DownloadClasswork(id) {
        await this.loadClasswork(id);
        if (this.state.classwork != null) {
            const a = document.createElement('a')
            a.href = this.state.classwork.classwork
            a.download = this.state.classwork.fileName
            a.click()
        }
    }

    async DeleteClasswork(id) {
        try {

            const response = await fetch(`https://localhost:44364/api/groupClassworks/delete/${id}`, {
                method: "DELETE"
            })
            const data = await response.json();
            //  console.log(data);
            if (response.ok === true) {
                this.props.getSomeClassworks()
                // this.setState({
                //     classworkDeleteMessage:<h3 style={{color:"green"}}>{data.success}</h3>
                // }
                // ,()=>this.props.getSomeClassworks())
                // setTimeout(()=>
                // this.setState({
                //     classworkDeleteMessage:""
                // }
                // ),1000)
            }
            else {
                this.setState({
                    classworkDeleteMessage: <h3 style={{ color: "red" }}>{data.error}</h3>
                },
                    () => setTimeout(() =>
                        this.setState({
                            classworkDeleteMessage: ""
                        }), 5000)
                )
            }
        }
        catch {
            this.setState({
                classworkDeleteMessage: <h3 style={{ color: "red" }}>Something goes wrong</h3>
            },
                () => setTimeout(() =>
                    this.setState({
                        classworkDeleteMessage: ""
                    })
                ), 5000)
        }
    }
    async loadHomework(id) {
        try {
            const response = await fetch(`https://localhost:44364/api/GroupHomeworks/Get/${id}`);
            const data = await response.json();
            if (response.ok === true) {
                this.setState({
                    homework: data
                })
            }
            else {
                console.log(data.error)
            }
        }
        catch {
            console.log("error")
        }
    }
    async ViewHomework(id) {
        await this.loadHomework(id);
        if (this.state.homework != null) {
            var obj = document.createElement('object');
            obj.style.width = '100%';
            obj.style.height = '842pt';
            obj.type = `application/${this.state.homework.fileName.split('.').pop()}`;

            obj.data = this.state.homework.homework;
            let pdfWindow = window.open('');
            // var container = document.createElement('div');
            // container.appendChild(obj)
            pdfWindow.document.body.appendChild(obj);
        }
    }
    async DownloadHomework(id) {
        await this.loadHomework(id);
        if (this.state.homework != null) {
            const a = document.createElement('a')
            a.href = this.state.homework.homework
            // a.download = "file.pdf"
            a.download = this.state.homework.fileName
            //document.body.appendChild(a)
            a.click()
            // document.body.removeChild(a)
        }
    }
    async DeleteHomework(id) {
        try {
            const response = await fetch(`https://localhost:44364/api/groupHomeworks/delete/${id}`,
                {
                    method: "DELETE"
                }
            )
            const data = await response.json();
            //  console.log(data);
            if (response.ok === true) {
                this.props.getSomeHomeworks()

                // this.setState({
                //     homeworkDeleteMessage:<h3 style={{color:"green"}}>{data.success}</h3>
                // },()=>this.props.getSomeHomeworks())
                //     // setTimeout(()=>
                //     // this.setState({
                //     //     homeworkDeleteMessage:""
                //     // }),1000)

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
        const taskLinks = this.props.homework === true ?
            <div className="d-flex justify-content-around">
                <button className='btn' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download" onClick={() => this.DownloadHomework(this.props.task.groupHomeworkId)}>
                    <img src={DownloadIcon} alt="..." className='view-image'></img>
                </button>
                <button className='btn' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View" onClick={() => this.ViewHomework(this.props.task.groupHomeworkId)}>
                    <img src={ViewIcon} alt="..." className='view-image'></img>
                </button>
                {this.props.accessLevel === "student" ?
                    <div>
                        <button className='btn' type="button" data-bs-toggle="modal" data-bs-target="#modal" data-bs-placement="bottom" title="Upload" onClick={() => this.props.setHomeworkToUploadId(this.props.task.groupHomeworkId)}>
                            <img src={UploadIcon} alt="..." className='view-image'></img>
                        </button>
                    </div> :
                    <></>
                }
            </div>
            :
            <div className="d-flex justify-content-around">
                <button className='btn' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download" onClick={() => this.DownloadClasswork(this.props.task.groupClassworkId)}>
                    <img src={DownloadIcon} alt="..." className='view-image'></img>
                </button>
                <button className='btn' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View" onClick={() => this.ViewClasswork(this.props.task.groupClassworkId)}>
                    <img src={ViewIcon} alt="..." className='view-image'></img>
                </button>
                {this.props.accessLevel === "student" ?
                    <button className='btn' type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Upload" onClick={() => this.props.setHomeworkToUploadId(this.props.task.groupHomeworkId)}>
                        <img src={UploadIcon} alt="..." className='view-image'></img>
                    </button>
                    :
                    <></>
                }
            </div>
        const taskToDelete = this.props.homework === true ?
            <div>
                <div className="d-flex justify-content-end">
                    <button className="btn" onClick={() => this.DeleteHomework(this.props.task.groupHomeworkId)}>
                        <img src={DeleteIcon} alt="..." className='view-image'></img>
                    </button>
                </div>
                <div className="text-center">
                    {this.state.homeworkDeleteMessage}
                </div>
            </div>
            :
            <div>
                <div className="d-flex justify-content-end">
                    <button className="btn" onClick={() => this.DeleteClasswork(this.props.task.groupClassworkId)}>
                        <img src={DeleteIcon} alt="..." className='view-image'></img>
                    </button>
                </div>
                <div className="text-center">
                    {this.state.classworkDeleteMessage}
                </div>
            </div>
        return (
            <section className="card" style={{ width: "22rem" }}>
                <div>
                    <div className={"img-overlay " + this.props.homeworksViewStatus}>
                        {/* <div className="img-overlay passed"> */}
                        {/* <div className="img-overlay on-checking"> */}
                        <img src="https://lh3.googleusercontent.com/GGNl5mZkIoifHkIeRoa5c244QTzEYU5zJ-0VdK9lmfEigSe12vlTFQqr44ynoQtlabY=w512" alt="Trulli" />
                    </div>

                    <div className="d-flex justify-content-around">
                        <div className="subjectView">
                            {this.props.accessLevel === "student" ?
                                this.props.task.subject.title
                                :
                                <></>
                            }
                        </div>
                        <div className="infoicon">
                            <div className="icon">
                                <span className="tooltip">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="theme">Theme:</label>
                                        </div>
                                        <div id="theme" className="form-group col-md-6">
                                            <div style={{ color: "black", textAlign: "left" }}>{this.props.task.theme}</div>
                                        </div>
                                    </div>
                                    {this.props.accessLevel === "student" ?

                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="teacher">Teacher:</label>
                                            </div>
                                            <div id="teacher" className="form-group col-md-6">
                                                <div style={{ color: "black", textAlign: "left" }}>{this.props.task.teacher.name} {this.props.task.teacher.lastName}</div>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>



                </div>
                <div className="card-content">
                    {taskLinks}
                    <section className="date-info">
                        <div className="date-item">
                            <span>Published:</span>
                            <div className="date-display">
                                <span id="published" style={{ color: "black" }}>{new Date(this.props.task.published).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="date-item">
                            <span>Deadline:</span>
                            <div className="date-display">
                                <span id="deadline" style={{ color: "black" }}>{new Date(this.props.task.deadline).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </section>
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

            // <div className="card" style={{ minWidth: "22rem" }}>
            //     <div className="col">
            //         <div className="card-body">
            //             <h5 className="card-title">
            //                 <div className="row">
            //                     <div className="form-group col-md-6">
            //                         <label htmlFor="theme">Theme:</label>
            //                     </div>
            //                     <div id="theme" className="form-group col-md-6">
            //                         <div style={{ color: "black" }}>{this.props.task.theme}</div>
            //                     </div>
            //                 </div>
            //             </h5>
            //             {taskLinks}
            //             <div className="row">
            //                 <div className="form-group col-md-6">
            //                     <label htmlFor="published">Published:</label>
            //                     <div id="published" style={{ color: "black" }}>{new Date(this.props.task.published).toLocaleDateString()}</div>
            //                 </div>
            //                 <div className="form-group col-md-6">
            //                     <label htmlFor="deadline">Deadline:</label>
            //                     <div id="deadline" style={{ color: "black" }}>{new Date(this.props.task.deadline).toLocaleDateString()}</div>
            //                 </div>
            //             </div>
            //             {taskToDelete}
            //         </div>
            //     </div>
            // </div>
        );
    }
}
export default HomeworkClassworkView;