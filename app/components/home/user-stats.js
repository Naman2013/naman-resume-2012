import React from 'react';
import PropTypes from 'prop-types';
import UserStat from './user-stat';
const { shape, bool, string } = PropTypes;
const UserStats = ({
  enhancedUserStats,
}) => (
  <div className="stats">
    {Object.keys(enhancedUserStats).map(statLabel => (<UserStat
      {...enhancedUserStats[statLabel]}
      key={statLabel}
    />))}
    <style jsx>{`
      .stats {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin-top: auto;
        text-align: center;
      }
    `}</style>
  </div>
);

UserStats.propTypes = {
  enhancedUserStats: shape({
    Reservations: shape({
      hasTooltip: bool,
      title: string,
      tooltipText: string,
      value: string,
    }),
    Gravity: shape({
      hasTooltip: bool,
      title: string,
      tooltipText: string,
      value: string,
    }),
    Pictures: shape({
      hasTooltip: bool,
      title: string,
      tooltipText: string,
      value: string,
    }),
  }).isRequired,
};

export default UserStats;
