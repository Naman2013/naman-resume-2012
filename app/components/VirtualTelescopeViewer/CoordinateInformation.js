import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

const propTypes = {
  coordinateArray: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  coordinateArray: [],
};

const CoordinateInformation = ({ coordinateArray }) => (
  <div className="root">
    <ul>
      {
        coordinateArray
          .map(infoLine => <li key={uniqueId()} dangerouslySetInnerHTML={{ __html: infoLine }} />)
      }
    </ul>

    <style jsx>{`
        .root {
          font-size: 0.75em;
          text-align: right;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }
    `}</style>
  </div>
);

CoordinateInformation.propTypes = propTypes;
CoordinateInformation.defaultProps = defaultProps;

export default CoordinateInformation;
