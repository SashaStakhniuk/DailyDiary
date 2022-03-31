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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
=======
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
import TeacherPage from './Teachers/TeacherPage.js';
import GroupEditing from './Teachers/GroupEditing.js';

=======
import EdmitFromTeaher from './Teachers/EdmitFromTeaher'
import TeacheImage from './Teachers/TeacheImage'
<<<<<<< HEAD
<<<<<<< HEAD

=======
import TeacherPage from './Teachers/TeacherPage.js';
import GroupEditing from './Teachers/GroupEditing.js';
import EdmitFromTeaher from './Teachers/EdmitFromTeaher'
import TeacheImage from './Teachers/TeacheImage'
>>>>>>> 196b7525646dcd28dc4d483c55b0ee0bc24d2364
=======
>>>>>>> ecd71480669503514892726ce84bed31585f47ac
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
=======
>>>>>>> ecd71480669503514892726ce84bed31585f47ac
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
const Root = ({ store }) => (
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 196b7525646dcd28dc4d483c55b0ee0bc24d2364
=======
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
=======
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
                <Route exact path="/teacher-page"><TeacherPage/></Route>
                <Route exact path="/teacher/group-editing/:id" component={GroupEditing}></Route>

                {/* <Route exact path="/teacher/group-editing/:id"><GroupEditing/></Route> */}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

                <Route exact path="/admin/edit-teacher/:id"><EdmitFromTeaher/></Route>
                <Route exact path="/admin/add-image-teacher/:id"><TeacheImage/></Route>
                <Route exact path="/admin/new-teacher"><CreateNewTeacher/></Route>
                
=======
                <Route exact path="/admin/edit-teacher/:id"><EdmitFromTeaher/></Route>
                <Route exact path="/admin/add-image-teacher/:id"><TeacheImage/></Route>
>>>>>>> 196b7525646dcd28dc4d483c55b0ee0bc24d2364
=======
=======
                <Route exact path="/admin/edit-teacher/:id"><EdmitFromTeaher/></Route>
                <Route exact path="/admin/add-image-teacher/:id"><TeacheImage/></Route>
>>>>>>> ecd71480669503514892726ce84bed31585f47ac
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
=======
=======
                <Route exact path="/admin/edit-teacher/:id"><EdmitFromTeaher/></Route>
                <Route exact path="/admin/add-image-teacher/:id"><TeacheImage/></Route>
>>>>>>> ecd71480669503514892726ce84bed31585f47ac
>>>>>>> parent of a85b990 (added loader and CRUD operations on Admin Teachers)
                <Route path='*' exact={true}><NotFound/></Route>
            </Switch>
        </Router>
    </Provider>
)
export default Root