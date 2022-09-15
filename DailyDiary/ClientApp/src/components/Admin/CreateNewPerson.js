import React from 'react';
import { Role } from '../Role'
import { Host } from '../Host'
class CreateNewPerson extends React.Component {

    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
        this.getAdditionalPersonDatas = this.getAdditionalPersonDatas.bind(this)
        this.getDatasIfPersonWasInRoleErlier = this.getDatasIfPersonWasInRoleErlier.bind(this)
        this.createNewPerson = this.createNewPerson.bind(this)
        this.editPerson = this.editPerson.bind(this)
        this.errors = "";
        this.state = {
            personId: 0,
            name: "",
            middleName: "",
            lastName: "",
            email: "",
            login: "",
            phoneNumber: "",
            speciality: "",
            category: "",
            degree: "",
            education: "",
            address: "",
            photoBase64: "",
            birthday: "2000-01-01",
            admissionDate: "2022-09-01",
            roles: [],
            edit: false
        }
    }
    componentDidMount() {
        if (this.props.location.state != undefined) {
            console.log(this.props.location.state)
            this.getAdditionalPersonDatas(this.props.location.state.person.personId);
            this.setState({
                personId: this.props.location.state.person.personId,
                name: this.props.location.state.person.name,
                middleName: this.props.location.state.person.middleName,
                lastName: this.props.location.state.person.lastName,
                email: this.props.location.state.person.email,
                phoneNumber: this.props.location.state.person.phoneNumber,
                speciality: this.props.location.state.person.speciality,
                category: this.props.location.state.person.category,
                degree: this.props.location.state.person.degree,
                education: this.props.location.state.person.education,
                address: this.props.location.state.person.address,
                photoBase64: this.props.location.state.person.photoBase64,
                birthday: new Date(this.props.location.state.person.birthday).toDateString("YYYY-MM-DD"),
                admissionDate: new Date(this.props.location.state.person.admissionDate).toDateString("YYYY-MM-DD"),
                roles: this.props.location.state.person.roles,
                edit: true
            }
                , () => console.log(this.state)
            )
        }
        else {
            this.setState({
                roles: [Role.Student],
                edit: false
            }, () => console.log(this.state.roles)
            )
            console.log('this.props.location.state not found')
        }

        // let teacherInfo = document.getElementById('teacherInfo');
        // let studentInfo = document.getElementById('studentInfo');
        // //console.log(Role)
        // if (this.state.roles.indexOf(Role.Student) === -1) {
        //     studentInfo.style.display = 'none'
        // } else {
        //     studentInfo.style.display = 'block'
        // }
        // if (this.state.roles.indexOf('Teacher') === -1) {
        //     teacherInfo.style.display = 'none'
        // }
        // else {
        //     teacherInfo.style.display = 'block'
        // }

    }
    async getAdditionalPersonDatas(personId) {
        try {
            const response = await fetch(`${Host}/api/person/GetUserLogin/${personId}`)
            const data = await response.text();
            console.log(data);
            if (response.ok === true) {
                this.setState({
                    login: data
                }
                    , () => console.log(this.state));
            }
            else {
                window.alert("Error");
            }
        }
        catch (e) {
            window.alert(e);
        }

    }
    async getDatasIfPersonWasInRoleErlier(role) {
        try {
            if (this.state.personId > 0) {
                const response = await fetch(`${Host}/api/person/GetDatasIfPersonWasInRoleErlier/details?personId=${this.state.personId}&&role=${role}`)
                if (response.ok === true) {
                    const data = await response.json();
                    console.log(data);

                    if (data.teacherId != null) {
                        this.setState({
                            speciality: data.speciality,
                            category: data.category,
                            degree: data.degree,
                            education: data.education
                        })
                    }
                    if (data.studentId != null) {
                        this.setState({
                            admissionDate: new Date(data.admissionDate).toDateString("YYYY-MM-DD")
                        })
                    }
                }
                else {
                    const data = await response.text();
                    console.log(data)
                }
            }
        }
        catch (e) {
            window.alert(e);
        }

    }
    async createNewPerson() {
        try {
            this.errors = "";
            const response = await fetch(`${Host}/api/person/createnew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            if (response.ok === true) {
                //window.location = '/admin'
                window.alert("Person was created");
            }
            else {
                var data = await response.json()
                console.log(data);
                if (data.errors !== undefined) {
                    for (var elem in data.errors) {
                        // console.log(elem,data.errors[elem]);
                        data.errors[elem].forEach(error => {
                            this.errors += '\n' + error;
                        })
                    }
                    console.log(this.errors);
                }
                else {
                    if (data.error == "Email already registered") {
                        alert(data.error);
                    }
                }
            }
        }
        catch (ex) {
            window.alert(ex);
        }
    }
    async editPerson() {
        try {
            this.errors = "";
            const response = await fetch(`${Host}/api/person/EditPerson`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            if (response.ok === true) {
                //window.location = '/admin'
                window.alert("Person was edited");
            }
            else {
                var data = await response.json()
                console.log(data);
                if (data.errors !== undefined) {
                    for (var elem in data.errors) {
                        // console.log(elem,data.errors[elem]);
                        data.errors[elem].forEach(error => {
                            this.errors += '\n' + error;
                        })
                    }
                    console.log(this.errors);
                }
            }
        }
        catch (ex) {
            console.log(ex);
        }
    }
    handleFormSubmit(e) {
        e.preventDefault()
        //console.log(e.target)
        const {
            name, middleName, lastName, address, login, birthday, email, phoneNumber,
            speciality, category, degree, education,
            admissionDate
        } = e.target
        // if (roles.value == Role.Teacher) {
        if (login != undefined) {
            this.setState({ login: login.value })
        }
        this.setState({
            name: name.value,
            middleName: middleName.value,
            lastName: lastName.value,
            birthday: birthday.value,
            address: address.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            admissionDate: admissionDate.value,
            speciality: speciality.value,
            category: category.value,
            degree: degree.value,
            education: education.value
        }
            //,()=> console.log(this.state)
            , () => this.state.edit === true ? this.editPerson() : this.createNewPerson()
        )
    }
     onCheckBoxChange(e) {
        let teacherInfo = document.getElementById('teacherInfo');
        let studentInfo = document.getElementById('studentInfo');

        var arrayOfRoles = this.state.roles;
        if (e.target.checked) {

             this.getDatasIfPersonWasInRoleErlier(e.target.value);

            if (arrayOfRoles.indexOf(e.target.value) === -1) {
                arrayOfRoles.push(e.target.value)
            }
            if (e.target.value == Role.Student) {
                studentInfo.style.display = 'block'
            }
            if (e.target.value == Role.Teacher) {
                teacherInfo.style.display = 'block'
            }
            //console.log(this.state.roles)
        }
        else {
            if (arrayOfRoles.indexOf(e.target.value) !== -1) {
                arrayOfRoles.splice(arrayOfRoles.indexOf(e.target.value), 1);
            }
            if (e.target.value == Role.Student) {
                studentInfo.style.display = 'none'
            }
            if (e.target.value == Role.Teacher) {
                teacherInfo.style.display = 'none'
            }
        }

        this.setState({ roles: arrayOfRoles });
        console.log(this.state.roles)
    }
    render() {

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="container">
                    <div>Create as</div>
                    <hr style={{ minWidth: "100%" }}></hr>
                    <div>
                        <fieldset className="d-flex flex-column">
                            <div>
                                <input type="checkbox" id="role1" name="roles" checked={this.state.roles.indexOf(Role.Admin) === -1 ? false : true} onChange={this.onCheckBoxChange} value={Role.Admin} />
                                <label htmlFor="role1">Admin</label>
                            </div>
                            <div>
                                <input type="checkbox" id="role2" name="roles" checked={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} onChange={this.onCheckBoxChange} value={Role.Teacher} />
                                <label htmlFor="role2">Teacher</label>
                            </div>
                            <div>
                                <input type="checkbox" id="role3" name="roles" checked={this.state.roles.indexOf(Role.Student) === -1 ? false : true} onChange={this.onCheckBoxChange} value={Role.Student} />
                                <label htmlFor="role3">Student</label>
                            </div>
                            <div>
                                <input type="checkbox" id="role4" name="roles" checked={this.state.roles.indexOf(Role.Parrent) === -1 ? false : true} onChange={this.onCheckBoxChange} value={Role.Parrent} />
                                <label htmlFor="role4">Parrent</label>
                            </div>
                        </fieldset>
                    </div>
                    <br></br>
                    <div>Person info</div>
                    <hr style={{ minWidth: "100%" }}></hr>
                    <div className="row g-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="name" name='name' placeholder="SomePersonName" defaultValue={this.state.name} required />
                                <label htmlFor="name">Name</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="middleName" name='middleName' placeholder="SomePersonMiddleName" defaultValue={this.state.middleName} required />
                                <label htmlFor="middleName">MiddleName</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="lastName" name='lastName' placeholder="SomePersonLastName" defaultValue={this.state.lastName} required />
                                <label htmlFor="lastName">LastName</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="date" className="form-control" id="birthday" name='birthday' placeholder="Birthday" defaultValue={this.state.birthday} required />
                                <label htmlFor="birthday">Birthday</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="address" name='address' placeholder="Address" defaultValue={this.state.address} required />
                                <label htmlFor="address">Address</label>
                            </div>
                        </div>
                    </div>
                    <div>User info</div>
                    <hr style={{ minWidth: "100%" }}></hr>
                    {this.state.edit === true ?
                        <div className="row g-2">
                            <div className="col-md">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="login" name='login' placeholder="Login" defaultValue={this.state.login} required />
                                    <label htmlFor="login">Login</label>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="email" className="form-control" id="email" name='email' placeholder="Email" defaultValue={this.state.email} required />
                                <label htmlFor="email">E-Mail</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="tel" className="form-control" id="phoneNumber" name='phoneNumber' placeholder="+380973433512" defaultValue={this.state.phoneNumber} required />
                                <label htmlFor="phoneNumber">Phone number</label>
                            </div>
                        </div>
                    </div>
                    <div id="studentInfo">
                        <div>Student info</div>
                        <hr style={{ minWidth: "100%" }}></hr>
                        <div className="row g-2">
                            <div className="col-md">
                                <div className="form-floating">
                                    <input type="date" className="form-control" id="admissionDate" name='admissionDate' placeholder="AdmissionDate" defaultValue={this.state.admissionDate} required={this.state.roles.indexOf(Role.Student) === -1 ? false : true} />
                                    <label htmlFor="admissionDate">AdmissionDate</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="teacherInfo">
                        <div>Teacher info</div>
                        <hr style={{ minWidth: "100%" }}></hr>
                        <div className="row g-2">

                            <div className="col-md">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="speciality" name='speciality' placeholder="Speciality" defaultValue={this.state.speciality} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} />
                                    <label htmlFor="speciality">Speciality</label>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="education" name='education' placeholder="Education" defaultValue={this.state.education} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} />
                                    <label htmlFor="education">Education</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2">
                            <div className="col-md">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="category" name='category' placeholder="Category" defaultValue={this.state.category} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} />
                                    <label htmlFor="category">Category</label>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="degree" name='degree' placeholder="Degree" defaultValue={this.state.degree} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} />
                                    <label htmlFor="degree">Degree</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-end'>
                        {this.state.edit === true ?
                            <input type="submit" className='btn btn-warning m-1' style={{ minWidth: "40%" }} value="Edit" />
                            :
                            <input type="submit" className='btn btn-success m-1' style={{ minWidth: "40%" }} value="Create" />
                        }
                    </div>
                </div>
            </form>

        )
    }
}

export default CreateNewPerson;