import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router';
import { darkGray, brightGreen, white, pink } from 'styles/variables/colors';
import { primaryFont } from 'styles/variables/fonts';

const propTypes = {
  text: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  logoURL: PropTypes.string.isRequired,
};

const Telescope = ({
  text, anchor, isOnline, logoURL,
}) => (
  <div className="root">
    <div className={classnames('online-status', {
      'is-online': isOnline,
    })}
    >
      <span className="fa fa-circle" />
    </div>

    <div
      style={{
        background: `url(${logoURL}) no-repeat`,
        backgroundSize: 'cover',
      }}
      className="telescope-image"
    />

    <div className="telescope-link">
      <Link className="action" to={anchor}>{text}</Link>
    </div>

    <style jsx>{`
      .root {
        font-family: ${primaryFont};
        text-transform: uppercase;
        display: flex;
        align-items: center;
        padding: 15px 0;
        padding-left: 20px;
      }

      .online-status {
        font-size: 10px;
        color: ${darkGray};
      }

      .online-status.is-online {
        color: ${brightGreen};
      }

      .telescope-image {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        inline-block;
        margin: 0 10px;
      }

      .telescope-link :global(.action) {
        color: ${white};
        text-decoration: none;
        font-size: 14px;
      }

      .telescope-link :global(.action:hover) {
        color: ${pink};
      }
    `}
    </style>
  </div>
);

Telescope.propTypes = propTypes;

export default Telescope;
