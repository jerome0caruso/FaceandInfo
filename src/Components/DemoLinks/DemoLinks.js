import React, {useState} from 'react';
import './DemoLinks.css';



const DemoLinks = () => {
    let [phrase1, setPhrase1] = useState('Click Button to Copy ->')
    let [phrase2, setPhrase2] = useState('Click Button to Copy ->')
    let [phrase3, setPhrase3] = useState('Click Button to Copy ->')

    const link1 = "https://www.outsideonline.com/sites/default/files/styles/full-page/public/2019/03/21/hoka-kaha-hikingcities_h.jpg?itok=c12RwD_0";
    const link2 = "https://previews.123rf.com/images/pressmaster/pressmaster1510/pressmaster151000205/46147122-group-of-ecstatic-friends-with-cocktails-looking-at-camera-at-party.jpg";
    const link3 = "https://www.rubiconcentre.ie/wp-content/uploads/2018/12/der.jpg";

    const handleCopy = (event) => {
        
        if(event.target.id === '1'){
            navigator.clipboard.writeText(link1);
            setPhrase1('Copied!');
        }
        if(event.target.id === '2'){
            navigator.clipboard.writeText(link2);
            setPhrase2('Copied!');
        }
        if(event.target.id === '3'){
            navigator.clipboard.writeText(link3);
            setPhrase3('Copied!');
        }
    }
    
    return(
        <div id="demo-links" className="demo-container">
            <div className="demo-innerContainer">
                <label className="demo-label">Demo Hiking Image</label>
                <input className='1' type="Text" value={phrase1}></input>
                <button id='1' onClick={handleCopy}>copy</button>
            </div>
            
            <div className="demo-innerContainer">
                <label className="demo-label">Demo Party Image</label>
                <input className='2' type="Text" value={phrase2}></input>
                <button id='2' onClick={handleCopy}>copy</button>
            </div>

            <div className="demo-innerContainer">
                <label className="demo-label">Demo Party Image 2</label>
                <input className='3' type="Text" value={phrase3}></input>
                <button id='3' onClick={handleCopy}>copy</button>
            </div>
        </div>
    );
}

export default DemoLinks;