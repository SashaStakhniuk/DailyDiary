 import React from 'react'
 import {Host} from '../Host'

 class Students extends React.Component{
    constructor(props) {
        super(props);
        this.getStudentsByGroupId = this.getStudentsByGroupId.bind(this);
        this.state = {
            students: []
        }
    };
    componentDidMount(){
        if(this.props.groupId!=undefined){
            this.getStudentsByGroupId(this.props.groupId);
            console.log(this.props.groupId)
        }

    }
    async getStudentsByGroupId(groupId) {
        try {
            const response = await fetch(`${Host}/api/student/getAllByGroupId/${groupId}`);
            if (response.ok === true) {
                const data = await response.json();
                console.log("recieved students: ", data)
                this.setState({
                    students: data
                })
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }
    }
    render(){
        return(
            <div className='container'>
                <div>Students:</div>
                <table className='table'>
                        <thead>
                            <tr>
                                <th>Name:</th>
                                <th>Middle name:</th>
                                <th>Last name:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.students.map(person =>
                                <tr key={"students" + person.Id}>
                                    <td>
                                        {person.name}
                                    </td>
                                    <td>
                                        {person.middleName}
                                    </td>
                                    <td>
                                        {person.lastName}
                                    </td>                              
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
        )
    }
 }
export default Students;
// import React from 'react'
// import '../../styles/Students.css'
// import NavigationBar from "../NavigationBar";
// import CartStudent from "./CartStudent";
// import { useState, useEffect } from 'react'
// import axios from 'axios'

// function Students(){
//     const[students, setStudents] = useState([])
//     const[groups, setGroups] = useState([])
//     const [loading, setLoading] = useState(true) 
//     const [studentsSkip, setStudentsSkip] = useState(0)
//     const [stateData, setStateData] = useState(true)

//     useEffect(() => {    
//         var loader_container = document.getElementById('loader-container')
        
//         if(loading){
//             if(stateData){
//                 loader_container.style.visibility = 'visible'
//                 loader_container.style.opacity = 1
//                 loader_container.style.height = '200px' 
//                 setTimeout(() => {
//                     axios.get(`https://localhost:44364/api/student/GetRangStudents/${studentsSkip}`)
//                     .then(response => {
//                         if(response.data == false){
//                             setStateData(false)
//                             loader_container.style.visibility = 'hidden'
//                             loader_container.style.opacity = 0
//                             loader_container.style.height = '0px' 
//                         } else {
//                             setStudents([...students, ...response.data])
//                             setStudentsSkip(prevCourBlogs => prevCourBlogs +5)
//                         }
//                     }).finally(() => setLoading(false))
//                     setLoading(false)
//                     loader_container.style.visibility = 'hidden'
//                     loader_container.style.opacity = 0
//                     loader_container.style.height = '0px' 
//                 }, 1500)
//             }
//         }
//     }, [loading])

//     useEffect(() => {
//         var loader_container = document.getElementById('loader-container')
        
//         if(loading){
//             loader_container.style.visibility = 'visible'
//             loader_container.style.opacity = 1
//             loader_container.style.height = '500px' 
//             setTimeout(() => {
//                 axios.get(`https://localhost:44364/api/student/GetRangStudents/${studentsSkip}`)
//                 .then(response => {
//                     if(response.data == false){
//                         loader_container.style.visibility = 'hidden'
//                         loader_container.style.opacity = 0
//                         loader_container.style.height = '0px' 
//                     } else {
//                         setStudents([...students, ...response.data])
//                         setStudentsSkip(prevCourBlogs => prevCourBlogs +5)
//                     }
//                 }).finally(() => setLoading(false))
//                 setLoading(false)
//                 loader_container.style.visibility = 'hidden'
//                 loader_container.style.opacity = 0
//                 loader_container.style.height = '0px' 
//             }, 1500)
            
//         }
//     }, [])

//     function scrollHendler(e){
//         if(e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<100){
//             setLoading(true)
//         }
//     }

//     useState(() =>{
//         Start() //async function

//         document.addEventListener('scroll', scrollHendler)
//         return function(){
//             document.removeEventListener('scroll', scrollHendler)
//         }
//     }, [])

//     async function Start(){
//         //await getAllStudents()
//         await getAllGroups()
//     }

//     async function getAllStudents() {
//         try{
//             const response= await fetch('https://localhost:44364/api/student/get')

//              const data = await response.json()
    
//              if (response.ok === true) {

//                 setStudents(data)
              
//              } else {
//                  console.log("error",data)
//              }
//             }
//         catch{}
//     }

//     async function getAllGroups() {
//         try{
//             const response= await fetch('https://localhost:44364/api/group/get')

//              const data = await response.json()
    
//              if (response.ok === true) {

//                 setGroups(data)
              
//              } else {
//                 console.log("error",data)
//              }
//             }
//         catch{}
//     }

//     async function getStudentByLastName(lastName) {
//         if(lastName == ""){
//             await getAllStudents()
//         } else {
//             try{
//                 const response= await fetch(`https://localhost:44364/api/student/GetByName/${lastName}`)
    
//                  const data = await response.json()
        
//                  if (response.ok === true) {

//                     setStudents(data)
                  
//                  } else {
//                      console.log("error",data)
//                  }
//                 }
//             catch{}
//         }
//     }

//     async function onChangeHendler(){
//         var input = document.getElementById('lastName') 
//         await getStudentByLastName(input.value)
//     }

//     return(
//         <>
//             <div id='all-container' className="all-container">
               
//                 <NavigationBar/>
//                 <div style={{ marginBottom: '10px' }}>
//                     <input onChange={onChangeHendler} id="lastName" type="username" placeholder="Enter student lastNamr" required="required" title="Your username" />
//                 </div>
//                 {students.map((student, i) =>
//                     <>
//                         <CartStudent key={i} infoStudent={student} dataGroups={groups} />
//                     </> 
//                 )}
//                 <div id="loader-container" className='loader-container'>
//                     <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
//                 </div>         
//             </div>
//         </>
//     )
// }

// export default Students