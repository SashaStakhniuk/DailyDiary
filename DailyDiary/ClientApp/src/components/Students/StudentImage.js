import React from "react"
import NavigationBar from "../NavigationBar"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import '../../styles/Students.css'

function StudentImage(){

    let { id } = useParams();
    const [base64URL, setBase64URL] = useState("")
    const [student, setStudent] = useState({})

    useEffect(() => {
        getStudent()
    }, [id])

    async function getStudent(){
        try{
            const response= await fetch(`https://localhost:44364/api/student/get/${id}`)
             const data = await response.json()
    
             if (response.ok === true) { 
                setStudent(data)
             } else {
                 console.log("error",data)
             }
            }
        catch{}
    }

    async function onSubmitEdit(e){
        e.preventDefault()
        await FetchBase64();
    }

    async function FetchBase64(e){
        var Id = Number(id)
        console.log("Id: " + typeof(Id))
        const result = await fetch(`https://localhost:44364/api/student/AddBase64`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id,
                base64URL
            })
        })
        if(result.ok === true){
            window.location = '/admin/students'
        }
        else{
            console.log("Error")
        }
    }

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(file);
            // on reader load somthing...
            reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            resolve(baseURL);
            };
        });
    };

    function handleFileInputChange(e){
        var file = e.target.files[0]
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                setBase64URL(result)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <>
            <div className="all-container">
                <NavigationBar/>
                <div className="w-100 d-flex justify-content-center">
                    {base64URL ? 
                        <img style={{ width: '400px' }} src={base64URL}/>
                        :
                        <img style={{ width: '400px' }} src={student.base64URL}/>
                    }
                    
                </div>
                <form style={{ marginTop: '20px' }} onSubmit={e => onSubmitEdit(e)}> 
                    <div style={{ display: 'flex', flexDirection: 'column', disabled: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="mb-3" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ color: 'gray' }} htmlFor="floatingTextarea">Сhoose a picture student</label>
                            <input style={{  }} className="btn btn-primary" type="file" name="file" onChange={e => handleFileInputChange(e)} />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary text__fonts">Edit</button>
                </form>
            </div>
        </>
    )
}

export default StudentImage