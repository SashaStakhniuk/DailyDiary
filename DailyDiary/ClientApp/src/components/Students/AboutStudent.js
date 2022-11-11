import Header from '../Header'
import React from 'react';
 //import '../../styles/App.css'
 //import '../../styles/AboutStudentPage.css'
import HomeworkClassworkView from '../GeneralComponents/HomeworkClassworkView';
// import { render } from 'pug';
import NavigationBar from '../NavigationBar'
import { Host } from '../Host';


class AboutStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentId: 0,
            homeworks: [],
            homeworksToSkip: 0,
            homeworksToDisplay: 4,
        }
        this.getSomeHomeworks = this.getSomeHomeworks.bind(this);

    }
    componentDidMount() {
        //console.log(this.props)
        if (this.props.match && this.props.match.params.id) {
            this.setState({
                studentId: this.props.match.params.id
            }
                , () => this.getSomeHomeworks()
                // ,()=> this.getSomeClassworks()
            );
        }
    }
    async getSomeHomeworks() // по ід студента знаходимо групу і дістаємо кілька домашок групи за її ід
    {
        try {
            console.log("Fetching the homeworks")
            const response = await fetch(`${Host}/api/GroupHomeworks/GetSomeHomeworksByStudentId/details?studentId=${this.state.studentId}&&skip=${this.state.homeworksToSkip}&&take=${this.state.homeworksToDisplay}`);

            const data = await response.json();
            console.log(data)

            if (response.ok === true) {
                // console.log("Got the homeworks")
                this.setState({
                    homeworks: [...this.state.homeworks, ...data],
                    // homeworks: data,
                    homeworksToSkip: data.length + this.state.homeworksToSkip
                }
                    //,()=> console.log(this.state)
                )
                //console.log(data)  

            } else {
                console.log("error", data)
            }
        }
        catch {
            console.log("getSomeHomeworks  ERROR !!!")
        }
    }
    render() {
        const homeworks = this.state.homeworks.length <= 0 ?
            <div className="text-center" style={{ color: "red" }}><h1>No homeworks yet...</h1>
            </div>
            :
            <div className="container">
                <div className="row row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1 m-5">
                    {this.state.homeworks.map((homework) =>
                        <div className='col' key={'homework_' + homework.groupHomeworkId} style={{ minWidth: "22rem" }}>
                            <HomeworkClassworkView task={homework} getSomeHomeworks={this.getSomeHomeworksFromChild} homework={true} />
                        </div>
                    )}
                </div>
                <button className="btn btn-secondary" onClick={() => this.getMoreHomeworks()}>View more</button>
            </div>
        return (    
            <div>

            <NavigationBar/>
        <div className="main">
        <div className="top">
            <div className="img">
              <a href="https://imgbb.com/"><img src="https://i.ibb.co/tbSR7Ch/hero.png" alt="hero" border="0"/></a>
            </div>
            <div className="info">
                <h1>Personal Details</h1>
                <p>
                    <strong>Name: </strong>Some name
                     <br/>
                    <strong>Date of birth: </strong>25.08.2000
                     <br/>
                    <strong>Work: </strong>Technicien Superieur En Electricite Industriel
                     <br/>
                </p>
            </div>

        </div>
        <div className="bottom">
            

            <div className="right">
                <h1>Talent & Skills</h1>
                <div className="container">
                    <div className="skill">
                        <i className="fa-solid fa-video video"></i>
                        <p>Montage video</p>
                    </div>
                    <div className="skill">
                        <i className="fa-solid fa-language language"></i>
                        <p>Languages</p>
                    </div>
                    <div className="skill">
                        <i className="fa-solid fa-laptop laptop"></i>
                        <p>Computing</p>
                    </div>        
                    <div className="skill">
                        <i className="fa-brands fa-microsoft microsoft"></i> 
                        <p>Microsoft Office</p>
                    </div>  
                    <div className="skill">
                        <i className="fa-solid fa-cookie cooking"></i>
                        <p>Cooking</p>
                    </div>
                    <div className="skill">
                        <i className="fa-solid fa-pen Writing"></i>
                        <p>Writing</p>
                    </div>
            
                </div>
            </div>
            <div className="left">
                <h1>About</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quas! Dicta, officia libero cumque vitae eum, corporis sed accusamus ullam non quas ipsam porro odit assumenda consectetur natus tenetur. Maiores modi aut labore accusantium aspernatur! Nostrum expedita tempore similique laboriosam blanditiis temporibus, possimus vero. Voluptates pariatur numquam non, doloremque distinctio delectus hic, deserunt veniam sit, suscipit alias aut culpa repudiandae quisquam quas consequatur blanditiis. Molestias porro odit commodi, consectetur reprehenderit tempore eaque officia autem rerum, eum et ipsum voluptate illum dicta reiciendis soluta dolor perspiciatis modi qui. Aspernatur asperiores nam ullam, illo, facere, perferendis optio tempore repudiandae repellat quam nesciunt?
                </p>
                <h1>Education</h1>
                <strong>BS Computer Science</strong>
                <p>University of OEB</p>
                <strong>BS Managment</strong>
                <p>University of OEB</p>
            </div>
        </div>
    </div>
    </div>

        )
    }
}
export default AboutStudent