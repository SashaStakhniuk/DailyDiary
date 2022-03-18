//import { UpdateToDoList } from '../actions/updateToDoList';
import {GetCredentialsFromSessionStorage } from '../actions/GetCredentialsFromSessionStorage';
import { SetOrUpdatePosts } from '../actions/SetOrUpdatePosts';
import { GetPostsFromDB } from '../actions/GetPostsFromDB';
import { SetCredentials } from '../actions/SetCredentials';


// async function getPosts(){
//   const response= await fetch('https://localhost:44361/api/useractions/GetAllPosts')
//           let posts=[]
//            if (response.ok === true) {
//                  posts= await response.json()
//                  console.log("post is ",posts)
//            }
//           return posts
// }

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
      case GetCredentialsFromSessionStorage:
        console.log(action)
        console.log(state)

        // console.log(state.credentials)
        // action.credentials.email
        // action.credentials.tokenKey

        const tokenKeyFromSession=sessionStorage.getItem(token)
        const userIdFromSession=sessionStorage.getItem(user)

        // const email=sessionStorage.getItem(userEmail)
       
        const credentialsFromSession={
          tokenKey:tokenKeyFromSession,
          userId:userIdFromSession
        }
        // console.log(credentials)
        return {
          credentials:credentialsFromSession,
          posts:state.posts
        }
        
        case SetOrUpdatePosts:
          console.log(state.posts)
          // const response= await fetch('https://localhost:44361/api/useractions/GetAllPosts')
          // var posts=[]
          //  if (response.ok === true) {
          //        posts=await response.json()
          //        console.log("post is ",posts)
          //  }
          // const posts = await getPosts()
           //console.log(posts)
          //  if(posts)
          //  return {
          //    credentials:state.credentials,
          //      posts:posts
          //   }
            break;
           case GetPostsFromDB:
             console.log(state)
              return{
                state
              }
            
      default:
        console.log('default')
        //console.log(state)
        return state
    }
  };