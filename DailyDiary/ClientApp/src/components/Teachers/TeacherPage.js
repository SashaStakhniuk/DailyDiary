import React from 'react'
import '../../styles/Teachers.css'
 import GroupEditing from './GroupEditing';
 //import {NavLink} from 'react-router-dom';

class TeacherPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            groups:[]
        }
        this.getTeacherGroups = this.getTeacherGroups.bind(this);

    }
    componentDidMount(){
        this.getTeacherGroups(1);
    }
    async getTeacherGroups(Id){
        try{
            const response= await fetch(`https://localhost:44364/api/teacher/GetTeacherGroupsById/${Id}`)

             const data = await response.json()
    
             if (response.ok === true) {
                 this.setState({
                     groups:data
                 })
                console.log(data)
             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }


render()
{
    return(
        <>
            <div id='all-container' className="all-container">
                <div className=" p-3 d-flex flex-column">
                    <h1>My groups:</h1>
                    <ul className="list-group">
                        {this.state.groups.map(group =>
                        
                            <a key={group.id} href={"/teacher/group-editing/"+group.id} className="list-group-item">
                                <h3>{group.title}</h3>
                            </a>
                            // <GroupEditing key={group.id} id={group.id}>
                            //     <h3>{group.title}</h3>
                            // </GroupEditing>
                            // <NavLink
                            // key={group.id} className="list-group-item"
                            // to={{
                            //     pathname:"/teacher/group-editing/"+group.id,
                            //     // aboutProps:{
                            //     //       groupId:group.id
                            //     //     }
                            // }}exact >
                            //       <h3>{group.title}</h3>
                            // </NavLink>       
                            
                        )}
                         
                    </ul>
                </div>
                <a className='btn' href='/teacher/news-page/1'>News</a>
            </div>
        </>
    )
}
}

export default TeacherPage