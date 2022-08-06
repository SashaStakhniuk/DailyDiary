import React from "react";
import { connect } from "react-redux";
import { incrementCount, decrementCount,getApiData } from "../redux/action_creators/TEST_ACTION";

class ReduxTesting extends React.Component{
    constructor(props){
        super(props)
        // this.handleForm=this.handleForm.bind(this)
        // this.makeRequest=this.makeRequest.bind(this)
        // this.getCookie=this.getCookie.bind(this)

        this.state={
            access_token:"",
            userId:""
        }
    }
    render() {
        // let credentials = this.props.credentials;
        return (
          <div >
            <div className="text-center">
                <h1>UserId: {this.props.credentials.userId}</h1>
                <h1>TokenKey: {this.props.credentials.tokenKey}</h1>

                <h1>{this.props.count}</h1>

                {/* credentials: {credentials.tokenKey},{credentials.userId} */}
                <button className="btn btn-success m-1" onClick={()=> this.props.incrementCount()}><h1>+</h1></button>
                <button className="btn btn-danger m-1" onClick={()=> this.props.decrementCount()}><h1>-</h1></button>
                <button className="btn btn-primary m-1" onClick={()=> this.props.getApiData(this.props.count)}><h1>getApiDatas</h1></button>
            </div>
          </div>
        );
      }
}
    function mapStateToProps(state){
        console.log("mapStateToProps ")
        console.log(state)

        return {
            credentials: state.currentUser.credentials,
            count: state.count
        }
    }
    function mapDispatchToProps(dispatch){
        return{
            incrementCount:()=>dispatch(incrementCount()),
            decrementCount:()=>dispatch(decrementCount()),
            getApiData:(id)=>dispatch(getApiData(id)),

            // setCredentials:(tokenKey,userId)=>dispatch(SetUserCredentials(tokenKey,userId))
            //setCredentials:()=>dispatch({type:GetCredentialsFromSessionStorage})
            //decrement: () => dispatch({ type: 'DECREMENT' })
        }
      };

export default connect(mapStateToProps,mapDispatchToProps)(ReduxTesting)