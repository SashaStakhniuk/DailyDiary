import React from 'react'
import '../../styles/Teachers.css'
import NavigationBar from '../NavigationBar';
 import GroupEditing from './GroupEditing';
 //import {NavLink} from 'react-router-dom';
import axios from 'axios'
class TeacherPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            groups:[],
            subjectTilt: 'Subject'
        }
        this.getTeacherGroups = this.getTeacherGroups.bind(this);
        this.onClickgroup = this.onClickgroup.bind(this);
        this.onClickGroupEdit = this.onClickGroupEdit.bind(this);
        this.getSubgect = this.getSubgect.bind(this);
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

    onClickGroupEdit(e, groupId){
        e.preventDefault()
        window.location = `teacher/group-editing/${groupId}`
    }

    async onClickgroup(e, group){
        e.preventDefault()
        var cart_group = document.getElementById(group.id)
        var group_subject = document.getElementById('group-subject')
        //group_subject.innerText = 'Subject'
        var flag = cart_group.classList.contains("active")
        var group_title = document.getElementById('group-title')
        group_title.innerText = group.title
        if(flag === false){
            cart_group.classList.add('active')
        } else {
            cart_group.classList.remove('active')
            group_title.innerText = 'Group'
            group_subject.innerText = 'Subject'
        }

        this.getSubgect(group.id)
    }

    async getSubgect(groupId){
        var group_subject = document.getElementById('group-subject')
        const response = await fetch(`https://localhost:44364/api/Subject/GetSubjectId/${groupId}`, {method: "GET"})
        
        if(response.ok === true){
            const data = await response.json()
            const responseGetSubjectById = await fetch(`https://localhost:44364/api/Subject/get/${data}`, {method: "GET"})
            if(responseGetSubjectById.ok === true){
                const subject = await responseGetSubjectById.json()
                group_subject.innerText = subject.title
            }
            
        } else {
            group_subject.innerText = 'Wrong request'
        }
    }

    render()
    {
        return(
            <>
                <div id='all-container' className="all-container">
                    <NavigationBar />
                    <div className="teacher-header">

                    </div>
                    <div style={{marginTop: '10px'}}>

                        <div className='groups_navigation-container'>
                            {this.state.groups.map(group =>  
                                <div id={group.id} key={group.id} onClick={e => this.onClickgroup(e, group)} onDoubleClick={e => this.onClickGroupEdit(e, group.id)} className="group-cart">
                                    {group.title}
                                </div>      
                            )}
                        </div>
                        <div className='students-container'>
                            <div className="title-container">
                                <div id='group-title'>Group</div>
                                <div id='group-subject'> 
                                    
                                </div>
                            </div>
                            <div className='main-containe'>
                                <div className='student-cart'>

                                </div>
                                <div className='student-cart'>

                                </div>      
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TeacherPage