import React from 'react'
import { Host } from '../Host'
import "../../styles/Tasks/HomeworkCard.css"
import studentPhoto from "../../images/Photo.png"
class StudentsTable extends React.Component { // розподілення студентів по групах
    constructor(props) {
        super(props);
        // this.getAllStudentsWithoutGroupThisStudyYear = this.getAllStudentsWithoutGroupThisStudyYear.bind(this);

        this.recommendedYearOfStudy = this.recommendedYearOfStudy.bind(this);
        this.calculateAge = this.calculateAge.bind(this);
        // this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            groupId: 0,
            studentsToAdd: [],
            selected: false,
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

    // onTableClick(studentId) {
    //      console.log(studentId)
    //     const indexOfExistingStudentId = this.state.studentsToAdd.indexOf(studentId);
    //     if (indexOfExistingStudentId === -1) {
    //     //   var arrayToChange = this.state.studentsToAdd;
    //     //   arrayToChange.push(studentId);
    //     //     this.setState({
    //     //         studentsToAdd: arrayToChange
    //     //     }          
    //     //     , () => console.log(this.state.studentsToAdd)
    //     //     );

    //         // this.setState(previousState => ({
    //         //     studentsToAdd: [...previousState.studentsToAdd, studentId]
    //         // }
    //         // )
    //         // , () => console.log(this.state.studentsToAdd)
    //         // );

    //         // this.setState({
    //         //     studentsToAdd: [...this.state.studentsToAdd, studentId]
    //         // }
    //         //      , () => console.log(this.state.studentsToAdd)
    //         // );
    //     }
    //     // else {
    //     //     this.setState({
    //     //         studentsToAdd: this.state.studentsToAdd.filter(function (id) {
    //     //             return id !== studentId;
    //     //         })
    //     //     }
    //     //         , () => console.log(this.state.studentsToAdd)
    //     //     );
    //     // }
    // }
    onStudentClick = (studentId) => {

        if (this.props?.onStudentSelect !== undefined) {
            if (this.state.selected) {
                this.setState({
                    selected: false
                })
            }
            else {
                this.setState({
                    selected: true
                })
            }
            this.props.onStudentSelect(studentId)
        }
    }
    render() {
        return (
            <section className="card" id={"student_" + this.props.student.studentId} style={!this.state.selected ? { background: 'none' } : { background: '#FF5733' }} onClick={() => this.onStudentClick(this.props.student.studentId)}>

                <div className="subjectTitle">
                    <div>
                        {this.props.student.name + " " + this.props.student.middleName + " " + this.props.student.lastName}
                    </div>
                </div>
                <div className='row-cols-2-view'>
                    <div className="card-image" style={{ float: "left" }}>
                        <img src={studentPhoto} alt="..." />
                    </div>

                    <div className='task-info'>
                        <div className='task-info-item text-bolder'>
                            <div>
                                <label htmlFor="years">Років:</label>
                            </div>
                            <div id="comment" className='text-thinner'>
                                {this.calculateAge(new Date(), new Date(this.props.student.birthday))}
                            </div>
                        </div>
                        <div className='task-info-item text-bolder'>
                            <div style={{ whiteSpace: "break-spaces" }}>
                                <label htmlFor="email">Електронна пошта:</label>
                            </div>
                            <div id="email" className='text-thinner'>
                                <div>
                                    {this.props.student.email}
                                </div>
                            </div>
                        </div>
                        <div className='task-info-item text-bolder'>
                            <div>
                                <label htmlFor="phoneNumber">Номер телефону:</label>
                            </div>
                            <div id="phoneNumber" className='text-thinner'>
                                <div>
                                    {this.props.student.phoneNumber}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="infoicon">
                    <div className="icon">
                        <span className="tooltip">
                            <div className='task-info'>
                                {this.props?.withoutGroup === true ?
                                    <div className='task-info-item text-bolder'>
                                        <div>
                                            <label htmlFor="recommendedYearOfStudy">Рекомендований рік навчання:</label>
                                        </div>
                                        <div id="recommendedYearOfStudy" className='text-thinner'>
                                            <div>
                                                {this.recommendedYearOfStudy(new Date(), new Date(this.props.student.birthday))}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }

                                <div className='task-info-item text-bolder'>
                                    <div>
                                        <label htmlFor="admissionDate">Дата вступу:</label>
                                    </div>
                                    <div id="admissionDate" className='text-thinner'>
                                        <div>
                                            {new Date(this.props.student.admissionDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className='task-info-item text-bolder'>
                                    <div>
                                        <label htmlFor="birthday">Дата народження:</label>
                                    </div>
                                    <div id="birthday" className='text-thinner'>
                                        <div>
                                            {new Date(this.props.student.birthday).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                {this.props.removeStudentFromGroup !== undefined ?
                                    <button className='general-outline-button' style={{ position: "absolute", bottom: "5px", right: "5px" }} onClick={() => this.props.removeStudentFromGroup(this.props.student.studentId)}>Remove</button>
                                    :
                                    <></>
                                }
                            </div>
                        </span>
                    </div>
                </div >
            </section >
            //                 <div>

            //     <table className='table table-hover'>
            //         <thead>
            //             <tr>
            //                 <th>
            //                     <div>
            //                         Recommended
            //                     </div>
            //                     <div>
            //                         year of study:
            //                     </div>
            //                 </th>
            //                 <th>Name:</th>
            //                 <th>Middle name:</th>
            //                 <th>Last name:</th>
            //                 <th>Years:</th>
            //                 <th>Birthday:</th>
            //                 <th>AdmissionDate:</th>
            //                 <th>Email:</th>
            //                 <th>Phone number:</th>
            //                 {this.props.removeStudentFromGroup != undefined ?
            //                     <th>Delete:</th>
            //                     :
            //                     <></>
            //                 }
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {this.props.students.map(student =>
            //                 <tr style={this.state.studentsToAdd.indexOf(student.studentId) === -1 ? { background: 'none' } : { background: '#FF5733' }}
            //                     key={"students" + student.studentId} onClick={() => this.onTableClick(student.studentId)}>
            //                     <td>
            //                         {this.recommendedYearOfStudy(new Date(), new Date(student.birthday))}
            //                     </td>
            //                     <td>
            //                         {student.name}
            //                     </td>
            //                     <td>
            //                         {student.middleName}
            //                     </td>
            //                     <td>
            //                         {student.lastName}
            //                     </td>
            //                     <td>
            //                         {this.calculateAge(new Date(), new Date(student.birthday))}
            //                     </td>
            //                     <td>
            //                         {new Date(student.birthday).toLocaleDateString()}
            //                     </td>
            //                     <td>
            //                         {new Date(student.admissionDate).toLocaleDateString()}
            //                     </td>
            //                     <td>
            //                         {student.email}
            //                     </td>
            //                     <td>
            //                         {student.phoneNumber}
            //                     </td>
            //                     {this.props.removeStudentFromGroup !== undefined ?
            //                         <td>
            //                             <button className='btn btn-danger' style={{ textSize: "1.25em" }} onClick={() => this.props.removeStudentFromGroup(student.studentId)}>Remove</button>
            //                         </td>
            //                         :
            //                         <></>
            //                     }
            //                 </tr>
            //             )}
            //         </tbody>
            //     </table>
            // </div >
        )
    }
}
export default StudentsTable;
