import React from 'react';
import { ChromePicker} from 'react-color';
import "../styles/EnvironmentStyle.css";
import logo from '../images/logo.png'
class ColorPicker extends React.Component {
    constructor(props){
        super(props)
        //  this.handleChangeComplete=this.handleChangeComplete.bind(this)
         this.handleChange=this.handleChange.bind(this)

         this.selectChange=this.selectChange.bind(this)
         this.radioButtonChange=this.radioButtonChange.bind(this)
         this.saveColorTheme=this.saveColorTheme.bind(this)

        this.state = {
            selectedComponent:"background",
            selectedButtonComponent:"backgroundColor",

            backgroundColor: "",
            textColor:"",
            navList:"",
            iconsColor:"",
            buttonsBackgroundColor:"",
            buttonsTextColor:"",
            buttonsHoverColor:"",

            color:{
              a:1,
              r:255,
              g:255,
              b:255
          },
          };
    }
    componentDidMount(){
          const computedStyle= getComputedStyle(document.documentElement);
         this.setState({
          backgroundColor: computedStyle.getPropertyValue('--examplePageBackgroundColor'),
          textColor: computedStyle.getPropertyValue('--examplePageTextColor'),
          navList: computedStyle.getPropertyValue('--examplePageNavigationMenuColor'),
          iconsColor:computedStyle.getPropertyValue('--examplePageNavigationMenuIconsColor'),
          buttonsBackgroundColor: computedStyle.getPropertyValue('--exampleButtonsBackgroundColor'),
          buttonsTextColor: computedStyle.getPropertyValue('--exampleButtonsTextColor'),
          buttonsHoverColor: computedStyle.getPropertyValue('--exampleButtonsHoverColor'),
         })

        //var ulMenuSelection = document.getElementById("ulMenuSelection");
        //  ulMenuSelection.addEventListener("mouseover", function( event ) {
        //   // highlight the mouseover target
        //   event.target.style.border = "1px solid red";
        //   //reset the color after a short delay
        //   // setTimeout(function() {
        //   //   event.target.style.border = "";
        //   // }, 300);
        // },false);
        // ulMenuSelection.addEventListener("mouseout", function( event ) {
        //   // highlight the mouseover target
        //   event.target.style.border = "";
        //   //reset the color after a short delay
        //   // setTimeout(function() {
        //   //   event.target.style.border = "";
        //   // }, 300);
        // },false);
        const background = document.getElementsByClassName('mainExample');
        Array.from(background).forEach(function(element) {
          element.addEventListener("click", function( event ) {
            if(event.target.style.border === "1px solid rgb(0, 255, 255)"){
              event.target.style.border = "";
            }
            else{
              event.target.style.border = "1px solid rgb(0, 255, 255)";
              console.log(event.target.className);
            }
            if(event.target.className==="mainExample"){
              // this.setState({
              //   selectedComponent:"background"
              // });
            }
        });
      });
    //   Array.from(background).forEach(function(element) {
    //     element.addEventListener("mouseout", function( event ) {
    //       event.target.style.border = "";
    //       console.log(event.target);
    //   });
    // });
    }
    // componentWillUnmount(){
      //this.nv.removeEventListener("nv-enter", this.handleNvEnter);
    // }
          handleChange = (color) => {
           
            if(this.state.selectedComponent==="background"){
                this.setState({ backgroundColor: color.hex });
                document.documentElement.style
                .setProperty('--examplePageBackgroundColor', color.hex);
            }
            else if(this.state.selectedComponent==="textColor"){
                this.setState({ textColor: color.hex });
                document.documentElement.style
                .setProperty('--examplePageTextColor', color.hex);
            }
            else if(this.state.selectedComponent==="navList"){
              this.setState({ navList: color.hex });
              document.documentElement.style
              .setProperty('--examplePageNavigationMenuColor', color.hex);
            }
            else if(this.state.selectedComponent==="iconsColor"){
              this.setState({ iconsColor: color.hex });
              document.documentElement.style
              .setProperty('--examplePageNavigationMenuIconsColor', color.hex);
             
           }
           else if(this.state.selectedComponent==="buttonsStyle"){
            // document.documentElement.style
            // .setProperty('--exampleButtonsBackgroundColor', color.hex);

            if(this.state.selectedButtonComponent==="backgroundColor"){
              this.setState({ buttonsBackgroundColor: color.hex });
              document.documentElement.style
              .setProperty('--exampleButtonsBackgroundColor', color.hex);
            }
            else if(this.state.selectedButtonComponent==="textColor"){
              this.setState({ buttonsTextColor: color.hex });
              document.documentElement.style
              .setProperty('--exampleButtonsTextColor', color.hex);
            }
            else if(this.state.selectedButtonComponent==="hoverColor"){
              this.setState({ buttonsHoverColor: color.hex });
              document.documentElement.style
              .setProperty('--exampleButtonsHoverColor', color.hex);
            }
            
         }
            //console.log(color);
            this.setState({
                color: color.rgb,
            });
           
            console.log(this.state);
          };
          // handleChangeComplete = (color) => {
          
          // };

          selectChange = (event)=>{
            this.setState({ selectedComponent: event.target.value });
            //console.log(this.state);
          };
          radioButtonChange = (event)=>{
            this.setState({ selectedButtonComponent: event.target.value });
            //console.log(this.state);
          };

          saveColorTheme(){
            const colorTheme = {
              pageTheme:{
                backgroundColor:this.state.backgroundColor,
                textColor:this.state.textColor,
                navigationBackgroundColor:this.state.navList,
                navigationIconsColor:this.state.iconsColor,
              },
             
              buttonsTheme:{
                backgroundColor:this.state.buttonsBackgroundColor,
                textColor:this.state.buttonsTextColor,
                hoverColor:this.state.buttonsHoverColor
              }
            }
            // console.log(JSON.stringify(colorTheme));
            //console.log(colorTheme);
            localStorage.setItem('theme',JSON.stringify(colorTheme));
            const parsedThemeObj = localStorage.getItem('theme');
            console.log( JSON.parse(parsedThemeObj));

          }
      render() {
        const buttonsStyleMenu = this.state.selectedComponent==="buttonsStyle"?
        <div>
         
    <div className="buttonsContainer">
    <div className="control-group">
    <h1>Button elements</h1>
    <label className="control control--radio">Background Color
      <input type="radio" name="radio" onChange={this.radioButtonChange} value="backgroundColor" defaultChecked="checked"/>
      <div className="control__indicator"></div>
    </label>
    <label className="control control--radio">Text Color
      <input type="radio" name="radio" onChange={this.radioButtonChange} value="textColor"/>
      <div className="control__indicator"></div>
    </label>
    <label className="control control--radio">Hover Color
      <input type="radio" name="radio" onChange={this.radioButtonChange} value="hoverColor"/>
      <div className="control__indicator"></div>
    </label>
  </div>
  </div>
        </div>
        :
        <></>
        ;
        return (
            <div className="p-3">
                 <select className="form-select" onChange={this.selectChange} value={this.state.selectedComponent}>
                    <option value="background">Background color</option>
                    <option value="textColor">Text color</option>
                    <option value="navList">Navigation menu color</option>
                    <option value="iconsColor">Menu Icons color</option>
                    <option value="buttonsStyle">Buttons style</option>
                </select>

            <div className='d-flex justify-content-end mt-2'>
            <button className='btn btn-primary' onClick={this.saveColorTheme}>Save</button>
            </div>
                <div className="flex-container">
                    <div className="first">
                    <ChromePicker 
                            width = "300px"
                            color={ this.state.color }                
                            onChange={ this.handleChange }
                            //onChangeComplete={this.handleChange}
                            //disableAlpha={true}

                        />
                                        {buttonsStyleMenu}

                    </div>
                    <div className="second">
                    {/* <div style={{backgroundColor:`rgba(${this.state.backgroundColor.r},${this.state.backgroundColor.g},${this.state.backgroundColor.b},${this.state.backgroundColor.a})`}}>
                        <div style={{color:`rgba(${this.state.textColor.r},${this.state.textColor.g},${this.state.textColor.b},${this.state.textColor.a})`}}>Some text</div>
                    </div> */}
                    
                    <div className="mainExample"
                    //onClick={()=>{this.setState({selectedComponent:"background"},()=>console.log(this.state.selectedComponent))}} 
                // style={{backgroundColor:`rgba(${this.state.backgroundColor.r},${this.state.backgroundColor.g},${this.state.backgroundColor.b},${this.state.backgroundColor.a})`,
                // color:`rgba(${this.state.textColor.r},${this.state.textColor.g},${this.state.textColor.b},${this.state.textColor.a})`}}>
                >
                <div className="topExample">
                <div className="ImgExample">
                 <img className="myImgExample" src="https://i.ibb.co/tbSR7Ch/hero.png" alt="hero" border="0"/>
                </div>
                <div className="infoExample">
                    <h1 onClick={()=>{this.setState({selectedComponent:"textColor"},()=>console.log(this.state.selectedComponent))}}>Personal Details</h1>
                    {/* <p onClick={()=>{this.setState({selectedComponent:"textColor"},()=>console.log(this.state.selectedComponent))}}> */}
                      <p>
                        <strong>Name: </strong>Some name
                        <br/>
                        <strong>Date of birth: </strong>25.08.2000
                        <br/>
                        <strong>Work: </strong>Technicien Superieur En Electricite Industriel
                        <br/>
                    </p>
                </div>
                </div>
                <div >
                <div >
                    <h1>Talent & Skills</h1>
                    <div className="containerExample">
                        <div className="skillExample" >
                            <i className="fa-solid fa-video video"></i>
                            <p>Montage video</p>
                        </div>
                        <div className="skillExample">
                            <p>Languages</p>
                        </div>
                    </div>
                </div>
                <div className="leftExample">
                    <h1>About</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quas! Dicta, officia libero cumque vitae eum, corporis sed accusamus ullam non quas ipsam porro odit assumenda consectetur natus tenetur. Maiores modi aut labore accusantium aspernatur! Nostrum expedita tempore similique laboriosam blanditiis temporibus, possimus vero. Voluptates pariatur numquam non, doloremque distinctio delectus hic, deserunt veniam sit, suscipit alias aut culpa repudiandae quisquam quas consequatur blanditiis. Molestias porro odit commodi, consectetur reprehenderit tempore eaque officia autem rerum, eum et ipsum voluptate illum dicta reiciendis soluta dolor perspiciatis modi qui. Aspernatur asperiores nam ullam, illo, facere, perferendis optio tempore repudiandae repellat quam nesciunt?
                    </p>
                    <h1>Education</h1>
                    <strong>BS Computer Science</strong>
                    <p>University of OEB</p>
                    <strong>BS Managment</strong>
                    <p>University of OEB</p>
                </div>
                </div>
                </div>
 <div className="navbody">

<nav className="myNav myMain-menu">
  <a className="mylogo" href="/">
    <img src={logo} style={{width:"100%"}} alt="..."></img>
  </a>
<div className="myScrollbar" id="style-1">

  <ul id="ulMenuSelection"
  //  onClick={()=>{this.setState({selectedComponent:"navList"},()=>console.log(this.state.selectedComponent))}}
  //  style={{backgroundColor:`rgba(${this.state.navList.r},${this.state.navList.g},${this.state.navList.b},${this.state.navList.a})`}}
  >

    <li>
      <a >
        <i className="fa fa-home fa-lg"></i>
        <span className="myNav-text">Home</span>
      </a>
    </li>

    <li>
      <a >
        <i className="fa fa-user fa-lg"></i>
        <span className="myNav-text">Login</span>
      </a>
    </li>

    <li>
      <a >
        <i className="fa fa-envelope-o fa-lg"></i>
        <span className="myNav-text">Contact</span>
      </a>
    </li>

   

    <li className="myDarkerlishadow">
      <a >
        <i className="fa fa-clock-o fa-lg"></i>
        <span className="myNav-text">News</span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-desktop fa-lg"></i>
        <span className="myNav-text">Technology</span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-plane fa-lg"></i>
        <span className="myNav-text">Travel</span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-shopping-cart"></i>
        <span className="myNav-text">Shopping</span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-microphone fa-lg"></i>
        <span className="myNav-text">Film & Music</span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-flask fa-lg"></i>
        <span className="myNav-text">Web Tools</span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-picture-o fa-lg"></i>
        <span className="myNav-text">Art & Design</span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-align-left fa-lg"></i>
        <span className="myNav-text">Magazines
        </span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-gamepad fa-lg"></i>
        <span className="myNav-text">Games</span>
      </a>
    </li>

    <li className="myDarkerli">
      <a >
        <i className="fa fa-glass fa-lg"></i>
        <span className="myNav-text">Life & Style
        </span>
      </a>
    </li>

    <li className="myDarkerlishadowdown">
      <a >
        <i className="fa fa-rocket fa-lg"></i>
        <span className="myNav-text">Fun</span>
      </a>
    </li>


  <li>

    <a >
      <i className="fa fa-question-circle fa-lg"></i>
      <span className="myNav-text">Help</span>
    </a>
  </li>

  <ul className="myLogout">
    <li>
      <a >
        <i className="fa fa-lightbulb-o fa-lg"></i>
        <span className="myNav-text">
          BLOG
        </span>

      </a>
    </li>
  </ul>
  </ul>
  </div>
</nav> 
</div>


              </div>
            </div>
        </div>
        );
      }
}
export default ColorPicker;

// var ulMenuSelection = document.getElementById('ulMenuSelection');
// console.log(ulMenuSelection);
// ulMenuSelection.addEventListener("mouseover",()=>{
//   console.log("here");
// });