import React from 'react'
import { useState, useEffect } from 'react'
import AdminNavigationBar from '../AdminNavigationBar'

function DistributionOfTeachers() {

    async function onSabmit(e){
        e.preventDefault()
        await distribute()
    }

    async function distribute() {

    }

    return(
        <>
            <div className='edit__container'>
                <AdminNavigationBar />
                <from onSabmit={e => onSabmit(e)}>
                    
                </from>
            </div>
        </>
    )
}

export default DistributionOfTeachers