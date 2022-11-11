import React from 'react'
import { Host } from '../Host';

class AddClassworkForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = 
        {
            teacherSubjects:[],
            groupClassworkId:0,
            groupId:0,
            subjectId:0,
            theme:"",
            classwork:"",
            fileName:"",
            teacherId:0,
            published:"2022-03-24",
            deadline:"2022-03-24",
            statusMessage:""
        };

        this.getTeacherSubjects=this.getTeacherSubjects.bind(this);
        this.getBase64=this.getBase64.bind(this);
        this.handleFileInputChange=this.handleFileInputChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.AddNewClasswork=this.AddNewClasswork.bind(this);

    }
     componentDidMount(){
       //console.log(this.props.teacherId)
       this.setState({
        teacherId:this.props.teacherId,
        groupId:this.props.groupId
        }
        ,()=> this.getTeacherSubjects()
        )

    }
    async getTeacherSubjects(){
        try{
            const response= await fetch(`${Host}/api/teacher/GetTeacherSubjectsById/${this.state.teacherId}`)
    
             const data = await response.json()
             //console.log(data)
    
             if (response.ok === true) {
    
                 console.log(data)
                 this.setState({
                    teacherSubjects:data
                }
                //,()=> console.log(this.state)
                )
                
             } else {
                 console.log("error",data)
             }
            }
        catch{}
      }
      getBase64 = file => {
        return new Promise(resolve => {
          //let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
      };

      handleFileInputChange = e => {
        //console.log(e.target.files[0]);
        let { file } = this.state;
        file = e.target.files[0];
         console.log(file)
              
        this.getBase64(file)
          .then(result => {
            file["base64"] = result;
            
                this.setState({
                    classwork:result,
                    fileName:file.name
                    }
                    ,()=>console.log(this.state)
                    );          
          })
          .catch(err => {
            console.log(err);
          });
      };
     onSubmit(e){
        e.preventDefault();
        if(this.state.groupId===0)
        {
            console.log("No id of group")
            return ;
        }
        
        const {theme,subjectId,deadline} = e.target;
        this.setState({
            theme:theme.value,
            subjectId:subjectId.value,
            //classwork:"",
            //teacherId:0,
            //published:0,
            deadline:deadline.value
        }
        ,()=>this.AddNewClasswork()

        //,()=>console.log(this.state)
        );
    }
     async AddNewClasswork(){
        try{

            const response= await fetch(`${Host}/api/GroupClassworks/CreateClasswork`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
                })
               
                const data = await response.json()
                //console.log(response.status, response.errorText)

             if (response.ok === true) {
                 this.setState({
                     statusMessage:<h4 style={{color:"green"}}>{data.success}</h4>
                 }               
                 ,()=>this.props.getSomeClassworks())
                 setTimeout(() => 
                 this.setState({
                  statusMessage:""
                 }), 2000)
                //console.log(data.success)
             } else {
                 
                 console.log("error")
             }
            }
        catch{

        }
    }

    render(){
        return(
            <div className="text-center m-1" style={{border:"1px solid black"}}>
                        <h1>Adding new classwork form:</h1>
                        <form onSubmit={this.onSubmit}>                            
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="subjectId">Subject:</label>
                                    <select required="required" className="form-select" id="subjectId" name = "subjectId" placeholder="Select subject"  title="Subject">
                                    {this.state.teacherSubjects.map(subject=>
                                     <option key={subject.id} value={subject.id}>{subject.title}</option>
                                    )}
                                </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="theme">Theme:</label>
                                    <input  required="required"  defaultValue={"Integral"} id="theme" name = "theme" type="text" placeholder="Enter homework theme"  title="Theme" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="classwork">Classwork:</label>
                                    <input  required="required"  id="classwork" name = "classwork" type="file" placeholder="Add classwork file"  title="Classwork File"
                                onChange={(e)=>this.handleFileInputChange(e)} />                                  
                            </div>
                            {/* <div className="row"> */}
                                {/* <div className="form-group col-md-6">
                                    <label htmlFor="published">Published:</label>
                                    <input required type="date" id="published" name = "published"  data-date-format="DD MMMM YYYY" defaultValue={Date.now} />
                                </div> */}
                                <div className="form-group">
                                    <label htmlFor="deadline">Deadline:</label>
                                    <input required="required" type="date" id="deadline" name = "deadline"  data-date-format="DD MMMM YYYY" />
                                </div>
                            {/* </div> */}
                            <div style={{textAlign:"center"}}>
                                <button id="submit" type="submit" className="btn btn-secondary" style={{minWidth:"80%",margin:"10px"}}>Create</button>
                            </div>
                        </form>
                        {this.state.statusMessage}
                        </div>
        );
    }
}
export default AddClassworkForm;