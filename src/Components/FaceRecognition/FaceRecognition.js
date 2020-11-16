import React, {useState} from 'react';
import './FaceRecognition.css';
import Data from '../Data/Data';

const FaceRecognition = ({ imageUrl, data, boxInfo, numOfPeople, clear, error}) => {

    //checks to make sure the boxes exists before clearing
    let [flag, setFlag] = useState();

    const handleImage = () => {
        
        let container = document.querySelector('.bounding-container');
       
        //creates the box dimensions
       return boxInfo.map(box => {
            let eachBox = box.region_info.bounding_box;   
            let image = document.getElementById('inputimage');
            let w = Number(image.width);
            let h = Number(image.height);
            let leftCol = eachBox.left_col * w;
            let topRow = eachBox.top_row * h;
            let rightCol = w - (eachBox.right_col * w);
            let bottomRow = h - (eachBox.bottom_row * h);
        
            //setting the face boxes on click
            if (clear === false){
                setFlag(1);
                let newDiv = document.createElement("div");
                newDiv.className = 'bounding-box style';
                newDiv.setAttribute("style", `top: ${topRow}px; right: ${rightCol}px; bottom: ${bottomRow}px; left: ${leftCol}px;`)
                container.appendChild(newDiv);
            } 
        })
    }
    //clear the face boxes
    if(clear === true && flag === 1) {
        setFlag(0);
        let divsToRemove = document.querySelectorAll('.bounding-box');
        divsToRemove.forEach(div => div.remove())
      }
            return (
                <div className ='fr-container center ma'>
                    <div className='fr-image'>
                        <img id='inputimage' width='500px' heigh='auto' src={imageUrl}  alt="face"/>
                        <div className="bounding-container">
                            
                        </div>
                        
                    </div>
                    <div className='fr-data'>
                        <h2>Picture Info</h2>
                        <button class="capture-btn" disabled={error.length > 1} onClick={handleImage}>Click to capture face</button>
                        <table class="table">
                            <tr>
                                <th><h3>There are approximately {numOfPeople > 1 ? `${numOfPeople} faces` :`${numOfPeople} face` }  in the picture.</h3></th>
                            </tr>
                            <tr>
                                <th><h3>This photo seems to be about:</h3>
                                <ul className='three-things-list'>
                                    <Data dataP={data}/>
                                </ul></th>
                            </tr>
                            
                        </table>
                        
                    </div>
                    
                </div>
            );
        
}

export default FaceRecognition;