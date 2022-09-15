import React from 'react';
import { Provider } from 'react-redux'
import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
import Login from './Login.js'
import NotFound from './NotFound'
import StudentProfil, {} from './Students/StudentProfil'
import Students from './Students/Students'
import LoginChildrens from './LoginChildrens'
import EditFromStudent from './Students/EditFromStudent'
import Admin from './Admin/Admin.js';
import CreateNewStudent from './Students/CreateNewStudent'
import StudentImage from './Students/StudentImage'
import Teachers from './Teachers/Teachers'
import TeacherProfil from './Teachers/TeacherProfil'
import TeacherPage from './Teachers/TeacherPage.js';
import GroupEditing from './Teachers/GroupEditing.js';
import CreateNewTeacher from './Teachers/CreateNewTeacher.js';
import EdmitFromTeaher from './Teachers/EdmitFromTeaher'
import TeacheImage from './Teachers/TeacheImage'
import NewsPage from './Teachers/NewsPage'
import '../styles/Root.css'
import SendMessage from './Teachers/SendMessage.js';
import { useEffect, useState } from 'react'
import Feedback from './Students/Feedback'
import NewsStudentPage from './Students/NewsStudentPage'
import SendMessageForStudent from './Students/SendMessageForStudent'
import SandFeedback from './Teachers/SandFeedback'
import NewStudyPlan from './StudyPlan/NewStudyPlan'
import AllGroups from './Group/AllGroups'
import EditGroup from './Group/EditGroup'
import CreateNewGroup from './Group/CreateNewGroup'
import { useSelector } from 'react-redux'
import CreateNewStudyYear from './StudyYear/CreateNewStudyYear'
import EditStudyPlan from './StudyPlan/EditStudyPlan'
import Student from './Students/Student.js';
import AboutStudent from './Students/AboutStudent.js';
import ReduxTesting from './ReduxTesting.js';
import ColorPicker from './EnvironmentStyle.js';

import Header from './Header'
import TeachersDistribution from './Admin/TeachersDistribution.js';
import CreateNewPerson from './Admin/CreateNewPerson.js';
import EditPerson from './Admin/EditPerson.js';
const Root = () => {

    // const [isStudent, setIsStudent] = useState(false)
    // const [isTeacher, setIsTeacher] = useState(true)
    // const [groups, setgroups] = useState(useSelector(state => state.groups))

    // async function grtNotReaadCountTeacherNews(){
    //     var news = document.getElementById('news-badge-counter')
    //     if(news){
    //         news.innerText = ''
    //         news.style.visibility = 'hidden'
    //         news.style.opacity = 0
    //     }
       
    //     // Если залогинен преподаватель
    //     // тут устанавливаю состояние оповещений об увидомлений
    //     // ! буду передавать id = 1 преподавателя для отображения количества непрочитаных смс
    //     // ! при зарегестрированом пользователе id пользователя будет подставляться автоматически  
    //     // https://localhost:44364/api/News/GetNotReadNews/1

    //     const response = await fetch(`https://localhost:44364/api/News/GetNotReadNews/1`)
    //     const data = await response.json()
    //     if(response.ok == true){
    //         if(data > 0){
    //             news.innerText = data
    //             news.style.visibility = 'visible'
    //             news.style.opacity = 1
    //         } else {
    //             news.innerText = ''
    //             news.style.visibility = 'hidden'
    //             news.style.opacity = 0
    //         }
    //     }
    // }

    // async function grtNotReaadCountStudentNews(){
    //     var news = document.getElementById('news-badge-counter')

    //     if(news){
    //         news.innerText = ''
    //         news.style.visibility = 'hidden'
    //         news.style.opacity = 0
    //     }

    //     //const response_feedback = await fetch(`https://localhost:44364/api/Teacher/GetNotStudentReadNews/3`) 

    //     //  Тут передаю псевдо зареганого студента у которого ID 3
    //     var StudentId = 6
    //     const response = await fetch(`https://localhost:44364/api/News/GetNotStudentReadNews/${StudentId}`)

    //     const data = await response.json()
    //     if(response.ok == true){
    //         if(data > 0){
    //             if(news){
    //                 news.innerText = data
    //                 news.style.visibility = 'visible'
    //                 news.style.opacity = 1
    //             }
    //         } else {
    //             if(news){
    //                 news.innerText = ''
    //                 news.style.visibility = 'hidden'
    //                 news.style.opacity = 0
    //             }
    //         }
    //     }
        
    // }

    // async function grtNotReaadCountStudentFeedback(){
    //     var feedback = document.getElementById('feedback-badge-counter')

    //     if(feedback){
    //         feedback.innerText = ''
    //         feedback.style.visibility = 'hidden'
    //         feedback.style.opacity = 0
    //     }
    //     var StudentId = 6
    //     const responsefeedbacks = await fetch(`https://localhost:44364/api/Student/GetNotreadFeedback/${StudentId}`)
    //     const dataf = await responsefeedbacks.json()
    //     if(responsefeedbacks.ok == true){
    //         if(dataf > 0){
    //             if(feedback){
    //                 feedback.innerText = dataf
    //                 feedback.style.visibility = 'visible'
    //                 feedback.style.opacity = 1
    //             }
                
    //         } else {
    //             if(feedback){
    //                 feedback.innerText = ''
    //                 feedback.style.visibility = 'hidden'
    //                 feedback.style.opacity = 0
    //             }
    //         }
    //     }
    // }

    // useEffect(() => {
    //     //grtNotReaadCountTeacherNews()

    //     grtNotReaadCountStudentNews()
    //     grtNotReaadCountStudentFeedback()

    //     // Если студент 
    //     // if(isTeacher){
    //     //     // Если залогинен преподаватель
    //     //     grtNotReaadCountTeacherNews()
    //     // } else if(isStudent){

    //     //     // Если студент 
    //     //     grtNotReaadCountStudentNews()
    //     //     grtNotReaadCountStudentFeedback()
    //     // } else {
    //     //     // никто не логинился ))
    //     // }

    // }, [])

    
    return(
        <> 
            <Router>
                <Switch>
                    <Route exact path="/header"><Header/></Route>
                    <Route exact path="/"><Login/></Route>
                    <Route exact path="/children-login"><LoginChildrens/></Route>

                    <Route exact path="/admin"><Admin/></Route>
                    <Route exact path="/admin/new-person" component={CreateNewPerson}></Route> {/*додання персони*/}
                    <Route exact path="/admin/edit-person"><EditPerson/></Route> {/*додання персони*/}

                    <Route exact path="/admin/new-student"><CreateNewStudent/></Route> {/*додання студента*/}
                    <Route exact path="/admin/new-study-year"><CreateNewStudyYear/></Route> {/*створення навчального року*/}
                    <Route exact path="/admin/new-study-plan"><NewStudyPlan/></Route> {/*створення навчального плану*/}
                    <Route exact path="/admin/teachers-distribution"><TeachersDistribution/></Route> {/*розподілення викладачів по групах за предметами*/}
                    <Route exact path="/admin/edit-study-plan/:id"><EditStudyPlan/></Route> {/*НЕ ПРАЦЮЄ!*/}

                    <Route exact path="/admin/groups"><AllGroups/></Route>
                    <Route exact path="/admin/edit-group/:id"><EditGroup/></Route>
                    <Route exact path="/admin/new-group"><CreateNewGroup/></Route>

                    {/* <Route exact path="/admin/new-student"><CreateNewStudent groups={groups}/></Route> */}

                    <Route exact path="/admin/students"><Students/></Route>
                    <Route exact path="/admin/student-profil/:id"><StudentProfil/></Route>
                    <Route exact path="/admin/edit-student/:id"><EditFromStudent/></Route>
                    <Route exact path="/admin/add-image-student/:id"><StudentImage/></Route>

                    <Route exact path="/admin/teachers"><Teachers/></Route>
                    <Route exact path="/admin/teacher-profil/:id"><TeacherProfil/></Route>
                    <Route exact path="/admin/send-for-teacher/:id"><SendMessage/></Route>
                    <Route exact path="/admin/edit-teacher/:id"><EdmitFromTeaher/></Route>
                    <Route exact path="/admin/add-image-teacher/:id"><TeacheImage/></Route>
                    <Route exact path="/admin/new-teacher"><CreateNewTeacher/></Route>
                    <Route exact path="/admin/send-message-for-student/:id"><SendMessageForStudent/></Route>
                    
                    <Route exact path="/teacher-page"><TeacherPage/></Route>
                    <Route exact path="/teacher-page/send-feedback/:studentId/:teacherId/:subjectId/:studentName"><SandFeedback/></Route>
                    <Route exact path="/teacher/group-editing/:id" component={GroupEditing}></Route>
                    <Route exact path="/teacher/news-page/:id" ><NewsPage /></Route>

                     <Route exact path="/student-page/:id" component={Student}></Route>
					<Route exact path="/about-student/:id" component={AboutStudent}></Route>
					
                    <Route exact path="/student/feedback/:id" ><Feedback /></Route>
                    <Route exact path="/student/news-page/:id" ><NewsStudentPage /></Route>
                    <Route exact path="/redux-testing" ><ReduxTesting /></Route>
                    <Route exact path="/environment-style" ><ColorPicker /></Route>

                    <Route path='*' exact={true}><NotFound/></Route>
                </Switch>
            </Router>
        </>
    )
} 
export default Root