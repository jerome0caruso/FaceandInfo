import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='f2 currentText'>
               {`${name}, you have submitted ${entries} images.`}
            </div>
        </div>
    );
}

export default Rank;