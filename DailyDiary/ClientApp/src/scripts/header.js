"use strict"
function f(){
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function (e) {
            
            return (
                    isMobile.Android()
                    || isMobile.BlackBerry()
                    || isMobile.iOS()
                    || isMobile.Opera()
                    || isMobile.Windows()
                    );
        }
    };
    
    if(isMobile.any()){
        document.body.classList.add('_touch')
        let menuArrows = document.querySelectorAll('.menu__arrow')
        if(menuArrows.length > 0){
            for (let i = 0; i < menuArrows.length; i++) {
                const el = menuArrows[i];
                el.addEventListener('click', function(e){
                    e.preventDefault()
                    el.parentElement.classList.toggle('_active')
                })
            }
        }
    }else{
        document.body.classList.add('_pc')
    }
}
f()
// 
let menuLincks = document.querySelectorAll('.menu__linck[data-goto]')
if(menuLincks.length > 0){
    menuLincks.forEach(menuLinck => {
        menuLinck.addEventListener('click', onmenuLinckClick)
    });
    function onmenuLinckClick(e){
        const menuLinck = e.target
        if(menuLinck.dataset.goto && document.querySelector(menuLinck.dataset.goto )){
            const gotoBlock = document.querySelector(menuLinck.dataset.goto)
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight
            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            })
            e.preventDefault()
        }
    }
}



