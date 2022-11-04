import React from 'react';
import { Provider } from 'react-redux'
import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
import Login from './Account/Login'
import NotFound from './NotFound'
import StudentProfil, {} from './Students/StudentProfil'
import Students from './Students/Students'
import EditFromStudent from './Students/EditFromStudent'
import Admin from './Admin/Admin.js';
import CreateNewStudent from './Students/CreateNewStudent'
import StudentImage from './Students/StudentImage'
import Teachers from './Teachers/Teachers'
import TeacherProfil from './Teachers/TeacherProfil'
import TeacherPage from './Teachers/TeacherPage.js';
import GroupEditing from './Teachers/GroupEditing.js';
// import CreateNewTeacher from './Teachers/CreateNewTeacher.js';
import EdmitFromTeaher from './Teachers/EdmitFromTeaher'
import TeacheImage from './Teachers/TeacheImage'
import NewsPage from './Teachers/NewsPage'
// import '../styles/Root.css'
import SendMessage from './Teachers/SendMessage.js';
// import { useEffect, useState } from 'react'
import Feedback from './Students/Feedback'
import NewsStudentPage from './Students/NewsStudentPage'
import SendMessageForStudent from './Students/SendMessageForStudent'
import SandFeedback from './Teachers/SandFeedback'
// import NewStudyPlan from './StudyPlan/NewStudyPlan'
// import AllGroups from './Group/AllGroups'
import EditGroup from './Group/EditGroup'
import CreateNewGroup from './Group/CreateNewGroup'
// import { useSelector } from 'react-redux'
import CreateNewStudyYear from './StudyYear/CreateNewStudyYear'
import CreateOrEditStudyPlan from './StudyPlan/CreateOrEditStudyPlan'
import Student from './Students/Student.js';
import AboutStudent from './Students/AboutStudent.js';
import ReduxTesting from './ReduxTesting.js';
// import ColorPicker from './EnvironmentStyle.js';

import Header from './Header'
import TeachersDistribution from './Admin/TeachersDistribution.js';
import CreateNewPerson from './Admin/CreateNewPerson.js';
import EditPerson from './Admin/EditPerson.js';
// import StudentsByGroupsDistribution from './Admin/StudentsByGroupsDistribution.js';
// import StudentsBySubgroupsDistribution from './Admin/StudentsBySubgroupsDistribution.js';
// import FullGroupEditing from './Admin/FullGroupEditing.js';
import FullGroupEditing from './Admin/GroupEditing.js';
import CreateOdEditShedule from './Admin/CreateOrEditShedule.js';
import Profil from './Students/Profil.jsx';
import Review from './Students/Review.jsx';
import MainPage from './Students/MainPage.jsx';
import ResetPassword from './Account/ResetPassword.js';
import Tasks from './Teachers/Tasks';
import HomeTasks from './Teachers/HomeTasks';
import DistributeStudentsByGroups from './Admin/DistributeStudentsByGroups.js';

const Root = () => {
    
    return(
        <> 
            <Router>
                <Switch>
                    <Route exact path="/header"><Header/></Route>
                    <Route exact path="/"><Login/></Route>
                    <Route path="/passwordreset" component={ResetPassword}></Route>

                   
                    <Route exact path="/student/review"><Review/></Route>
                    <Route exact path="/student/profil"><Profil/></Route>
                    {/* <Route exact path="/children-login"><LoginChildrens/></Route> */}
                    <Route exact path="/student/main-page"><MainPage/></Route>
                    <Route exact path="/admin"><Admin/></Route>
                    <Route exact path="/admin/new-person" component={CreateNewPerson}></Route> {/*додання персони ДОРОБИТИ-> "присвоєння" дітей батькам*/}
                    <Route exact path="/admin/edit-person"><EditPerson/></Route> {/*редагування персони*/}

                    {/* <Route exact path="/admin/new-student"><CreateNewStudent/></Route> додання студента */}
                    <Route exact path="/admin/new-study-year"><CreateNewStudyYear/></Route> {/*створення навчального року*/}
                    <Route exact path="/admin/teachers-distribution"><TeachersDistribution/></Route> {/*розподілення викладачів по групах за предметами*/}
                    <Route exact path="/admin/new-study-plan"><CreateOrEditStudyPlan/></Route> {/* створення нового та редагування існуючого навчального плану */}
                   
                    {/* <Route exact path="/admin/new-study-plan"><NewStudyPlan/></Route> створення навчального плану */}
                    {/* <Route exact path="/admin/edit-study-plan"><EditStudyPlan1_DoesntWork/></Route> НЕ ПРАЦЮЄ! при виборі предмету, в наступних блоках він не відображається*/}


                    {/* <Route exact path="/admin/groups"><AllGroups/></Route> */}
                    <Route exact path="/admin/groups"><EditGroup/></Route> {/*Список усіх груп із необхідними даними теперішнього навчального року*/}

                    {/* <Route exact path="/admin/edit-group" component={FullGroupEditing}></Route> додання студентів без групи в групу, створення нових підгруп для групи і розподілення студентів групи по підгрупах */}
                    <Route exact path="/admin/edit-group" component={FullGroupEditing}></Route> {/* додання студентів без групи в групу, створення нових підгруп для групи і розподілення студентів групи по підгрупах */}

                    <Route exact path="/admin/createoreditshedule"><CreateOdEditShedule/></Route> {/* створення та редагування розкладу */}

                    <Route exact path="/admin/new-group" component={CreateNewGroup}></Route> {/* створення нової/редагування існуючої групи */}
                    <Route exact path="/admin/new-student"><CreateNewStudent/></Route> 
                    <Route exact path="/admin/distribute-students"><DistributeStudentsByGroups/></Route> 

                    <Route exact path="/admin/students"><Students/></Route>
                    {/* <Route exact path="/admin/students-groups-distribution"><StudentsByGroupsDistribution/></Route>
                    <Route exact path="/admin/students-subgroups-distribution"><StudentsBySubgroupsDistribution/></Route> */}
                    <Route exact path="/admin/student-profil/:id"><StudentProfil/></Route>
                    <Route exact path="/admin/edit-student/:id"><EditFromStudent/></Route>
                    <Route exact path="/admin/add-image-student/:id"><StudentImage/></Route>

                    <Route exact path="/admin/teachers"><Teachers/></Route>
                    <Route exact path="/admin/teacher-profil/:id"><TeacherProfil/></Route>
                    <Route exact path="/admin/send-for-teacher/:id"><SendMessage/></Route>
                    <Route exact path="/admin/edit-teacher/:id"><EdmitFromTeaher/></Route>
                    <Route exact path="/admin/add-image-teacher/:id"><TeacheImage/></Route>
                    {/* <Route exact path="/admin/new-teacher"><CreateNewTeacher/></Route> */}
                    <Route exact path="/admin/send-message-for-student/:id"><SendMessageForStudent/></Route>
                             
                    <Route exact path="/teacher-page"><TeacherPage/></Route>
                    <Route exact path="/teacher-page/tasks"><Tasks/></Route>
                    <Route exact path="/teacher-page/home-tasks"><HomeTasks/></Route>
                    
                    <Route exact path="/teacher-page/send-feedback/:studentId/:teacherId/:subjectId/:studentName"><SandFeedback/></Route>
                    <Route exact path="/teacher/group-editing/:id" component={GroupEditing}></Route>
                    <Route exact path="/teacher/news-page/:id" ><NewsPage /></Route>

                     <Route exact path="/student-page" component={Student}></Route>
					<Route exact path="/about-student/:id" component={AboutStudent}></Route>
					
                    <Route exact path="/student/feedback/:id" ><Feedback /></Route>
                    <Route exact path="/student/news-page/:id" ><NewsStudentPage /></Route>
                    <Route exact path="/redux-testing" ><ReduxTesting /></Route>
                    {/* <Route exact path="/environment-style" ><ColorPicker /></Route> */}

                    <Route path='*' exact={true}><NotFound/></Route>
                </Switch>
            </Router>
        </>
    )
} 
export default Root