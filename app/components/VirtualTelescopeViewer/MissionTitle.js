import React from 'react';
import PropTypes from 'prop-types';
import { brightGreen } from '../../styles/variables/colors';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

const MissionTitle = ({ title }) => (
  <div className="root">
    {
      title &&
        <h5 className="content">{title}</h5>
    }

    <style jsx>{`
      .root {
        text-align: center;
        border: 1px solid ${brightGreen};
        width: 40%;
        margin: 0 auto 20px auto;
        padding: 5px 10px;
      }

      .content {
        padding: 0;
        margin: 0;
      }
    `}</style>
  </div>
);

MissionTitle.propTypes = propTypes;
MissionTitle.defaultProps = defaultProps;

export default MissionTitle;
