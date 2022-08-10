import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import my_logo from './sandipan_mondal_logo.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt shadow-4 br3" options={{ max: 40 }} style={{ height: 201, width: 201 }} >
                <div className="Tilt-inner pa1 "> <img  src = {my_logo} alt = "logo" /></div>
            </Tilt>
        </div>
    );
}

export default Logo;