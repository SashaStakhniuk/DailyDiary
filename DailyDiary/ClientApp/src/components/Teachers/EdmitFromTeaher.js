import React from "react"
import '../../styles/Students.css'
import NavigationBar from '../NavigationBar'
import { useParams } from "react-router-dom"
import {useState} from "react"
function EdmitFromTeaher(){

    let { id } = useParams()
    const [specialty, setSpecialty] = useState("")
    
    return(
        <>

        </>
    )
}

export default EdmitFromTeaher