import React from 'react';
import '../FaceRecognition/FaceRecognition.css';


const Data = ({ dataP }) => {
    const desciptionList = dataP.map((desc, index) => {
    index += 100;
    if(index === 119){
        return <li key={index}>{desc.name}.</li>
    }
        return <li key={index}>{desc.name},</li>
    })
    return (
        <div>
            <ul className='three-things-list'>
                {desciptionList}
            </ul>
        </div>
);
   
}

export default Data;