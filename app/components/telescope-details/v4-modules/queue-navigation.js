import React from 'react';
import PropTypes from 'prop-types';
import style from './queue-navigation.style';

const QueueNavigation = ({ handlePrevClick, handleNextClick, title }) => (
  <div>
    <h5 className="current-label">Mon. Jan 06</h5>
    <ul className="action-list">
      <li>
        <button
          className="action"
          onClick={handlePrevClick}
        >
          PREV
        </button>
      </li>

      <li>
        <button
          className="action"
          onClick={handlePrevClick}
        >
          NEXT
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
