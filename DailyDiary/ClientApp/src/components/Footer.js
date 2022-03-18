import React from "react"
import '../styles/Footer.css'
import $ from 'jquery'

function Footer(){

    function onMouseEnterHendler(){
        // add extra elements to buttons for hover, keeps html cleaner
        $(".btn").prepend(
            '<div class="hover"><span></span><span></span><span></span><span></span><span></span></div>'
        );

        $(".social-btn").prepend(
            '<div class="hover"><span></span><span></span><span></span><span></span></div>'
        );
    }
    return(
        <>

            <div className="footer__container">
                {/* <div>
                    <a href="#" className="btn red">Red</a>
                    <a href="#" className="btn green">Green</a>
                    <a href="#" className="btn blue">Blue</a>
                </div> */}

                <div className="social-buttons">
                    <a href="#" onMouseEnter={onMouseEnterHendler} class="social-btn entypo-tumblr" target="_blank"><div class="sr">Tumblr - opens in new tab</div></a>

                        <a href="#" id="social-btn" className="social-btn entypo-twitter" target="_blank"><div className="sr">Twitter - opens in new tab</div></a>

                        <a href="#" className="social-btn entypo-facebook" target="_blank"><div className="sr">Facebook - opens in new tab</div></a>

                        <a href="#" className="social-btn entypo-instagrem" target="_blank"><div className="sr">Instagram - opens in new tab</div></a>
                </div>

            </div>
        </>
    )
}

export default Footer