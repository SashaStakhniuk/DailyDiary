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
