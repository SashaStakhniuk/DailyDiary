import React from 'react'
import { Link } from 'react-router-dom';
import { Host } from '../Host'
class EditGroup extends React.Component {
    constructor(props) {
        super(props);

        this.getAllGroupsDatasOfCurrentStudyYear = this.getAllGroupsDatasOfCurrentStudyYear.bind(this);
        this.state = {
            groups: []
        }
    };
    componentDidMount() {
        // this.getAllStudyPlansByYearOfStudyId();
        this.getAllGroupsDatasOfCurrentStudyYear();
    }
    async getAllGroupsDatasOfCurrentStudyYear() {
        try {
            const response = await fetch(`${Host}/api/group/GetAllGroupsDatasOfCurrentStudyYear`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved groups: ", data)
                this.setState({
                    groups: data
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
    render() {
        return (
            <div>
                <div className='container'>
                    <div>Усі групи теперішнього навчального року:</div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Group:</th>
                                <th>Year of study:</th>
                                <th>Amount of students:</th>
                                <th>Auditory:</th>
                                <th>Edit:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.groups.map(group =>
                                <tr key={"groupToEdit_" + group.groupId}>
                                    <td>
                                        {group.groupTitle}
                                    </td>
                                    <td>
                                        {group.yearOfStudy}
                                    </td>
                                    <td>
                                        {group.amountOfStudents}
                                    </td>
                                    <td>
                                        {group.auditoryTitle == undefined ? "Не призначено" : group.auditoryTitle}
                                    </td>
                                    <td>
                                        {/* {"groupId_"+group.groupId} */}
                                        <Link
                                            className="btn btn-outline-warning m-1"
                                            style={{ textDecoration: "none", color: "black" }}
                                            to={{
                                                pathname: "/admin/new-group",
                                                state: { group: group }
                                            }}
                                            exact="true">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default EditGroup;