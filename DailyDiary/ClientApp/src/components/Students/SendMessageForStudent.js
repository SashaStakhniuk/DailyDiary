import React from "react"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import $ from 'jquery'
// import '../../styles/Students.css'
import NavigationBar from "../NavigationBar"

function SendMessageForStudent(){

    let { id } = useParams()
    const [title, setTitle] = useState('title')
    const [mainInfo, setMainInfo] = useState('mainInfo')
    const [sender, setSender] = useState('admin')
    const [base64Url, setBase64Url] = useState('some url')
    const [dataPublication, setDataPublication] = useState(new Date())

    async function onSubmit(e){
        e.preventDefault()
        var studentId = id
        var button = $('.sendButton');
        $('.sendButton').hide().html('Sending <span class="loading"></span>').fadeIn('fast');
        var variatSending = document.getElementById('sendVariant').value
        try
        {
            const response = await fetch(`https://localhost:44364/api/News/${variatSending}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId,
                    title,
                    mainInfo,
                    sender,
                    base64Url,
                    dataPublication
                })
            })
            const data = await response.json()
            if(response.ok === true){
                setTimeout(() => {
                    if(true){
                        button.hide().html('Message sent &#10003;').fadeIn('fast');
                    }
                }, 1300)
        
                setTimeout(() => {
                    window.location = `/admin/send-for-teacher/${id}`
                }, 3500)
            }else{
                
            }
        }catch{}
    }

    function onChangeTitle(e){
        setTitle(e.target.value)
    }

    function onChangeMainInfo(e){
        setMainInfo(e.target.value)
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
                console.log("result: " + result)
                setBase64Url(result)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <>
            <div className="all-container">
                <NavigationBar />
                <form onSubmit={e => onSubmit(e)} className='form-edit'>
                    <div className="d-flex m-3 p-2 flex-column">
                        <select type="date" id="sendVariant" className="sendVariant">
                            <option value="SandMessageForStudent" selected>Send for this student</option>
                            <option value="SendForAllStudents" >Send for all students</option>
                        </select >
                        <div className="d-flex flex-column align-items-center">
                        <div className="mb-3 w-100 d-flex justify-content-center flex-column align-items-center">
                            <span className="span-text">Title</span>
                            <div className="mb-3">
                                <textarea style={{ width: '400px' }} id="title" value={title} onChange={e => onChangeTitle(e)} type="text" placeholder="Title message" title="Your title" />
                            </div>
                        </div>
                        <div className="mb-3 w-100 d-flex justify-content-center flex-column align-items-center">
                            <span className="span-text">Body message</span>
                            <div className="mb-3">
                                <textarea style={{ width: '400px' }} id="mainInfo" value={mainInfo} onChange={e => onChangeMainInfo(e)} type="text" placeholder="Title body message" title="Your body message" />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', disabled: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="mb-3" style={{ display: 'flex', flexDirection: 'column'}}>
                                <label style={{ color: 'gray' }} htmlFor="floatingTextarea">Сhoose a picture message</label>
                                <input style={{  }} className="btn btn-primary" type="file" name="file" onChange={e => handleFileInputChange(e)} />
                            </div>
                        </div>
                        <button style={{ width: '150px', height: '60px' }} type="submit" className="sendButton">Send</button>
                    </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SendMessageForStudent