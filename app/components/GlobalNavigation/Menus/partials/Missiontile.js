import React from 'react';
import PropTypes from 'prop-types';
import { white, darkGray } from 'styles/variables/colors';
import { primaryFont } from 'styles/variables/fonts';

const propTypes = {
  mainTitle: PropTypes.string.isRequired,
  objectTitle: PropTypes.string.isRequired,
  objectSubTitle: PropTypes.string,
  anchorText: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
  occurred: PropTypes.string.isRequired,
};

const defaultProps = {
  objectSubTitle: '',
};

const MissionTile = ({
  mainTitle,
  objectTitle,
  objectSubTitle,
  anchorText,
  anchor,
  occurred,
}) => (
  <div className="root">
    <h3>{mainTitle}</h3>
    <div className="mission-name">
      <h4>{objectTitle}</h4>
      {
        objectSubTitle &&
          <h5>{objectSubTitle}</h5>
      }
    </div>

    <div className="call-to-action">
      <a href={anchor}>{anchorText}</a>
      <hr />
      <p>{occurred}</p>
    </div>

    <style jsx>{`
      .root {
        background: ${white};
        padding: 15px;
        color: ${darkGray};
        font-family: ${primaryFont};
        margin-bottom: 10px;
      }
    `}</style>
  </div>
);

MissionTile.defaultProps = defaultProps;
MissionTile.propTypes = propTypes;

export default MissionTile;
