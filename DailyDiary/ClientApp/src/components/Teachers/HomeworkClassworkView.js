import React from 'react'

class HomeworkClassworkView extends React.Component{
    constructor(props) {
        super(props);
        this.ViewTask=this.ViewTask.bind(this);

    }
    componentDidMount(){
        // var obj = document.createElement('object');
        // obj.style.width = '100%';
        // obj.style.height = '842pt';
        // obj.style.zIndex = '3';
        // obj.type = 'application/pdf';
        // obj.data = this.props.base64Text;
        // document.getElementById('homeworkToView').appendChild(obj);

    }
    ViewTask(base64Text){
        //console.log(base64Text)
        // window.open(base64Text);
        let pdfWindow = window.open("")
        pdfWindow.document.write(
            "<iframe width='100%' height='100%' src='" +
            base64Text + "'></iframe>"
        )
        
        // console.log("click")
    }
    render(){
        const taskLinks = this.props.homework===true?
        <div>
            <button className='btn btn-secondary' onClick={()=>this.ViewTask(this.props.task.homework)}>View</button>
            <a className="btn btn-primary" href={this.props.task.homework} download="homeworktask.pdf">Download</a>
        </div>
        :
        <div>
            <button className='btn btn-secondary' onClick={()=>this.ViewTask(this.props.task.classwork)}>View</button>
            <a className="btn btn-primary" href={this.props.task.classwork} download="classworktask.pdf">Download</a>
        </div>

        return(
            <div className="card" style={{minWidth: "22rem"}}>
<div className="col">
                        <div className="card-body">
                        <h5 className="card-title">
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="theme">Theme:</label>
                                </div>
                                <div id="theme" className="form-group col-md-6">
                                    <div style={{color:"black"}}>{this.props.task.theme}</div>
                                </div>   
                            </div>
                        </h5>
                            {taskLinks}
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="published">Published:</label>
                                    <div id="published" style={{color:"black"}}>{new Date(this.props.task.published).toLocaleDateString()}</div>   
                                </div>
                                <div className="form-group col-md-6">
                                <label htmlFor="deadline">Deadline:</label>
                                    <div id="deadline" style={{color:"black"}}>{new Date(this.props.task.deadline).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>
                        </div>            </div> 
        );
    }
}
export default HomeworkClassworkView;