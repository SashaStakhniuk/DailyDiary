import React from 'react'
// import '../../styles/Teachers.css'
import NavigationBar from '../NavigationBar';
 import GroupEditing from './GroupEditing';
 //import {NavLink} from 'react-router-dom';
import axios from 'axios'
class TeacherPage extends React.Component{

    constructor(props){
        super(props);

        this.state={
            groups:[],
            subject: {}, 
            subjectTilt: 'Subject',
            students: [],
            teacherId: 1
        }
        this.getTeacherGroups = this.getTeacherGroups.bind(this);
        this.onClickgroup = this.onClickgroup.bind(this);
        this.onClickGroupEdit = this.onClickGroupEdit.bind(this);
        this.getSubgect = this.getSubgect.bind(this);
        this.onClickRadio1 = this.onClickRadio1.bind(this);
        this.onClickRadio2 = this.onClickRadio2.bind(this);
        this.onClickRadio3 = this.onClickRadio3.bind(this);
        this.getStudents = this.getStudents.bind(this);
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

    async getStudents(groupId){
        try{
            const response= await fetch(`https://localhost:44364/api/student/GetStudentsByGroupId/${groupId}`)

             const data = await response.json()
    
             if (response.ok === true) {
                 this.setState({
                     students: data
                 })
             } else {
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

        this.getStudents(group.id)

        this.getSubgect(group.id)
    }

    async getSubgect(groupId){
        var group_subject = document.getElementById('group-subject')
        const response = await fetch(`https://localhost:44364/api/Subject/GetSubjectId/${groupId}`, {method: "GET"})
        if(response.ok === true){
            
            const data_subjectID = await response.json()
            const responseGetSubjectById = await fetch(`https://localhost:44364/api/Subject/get/${data_subjectID}`, {method: "GET"})
            if(responseGetSubjectById.ok === true){
               
                const dataSubject = await responseGetSubjectById.json()
                group_subject.innerText = dataSubject.title
                this.setState({
                    subject: dataSubject
                })
            }
            
        } else {
            group_subject.innerText = 'Wrong request'
        }
        
    }

    onClickRadio1(e){
        var studentId = e.target.value
        var radio1 = document.getElementById(`radio1_st${studentId}`)
        var radio2 = document.getElementById(`radio2_st${studentId}`)
        var radio3 = document.getElementById(`radio3_st${studentId}`)
        if(radio2.classList.contains('active') === true){
            radio2.classList.remove('active')
        }
        if(radio3.classList.contains('active') === true){
            radio3.classList.remove('active')
        }
        if(radio1.classList.contains('active') === false) {
            radio1.classList.add('active')
            radio1.checked = true;             
        } else {
            radio1.classList.remove('active')
            radio1.checked = false;
        }
    }

    onClickRadio2(e){
        var studentId = e.target.value
        var radio1 = document.getElementById(`radio1_st${studentId}`)
        var radio2 = document.getElementById(`radio2_st${studentId}`)
        var radio3 = document.getElementById(`radio3_st${studentId}`)
      
        if(radio1.classList.contains('active') === true){
            radio1.classList.remove('active')
        }
        if(radio3.classList.contains('active') === true){
            radio3.classList.remove('active')
        }
        if(radio2.classList.contains('active') === false) {
            radio2.classList.add('active')  
        } else {
            radio2.classList.remove('active')
            radio2.checked = false;
        }
    }

    onClickRadio3(e){
        var studentId = e.target.value
        var radio1 = document.getElementById(`radio1_st${studentId}`)
        var radio2 = document.getElementById(`radio2_st${studentId}`)
        var radio3 = document.getElementById(`radio3_st${studentId}`)
      
        if(radio1.classList.contains('active') === true){
            radio1.classList.remove('active')
        }
        if(radio2.classList.contains('active') === true){
            radio2.classList.remove('active')
        }
        if(radio3.classList.contains('active') === false) {
            radio3.classList.add('active')  
        } else {
            radio3.classList.remove('active')
            radio3.checked = false;
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
                            <div className='main-student-containe'>
                                <div className='header-container-description'>
                                    <span className='fio'>FIO</span>
                                    <span className='visiting'>Mark
                                    <span className="border-green"></span>
                                    </span>
                                    <span className='online'>Online</span>
                                    <span className='feedback'>Feedback</span>
                                </div>
                                {this.state.students.map((student, i) => {
                                    return(
                                        <>
                                            <div className='student-cart'>
                                                <div className='fio-stident-container'>
                                                    <span className='id-student'>{student.studentId}</span>
                                                    {student.base64URL ?    
                                                            <img src={student.base64URL} id='img-student' className='img-student' /> 
                                                        :
                                                            <img 
                                                                style={{ width: '65px', borderRadius: '50%' }}
                                                                className="img-fluid rounded-start"
                                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png" alt="..." />
                                                    }
                                                    <div className='fio-student'>
                                                        <span>
                                                            {student.name} {student.lastName} (SubName)
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='visiting-container'>
                                                    <input className='radio1' onClick={e => this.onClickRadio1(e)} value={student.studentId} id={`radio1_st${student.studentId}`} type='radio'/>
                                                    <input className='radio2' onClick={e => this.onClickRadio2(e)} value={student.studentId} id={`radio2_st${student.studentId}`} type='radio'/>
                                                    <input className='radio3' onClick={e => this.onClickRadio3(e)} value={student.studentId} id={`radio3_st${student.studentId}`} type='radio' />
                                                </div>
                                                <div className="active-time-container">
                                                    <span className="online">Online</span>
                                                    <span className="tile-oneline">31.10.2022</span>
                                                    <span className=""></span>
                                                </div>
                                                <div className="send-feedback-container">
                                                    <div>
                                                        <a href={`/teacher-page/send-feedback/${student.studentId}/${this.state.teacherId}/${this.state.subject.id}/${student.name}`} className="image-ref">
                                                            <img src='https://www.veryicon.com/download/png/business/blue-business-icon/send-message-4?s=256' id='img-feedback' className="img-feedback sepia " />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div> 
                                        </>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TeacherPage