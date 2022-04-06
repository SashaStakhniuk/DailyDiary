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
import { useEffect } from 'react'
const Root = ({ store }) => {

    async function grtNotReaadCountTeacherNews(){
        var news = document.getElementById('news-badge-counter')
        news.innerText = ''
        news.style.visibility = 'hidden'
        news.style.opacity = 0
        const response = await fetch(`https://localhost:44364/api/News/GetNotReadNews/1`)
        const data = await response.json()
        if(response.ok == true){
            if(data > 0){
                news.innerText = data
                news.style.visibility = 'visible'
                news.style.opacity = 1
            } else {
                news.innerText = ''
                news.style.visibility = 'hidden'
                news.style.opacity = 0
            }
        }
    }

    async function grtNotReaadCountStudentNews(){

    }

    useEffect(() => {
        

        // Если залогинен преподаватель
        // тут устанавливаю состояние оповещений об увидомлений
        // ! буду передавать id = 1 преподавателя для отображения количества непрочитаных смс
        // ! при зарегестрированом пользователе id пользователя будет подставляться автоматически  
        // https://localhost:44364/api/News/GetNotReadNews/1


        // Если студент 
        grtNotReaadCountStudentNews()
        
        // Если залогинен преподаватель
        grtNotReaadCountTeacherNews()

    }, [])
    
    return(
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/"><Login/></Route>
                    <Route exact path="/children-login"><LoginChildrens/></Route>
    
                    <Route exact path="/admin/new-student"><CreateNewStudent/></Route>
                    <Route exact path="/admin/students"><Students/></Route>
                    <Route exact path="/admin/student-profil/:id"><StudentProfil/></Route>
                    <Route exact path="/admin/edit-student/:id"><EditFromStudent/></Route>
    
                    <Route exact path="/admin"><Admin/></Route>
    
                    <Route exact path="/admin/add-image-student/:id"><StudentImage/></Route>
    
                    <Route exact path="/admin/teachers"><Teachers/></Route>
                    <Route exact path="/admin/teacher-profil/:id"><TeacherProfil/></Route>
                    <Route exact path="/admin/send-for-teacher/:id"><SendMessage/></Route>
                    <Route exact path="/teacher-page"><TeacherPage/></Route>
                    <Route exact path="/teacher/group-editing/:id" component={GroupEditing}></Route>
                    <Route exact path="/teacher/news-page/:id" ><NewsPage /></Route>
                    {/* <Route exact path="/teacher/group-editing/:id"><GroupEditing/></Route> */}
    
                    <Route exact path="/admin/edit-teacher/:id"><EdmitFromTeaher/></Route>
                    <Route exact path="/admin/add-image-teacher/:id"><TeacheImage/></Route>
                    <Route exact path="/admin/new-teacher"><CreateNewTeacher/></Route>
                    
                    <Route path='*' exact={true}><NotFound/></Route>
                </Switch>
            </Router>
        </Provider>
    )
} 
export default Root