//import { UpdateToDoList } from '../actions/updateToDoList';
// import {GetCredentialsFromSessionStorage } from '../actions/GetCredentialsFromSessionStorage';
import { SetCredentials } from '../actions/SetCredentials';
import { DECREMENT, GetApiData, INCREMENT } from '../action_creators/TEST_ACTION';


export default  function setCredentialsReducer(state,action){
   const token="access_token";
   const user="userId";
  // const userEmail="userEmail";
    switch(action.type){
      case SetCredentials:

        console.log(action)
        console.log(state)

        const tokenKey=state.credentials.tokenKey
        const userId=state.credentials.userId

        const credentials={
          tokenKey,userId
        }
        // console.log(credentials)
        return {
          credentials,
          posts:state.posts
        }
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