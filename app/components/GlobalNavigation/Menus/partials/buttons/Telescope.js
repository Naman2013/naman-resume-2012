import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router';
import { darkGray, brightGreen } from 'styles/variables/colors';

const propTypes = {
  text: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  logoURL: PropTypes.string.isRequired,
};

const Telescope = ({
  text, anchor, isOnline, logoURL,
}) => (
  <div>
    <div className={classnames('online-status', {
      'is-online': isOnline,
    })}
    >
      <span className="fa fa-circle" />
    </div>

    <div
      style={{
        backgroundImage: `url(${logoURL}) no-repeat`,
        backgroundSize: 'cover',
      }}
      className="telescope-image"
    />

    <div className="telescope-link">
      <Link to={anchor}>{text}</Link>
    </div>

    <style jsx>{`
      .online-status {
        color: ${darkGray};
      }

      .online-status.is-online {
        color: ${brightGreen};
      }

      .telescope-image {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    `}
    </style>
  </div>
);

Telescope.propTypes = propTypes;

export default Telescope;
