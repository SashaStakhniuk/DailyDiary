//import { UpdateToDoList } from '../actions/updateToDoList';
// import {GetCredentialsFromSessionStorage } from '../actions/GetCredentialsFromSessionStorage';
import { SetCredentials } from '../action_creators/SetUserCredentials';
// import { DECREMENT, GetApiData, INCREMENT } from '../action_creators/TEST_ACTION';
import { Host } from "../../components/Host"


export default function setCredentialsReducer(state, action) {
  //  const token="access_token";
  //  const user="userId";
  // const userEmail="userEmail";
  switch (action.type) {
    // case DECREMENT:
    //   console.log("DECREMENT");
    //   console.log(state);
    //  return {...state, count: state.count-=1};

    //  case INCREMENT:
    //   console.log("INCREMENT");
    //   console.log(state);
    //   return {...state, count: state.count+=1};

    // case GetApiData:
    //   console.log(state);
    //   console.log(action);

    // return {...state,currentUser:{
    //     credentials:{
    //       userId:action.payload.id,
    //       tokenKey:action.payload.title,
    //       roles:action.payload.roles
    //     }
    //   }
    // }
    case SetCredentials:
      return {
        ...state, currentUser: {
          credentials: {
            id: action.payload.userId,
            tokenKey: action.payload.tokenKey,
            roles: action.payload.roles
          }
        }
      }


    default:
      // console.log('default')
      //return {...state}
      const tokenKey = sessionStorage.getItem("access_token");
      const userId = sessionStorage.getItem("userId");
      const roles = sessionStorage.getItem("roles");
      if (tokenKey == null || tokenKey == undefined || userId == null || userId == undefined) { // якщо неіснує ключа або ід користувача, тобто, якщо користувач не залогінений
        // console.log(window.location)
        // if(window.location.href != window.location.origin + '/passwordreset'){

        // }
        // else if (window.location.href != window.location.origin + '/') { // і він знаходиться не на сторінці логіну
        //   window.location = window.location.origin; // перекидаю на сторінку логіну
        // }
      }
      //  console.log(tokenKey);
      return {
        ...state, currentUser: {
          credentials: {
            // userId:state.currentUser.credentials.userId=0,
            // tokenKey:state.currentUser.credentials.tokenKey="there are no token key"
            tokenKey: tokenKey,
            userId: userId,
            roles: roles
          }
          //  student:state.currentUser.student,
          //  teacher:state.currentUser.teacher
        }
      }
  }
};