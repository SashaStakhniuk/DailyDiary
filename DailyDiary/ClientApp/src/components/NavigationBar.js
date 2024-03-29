import React from "react"
// import "../styles/Navigations/NavigatinBars.css"

function NavigationBar()
{
    function onMouseEnterHendler(){
      var all_container = document.getElementById('all-container')
      var root = document.getElementById('root')
      if(all_container){
        all_container.style.overflowY = 'hidden'
      }
      var font_all_page = document.getElementById('font_all_page')
      var all_students__container = document.getElementById('all-container')
      var login_img = document.getElementById('login-img')
      if(all_students__container){

        var HeightAllContainer = all_students__container.offsetHeight
        var Heightfont_all_page =  font_all_page.offsetHeight
        var Heightroot = root.offsetHeight

        if(HeightAllContainer < Heightroot){
          //all_students__container.style.height = `855px`
         
          font_all_page.style.height = `${Heightroot}px`
        } else{
       
          var remainder = HeightAllContainer - Heightfont_all_page
          var newHeight = Heightfont_all_page + remainder
          font_all_page.style.height = `${newHeight}px`
        }
        font_all_page.style.opacity = 1
        font_all_page.style.visibility = 'visible'
      }


      login_img.style.opacity = 1
      login_img.style.visibility = 'visible'
      login_img.style.width = "300px"
    }

    function defaultStules(){
      var all_container = document.getElementById('all-container')
      if(all_container){
        console.log('all_container');
        all_container.style.overflowY = 'hidden'
      }
      var font_all_page = document.getElementById('font_all_page')
      var all_students__container = document.getElementById('all-container')
      var login_img = document.getElementById('login-img')
      if(all_students__container){
        //all_students__container.style.height = `900px`
        // получаю высоту главного контейнера 
        var HeightAllContainer = all_students__container.offsetHeight
        //высота затемняющего контейнера
        var Heightfont_all_page =  font_all_page.offsetHeight
        if(HeightAllContainer < 500){
         
          //all_students__container.style.height = `855px`
          //font_all_page.style.height = `855px`
        }
        // узнаю разницу между ними 
        var remainder = HeightAllContainer - Heightfont_all_page

        // добавлю высоту, ту вычесленную разницу к затемняющему контейнеру
        // его высота будет равна высоте главного контейнера 
        var newHeight = Heightfont_all_page + remainder

        // изменяю его высоту 
        //(высота выходит такой же как и новая высота главного контейнера, 
        //измененная при демамической пагинации и увелечиние значаения height)
        font_all_page.style.height = `${newHeight}px`
        font_all_page.style.opacity = 0
        font_all_page.style.visibility = 'hidden'
 
      login_img.style.opacity = 0
      login_img.style.visibility = 'hidden'
      login_img.style.width = '50px'
    }
  }

    return (
      <div className="menu__container" style={{backgroundColor: 'gray'}}>        
        <div id="font_all_page" className="font_all_page"></div>
       
        <nav onMouseLeave={defaultStules} onMouseEnter={onMouseEnterHendler}  className="main-menu">
        <div id="img-menu" className="img-menu"></div>
        <div id="backgr" className="backgr"></div>
        <div className="d-flex flex-row">

            <div className="header-logo">
           
              <div id="login-img" className="login-img">
                <div>
                  <a href="/">
                      <img src="https://mystat.itstep.org/assets/images/logo.png?v=cce222be7d237f6d95418ecb8c5529b8" style={{ color: 'black' }} width="100%" alt="..."/>
                  </a>
                </div>
              </div>
            </div>

          <i className="point"></i>
        </div>
       
       
        <div className="settings"></div>
        <div className="scrollbar" id="style-1">
          
          <ul>
            <li>
              <a href="/">
                <i className="fa fa-home fa-lg"></i>
                <span className="nav-text">Home</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li>
              <a href="/students">
                <i className="fa fa-user fa-lg"></i>
                <span className="nav-text">Students</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li>
              <a href="/">
                <i className="fa fa-envelope-o fa-lg"></i>
                <span className="nav-text">Contact</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">

                <i className="fa fa-clock-o fa-lg"></i>
                <span className="nav-text">News</span>
                <span id="news-badge-counter" className="news-badge-counter"></span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-clock-o fa-lg"></i>
                <span className="nav-text">Feedback</span>
                <span id="feedback-badge-counter" className="feedback-badge-counter"></span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-desktop fa-lg"></i>
                <span className="nav-text">Technology</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-plane fa-lg"></i>
                <span className="nav-text">Travel</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-shopping-cart"></i>
                <span className="nav-text">Shopping</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-microphone fa-lg"></i>
                <span className="nav-text">Film & Music</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-flask fa-lg"></i>
                <span className="nav-text">Web Tools</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-picture-o fa-lg"></i>
                <span className="nav-text">Art & Design</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-align-left fa-lg"></i>
                <span className="nav-text">Magazines
                </span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-gamepad fa-lg"></i>
                <span className="nav-text">Games</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerli">
              <a href="/">
                <i className="fa fa-glass fa-lg"></i>
                <span className="nav-text">Life & Style
                </span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>

            <li className="darkerlishadowdown">
              <a href="/">
                <i className="fa fa-rocket fa-lg"></i>
                <span className="nav-text">Fun</span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>
          <li>

            <a href="/">
              <i className="fa fa-question-circle fa-lg"></i>
              <span className="nav-text">Help</span>
              <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
            </a>
          </li>
          </ul>

          <ul className="logout">
            <li>
              <a href="/">
                <i className="fa fa-lightbulb-o fa-lg"></i>
                <span className="nav-text">
                  BLOG
                </span>
                <span style={{ visibility: 'hidden' }} className="badge-counter">4</span>
              </a>
            </li>
          </ul>
          </div>
        </nav>
      </div>
    )
        
}
export default NavigationBar