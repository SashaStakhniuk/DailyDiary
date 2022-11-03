import React, { Component } from "react";
import { connect } from "react-redux";
import { Host } from "../Host"
import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
 import GeneralHeader from "../Headers/GeneralHeader";
//  import jwt_decode from "jwt-decode";

class Admin extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        //  console.log(JSON.parse(Buffer.from(this.props.credentials.tokenKey.split('.')[1], 'base64').toString()));
        // var decoded = jwt_decode(this.props?.credentials?.tokenKey);
        // console.log(decoded);
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar role={this.props.credentials.roles} menuItemToSelect={0} />
                    </div>
                    <div className="generalSide">
                        <div className="d-flex justify-content-around">
                            <div className="m-3">
                                <a href="/admin/new-person" className="btn">Create new user</a>
                            </div>
                            <div className="m-3">
                                <a href="/admin/edit-person" className="btn">Find person</a>
                            </div>
                            <div className="m-3">
                                <a href="/admin/new-study-year" className="btn">New study year</a>
                            </div>
                            <div className="m-3">
                                <a href="/admin/groups" className="btn">Усі групи</a>
                            </div>
                            <div className="m-3">
                                <a href="/admin/edit-group" className="btn">Редагування груп</a>
                            </div>
                            <div className="m-3">
                                <a href="/admin/new-study-plan" className="btn">New Study plan</a>
                            </div>
                            <div className="m-3">
                                <a href="/admin/teachers-distribution" className="btn">Розподілення викладачів по групах</a>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}
// function mapDispatchToProps(dispatch){
//     return{
//         setCredentials:(userId,tokenKey,roles)=>dispatch(setUserCredentials(userId,tokenKey,roles)),
//     }
//   };
// export default connect(mapStateToProps,mapDispatchToProps)(Admin);
export default connect(mapStateToProps)(Admin);
// export default Admin;