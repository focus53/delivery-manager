import React from 'react';
import loader from '../../assets/images/loader.gif';
import './Loader.css';

const Loader = ({ isLoading = true, children = null, showChildren = false }) => {
  return (
    <>
      {isLoading && (
        <div className="loader-overlay">
          <img src={loader} alt="Loading..." />
        </div>
      )}
      {(!isLoading || showChildren) && children}
    </>
  );
};

export default Loader;
