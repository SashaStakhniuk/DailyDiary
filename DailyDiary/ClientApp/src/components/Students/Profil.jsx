import React from "react";
import { useState, useEffect } from "react";
import '../../styles/Profil/Profil.css'
import StudentHeader from "../Headers/StudentHeader";
import NavigationBarForStudent from "../Navigations/NavigationBarForStudent";
import logon from '../../images/user__logo.png'

export const Profil = ({}) => {

  const[isHover, setIsHover] = useState(false)

  async function getDetailInformation (e) {
    const response = await fetch(`https://b2bdataservice-api-dev.azurewebsites.net/api/bis/v1/3275172-2`, {
      method: 'GET'
    })
    if(response.ok === true){
      const data = await response.json()
      console.log("Data details: ", data)
    }
  }

  async function test (e) {
    let counter = 0;
    const minut = 0;
    setTimeout(() => {
      counter ++
      if(counter == 60) {
        counter = 0;
        minut++;
      }
    }, 1000)
    console.log("Test");
    const response = await fetch(`https://b2bdataservice-api-dev.azurewebsites.net/api/test`, {
      method: 'GET'
    })
    if(response.ok === true){
      
      const data = await response.json()
      console.log("Test data details: ", data)
      console.log(`Minutes: ${minut}, sec: ${counter}}`);
    }
  }

  async function getCompanyByName (e) {
    let name = "Huoltopalvelu Jensen Oy"
    const response = await fetch(`https://b2bdataservice-api-dev.azurewebsites.net/api/bis/find-by-name`, {
      method: 'POST',
      body: JSON.stringify({
        name
      })
    })
    if(response.ok === true){
      const data = await response.json()
      console.log("Data details: ", data)
    }
  }

  async function NextPage (e) {
    const response = await fetch('https://b2bdataservice-api-dev.azurewebsites.net/api/bis/pagination', {
      method: 'POST',
      body: JSON.stringify({
        currentItems,
        remainItems
      })
    })
    if(response.ok === true){
      const data = await response.json()
      console.log("Data newRemainItems: ", data.remainItems)
      console.log("Data newCurrentItems: ", data.currentItems)
      setRemainItems(data.remainItems)
      setCurrentItems(data.currentItems) 
      //setRemainItems(data.newRemainItems)
      //setCurrentItems(data.newCurrentItems)
    }
  }

  const [remainItems, setRemainItems] = useState([])
  const [currentItems, setCurrentItems] = useState([])

  async function FindCompanyByOption(e) {
    var registrationFrom = null//new Date('2022-08-30')
    var registrationTo = null//new Date('2022-09-13')
    var name = ""
    var BusinessId = ""
    var postCode = "09120"
    var companyForm = ""
    var registeredOffice = ""
    var bisCompanyLineCode = "";
    var hasPhoneNumber = false;

    //http://localhost:7151
    //https://b2bdataservice-api-dev.azurewebsites.net
    try {
      const response = await fetch('http://localhost:7151/api/bis/options/20', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            registrationFrom,
            registrationTo,
            name,
            BusinessId,
            postCode,
            companyForm,
            registeredOffice,
            bisCompanyLineCode,
            hasPhoneNumber
          })
      })
      if(response.ok === true) { 
        const data = await response.json()
          console.log("Data remainItems: ", data.remainItems)
          console.log("Data currentItems: ", data.currentItems)
          setRemainItems(data.remainItems)
          setCurrentItems(data.currentItems) 
      }else {
        console.log("Data remainItems: ")
      }
    }catch {}
  }


  function oChangePassword() {
    window.location = '/reset-password'
  }

  return (
    <>
      <div className="main__container">
        <StudentHeader />
        <NavigationBarForStudent />
        <div className="container">
          <h1 className="page__title">Мій профіль</h1>
          <div className="card_profil">
            <div className="first__cart__container">
              <div className="logo__container">
                <span className="owl__sms">4.5</span>
               <img className="user__logo" src={logon} />
              </div>
              <button onClick={oChangePassword} style={{ marginTop: '40px', marginBottom: '10px' }} className="btn__clasic">Змінити пароль</button>
            </div>
            <div className="second__cart__container">
              <div className="inputs__cont">
                <div className="block">
                  <div className="input__item">
                    <span className="span_name">Ім'я</span>
                    <label className="label">
                      <textarea value="Name" className="area"/>
                    </label>
                  </div>
                  <div className="input__item">
                    <span className="span_name">Посада</span>
                    <label className="label">
                      <textarea value="LastName" className="area"/>
                    </label>
                  </div>
                </div>
                <div className="block">
                  <div style={{width: '100%', margin:'0', padding: '0'}} className="input__item">
                    <span className="span_name">Статус</span>
                    <label className="label">
                      <textarea value="Status" className="area"/>
                    </label>
                  </div>
                </div>

                <div className="block">
                  <div className="input__item">
                    <span className="span_name">Ім'я</span>
                    <label className="label">
                      <textarea value="Name" className="area"/>
                    </label>
                  </div>
                  <div className="input__item">
                    <span className="span_name">Посада</span>
                    <label className="label">
                      <textarea value="LastName" className="area"/>
                    </label>
                  </div>
                </div>

                <div className="block">
                  <div className="input__item">
                    <span className="span_name">Ім'я</span>
                    <label className="label">
                      <textarea value="Name" className="area"/>
                    </label>
                  </div>
                  <div className="input__item">
                    <span className="span_name">Посада</span>
                    <label className="label">
                      <textarea value="LastName" className="area"/>
                    </label>
                  </div>
                </div>

                <div className="block">
                  <div className="input__item">
                    <span className="span_name">Ім'я</span>
                    <label className="label">
                      <textarea value="Name" className="area"/>
                    </label>
                  </div>
                  <div className="input__item">
                    <span className="span_name">Посада</span>
                    <label className="label">
                      <textarea value="LastName" className="area"/>
                    </label>
                  </div>
                </div>
                <div className="block">
                  <div className="input__item">
                    <span className="span_name">Ім'я</span>
                    <label className="label">
                      <textarea value="Name" className="area"/>
                    </label>
                  </div>
                  <div className="input__item">
                    <span className="span_name">Посада</span>
                    <label className="label">
                      <textarea value="LastName" className="area"/>
                    </label>
                  </div>
                </div>
              </div>
              <button style={{ marginTop: '40px', marginBottom: '10px' }} className="btn__clasic">Зберегти зміни</button>
              <svg className="epit__img" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.15039 16H3.40039L12.6504 6.74995L11.4254 5.49995L2.15039 14.775V16ZM15.8504 5.64995L12.4754 2.29995L13.8004 0.999951C14.0837 0.716618 14.4381 0.574951 14.8634 0.574951C15.2881 0.574951 15.6421 0.716618 15.9254 0.999951L17.1504 2.22495C17.4337 2.52495 17.5837 2.87895 17.6004 3.28695C17.6171 3.69562 17.4754 4.04162 17.1754 4.32495L15.8504 5.64995ZM1.55039 17.5C1.30039 17.5 1.08806 17.4126 0.913391 17.238C0.738057 17.0626 0.650391 16.85 0.650391 16.6V14.5C0.650391 14.3833 0.671391 14.271 0.713391 14.163C0.754724 14.0543 0.82539 13.95 0.92539 13.85L11.4004 3.37495L14.7754 6.74995L4.30039 17.225C4.20039 17.325 4.09639 17.396 3.98839 17.438C3.87972 17.4793 3.76706 17.5 3.65039 17.5H1.55039ZM12.0254 6.12495L11.4254 5.49995L12.6504 6.74995L12.0254 6.12495Z" fill="#F2982A"/>
              </svg>
            </div>
            <button className="btn" onClick={e => FindCompanyByOption(e)}>Rquest</button>
            <button className="btn" onClick={e => NextPage(e)}>Next</button>
            <button className="btn" onClick={e => test(e)}>GetDetail info</button> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Profil