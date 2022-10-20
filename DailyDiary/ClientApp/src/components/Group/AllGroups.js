// import React from "react"
// import NavigationBar from "../NavigationBar"
// import '../../styles/Students.css'
// import CartGroup from "./CardGroup"
// import { useState, useEffect } from 'react'
// import { Host } from "../Host"

// function AllGroups(){
//     const [groups, setGroups] = useState([])

//     useEffect(() => {
//         getAllGroups()
//     }, [])

//     async function getAllGroups(){
//         try {
//             const response = await fetch(`${Host}/api/group/getAllGroupsDatasOfCurrentStudyYear`)  
//             if (response.ok === true) {
//                 const data = await response.json();
//                 setGroups(data)
//             }
//             else {
//                 const data = await response.text();
//                 window.alert(data);
//             }
//         }
//         catch (e) {
//             window.alert(e);
//         }
//     }

//     return(
//         <>
//             <div id='all-container' className="all-container">   
//                 <NavigationBar/>
//                 {groups.map((group, i) =>
//                     <>
//                         <CartGroup key={i} info={group} />
//                     </> 
//                 )}
//                 {/* <div id="loader-container" className='loader-container'>
//                     <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
//                 </div> */}
//             </div>
//         </>
//     )
// }

// export default AllGroups