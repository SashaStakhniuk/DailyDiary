import {GetPostsFromDB} from '../actions/GetPostsFromDB';

export default async function getPostsFromDB(){
    const response= await fetch('https://localhost:44361/api/useractions/GetAllPosts')
    let posts=[]
     if (response.ok === true) {
           posts=await response.json()
           console.log("post is ",posts)
    return{
        type:GetPostsFromDB,
        posts
    }
     }

}