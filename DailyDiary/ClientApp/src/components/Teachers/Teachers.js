import React from 'react'
// import '../../styles/Teachers.css'
import NavigationBar from '../NavigationBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CartTeacher from './CartTeacher'

function Teachers(){

    const[teachers, setTeachers] = useState([])
    const [teachersSkip, setTeachersSkip] = useState(0)
    const [loading, setLoading] = useState(true) 
    const [stateData, setStateData] = useState(true)

    useEffect(() => {
        var loader_container = document.getElementById('loader-container')

        if(loading){
            if(stateData){
                loader_container.style.visibility = 'visible'
                loader_container.style.opacity = 1
                loader_container.style.height = '500px' 
                setTimeout(() => {
                    axios.get(`https://localhost:44364/api/teacher/GetRangTeachers/${teachersSkip}`)
                    .then(response => {
                        if(response.data == false){
                            setStateData(false)
                            loader_container.style.visibility = 'hidden'
                            loader_container.style.opacity = 0
                            loader_container.style.height = '0px' 
                        } else {
                            setTeachers([...teachers, ...response.data])
                            setTeachersSkip(prevCourBlogs => prevCourBlogs +5)
                        }
                    }).finally(() => setLoading(false))
                    loader_container.style.visibility = 'hidden'
                    loader_container.style.opacity = 0
                    loader_container.style.height = '0px'
                }, 1000)
            }
        }
    }, [])

    useEffect(() => {
        var loader_container = document.getElementById('loader-container')

        if(loading){
            if(stateData){
                loader_container.style.visibility = 'visible'
                loader_container.style.opacity = 1
                loader_container.style.height = '200px' 
                setTimeout(() => {
                    axios.get(`https://localhost:44364/api/teacher/GetRangTeachers/${teachersSkip}`)
                    .then(response => {
                        if(response.data == false){
                            setStateData(false)
                            loader_container.style.visibility = 'hidden'
                            loader_container.style.opacity = 0
                            loader_container.style.height = '0px' 
                        } else {
                            setTeachers([...teachers, ...response.data])
                            setTeachersSkip(prevCourBlogs => prevCourBlogs +5)
                        }
                    }).finally(() => setLoading(false))
                    loader_container.style.visibility = 'hidden'
                    loader_container.style.opacity = 0
                    loader_container.style.height = '0px'
                }, 1000)
            }
        }
    }, [loading])

    function scrollHendler(e){
        if(e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<100){
            setLoading(true)
        }
    }

    useState(() =>{
        document.addEventListener('scroll', scrollHendler)
        return function(){
            document.removeEventListener('scroll', scrollHendler)
        }
    }, [])

    async function getAllTeachers(){
        try{
            const response= await fetch(`https://localhost:44364/api/teacher/get/`)

             const data = await response.json()
    
             if (response.ok === true) {

                setTeachers(data)
              
             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }

    async function getTeacherByLastName(lastName){
        if(lastName == ""){
            await getAllTeachers()
        } else {
            try{
                const response= await fetch(`https://localhost:44364/api/teacher/GetByLastName/${lastName}`)
    
                 const data = await response.json()
        
                 if (response.ok === true) {

                    setTeachers(data)
                  
                 } else {
                     console.log("error",data)
                 }
                }
            catch{}
        }
    }

    async function onChangeHendler(){
        var input = document.getElementById('lastName') 
        await getTeacherByLastName(input.value)
    }


    return(
        <>
            <div id='all-container' className="all-container">
                
                <NavigationBar />
                <div style={{ marginBottom: '10px' }}>
                        <input onChange={onChangeHendler} id="lastName" type="username" placeholder="Enter teacher lastName" required="required" title="Enter lastName" />
                    </div>
                {teachers.map((teacher, i) => 
                    <CartTeacher key={i} infoTeacher={teacher} />
                )}
                <div id="loader-container" className='loader-container'>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>      
            </div>
        </>
    )
}

export default Teachers