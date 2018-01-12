import React from 'react';
import PropTypes from 'prop-types';
import { gray } from '../../../styles/variables/colors';

const NoUpcomingMissions = ({ message }) => (
  <div>
    <h4 className="title">{ message }</h4>
    <style jsx>{`
      .title {
        margin: 0;
        text-align: center;
        padding: 50px;
        text-transform: none;
        color: ${gray};
      }
    `}</style>
  </div>
);

NoUpcomingMissions.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoUpcomingMissions;
