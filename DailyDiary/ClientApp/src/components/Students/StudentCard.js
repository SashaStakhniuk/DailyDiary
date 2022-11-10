import React from 'react'
import { Host } from '../Host'
import "../../styles/Tasks/HomeworkCard.css"
import studentPhoto from "../../images/Photo.png"
class StudentCard extends React.Component { // розподілення студентів по групах
    constructor(props) {
        super(props);
        // this.getAllStudentsWithoutGroupThisStudyYear = this.getAllStudentsWithoutGroupThisStudyYear.bind(this);

        this.calculateAge = this.calculateAge.bind(this);
        // this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
        }
    };
    componentDidMount() {
        // this.getAllStudentsWithoutGroupThisStudyYear();
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

    render() {
        return (
            <section className="card" id={"student_" + this.props.student.studentId} >

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
                                <label htmlFor="group">Група:</label>
                            </div>
                            <div id="group">
                                {this.props.student.groupTitle}
                            </div>
                        </div>
                        {/* <div className='task-info-item text-bolder'>
                            <div>
                                <label htmlFor="yearOfStudy">Рік навчання:</label>
                            </div>
                            <div id="yearOfStudy" className='text-thinner'>
                                <div>
                                    Рік навчання.
                                </div>
                            </div>
                        </div> */}
                        <div className='task-info-item text-bolder'>
                            <div>
                                <label htmlFor="years">Років:</label>
                            </div>
                            <div id="years" className='text-thinner'>
                                {this.calculateAge(new Date(), new Date(this.props.student.birthday))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="infoicon">
                    <div className="icon">
                        <span className="tooltip">
                            <div className='task-info'>


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
                            </div>
                        </span>
                    </div>
                </div >
            </section >
        )
    }
}
export default StudentCard;
