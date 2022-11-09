import React from 'react';
import { Role } from '../Role'
import { connect } from "react-redux";
import { Host } from '../Host'
import GeneralHeader from '../Headers/GeneralHeader';
import GeneralNavigationBar from '../Navigations/GeneralNavigationBar';
class CreateNewPerson extends React.Component {

    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
        this.getAdditionalPersonDatas = this.getAdditionalPersonDatas.bind(this)
        this.getDatasIfPersonWasInRoleErlier = this.getDatasIfPersonWasInRoleErlier.bind(this)
        this.createNewPerson = this.createNewPerson.bind(this)
        this.editPerson = this.editPerson.bind(this)

        this.getTeacherCategories = this.getTeacherCategories.bind(this)
        this.getTeacherSpecialities = this.getTeacherSpecialities.bind(this)
        this.getTeacherDegrees = this.getTeacherDegrees.bind(this)
        this.getTeacherEducations = this.getTeacherEducations.bind(this)

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
            edit: false,
            roles: [],
            teacherCategories: [],
            teacherEducations: [],
            teacherDegrees: [],
            teacherSpecialities: []
        }
    }
    componentDidMount() {
        // console.log(this.props)
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
            if (this.props.location.state.person.roles.indexOf(Role.Teacher) != -1) {
                this.getTeacherCategories();
                this.getTeacherEducations();
                this.getTeacherSpecialities();
                this.getTeacherDegrees();
            }
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
    async getTeacherCategories() {
        try {
            const response = await fetch(`${Host}/api/teacher/getTeachersCategories`);
            if (response.ok === true) {
                const data = await response.json()
                this.setState({ teacherCategories: data })
            }
            else {
                window.alert("getTeacherCategories some error");
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getTeacherDegrees() {
        try {
            const response = await fetch(`${Host}/api/teacher/getTeachersDegrees`);
            if (response.ok === true) {
                const data = await response.json()
                this.setState({ teacherDegrees: data })
            }
            else {
                window.alert("getTeacherDegrees some error");
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getTeacherEducations() {
        try {
            const response = await fetch(`${Host}/api/teacher/getTeachersEducations`);
            if (response.ok === true) {
                const data = await response.json()
                this.setState({ teacherEducations: data })
            }
            else {
                window.alert("getTeacherEducations some error");
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    async getTeacherSpecialities() {
        try {
            const response = await fetch(`${Host}/api/teacher/getTeachersSpecialities`);

            if (response.ok === true) {
                const data = await response.json()
                this.setState({ teacherSpecialities: data })
            }
            else {
                window.alert("getTeacherSpecialities some error");
            }
        }
        catch (e) {
            window.alert(e);
        }
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
            // console.log(this.props)
            // console.log(this.state)
            this.errors = "";
            const response = await fetch(`${Host}/api/person/createnew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.props.credentials.tokenKey
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
                if (this.state.teacherCategories.length == 0) {
                    this.getTeacherCategories();
                }
                if (this.state.teacherEducations.length == 0) {
                    this.getTeacherEducations();
                }
                if (this.state.teacherSpecialities.length == 0) {
                    this.getTeacherSpecialities();
                }
                if (this.state.teacherDegrees.length == 0) {
                    this.getTeacherDegrees();
                }
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
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} menuItemToSelect={3} />
                    </div>
                    <div className="generalSide">

                        <form onSubmit={this.handleFormSubmit}>
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
                                        <label htmlFor="name">Ім'я</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="middleName" name='middleName' placeholder="SomePersonMiddleName" defaultValue={this.state.middleName} required />
                                        <label htmlFor="middleName">По батькові</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="lastName" name='lastName' placeholder="SomePersonLastName" defaultValue={this.state.lastName} required />
                                        <label htmlFor="lastName">Прізвище</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-2">
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="date" className="form-control" id="birthday" name='birthday' placeholder="Birthday" defaultValue={this.state.birthday} required />
                                        <label htmlFor="birthday">Дата народження</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="address" name='address' placeholder="Address" defaultValue={this.state.address} required />
                                        <label htmlFor="address">Адреса</label>
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
                                            <label htmlFor="login">Логін</label>
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
                                        <label htmlFor="phoneNumber">Номер телефону</label>
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
                                            {/* <input type="text" className="form-control" id="speciality" name='speciality' placeholder="Speciality" defaultValue={this.state.speciality} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} />
                                    <label htmlFor="speciality">Speciality</label> */}
                                            <select id="speciality" name="speciality" className="form-select" defaultValue={this.state.speciality} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true}>
                                                {this.state.teacherSpecialities.map(speciality =>
                                                    this.state.speciality != speciality.description ?
                                                        <option key={"speciality" + speciality.id} value={speciality.description}>{speciality.description}</option>
                                                        :
                                                        <option key={"speciality" + speciality.id} selected value={speciality.description}>{speciality.description}</option>
                                                )}
                                            </select>
                                            <label htmlFor="speciality">Спеціальність</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            {/* <input type="text" className="form-control" id="education" name='education' placeholder="Education" defaultValue={this.state.education} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} />
                                    <label htmlFor="education">Education</label> */}

                                            <select id="education" name="education" className="form-select" defaultValue={this.state.education} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true}>
                                                {this.state.teacherEducations.map(education =>
                                                    this.state.education != education.description ?
                                                        <option key={"education" + education.id} value={education.description}>{education.description}</option>
                                                        :
                                                        <option key={"education" + education.id} selected value={education.description}>{education.description}</option>
                                                )}
                                            </select>
                                            <label htmlFor="education">Освіта</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            {/* <input type="text" className="form-control" id="category" name='category' placeholder="Category" defaultValue={this.state.category} required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} />
                                    <label htmlFor="category">Category</label> */}
                                            <select id="category" name="category" className="form-select" required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true}>
                                                {this.state.teacherCategories.map(category =>
                                                    this.state.category != category.description ?
                                                        <option key={"category" + category.id} value={category.description}>{category.description}</option>
                                                        :
                                                        <option key={"category" + category.id} selected value={category.description}>{category.description}</option>
                                                )}
                                            </select>
                                            <label htmlFor="category">Категорія</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            {/* <input type="text" className="form-control" id="degree" name='degree' placeholder="Degree" required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true} />
                                    <label htmlFor="degree">Degree</label> */}
                                            <select id="degree" name="degree" className="form-select" required={this.state.roles.indexOf(Role.Teacher) === -1 ? false : true}>
                                                {this.state.teacherDegrees.map(degree =>
                                                    this.state.degree != degree.description ?
                                                        <option key={"degree" + degree.id} value={degree.description}>{degree.description}</option>
                                                        :
                                                        <option key={"degree" + degree.id} selected value={degree.description}>{degree.description}</option>
                                                )}
                                            </select>
                                            <label htmlFor="degree">Ступінь</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-end'>
                                {this.state.edit === true ?
                                    <input type="submit" className='general-outline-button button-static m-1' value="Редагувати" />
                                    :
                                    <input type="submit" className='general-outline-button button-static m-1' value="Створити" />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </>

        )
    }
}
function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}
// function mapDispatchToProps(dispatch){
//     return{
//         setCredentials:(userId,tokenKey,roles)=>dispatch(setUserCredentials(userId,tokenKey,roles)),
//     }
//   };
// export default connect(mapStateToProps,mapDispatchToProps)(Admin);
export default connect(mapStateToProps)(CreateNewPerson);
// export default CreateNewPerson;