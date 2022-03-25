import React from 'react'

class GroupEditing extends React.Component{
    constructor(props) {
        super(props);
        this.state = 
        {
            homeworks:[],
            classWorks:[],
            groupHomeworkId:0,
            groupId:0,
            subjectId:0,
            theme:"",
            homework:"",
            teacherId:0,
            published:"2022-03-24",
            deadline:"2022-03-24"
        };
    
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.getHomeworks = this.getHomeworks.bind(this);
        this.handleFileInputChange=this.handleFileInputChange.bind(this)
        this.getBase64=this.getBase64.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.AddNewHomework=this.AddNewHomework.bind(this)
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
        ,()=> this.getHomeworks(this.state.groupId,this.state.teacherId)
        ,()=> this.getClassworks(this.state.groupId,this.state.teacherId)

        );
         //this.getHomeworks(this.groupId,this.teacherId);
         //this.getClassworks(this.groupId,this.teacherId);
    } 
   }

    async getHomeworks(groupId,teacherId) // всі домашки групи за ід групи і ід вчителя
    {
        try{
            const response= await fetch(`https://localhost:44364/api/GroupHomeworks/GetByGroupIdAndTeacherId/details?groupId=${groupId}&&teacherId=${teacherId}`)

             const data = await response.json()
             //console.log(data)

             if (response.ok === true) {
                
                 //this.state.homeworks.forEach
                 data.forEach(element => {
                    //var td=document.createElement('td');
                    var obj = document.createElement('object');
                    obj.style.width = '100%';
                    obj.style.height = '842pt';
                    obj.style.zIndex = '3';
                    obj.type = 'application/pdf';
                    obj.data = element.homework;
                    document.getElementById('Myhomeworks').appendChild(obj);
                    //element.homework = obj;
                    //document.body.appendChild(obj);
                 })
                 console.log(data)
                 this.setState({
                    homeworks:data
                }
                ,()=> console.log(this.state)
                )
                
             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }
    async getClassworks(groupId,teacherId) // всі домашки групи за ід групи і ід вчителя
    {
        try{
            const response= await fetch(`https://localhost:44364/api/GroupClass/GetByGroupIdAndTeacherId/details?groupId=${groupId}&&teacherId=${teacherId}`)

             const data = await response.json()
             //console.log(data)

             if (response.ok === true) {
                this.setState({
                    classWorks:data
                })
             } else {
                 console.log("error",data)
             }
            }
        catch{

        }
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
        this.getBase64(file)
          .then(result => {
            file["base64"] = result;
            this.setState({
            homework:result,
            }
            //,()=>console.log(this.state)
            );
          })
          .catch(err => {
            console.log(err);
          });
      };
     onSubmit(e){
        e.preventDefault();
        if(this.state.groupId==0)
        {
            console.log("No id of group")
            return ;
        }
        
        const {theme,subjectId,deadline} = e.target;
        this.setState({
            theme:theme.value,
            subjectId:subjectId.value,
            //homework:"",
            //teacherId:0,
            //published:0,
            deadline:deadline.value
        }
        ,()=>this.AddNewHomework()

        //,()=>console.log(this.state)
        );
        
       // console.log(id,subjectId.value,theme.value,homework,teacherId,deadline.value);
    }
    async AddNewHomework(){
        try{

            const response= await fetch(`https://localhost:44364/api/GroupHomeworks/CreateOrUpdateHomework`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
             const data = await response.json()
             //console.log(data)

             if (response.ok === true) {
                console.log("Homework was added successfully"); 
             } else {
                 console.log("error",data)
             }
            }
        catch{

        }
    }
    render(){
        return(
            <div> 
                    <div className="text-center">
                        <h1>Adding new homework form:</h1>
                        <form onSubmit={this.onSubmit}>
    
                        <div className="container">
                        <span className="span-text">Subject:</span>
                            <div className="mb-3">
                                <select required="required" className="form-select" id="subjectId" name = "subjectId" placeholder="Select subject"  title="Subject">
                                    <option value={1}>Reading</option>
                                    <option value={2}>Musik</option>                   
                                </select>
                            </div>
    
                            <span className="span-text">Theme:</span>
                            <div className="mb-3">
                                <input  required="required"  defaultValue={"Integral"} id="theme" name = "theme" type="text" placeholder="Enter homework theme"  title="Theme" />
                            </div>
                            <span className="span-text">Homework:</span>
                            <div className="mb-3">
                                <input  required="required"  id="homework" name = "homework" type="file" placeholder="Add homework file"  title="Homework File"
                                onChange={e => this.handleFileInputChange(e)} />
                            </div>
                            {/* <span className="span-text">Published:</span>
                            <div className="mb-3">
                                <span className="datepicker-toggle">
                                    <input required type="date" id="published" name = "published"  data-date-format="DD MMMM YYYY" value={published} />
                                </span>
                            </div>                        */}
                            <span className="span-text">Deadline:</span>
                            <div className="mb-3">
                                <span className="datepicker-toggle">
                                    <input required="required" type="date" id="deadline" name = "deadline"  data-date-format="DD MMMM YYYY" />
                                </span>
                            </div>                       
                        </div>
                        <button type="submit" className="btn__edit align-self-end">Add</button>
    
                    </form>
                        <h1>Homeworks:</h1>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Theme:</th>
                                        {/* <th>Homework:</th> */}
                                        <th>Published:</th>
                                        <th>Deadline:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.homeworks.map(homework =>
                            <tr key={homework.groupHomeworkId}>
                                <td>{homework.theme}</td>
                                {/* {homework.homework} */}
                                <td>{homework.published}</td>
                                <td>{homework.deadline}</td>
                            </tr>
                        )}
                                </tbody>
                            </table>
                            <div id = "Myhomeworks"></div> 

                        <h1>Classworks:</h1>
                        <ul className="list-group">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Theme:</th>
                                        <th>Classwork:</th>
                                        <th>Date:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.classWorks.map(classWork =>
                            <tr key={classWork.groupClassworkId} className="list-group-item">
                                <td>{classWork.theme}</td>
                                <td>{classWork.homework}</td>
                                <td>{classWork.date}</td>
                            </tr>
                        )}
                                    
                                </tbody>
                            </table>                        
                        </ul>
                    </div>
            </div>
        )
    }
}

export default GroupEditing