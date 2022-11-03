import React from 'react'
import { Host } from '../Host'
import { Role } from '../Role'
import { NavLink, Link } from 'react-router-dom'
import "../../styles/Tasks/HomeworkCard.css"
class GroupCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        console.log("this.props.group", this.props.group);
    }
    render() {
        return (
            <section className="card" id={"group_"+this.props.group.groupId}>
                <div className="subjectTitle">
                    {this.props.group.groupTitle}
                </div>
                <div className='task-info'>
                    <div className='task-info-item text-bolder'>
                        <div id="groupTitle">
                            <div>{this.props.group.amountOfStudents} учнів</div>
                        </div>
                    </div>
                    <div className='task-info-item text-bolder'>
                        <div id="groupTitle" className='text-thinner'>
                            {this.props.group.auditoryId === 0 ?
                                <div>Аудиторію не призначено</div>
                                :
                                <div>Аудиторія {this.props.group.auditoryTitle}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="infoicon">
                    <div className="icon">
                        <span className="tooltip">
                            <div className='task-info'>

                                <div className='task-info-item text-bolder'>
                                    <div>
                                        <label htmlFor="yearOfStudy">Рік навчання:</label>
                                    </div>
                                    <div id="yearOfStudy" className='text-thinner'>
                                        <div>{this.props.group.yearOfStudy}</div>
                                    </div>
                                </div>

                                {/*  <div>
                                        <label htmlFor="comment">Завдання:</label>
                                    </div>
                                    <div id="comment" className='text-thinner'>
                                        <div>{this.props.group.comment}</div>
                                    </div>
                                </div>

                                {this.props.taskType !== "given" && this.props.group?.studentComment ?
                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            <label htmlFor="studentComment" style={{ whiteSpace: "break-spaces" }}>Коментар студента:</label>
                                        </div>
                                        <div id="studentComment" style={{ whiteSpace: "break-spaces" }} className="text-thinner">
                                            <div>{this.props.group.studentComment}</div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                                {this.props.taskType !== "given" && this.props.group?.teacherComment ?
                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            <label htmlFor="teacherComment" style={{ whiteSpace: "break-spaces" }}>Мій коментар:</label>
                                        </div>
                                        <div id="teacherComment" style={{ whiteSpace: "break-spaces" }} className="text-thinner">
                                            <div>{this.props.group.teacherComment}</div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                                {this.props.taskType === "checked" && this.props.group.mark > 0 ?
                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            <label htmlFor="mark">Оцінка:</label>
                                        </div>
                                        <div id="mark" className='text-thinner'>
                                            <div>{this.props.group.mark}</div>
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
                                                    <span id="published" className='text-thinner'>{new Date(this.props.group.publishDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div>Дедлайн:</div>
                                                <div>
                                                    <span id="deadline" className='text-thinner'>{new Date(this.props.group.deadline).toLocaleDateString()}</span>
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
                                                        <span id="uploadDate" className='text-thinner'>{new Date(this.props.group.passedDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                            }

                                            {this.props.taskType === "checked" ?
                                                <div>
                                                    <div>Перевірено:</div>
                                                    <div>
                                                        <span id="checkedDate" className='text-thinner'>{new Date(this.props.group.checkedDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                            }
                                        </div>
                                    </section> 
*/}
                            </div>
                        </span>
                    </div>
                </div>

                <Link
                    className="general-outline-button button-static"
                    style={{ textDecoration: "none", position: "absolute", bottom: "20px", right: "24px" }}
                    to={{
                        pathname: "/admin/edit-group",
                        state: { group: this.props.group }
                    }}
                    exact="true">
                    Редагувати
                </Link>
                {/* <button className='general-outline-button button-static' style={{ position: "absolute", bottom: "20px", right: "24px" }} type="button" data-bs-toggle="tooltip" title="Edit" onClick={() => this.viewGivenHomework(this.props.group.taskId)}>
                    Редагувати
                </button> */}
            </section >
        );
    }
}
export default GroupCard;