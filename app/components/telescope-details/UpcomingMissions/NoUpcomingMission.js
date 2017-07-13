import React from 'react';
import { gray } from '../../../styles/variables/colors';

const NoUpcomingMissions = () => (
  <div>
    <h4 className="title">No missions scheduled</h4>
    <style jsx>{`
      .title {
        margin: 0;
        padding: 15px 0;
        text-transform: none;
        color: ${gray};
      }
    `}</style>
  </div>
);

export default NoUpcomingMissions;
