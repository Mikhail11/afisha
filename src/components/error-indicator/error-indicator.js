import React from 'react';
import './error-indicator.css';
import icon from './film_end.png';

const ErrorIndicator = () => {
    return (
      <div className="error-indicator">
          <img src={icon} alt="error icon" />
          <span className="thats-all">ВСЁ!</span>
          <span>кина не будет</span>
      </div>
    );
};
export default ErrorIndicator;