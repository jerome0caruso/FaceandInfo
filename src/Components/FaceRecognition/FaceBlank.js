import React, {useState} from 'react';
import './FaceRecognition.css';
import Data from '../Data/Data';
import Image from '../../../src/BlackBox.jpg'

const FaceBlank = ({ imageUrl, data, boxInfo, numOfPeople, clear, error}) => {

    //checks to make sure the boxes exists before clearing
    let [flag, setFlag] = useState();

       
    //clear the face boxes
    if(clear === true && flag === 1) {
        setFlag(0);
      }
            return (
                <div className ='fr-container center ma'>
                    <div className='fr-image'>
                        <img id='inputimage' width='500px' heigh='auto' src={Image}  alt="face"/>
                        <div className="bounding-container">
                            
                        </div>
                        
                    </div>
                    <div className='fr-data'>
                        <h2>Picture Info</h2>
                        <button className="capture-btn" >Click to capture face</button>
                        <table className="table">
                            <tbody>

                            <tr>
                                <th><h3>There are approximately 0 faces in the picture.</h3></th>
                            </tr>
                            <tr>
                                <th><h3>This photo seems to be about:</h3>
                                <ul className='three-things-list'>
                                    
                                </ul></th>
                            </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    
                </div>
            );
}

export default FaceBlank;