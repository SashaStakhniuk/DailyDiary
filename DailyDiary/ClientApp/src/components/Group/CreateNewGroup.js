import React from 'react'
import { useState, useEffect } from 'react'
import NavigationBar from '../NavigationBar'

function CreateNewGroup(){
    
    const [title, setTitle] = useState("")

    useEffect(() => {

    }, [])

    async function create(){
        try{
            
            // ПРОдолжаю здесть !
            const response = await fetch('https://localhost:44364/api/Group/Edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    groupId,
                    title,
                    semester,
                    subjsId,
                    hours
                })
            }
            )
            if(response.ok === true){
                window.location = `/admin/edit-group/${groupId}`
            }

        }catch {}
    }

    async function onSubmit(e){
        e.preventDefault()
        await create()
    }

    function onChangeTitle(e){
        setTitle(e.target.value)
    }

    return(
        <>
        <div key={id} className="edit__container">
                <NavigationBar/>
                <h2 style={{ position: "absolute", top: 120}} className="title-edit">Create new Group</h2>
                <form onSubmit={e => onSubmit(e)} className='form-edit'>
                    <div class="mb-3">
                        <input id="title" type="text" value={title} onChange={onChangeTitle} placeholder="Enter group title"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewGroup