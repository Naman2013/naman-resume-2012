import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

const propTypes = {
  missionData: PropTypes.arrayOf(PropTypes.string),
  showMissionData: PropTypes.bool,
};

const defaultProps = {
  missionData: [],
  showMissionData: false,
};

const ObjectMetaInformation = ({ missionData, showMissionData }) => (
  <div className="root">
    <ul className="list">
      {
        showMissionData && missionData
          .map(content => <li key={uniqueId()} dangerouslySetInnerHTML={{ __html: content }} />)
      }
    </ul>

    <style jsx>{`
      .root {
        min-width: 30%;
      }

      .list {
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-size: 12px;
      }
    `}</style>
  </div>
);

ObjectMetaInformation.propTypes = propTypes;
ObjectMetaInformation.defaultProps = defaultProps;

export default ObjectMetaInformation;
