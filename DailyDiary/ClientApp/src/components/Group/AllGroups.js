import React from "react"
import NavigationBar from "../NavigationBar"
import '../../styles/Students.css'
import CartGroup from "./CartGroup"
import { useState, useEffect } from 'react'

function AllGroups(){
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getAllGroups()
    }, [])

    async function getAllGroups(){
        try
        {
            const response = await fetch(`https://localhost:44364/api/group/get`)
            const data = await response.json()
            if(response.ok === true){
                setGroups(data)
            }else{
                console.log('Error ', data)
            }
        }catch{}
    }

    return(
        <>
            <div id='all-container' className="all-container">   
                <NavigationBar/>
                {groups.map((group, i) =>
                    <>
                        <CartGroup key={i} info={group} />
                    </> 
                )}
                {/* <div id="loader-container" className='loader-container'>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div> */}
            </div>
        </>
    )
}

export default AllGroups