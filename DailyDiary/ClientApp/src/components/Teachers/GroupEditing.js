import React from 'react'
import { isConstructorDeclaration } from 'typescript';
import AddClassworkForm from './AddClassworkForm';
import AddHomeworkForm from './AddHomeworkForm';
import HomeworkClassworkView from './HomeworkClassworkView';

class GroupEditing extends React.Component{
    constructor(props) {
        super(props);
        this.state = 
        {
            homeworksToSkip:0,
            homeworksToDisplay:2,
            classworksToSkip:0,
            classworksToDisplay:2,
            homeworks:[],
            classworks:[],          
            statusMessage:"",
            addHomeworkForm:"",
            addClassworkForm:""
        };
        this.getHomeworks = this.getHomeworks.bind(this);
        // this.getClassworks = this.getClassworks.bind(this);
        this.getSomeHomeworks = this.getSomeHomeworks.bind(this);      
        this.getSomeClassworks = this.getSomeClassworks.bind(this);      
        this.showHomeworkForm=this.showHomeworkForm.bind(this);        
        this.showClassworkForm=this.showClassworkForm.bind(this);        
      }

    componentDidMount(){
        // Array.from(document.styleSheets).forEach(sheet => sheet.disabled = true)
        //console.log(this.props)
    if (this.props.match && this.props.match.params.id) {
        //console.log(this.props.match.params.id)
        this.setState({
            teacherId:1,
            groupId:this.props.match.params.id
        }   
         //,()=> this.getSomeHomeworks()
         ,()=> this.getSomeClassworks()
        // ,()=> this.getTeacherSubjects()
        //,()=> this.getHomeworks(this.state.groupId,this.state.teacherId)
        //,()=> this.getClassworks(this.state.groupId,this.state.teacherId)

        );
        // if(this.state.teacherId>0 && this.state.groupId>0){
        //     this.getSomeHomeworks()
        //     this.getSomeClassworks()
        // }
        // this.getSomeHomeworks()
         //this.getHomeworks(this.groupId,this.teacherId);
         //this.getClassworks(this.groupId,this.teacherId);
    } 
   }
    async getHomeworks(groupId,teacherId) // всі домашки групи за ід групи і ід вчителя
    {
        try{
            const response= await fetch(`https://localhost:44364/api/GroupHomeworks/GetByGroupIdAndTeacherId/details?groupId=${groupId}&&teacherId=${teacherId}`);

             const data = await response.json();
             console.log(data)

             if (response.ok === true) {
                this.setState({
                    homeworks:data
                }
                //,()=> console.log(this.state)
                )
                 console.log(data)        
                
             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }
    async getSomeHomeworks() // кілька домашок групи за ід групи і ід вчителя
    {
        try{
            // console.log("Fetching the homeworks")
            const response= await fetch(`https://localhost:44364/api/GroupHomeworks/GetSomeHomeworksByGroupIdAndTeacherId/details?groupId=${this.state.groupId}&&teacherId=${this.state.teacherId}&&skip=${this.state.homeworksToSkip}&&take=${this.state.homeworksToDisplay}`);

             const data = await response.json();
             console.log(data)

             if (response.ok === true) {
                // console.log("Got the homeworks")
                this.setState({
                    homeworks:[...this.state.homeworks,...data],
                    homeworksToSkip:this.state.homeworksToDisplay+this.state.homeworksToSkip
                }
                //,()=> console.log(this.state)
                )
                 //console.log(data)        
                
             } else {
                 console.log("error",data)
             }
            }
        catch{
            console.log("getSomeHomeworks  ERROR !!!")
        }
    }
    // async getClassworks(groupId,teacherId) // всі домашки групи за ід групи і ід вчителя
    // {
    //     try{
    //         const response= await fetch(`https://localhost:44364/api/GroupClass/GetByGroupIdAndTeacherId/details?groupId=${groupId}&&teacherId=${teacherId}`)

    //          const data = await response.json()
    //          //console.log(data)

    //          if (response.ok === true) {
    //             this.setState({
    //                 classWorks:data
    //             })
    //          } else {
    //              console.log("error",data)
    //          }
    //         }
    //     catch{

    //     }
    // }
    async getSomeClassworks() // кілька classworks групи за ід групи і ід вчителя
    {
        try{
            const response= await fetch(`https://localhost:44364/api/GroupClassworks/GetSomeClassworksByGroupIdAndTeacherId/details?groupId=${this.state.groupId}&&teacherId=${this.state.teacherId}&&skip=${this.state.homeworksToSkip}&&take=${this.state.homeworksToDisplay}`);

             const data = await response.json();
             console.log(data)

             if (response.ok === true) {
                this.setState({
                    classworks:[...this.state.classworks,...data],
                    classworksToSkip:this.state.classworksToDisplay+this.state.classworksToSkip
                }
                //,()=> console.log(this.state)
                )
                 //console.log(data)        
                
             } else {
                 console.log("error",data)
             }
            }
        catch{
            console.log("getSomeClassworks  ERROR !!!")
        }
    }
    

   async showHomeworkForm(){
        //console.log("click")
       var homeworkForm = document.getElementById('addHomeworkForm');
       if(homeworkForm.style.display=="none"){
        // const addHomeworkForm = this.state.groupId>0 && this.state.teacherId>0?
        // <AddHomeworkForm groupId={this.state.groupId} teacherId={this.state.teacherId} getSomeHomeworks={this.getSomeHomeworks}></AddHomeworkForm>
        // :
        // <></> 
        this.setState({
            addHomeworkForm: <AddHomeworkForm groupId={this.state.groupId} teacherId={this.state.teacherId} getSomeHomeworks={this.getSomeHomeworks}></AddHomeworkForm>
        })
        homeworkForm.style.display = "block"
       }
       else{
        homeworkForm.style.display="none"
       }
    }
    async showClassworkForm(){
        //console.log("click")
       var homeworkForm = document.getElementById('addClassworkForm');
       if(homeworkForm.style.display=="none"){
        // const addClassworkForm = this.state.groupId>0 && this.state.teacherId>0?
        // <AddClassworkForm groupId={this.state.groupId} teacherId={this.state.teacherId} getSomeClassworks={this.getSomeClassworks}></AddClassworkForm>
        // :
        // <></>
        this.setState({
            addClassworkForm: <AddClassworkForm groupId={this.state.groupId} teacherId={this.state.teacherId} getSomeClassworks={this.getSomeClassworks}></AddClassworkForm>
        }
        ,()=>homeworkForm.style.display = "block"
        )
       }
       else{
        homeworkForm.style.display="none"
       }
    }
    render(){
        
        const homeworks = this.state.homeworks.length<=0?
        <div className="text-center" style={{color:"red"}}><h1>No homeworks yet...</h1>
        </div>
        :
        <div className="container">
            <div className="row row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1 m-5">                          
            {this.state.homeworks.map((homework) =>
            <div className='col' key={homework.groupHomeworkId} style={{minWidth: "22rem"}}>
                <HomeworkClassworkView task={homework} homework={true}/>
            </div>
            )}
            </div>  
            <button className="btn btn-secondary" onClick={()=>this.getSomeHomeworks()}>View more</button>                          
        </div>
       
        const classworks = this.state.classworks.length<=0?
        <div className="text-center" style={{color:"red"}}><h1>No classworks yet...</h1>
        </div>
        :
        <div className="container">
            <div className="row row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1 m-5">                          
            {this.state.classworks.map((classwork) =>
            <div className='col' key={classwork.groupClassworkId} style={{minWidth: "22rem"}}>
                <HomeworkClassworkView task={classwork} homework={false}/>
            </div>
            )}
            </div>  
            <button className="btn btn-secondary" onClick={()=>this.getSomeClassworks()}>View more</button>                          
        </div>
        return(
            <div> 
<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">Enable backdrop (default)</button>

<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">Offcanvas with backdrop</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
      <div>
       <button className='btn btn-primary' onClick={()=> this.showHomeworkForm()}>Add new homework</button>
      </div>
      <div>
       <button className='btn btn-primary' onClick={()=> this.showClassworkForm()}>Add new classwork</button>
      </div>
      <div>
      {/* <button className='btn btn-primary' onClick={()=> this.getHomeworks(this.state.groupId,this.state.teacherId)}>View Homeworks</button> */}
      </div>
  </div>
</div>

                    <div id="addHomeworkForm" style={{display:"none"}}>
                        {this.state.addHomeworkForm}
                    </div>                        
                    <div id="addClassworkForm" style={{display:"none"}}>
                        {this.state.addClassworkForm}
                    </div>


                            <h1>Homeworks:</h1>
                            {homeworks}
                            

                        <h1>Classworks:</h1>
                        <div>
                            {classworks}                         
                        </div>         
            </div>
        )
    }
}

export default GroupEditing