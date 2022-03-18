import React from "react"

function CartTeacher(props){
    function onClick(id){
        window.location = `/admin/teacher-profil/${id}`
    }
    return(
        <>
            <div onClick={() => onClick(props.infoTeacher.teacherId)} style={{  height: '150px', cursor: 'pointer' }}  className="cart-student">
                <div className="col-md-4">
                    {props.infoTeacher.base64URL ? <img 
                        style={{ width: '120px', borderRadius: '25%', height: 'auto' }}
                        className="img-fluid " 
                        src={props.infoTeacher.base64URL} /> : <img 
                        style={{ width: '120px', borderRadius: '25%' }}
                        className="img-fluid rounded-start"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png" />
                    }
                </div>
                <div style={{ marginLeft: '10px' }} className="col-md-8 d-flex flex-column  align-items-center justify-content-center">
                    <div className="card-body">
                        <h5 className="card-title stud-text">{props.infoTeacher.name} {props.infoTeacher.lastName}</h5>
                    </div>
                </div>                   
            </div>
        </>
    )
}
export default CartTeacher