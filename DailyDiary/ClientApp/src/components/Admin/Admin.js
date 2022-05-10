import React,{ Component } from "react";
import NavigationBar from "../NavigationBar";
import '../../styles/Students.css'

class Admin extends Component{
    constructor(props){
        super(props)
        this.getAllStudentsURL="https://localhost:44364/api/student/get";
        this.getAllStudents = this.getAllStudents.bind(this);
        this.onClickhendlerNewStudent = this.onClickhendlerNewStudent.bind(this)
        this.state={
            students:[],
        }
    }
    async componentDidMount()
    {
        await this.getAllStudents();
    }
    async getAllStudents() {
        try{
            const response= await fetch(this.getAllStudentsURL)

             const data = await response.json()
    
             if (response.ok === true) {

                this.setState(
                {
                    students:data
                });
              
             } else {
                console.log("error",data)
             }
            }
            catch{ }
    }

    onClickhendlerNewStudent(){
        window.location = '/admin/new-student'
    }

    render(){
        return(
            <>
                <div className="container">
                    <NavigationBar/>
                    <div id="all-container" className="all-container">
                        <div className="wrapper">
                            <div className="m-3">
                                <a href="/admin/new-student" className="btn">New student</a>
                            </div>  
                            <div className="m-3">
                                <a href="/admin/new-study-plan" className="btn">New Study plan</a>
                            </div>  
                            <div className="m-3">
                                <a href="/admin/new-student" className="btn">New Subject Study plan</a>
                            </div>
                            <div className="m-3">
                                <a href="/admin/new-teacher" className="btn">New teacher</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </>
        );
    }
}

export default Admin;