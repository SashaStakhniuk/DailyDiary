import React from 'react'
import { useState } from "react";
import '../../styles/Navigations/NavigationBarForStudent.css'

function NavigationBarForTeachers () {

    function onMouseEnterHendler() {
        var menu__texts = document.querySelectorAll('#menu__text')
        var menu__items = document.querySelectorAll('#menu__item')
        var svgs =  document.querySelectorAll('#white__swg, #perpel__swg')
        svgs.forEach(element => {
          element.style.marginLeft = '25px'
        });
        menu__texts.forEach(element => {
          element.style.visibility = 'visible'
          element.style.opacity = '1'
          element.style.display = 'block'
        });
        menu__items.forEach(element => {
          element.style.width = '226px'
          element.style.height = '55px'
          element.style.borderRadius = '16px'
          
          element.addEventListener('mouseover', function (e){
            element.style.background = '#AEB9F1'
    
            var perpel__swg = e.target.querySelector('#perpel__swg')
            var white__swg = e.target.querySelector('#white__swg')
            var menu__text = e.target.querySelector('#menu__text')
            if(perpel__swg && white__swg) {
              perpel__swg.style.visibility = 'hidden'
              perpel__swg.style.opacity = '0'
              perpel__swg.style.display = 'none'
    
              menu__text.style.color = '#fff'
    
              white__swg.style.visibility = 'visible'
              white__swg.style.opacity = '1'
              white__swg.style.display = 'block'
            }
          })
          element.addEventListener('mouseleave', function(e) {
            element.style.background = 'none'
            var perpel__swg = e.target.querySelector('#perpel__swg')
            var white__swg = e.target.querySelector('#white__swg')
            var menu__text = e.target.querySelector('#menu__text')
            if(perpel__swg && white__swg) {
              perpel__swg.style.visibility = 'visible'
              perpel__swg.style.opacity = '1'
              perpel__swg.style.display = 'block'
              menu__text.style.color = '#A5B0CC'
              white__swg.style.visibility = 'hidden'
              white__swg.style.opacity = '1'
              white__swg.style.display = 'none'
            }
          })
        });
    }

    function onMouseLeave() {
        var menu__texts = document.querySelectorAll('#menu__text')
        var menu__items = document.querySelectorAll('#menu__item')
        var svgs =  document.querySelectorAll('#white__swg, #perpel__swg')
        svgs.forEach(element => {
            element.style.marginLeft = '0'
        });
        menu__items.forEach(element => {
            element.style.width = '20px'
            element.style.height = '22px'
            element.style.borderRadius = '16px'
        });
        menu__texts.forEach(element => {
            element.style.visibility = 'hidden'
            element.style.opacity = '0'
            element.style.display = 'none'
        });
    }

    return(
        <>
            
        </>
    )
}

export default NavigationBarForTeachers