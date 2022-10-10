import React from 'react'

function CardGroup(props){

    function onClick(groupId){
        window.location = `/admin/edit-group/${groupId}`
    }

    return(
        <>
            <div onClick={() => onClick(props.info.id)} style={{  height: '100px', cursor: 'pointer' }}  className="cart-student">
                <div style={{ marginLeft: '10px' }} className="col-md-8 d-flex flex-column  align-items-center justify-content-center">
                    <div className="card-body">
                        <h5 className="card-title stud-text">{"Title: "+props.info.groupTitle}</h5>
                        <h5 className="card-text">{"Year of study: "+props.info.yearOfStudy}</h5>
                        <h5 className="card-text">{"Students: "+props.info.amountOfStudents}</h5>
                        <h5 className="card-text">Auditory: {props.info.auditoryTitle ? props.info.auditoryTitle: "not assigned"}</h5>
                    </div>
                </div>                   
            </div>
        </>
    )
}

export default CardGroup