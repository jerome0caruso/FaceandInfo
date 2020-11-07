import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInChange, onButtonSub, clearField}) => {
    return (
        <div>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form center'>
                    <input className='main-in f4 pa2 w-70 center' type='tex' onChange={onInChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSub}>Detect</button>
                    <button onClick={clearField} className='f4 white bg-light-purple'>Clear</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;