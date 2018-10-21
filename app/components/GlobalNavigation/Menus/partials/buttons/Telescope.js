import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router';
import { astronaut, online  } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

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
    <div className="telescope-link">
      <Link className="action" to={anchor}>{text}</Link>
      <div className={classnames('online-status text', {
        'is-online': isOnline,
      })}
      >{isOnline ? 'online' : 'offline' }
      </div>
    </div>
    <div className="image-container">
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
    </div>



    <style jsx>{`
      .root {
        font-family: ${primaryFont};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        text-transform: uppercase;
      }

      .online-status {
        font-size: 10px;
        visibility: hidden;
      }

      .online-status.is-online {
        color: ${online};
        visibility: visible;
      }

      .online-status.text {
        color: ${astronaut};
        visibility: visible;
        font-weight: bold;
      }

      .online-status.text.is-online {
        visibility: visible;

      }

      .telescope-image {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        inline-block;
        margin: 0 10px;
      }

      .telescope-link :global(.action) {
        color: ${astronaut};
        text-decoration: none;
        font-size: 20px;
        font-family: ${secondaryFont};
        text-transform: none;
      }

      .telescope-link :global(.action:hover) {
        color: ${astronaut};
      }

      .image-container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `}
    </style>
  </div>
);

Telescope.propTypes = propTypes;

export default Telescope;
