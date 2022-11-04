import React from 'react'
import { Host } from '../Host'
import { Role } from '../Role'
import { NavLink, Link } from 'react-router-dom'
import "../../styles/Tasks/GroupCard.css"
import groupPhoto from "../../images/Photo.png"

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
            <section className="card-group" id={"group_" + this.props.group.groupId}>
                <div className='row-cols-1-3-view'>
                    <div className="card-image" style={{ float: "left" }}>
                        <img src={groupPhoto} alt="..." />
                    </div>
                    <div>
                            <Link
                               className="subjectTitle"
                                style={{ textDecoration: "none"}}
                                to={{
                                    pathname: "/admin/edit-group",
                                    state: { group: this.props.group }
                                }}
                                exact="true">
                                {this.props.group.groupTitle}
                            </Link>
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
                            </div>
                        </span>
                    </div>
                </div>
                <button className='edit-group-card-button' type="button" data-bs-toggle="tooltip" title="Edit" onClick={() => this.props.editGroupData(this.props.group)}>
                    Редагувати
                </button>
            </section >
        );

    }
}
export default GroupCard;

{/* <Link
                    className="general-outline-button button-static"
                    style={{ textDecoration: "none", position: "absolute", bottom: "20px", right: "24px" }}
                    to={{
                        pathname: "/admin/edit-group",
                        state: { group: this.props.group }
                    }}
                    exact="true">
                    Редагувати
                </Link> */}