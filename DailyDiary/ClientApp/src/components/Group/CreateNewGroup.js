import React from 'react'
import { Host } from '../Host'
import Students from '../Students/Students';
class CreateNewGroup extends React.Component {
    constructor(props) {
        super(props);

        this.getAllStudyPlansByYearOfStudyId = this.getAllStudyPlansByYearOfStudyId.bind(this);
        this.getFreeAuditories = this.getFreeAuditories.bind(this);
        this.getGroupsAuditories = this.getGroupsAuditories.bind(this);
        this.getYearsOfStudyCurrentStudyYear = this.getYearsOfStudyCurrentStudyYear.bind(this);
        
        this.onYearOfStudyChange = this.onYearOfStudyChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.create = this.create.bind(this);
        this.edit = this.edit.bind(this);


        this.state = {
            groupId: 0,
            title: "",
            yearOfStudyId: 0,
            studyPlanId: 0,
            preferedAuditoryId: 0,
            edit: false,
            studyPlans: [],
            auditories: [],
            yearsOfStudy: [],
            busyAuditories: []
        }
    };
    componentDidMount() {
        if (this.props.location.state !== undefined) {
            console.log(this.props.location.state)
            this.setState({
                groupId: this.props.location.state.group.groupId,
                title: this.props.location.state.group.groupTitle,
                yearOfStudyId: this.props.location.state.group.yearOfStudyId,
                studyPlanId: this.props.location.state.group.studyPlanId,
                preferedAuditoryId: this.props.location.state.group.auditoryId,
                edit: true
            }
                , () => console.log(this.state)
            )
        }
        this.getFreeAuditories();
        this.getYearsOfStudyCurrentStudyYear();
        this.getGroupsAuditories();
    }
    async getAllStudyPlansByYearOfStudyId(yearOfStudyId) {
        try {
            const response = await fetch(`${Host}/api/studyPlan/getAllStudyPlansByYearOfStudyId/${yearOfStudyId}`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved studyPlans: ", data)
                this.setState({
                    studyPlans: data
                })
            }
            else {
                this.setState({
                    studyPlans: []
                })
                const data = await response.text();
                window.alert(data);

            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getFreeAuditories() {
        try {
            const response = await fetch(`${Host}/api/auditory/getFreeAuditories`); // getFreeAuditories // getAllAuditories
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved auditories: ", data)
                this.setState({
                    auditories: data
                })
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
    async getGroupsAuditories() {
        try {
            const response = await fetch(`${Host}/api/group/getGroupsAuditories`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved busy auditories: ", data)
                this.setState({
                    busyAuditories: data
                })
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
    async getYearsOfStudyCurrentStudyYear() {
        try {
            const response = await fetch(`${Host}/api/yearOfStudy/getYearsOfStudyByCurrentStudyYear`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved yearsofStudy: ", data)
                this.setState({
                    yearsOfStudy: data
                }
                    , () => this.getAllStudyPlansByYearOfStudyId(data[0].id)
                )
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
    onYearOfStudyChange(e) {
        this.getAllStudyPlansByYearOfStudyId(e.target.value);
    }
    async create() {
        try {
            const datasToSend = {
                title: this.state.title,
                studyPlanId: this.state.studyPlanId,
                yearOfStudyId: this.state.yearOfStudyId,
                preferedAuditoryId: this.state.preferedAuditoryId,
                groupId: this.state.groupId

            }
            const response = await fetch(`${Host}/api/group/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });
            if (response.ok === true) {
                this.getGroupsAuditories();
                this.getFreeAuditories();
                window.alert("Created");
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
    async edit() {
        try {
            const datasToSend = {
                title: this.state.title,
                studyPlanId: this.state.studyPlanId,
                yearOfStudyId: this.state.yearOfStudyId,
                preferedAuditoryId: this.state.preferedAuditoryId,
                groupId: this.state.groupId

            }
            const response = await fetch(`${Host}/api/group/edit`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasToSend)
            });
            if (response.ok === true) {
                this.getGroupsAuditories();
                this.getFreeAuditories();
                window.alert("Edited");
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
    onFormSubmit(e) {
        e.preventDefault();

        const { groupTitle, yearOfStudy, studyPlan, auditory } = e.target;
        this.setState({
            title: groupTitle.value,
            yearOfStudyId: yearOfStudy.value,
            studyPlanId: studyPlan.value,
            preferedAuditoryId: auditory.value
        }
            , () => this.state.edit ? this.edit() : this.create()
        )

    }
    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit} className='container'>
                    <div className="col-md-12">
                        <label htmlFor="groupTitle" className="form-label">Group title</label>
                        <input type="text" className="form-control" id="groupTitle" name="groupTitle" defaultValue={this.state.title} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="yearOfStudy" className="form-label">YearOfStudy</label>
                        <select type="text" className="form-control" id="yearOfStudy" name="yearOfStudy" defaultValue={this.state.yearOfStudyId} onChange={this.onYearOfStudyChange} required >
                            {this.state.yearsOfStudy.map(yearOfStudy =>
                                <option key={"yearOfStudy_" + yearOfStudy.id} value={yearOfStudy.id}>{yearOfStudy.yearStudy}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="studyPlan" className="form-label">Study Plan</label>
                        <select type="text" className="form-control" id="studyPlan" name="studyPlan" defaultValue={this.state.studyPlanId} required >
                            {this.state.studyPlans.map(studyPlan =>
                                <option key={"studyPlan_" + studyPlan.id} value={studyPlan.id}>{studyPlan.title}</option>
                                // <option key={"studyPlan_"+studyPlan.id} value={studyPlan.id}>{studyPlan.title+". Lessons per day: "+studyPlan.maxAllowedLessonsPerDay}</option>
                            )}
                        </select>
                    </div>
                    <div>Prefered auditory:</div>
                    <fieldset className='d-flex flex-column'>
                        <div className="form-check form-check-inline">
                            {this.state.preferedAuditoryId == 0 ?
                                <input className="form-check-input" defaultChecked type="radio" name="auditory" id={"auditory_0"} value={0} />
                                :
                                <input className="form-check-input" type="radio" name="auditory" id={"auditory_0"} value={0} />
                            }
                            <label className="form-check-label" htmlFor={"auditory_0"}>None</label>
                        </div>
                        {this.state.auditories.map(auditory =>
                            <div key={"auditory_" + auditory.id} className="form-check form-check-inline">
                                {this.state.preferedAuditoryId == auditory.id ?
                                    <input className="form-check-input" type="radio" defaultChecked name="auditory" id={"auditory_" + auditory.id} value={auditory.id} />
                                    :
                                    <input className="form-check-input" type="radio" name="auditory" id={"auditory_" + auditory.id} value={auditory.id} />
                                }
                                <label className="form-check-label" htmlFor={"auditory_" + auditory.id}>{auditory.title + ". " + auditory.auditoryType.auditoryTypeDescription}</label>
                            </div>
                        )}
                    </fieldset>
                    <div className='d-flex justify-content-end'>
                        {this.state.edit ?
                            <input className='btn btn-warning' value="Редагувати" type="submit"></input>
                            :
                            <input className='btn btn-success' value="Створити" type="submit"></input>
                        }
                    </div>
                </form>
                <div className='container'>
                    <div>Зайняті аудиторії:</div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Group:</th>
                                <th>Auditory:</th>
                                <th>Type:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.busyAuditories.map(auditory =>
                                <tr key={"busyAuditory_" + auditory.auditoryId}>
                                    <td>
                                        {auditory.groupTitle}
                                    </td>
                                    <td>
                                        {auditory.auditoryTitle}
                                    </td>
                                    <td>
                                        {auditory.auditoryType}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {this.state.edit ?
                    <Students groupId={this.state.groupId}></Students>
                    :
                    <></>
                }
            </div>
        )
    }
}
export default CreateNewGroup;