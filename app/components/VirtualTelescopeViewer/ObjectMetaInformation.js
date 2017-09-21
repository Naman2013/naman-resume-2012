import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

const propTypes = {
  missionData: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  missionData: [],
};

const ObjectMetaInformation = ({ missionData }) => (
  <div>
    <ul className="list">
      {
        missionData
          .map(content => <li key={uniqueId()} dangerouslySetInnerHTML={{ __html: content }} />)
      }
    </ul>

    <style jsx>{`
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
