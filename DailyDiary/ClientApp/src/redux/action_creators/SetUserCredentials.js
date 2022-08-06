//import {SetCredentials} from '../actions/SetCredentials';

export const SetCredentials = "SetCredentials";

export default function setUserCredentials(tokenKey,userId,roles){
    const credentials={
        tokenKey,
        userId,
        roles
    }
//console.log(credentials)
    return{
        type:SetCredentials,
        payload:credentials
    }
}