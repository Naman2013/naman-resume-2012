import React from 'react';
import { browserHistory } from 'react-router';
import { horizontalArrowRightWhite } from 'app/styles/variables/iconURLs';
import './index.scss';

const BackButton = () => {
  return (
    <div className="back-button">
      <span
        className="back-button-btn"
        onClick={browserHistory.goBack}
        role="button"
      >
        <img
          className="back-button-img"
          src={horizontalArrowRightWhite}
          alt="back"
        />
        <span className="back-button-text">Back</span>
      </span>
    </div>
  );
};

export default BackButton;
