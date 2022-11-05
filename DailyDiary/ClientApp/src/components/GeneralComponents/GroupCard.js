import React from 'react'
import { Host } from '../Host'
import { Role } from '../Role'
import { NavLink, Link } from 'react-router-dom'
import "../../styles/Tasks/GroupCard.css"
import groupPhoto from "../../images/Photo.png"

class GroupCard extends React.Component {
    constructor(props) {
        super(props);
        this.deleteGroup = this.deleteGroup.bind(this); // видалення групи
        this.state = {

        }
    }
    componentDidMount() {
        // console.log("this.props.group", this.props.group);
    }
    async deleteGroup(groupId) {
        try {
            if (groupId <= 0) {
                alert("Group id can't be <= 0");
                return 0;
            }
            const response = await fetch(`${Host}/api/group/delete/${groupId}`, {
                method: "DELETE"
            })
            if (response.ok === true) {
                this.props.updateGroupList();
                window.alert("Group include subgroups deleted successfully");
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
                                <button className='edit-group-card-button' type="button" title="Видалити" onClick={() => this.deleteGroup(this.props.group.groupId)}>
                                    Видалити
                                </button>
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