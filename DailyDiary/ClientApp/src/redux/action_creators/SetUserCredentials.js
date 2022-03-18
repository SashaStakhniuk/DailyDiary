import {SetCredentials} from '../actions/SetCredentials';

export default function SetUserCredentials(tokenKey,userId){
    const credentials={
        tokenKey,
        userId
    }
console.log(credentials)
    return{
        type:SetCredentials,
        credentials
    }
}