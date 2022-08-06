//import { UpdateToDoList } from '../actions/updateToDoList';
// import {GetCredentialsFromSessionStorage } from '../actions/GetCredentialsFromSessionStorage';
import { SetCredentials } from '../action_creators/SetUserCredentials';
import { DECREMENT, GetApiData, INCREMENT } from '../action_creators/TEST_ACTION';


export default  function setCredentialsReducer(state,action){
   const token="access_token";
   const user="userId";
  // const userEmail="userEmail";
    switch(action.type){
        case DECREMENT:
          console.log("DECREMENT");
          console.log(state);
         return {...state, count: state.count-=1};

         case INCREMENT:
          console.log("INCREMENT");
          console.log(state);
          return {...state, count: state.count+=1};
        
          case GetApiData:
            console.log(state);
            console.log(action);

          return {...state,currentUser:{
              credentials:{
                userId:action.payload.id,
                tokenKey:action.payload.title
              }
            }
          }
          case SetCredentials:
            return {...state,currentUser:{
              credentials:{
                id:action.payload.userId,
                tokenKey:action.payload.tokenKey,
                roles:action.payload.roles
              }
            }
          }


      default:
        console.log('default')
        //return {...state}
        return {...state, currentUser:{
            credentials:{
              userId:state.currentUser.credentials.userId=0,
              tokenKey:state.currentUser.credentials.tokenKey="there are no token key"
           },
           student:state.currentUser.student,
           teacher:state.currentUser.teacher
        }
          }
    }
  };