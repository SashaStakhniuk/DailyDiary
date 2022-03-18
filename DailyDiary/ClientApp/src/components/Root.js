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

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/"><Login/></Route>
                <Route exact path="/admin/new-student"><CreateNewStudent/></Route>
                <Route exact path="/admin/edit-student/:id"><EditFromStudent/></Route>
                <Route exact path="/children-login"><LoginChildrens/></Route>
                <Route exact path="/admin/student-profil/:id"><StudentProfil/></Route>
                <Route exact path="/admin/students"><Students/></Route>
                <Route exact path="/admin"><Admin/></Route>
                <Route exact path="/admin/add-image/:id"><StudentImage/></Route>
                <Route exact path="/admin/teachers"><Teachers/></Route>
                <Route exact path="/admin/teacher-profil/:id"><TeacherProfil/></Route>
                <Route path='*' exact={true}><NotFound/></Route>
            </Switch>
        </Router>
    </Provider>
)
export default Root