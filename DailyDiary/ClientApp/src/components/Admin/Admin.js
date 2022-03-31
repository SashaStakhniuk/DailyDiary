import React,{ Component } from "react";
import NavigationBar from "../NavigationBar";
import '../../styles/Teachers.css'

class Admin extends Component{
    constructor(props){
        super(props)
        this.getAllStudentsURL="https://localhost:44364/api/student/get";
        this.getAllStudents = this.getAllStudents.bind(this);
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

    render(){
        return(
            <>
                <div className="all-container">
                    <NavigationBar/>
                    <div id="all-container" className="all-container">
                        <div className="wrapper">
                            <div >
                                <a className="btn" href="/admin/new-student">New student</a>
                            </div>
                            <div>
                                <a className="btn" href="/admin/new-teacher">New Teacher</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </>
        );
    }
}

export default Admin;