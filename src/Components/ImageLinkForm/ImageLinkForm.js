import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInChange, onButtonSub, clearField, btnSmash}) => {

     
    return (
        <div>
            <div className='center'>
                <div className='pa4 br1 form center input-background'>
                    <input className='main-in f4 pa2 w-70 center' type='tex'  onChange={onInChange} placeholder="..." />
                    <button className='w-30 f4 link ph3 pv2 dib white main-btn' disabled={btnSmash} onClick={onButtonSub}>Detect</button>
                    <button onClick={clearField} className='f4 white main-btn'>Clear</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;