import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'Welcome! This web app will detect human faces in your pictures! Paste an image URL (not a website link) in the text box below and hit detect!'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input type='tex' className='f4 pa2 w-70 center' onChange = {onInputChange}/>
                    <button id = "detect" className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick = {onButtonSubmit}> Detect </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;