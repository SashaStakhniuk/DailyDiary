import React, { Component } from "react";
import { connect } from "react-redux";
import {Host} from "../Host"
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.getAllStudentsURL = `${Host}/api/student/get`;
        this.getAllStudents = this.getAllStudents.bind(this);
        this.onClickhendlerNewStudent = this.onClickhendlerNewStudent.bind(this)
        this.state = {
            students: [],
        }
    }
    async componentDidMount() {
        await this.getAllStudents();
    }
    async getAllStudents() {
        try {
            const response = await fetch(this.getAllStudentsURL)

            const data = await response.json()

            if (response.ok === true) {

                this.setState(
                    {
                        students: data
                    });

            } else {
                console.log("error", data)
            }
        }
        catch { }
    }

    onClickhendlerNewStudent() {
        window.location = '/admin/new-student'
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="d-flex justify-content-around">
                        <div className="m-3">
                            <a href="/admin/new-person" className="btn">Create new user</a>
                        </div>
                        <div className="m-3">
                            <a href="/admin/edit-person" className="btn">Find person</a>
                        </div>
                        <div className="m-3">
                            <a href="/admin/new-study-year" className="btn">New study year</a>
                        </div>
                        <div className="m-3">
                            <a href="/admin/edit-group" className="btn">Find group</a>
                        </div>
                        <div className="m-3">
                            <a href="/admin/edit-groups" className="btn">Редагування груп</a>
                        </div>
                        <div className="m-3">
                            <a href="/admin/new-study-plan" className="btn">New Study plan</a>
                        </div>
                        <div className="m-3">
                            <a href="/admin/teachers-distribution" className="btn">Розподілення викладачів по групах</a>
                        </div>
                       

                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state){
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
 export default connect(mapStateToProps)(Admin);
// export default Admin;