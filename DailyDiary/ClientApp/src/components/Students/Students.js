 import React from 'react'
 import {Host} from '../Host'

 class Students extends React.Component{
    constructor(props) {
        super(props);
        this.getStudentsByGroupId = this.getStudentsByGroupId.bind(this);
        this.state = {
            students: []
        }
    };
    componentDidMount(){
        if(this.props.groupId!=undefined){
            this.getStudentsByGroupId(this.props.groupId);
            console.log(this.props.groupId)
        }

    }
    async getStudentsByGroupId(groupId) {
        try {
            const response = await fetch(`${Host}/api/student/getAllByGroupId/${groupId}`);
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
    render(){
        return(
            <div className='container'>
                <div>Students:</div>
                <table className='table'>
                        <thead>
                            <tr>
                                <th>Name:</th>
                                <th>Middle name:</th>
                                <th>Last name:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.students.map(person =>
                                <tr key={"students" + person.Id}>
                                    <td>
                                        {person.name}
                                    </td>
                                    <td>
                                        {person.middleName}
                                    </td>
                                    <td>
                                        {person.lastName}
                                    </td>                              
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
        )
    }
 }
export default Students;