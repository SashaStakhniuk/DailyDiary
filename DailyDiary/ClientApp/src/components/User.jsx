import React, { Component }  from 'react';
class User extends Component
{
    constructor(props) {
        super(props);
    }
    async componentDidMount(){
        const response = await fetch('/api/user/get');
        console.log(await response.json());
    }

    render() {
        return (
            <div>
                {console.log(this.props)}
            </div>
        )
    }

}
export default User