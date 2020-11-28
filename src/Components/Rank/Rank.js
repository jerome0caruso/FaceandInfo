import React from 'react';
import './Rank.css';


const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='f2 currentText'>
                <div className='main-logo-name'>
                    <img className='camera-logo' src='./camera.png' alt='camera-log'/><h3 className="main-title" >Submit to Capture</h3>
                </div>
               {`${name.charAt(0).toUpperCase()}${name.slice(1)}, you have submitted ${entries} images.`}
            </div>
        </div>
    );
}

export default Rank;