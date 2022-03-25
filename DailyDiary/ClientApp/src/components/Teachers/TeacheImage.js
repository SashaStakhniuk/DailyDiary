import React from 'react'
import NavigationBar from '../NavigationBar'
import '../../styles/Students.css'
import { useParams } from 'react-router-dom'

function TeacheImage(){
    let { id } = useParams();

    return(
        <>
            <div className="all-container">
                <NavigationBar />

            </div>
        </>
    )
}
export default TeacheImage