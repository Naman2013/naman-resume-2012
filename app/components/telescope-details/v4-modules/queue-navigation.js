import React from 'react';
import PropTypes from 'prop-types';
import chevron from 'atoms/icons/chevron.svg';
import style from './queue-navigation.style';

const QueueNavigation = ({ handlePrevClick, handleNextClick, title }) => (
  <div className="queue-root">
    <h5 className="current-label">{title}</h5>
    <ul className="action-list">
      <li className="action-container">
        <button
          className="action"
          onClick={handlePrevClick}
        >
          <img className="prev" alt="previous" src={chevron} />
        </button>
      </li>

      <li className="action-container">
        <button
          className="action"
          onClick={handleNextClick}
        >
          <img alt="next" src={chevron} />
        </button>
      </li>
    </ul>

    <style jsx>{style}</style>
  </div>
);

QueueNavigation.propTypes = {
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
};

export { QueueNavigation };
