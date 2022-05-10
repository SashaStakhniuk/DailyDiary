import React from 'react'

function CartGroup(props){

    function onClick(groupId){
        window.location = `/admin/edit-group/${groupId}`
    }

    return(
        <>
            <div onClick={() => onClick(props.info.id)} style={{  height: '100px', cursor: 'pointer' }}  className="cart-student">
                <div style={{ marginLeft: '10px' }} className="col-md-8 d-flex flex-column  align-items-center justify-content-center">
                    <div className="card-body">
                        <h5 className="card-title stud-text">{props.info.title}</h5>
                    </div>
                </div>                   
            </div>
        </>
    )
}

export default CartGroup