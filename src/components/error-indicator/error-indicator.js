import React from 'react';
import './error-indicator.css';
import icon from './film_end.png';

const ErrorIndicator = () => {
    return (
      <div className="error-indicator">
          <img width={200} src={icon} alt="error icon" />
          <span className="thats-all">ВСЁ!</span>
          <span className="thats-all__descr">кина не будет, расходимся</span>
      </div>
    );
};
export default ErrorIndicator;