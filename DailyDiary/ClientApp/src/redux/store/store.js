import {createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import SetCredentialsReducer from '../reducers/SetCredentialsReducer'

const credentials={
    tokenKey:sessionStorage.getItem("access_token"),
    userId:sessionStorage.getItem("userId"),
    roles:sessionStorage.getItem("roles")
    // email:sessionStorage.getItem("userEmail"),
}
// export const student={
//     studentId:"",
//     order:"",
//     yearOfStudy:"",
//     admissionDate:"",
//     email:"",
//     photoBase64:"",
//     rate:"",
//     userId:"",
//     groupId:"",
//     subgroupId:""
// }
// export const teacher={
//     teacherId:"",
//     specialty:"",
//     category:"",
//     degree:"",
//     education:"",
//     experience:"",  
//     salary:"", 
//     photoBase64:""
// }
const currentUser ={
    credentials
    // student,
    // teacher
}
const InitialStore={
    currentUser
    // count:0
}
// const store = createStore(SetCredentialsReducer, window?.__REDUX_DEVTOOLS_EXTENSION__?.())

 const store=createStore(SetCredentialsReducer,InitialStore,applyMiddleware(thunk))
export default store