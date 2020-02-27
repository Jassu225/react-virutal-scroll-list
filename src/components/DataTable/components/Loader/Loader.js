import React from 'react';
import loader from '../../../../assets/images/loader.gif';
import './Loader.css';

function Loader() {
    return (
        <div className="data-loader">
            <img src={loader} alt="loading..." className="loader-image" />
        </div>
    );
};

export default Loader;