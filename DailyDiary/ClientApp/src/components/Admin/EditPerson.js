import React from 'react';
// import { Role } from '../Role'
import { Host } from '../Host'
import { NavLink, Link } from 'react-router-dom';

import CreateNewPerson from './CreateNewPerson';
class EditPerson extends React.Component {

    constructor(props) {
        super(props)
        this.getAllPersons = this.getAllPersons.bind(this);
        this.errors = "";
        this.state = {
            persons: []
        }
    }
    componentDidMount() {
        this.getAllPersons();
    }
    async getAllPersons() {
        const response = await fetch(`${Host}/api/person/getAll`);
        const data = await response.json();
        if (response.ok === true) {
            this.setState({ persons: data });
            console.log(data)
        }
        else {
            window.alert("Error");
        }
    }
    async EditPerson(personId) {

        // <CreateNewPerson></CreateNewPerson>
    }
    render() {

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="container">
                    {this.state.persons.length > 0 ?
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Role(s)</th>
                                        <th>Name</th>
                                        <th>MiddleName</th>
                                        <th>LastName</th>
                                        <th>Email</th>
                                        <th>PhoneNumber</th>
                                        <th>Address</th>
                                        <th>Birthday</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.persons.map(person =>
                                        <tr key={person.personId}>
                                            <td>{person.roles.map(role => <span key={"role_"+role}>{role + ' '}</span>)}</td>
                                            <td>{person.name}</td>
                                            <td>{person.middleName}</td>
                                            <td>{person.lastName}</td>
                                            <td>{person.email}</td>
                                            <td>{person.phoneNumber}</td>
                                            <td>{person.address}</td>
                                            <td>{new Date(person.birthday).toLocaleDateString()}</td>
                                            <td><Link
                                                className="btn btn-outline-warning m-1"
                                                style={{ textDecoration: "none", color: "black" }}
                                                to={{
                                                    pathname: "/admin/new-person",
                                                    state: { person: person }
                                                }}

                                                exact = "true"
                                            > Edit
                                            </Link>
                                            </td>
                                            {/* <button type='button' className='btn btn-warning' onClick={()=>this.EditPerson(person.userId)}>Edit</button> */}
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div></div>}
                </div>
            </form >

        )
    }
}

export default EditPerson;