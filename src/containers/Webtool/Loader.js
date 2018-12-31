import React from 'react';
import Loader from 'react-loader';

const LoaderComponent = props => {
    var options = {
        lines: 13,
        length: 20,
        width: 10,
        radius: 30,
        scale: 0.5,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        top: '50vh',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
    };

    return <Loader loaded={false} options={options} className='spinner' />;
};

export default LoaderComponent;
