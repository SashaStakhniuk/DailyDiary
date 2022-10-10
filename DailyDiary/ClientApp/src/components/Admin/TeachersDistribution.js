import { throws } from 'assert';
import React from 'react'

class TeachersDistribution extends React.Component{
    constructor(props){
        super(props);       
        this.getAllGroups = this.getAllGroups.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.getAllSubjects = this.getAllSubjects.bind(this);
        this.getTeachersBySubjects = this.getTeachersBySubjects.bind(this);
        this.getGroupSubjects = this.getGroupSubjects.bind(this);
        this.state={
           selectedGroupId:0,
           allSubjects:[],
           teachers:[],// викладачі, які можуть вести предмети, які вказані в навчальному плані групи
           groupStudyPlan:[],
           groups:[]
        }
    }
async componentDidMount(){
     this.getAllGroups();
     this.getAllSubjects();
}
 
async getAllGroups(){ // отримую список усіх груп
    const response = await fetch("https://localhost:44364/api/group/getAllGroupsDatasOfCurrentStudyYear");
    if(response.ok===true){
        //console.log(response)
        const data = await response.json();
        console.log(data)
        this.setState({groups:data})
        this.getGroupSubjects(data[0].groupId)
    }
    else{
        alert("Some error");
    }
}
async getAllSubjects(){ // отримую список усіх предметів (для виведення в таблицю назв предметів по їх ід, які прилітають з навчального плану)
    try
    {
        const response = await fetch(`https://localhost:44364/api/subject/GetAll`)
        const data = await response.json()
        if(response.ok === true){
            this.setState({
                allSubjects:data
            })
            console.log(data);
        }
    }catch{}
}
async getGroupSubjects(groupId){// отримую список усіх предметів навчального плану для групи, в якої рік навчання == року навчання, для якого був створений навчальний план
    const response = await fetch(`https://localhost:44364/api/group/GetGroupSubjectsById/${groupId}`);
    const data = await response.json();
    if(response.ok===true){
        //console.log(response)
        console.log(data)
        this.setState({groupStudyPlan:data}
            ,()=>this.getTeachersBySubjects());
        // await this.getTeachersBySubjects()
    }
    else{
        this.setState({groupStudyPlan:[]})
        alert(data.error);
    }
}
async getTeachersBySubjects(){ // отримую список викладачів, які можуть вести предмети, що вказані в навчальному плані групи
  
    let queryString = `https://localhost:44364/api/teacher/getTeachersBySubjectsId?`
    this.state.groupStudyPlan.map(subject=>
        //subjectsIdArray.push(subject.subjectId)
        queryString+=`subjectsIdArray=${subject.subjectId}&`
        );
        console.log(queryString)
        queryString.slice(0, -1);
        console.log(queryString)

    const response = await fetch(queryString);
    const data = await response.json();
    if(response.ok===true){
        //console.log(response)
        console.log(data)
        this.setState({teachers:data})
        //this.setState({groupStudyPlan:data})
    }
    else{
        //this.setState({groupStudyPlan:[]})
        alert(data.error);
    }
}
onSelectionChange(e){
    e.preventDefault();
    console.log(e.target.value)
    this.setState({
        selectedGroupId:e.target.value
    });
    this.getGroupSubjects(e.target.value)
}
render(){
    let table = this.state.groupStudyPlan.length>0 && this.state.allSubjects.length>0 && this.state.teachers.length>0?
    <div>
    <table className='table'>
        <thead>
            <tr>
                <th>Subject</th>
                <th>Hours</th>
                <th>Teacher</th>
            </tr>
        </thead>
        <tbody>
            {this.state.groupStudyPlan.map((subject)=>    
               // console.log(this.state.allSubjects.find(x => x.id==subject.subjectId).title) 
                <tr key={`subject_`+subject.subjectId}>
                    <td>{this.state.allSubjects.find(x => x.id==subject.subjectId).title}</td>
                    <td>{subject.hours}</td>
                    <td>
                        <select key={'teacher_for_subject_'+subject.subjectId} id={'teacher_for_subject_'+subject.subjectId} name={'teacher_for_subject_'+subject.subjectId} className="form-select">
                            {this.state.teachers.map((teacher) =>
                                
                                teacher.teacherSubjects.find(x=> x.subjectId==subject.subjectId)!==undefined?
                                <option key={`teacher_${teacher.teacherId}`} value={teacher.teacherId}>{teacher.name} {teacher.lastName}</option>
                                :
                                <></>
                                //<option key={`teacherNotFound_${teacher.id}`} value={-1}>Teachers that can teach that subject not found</option>

                                // teacher.teacherSubjects.map(teacherSubject => 
                                //     // console.log("teacherSubjectid = " + teacherSubject.subjectId),
                                //     // console.log("subject.subjectId = " + subject.subjectId)
                                //     teacherSubject.subjectId == subject.subjectId? 
                                //     <option key={`teacher_${teacher.id}`} value={teacher.id}>{teacher.name} {teacher.lastName}</option>
                                //     :<></>
                                //     )
                            )}
                        </select>
                    </td>
                </tr>
             
            )}
           
        </tbody>
    </table>
</div>
    :
    this.state.groupStudyPlan.length==0? <div stule={{color:"red"}}>Study plan not found</div>:
    <></>
    return(
       <div className="container">
           <div className="col-md-6">
                <label htmlFor="group" className="form-label">Group</label>
                <select id='group' name='group' className="form-select" onChange={this.onSelectionChange}>
                    {this.state.groups.map((group) =>
                        <option key={`group_${group.groupId}`} value={group.groupId}>{group.groupTitle}</option>
                    )}
                </select>
            </div>
           {table}
       </div>
    )
}
}

export default TeachersDistribution
