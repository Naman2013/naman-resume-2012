import React from 'react';
import PropTypes from 'prop-types';
import { downwardFacingChevron } from 'styles/variables/iconURLs';
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
          <img alt="previous" src={downwardFacingChevron} />
        </button>
      </li>

      <li className="action-container">
        <button
          className="action"
          onClick={handleNextClick}
        >
          <img alt="next" src={downwardFacingChevron} />
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
