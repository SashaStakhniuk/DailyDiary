import React from 'react'
import { Host } from '../Host'

class StudentsByGroupsDistribution extends React.Component { // розподілення студентів по групах
    constructor(props) {
        super(props);
        this.getAllGroupsOfCurrentStudyYear = this.getAllGroupsOfCurrentStudyYear.bind(this);
        this.getAllStudentsWithoutGroupThisStudyYear = this.getAllStudentsWithoutGroupThisStudyYear.bind(this);
        this.recommendedYearOfStudy = this.recommendedYearOfStudy.bind(this);
        this.calculateAge = this.calculateAge.bind(this);
        this.onTableClick = this.onTableClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            groupId:0,
            studentsToAdd: [],
            groups: [],
            students: []
        }
    };
    componentDidMount() {
        this.getAllGroupsOfCurrentStudyYear();
        this.getAllStudentsWithoutGroupThisStudyYear();
    }
    recommendedYearOfStudy(datenow, birthday) { // birthday is a date
        var diff = datenow.getFullYear() - birthday.getFullYear(); // різниця в роках
        const recommendedClass = (diff - 5) + " or " + (diff - 4);
        return recommendedClass;
    }
    calculateAge(datenow, birthday = new Date()) { // birthday is a date
        if (datenow.toLocaleDateString() === birthday.toLocaleDateString()) {
            return 0;
        }
        var diff = datenow.getFullYear() - birthday.getFullYear(); // різниця в роках
        if (datenow.getMonth() > birthday.getMonth()) { // якщо зараз місяць більший ніж на день народження 
            diff++;
        }
        else if (datenow.getMonth() == birthday.getMonth()) { // якщо зараз місяць == місяцю дня народження 
            if (datenow.getDate() >= birthday.getDate()) { // якщо дата теперішня >= за дату дня народження
                diff++;
            }
        }
        return Math.abs(diff);
    }
    async getAllGroupsOfCurrentStudyYear() {
        try {
            const response = await fetch(`${Host}/api/group/GetAllGroupsOfCurrentStudyYear`);
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
    async getAllStudentsWithoutGroupThisStudyYear() {
        try {
            const response = await fetch(`${Host}/api/student/getAllStudentsWithoutGroupThisStudyYear`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved students: ", data)
                this.setState({
                    students: data
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
    onTableClick(studentId) {
        console.log(studentId)
        const indexOfExistingStudentId = this.state.studentsToAdd.indexOf(studentId);
        if (indexOfExistingStudentId === -1) {
            this.setState({
                studentsToAdd: [...this.state.studentsToAdd, studentId]
            }
                , () => console.log(this.state.studentsToAdd)
            );
        }
        else {
            this.setState({
                studentsToAdd: this.state.studentsToAdd.filter(function (id) {
                    return id !== studentId;
                })
            }
                , () => console.log(this.state.studentsToAdd)
            );
        }
    }
async addStudentsIntoGroup(){
    try {
        const datasToSend = {
            groupId: this.state.groupId,
            studentsId: this.state.studentsToAdd
        }
        const response = await fetch(`${Host}/api/student/addStudentsIntoGroup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datasToSend)
        });
        if (response.ok === true) {
            window.alert("Added");
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
     onFormSubmit(e){
        e.preventDefault();
        const {group} = e.target;
        this.setState({
            groupId:group.value
        }
        ,()=> this.addStudentsIntoGroup())
    }
    render() {
        return (
            <div className='container'>
                <form onSubmit={this.onFormSubmit}>
                    <div>Groups:</div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select id="group" name="group" className="form-select" required>
                                {this.state.groups.map(group =>
                                    <option key={"group" + group.id} value={group.id}>{group.title}</option>
                                )}
                            </select>
                            <label htmlFor="group">Groups</label>
                        </div>
                    </div>
                    <div>Students without group:</div>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        Recommended
                                    </div>
                                    <div>
                                        year of study:
                                    </div>
                                </th>
                                <th>Name:</th>
                                <th>Middle name:</th>
                                <th>Last name:</th>
                                <th>Years:</th>
                                <th>Birthday:</th>
                                <th>AdmissionDate:</th>
                                <th>Email:</th>
                                <th>Phone number:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.students.map(student =>
                                <tr style={this.state.studentsToAdd.indexOf(student.studentId) === -1 ? { background: 'none' } : { background: '#FF5733' }}
                                    key={"students" + student.studentId} onClick={() => this.onTableClick(student.studentId)}>
                                    <td>
                                        {this.recommendedYearOfStudy(new Date(), new Date(student.birthday))}
                                    </td>
                                    <td>
                                        {student.name}
                                    </td>
                                    <td>
                                        {student.middleName}
                                    </td>
                                    <td>
                                        {student.lastName}
                                    </td>
                                    <td>
                                        {this.calculateAge(new Date(), new Date(student.birthday))}
                                    </td>
                                    <td>
                                        {new Date(student.birthday).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {new Date(student.admissionDate).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {student.email}
                                    </td>
                                    <td>
                                        {student.phoneNumber}
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                    <input type='submit' className='btn btn-success' value="Add students into group" />
                </form>
            </div>
        )
    }
}
export default StudentsByGroupsDistribution;
