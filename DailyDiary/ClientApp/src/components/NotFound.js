import '../styles/App.css'
import React from 'react';

function NotFound(){
    return(
        <div>
            <div className="w-100 h-100 d-flex flex-row justify-content-center align-items-center ">

                <div className="text__center">
                    <img src="https://mystat.itstep.org/assets/images/404.png?v=1147e01145fa136875a8acea5dcb3316" alt="..." className="img__not-found" />
                    <span className="not-found__text">Page not found</span>
                </div>
            </div>
        </div>
    )
}

export default NotFound