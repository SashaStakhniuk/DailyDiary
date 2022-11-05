import React from 'react'
import { Host } from '../Host'
import { Role } from '../Role'
import { NavLink, Link } from 'react-router-dom'
import "../../styles/Tasks/GroupCard.css"
import groupPhoto from "../../images/Photo.png"

class SubgroupCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // componentDidMount() {
    //     console.log("this.props.subgroup", this.props.subgroup);
    // }
    render() {
        return (
            <section className="card-group" id={`cardSubgroup_${this.props.subgroup.subgroupId}`}>
                <div className='row-cols-1-3-view'>
                    <div className="card-image" style={{ float: "left" }}>
                        <img src={groupPhoto} alt="..." />
                    </div>
                    <div>
                        <Link
                            className="subjectTitle"
                            style={{ textDecoration: "none" }}
                            to={{
                                pathname: "/admin/edit-subgroup",
                                state: { subgroup: this.props.subgroup }
                            }}
                            exact="true">
                            {this.props.subgroup.subgroupTitle}
                        </Link>
                        <div className='task-info'>
                            <div className='task-info-item text-bolder'>
                                <div>
                                    <div>Учнів: {this.props.subgroup.studentsAmount} </div>
                                </div>
                            </div>
                            <div className='task-info-item text-bolder'>
                                <div className='text-thinner'>
                                    {this.props.subgroup.subgroupBlockTitle}
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
                                        <label htmlFor="group">Група:</label>
                                    </div>
                                    <div id="yearOfStudy" className='text-thinner'>
                                        <div>{this.props.subgroup.groupTitle}</div>
                                    </div>
                                </div>
                                <button className='edit-group-card-button' type="button" title="Видалити" onClick={() => this.props.removeSubgroup(this.props.subgroup.subgroupId)}>
                                    Видалити
                                </button>
                            </div>
                        </span>
                    </div>
                </div>
                <button className='edit-group-card-button' type="button" data-bs-toggle="modal" data-bs-target="#editSubgroupModal" title="Редагувати" onClick={() => this.props.editSubgroupData(this.props.subgroup)}>
                    Редагувати
                </button>
            </section >
        );

    }
}
export default SubgroupCard;

{/* <Link
                    className="general-outline-button button-static"
                    style={{ textDecoration: "none", position: "absolute", bottom: "20px", right: "24px" }}
                    to={{
                        pathname: "/admin/edit-subgroup",
                        state: { subgroup: this.props.subgroup }
                    }}
                    exact="true">
                    Редагувати
                </Link> */}