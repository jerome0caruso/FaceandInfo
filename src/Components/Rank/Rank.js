import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='f2 currentText'>
               {`${name.charAt(0).toUpperCase()}${name.slice(1)}, you have submitted ${entries} images.`}
            </div>
        </div>
    );
}

export default Rank;