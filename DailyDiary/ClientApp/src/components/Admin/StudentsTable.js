import React from 'react'
import { Host } from '../Host'

class StudentsTable extends React.Component { // розподілення студентів по групах
    constructor(props) {
        super(props);
        // this.getAllStudentsWithoutGroupThisStudyYear = this.getAllStudentsWithoutGroupThisStudyYear.bind(this);

        this.recommendedYearOfStudy = this.recommendedYearOfStudy.bind(this);
        this.calculateAge = this.calculateAge.bind(this);
        this.onTableClick = this.onTableClick.bind(this);
        // this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            groupId: 0,
            studentsToAdd: [],
            // groups: [],
            students: []
        }
    };
    componentDidMount() {
        // this.getAllStudentsWithoutGroupThisStudyYear();
    }
    recommendedYearOfStudy(datenow, birthday) { // birthday is a date
        var diff = datenow.getFullYear() - birthday.getFullYear(); // різниця в роках
        let recommendedClass = "";
        if (diff - 5 > 0) {
            recommendedClass = (diff - 5) + " or " + (diff - 4);
        }
        else {
            recommendedClass = (diff - 4)
        }
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
    render() {
        return (
            <div className='container'>
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
                            {this.props.removeStudentFromGroup != undefined ?
                                <th>Delete:</th>
                                :
                                <></>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.students.map(student =>
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
                                {this.props.removeStudentFromGroup != undefined ?
                                    <td>
                                        <button className='btn btn-danger' style={{ textSize: "1.25em" }} onClick={() => this.props.removeStudentFromGroup(student.studentId)}>Remove from this group</button>
                                    </td>
                                    :
                                    <></>
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default StudentsTable;
