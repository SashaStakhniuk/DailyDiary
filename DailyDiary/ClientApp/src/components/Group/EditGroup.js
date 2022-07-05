import React from "react"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EditGroup(){

    let { id } = useParams()
    const [group, setGroup] = useState({})
    const [groupId, setGroupId] = useState(id)
    const [title, setTitle] = useState("")

    useEffect(() => {
        getGroupById()
    }, [groupId])

    useEffect(() => {
        getGroupById()
    }, [])

    async function getGroupById(){
        try{
            var groupId = id
            const request = await fetch(`https://localhost:44364/api/group/get/${groupId}`)
            if(request.ok === true){
                const date = await request.json()
                setGroup(date)
                setGroupId(date.id)
                setTitle(date.title)
            }
        }catch{}
    }

    async function edit() {

        const response = await fetch('https://localhost:44364/api/Group/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId,
                title,
            })
        })
        if(response.ok === true){
            window.location = `/admin/edit-group/${groupId}`
        }
    }
    
    async function onSubmit(e) {
        e.preventDefault()
        await edit()
    }

    function onChangeTitle(e) {
        setTitle(e.target.value)
    }

    return (
        <>
            <div className="edit__container">
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Edit group: {group.title} </h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit d-flex flex-column justify-content-center align-items-center'>
                    <div className="mb-3">
                        <input style={{ width: '250px' }} type="text" id="title" value={title} onChange={e => onChangeTitle(e)} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Edit</button>
                </form>
            </div>
        </>
    )
}

export default EditGroup