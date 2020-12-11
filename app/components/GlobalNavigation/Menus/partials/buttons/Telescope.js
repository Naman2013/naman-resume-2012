import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router';
import { astronaut, online } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';

const propTypes = {
  text: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  logoURL: PropTypes.string.isRequired,
};

const Telescope = ({ text, anchor, isOnline, logoURL, user }) => (
  <Link to={anchor} style={{ cursor: !user.isAuthorized ? "default": "pointer" }} onClick={(e)=> !user.isAuthorized ? e.preventDefault() : null}>
    <div className={"telescope root"}>
      <div className="telescope-link">
        <div className="action" to={anchor}>
          {text}
        </div>
        <div
          className={classnames('online-status text', {
            'is-online': isOnline,
          })}
        >
          {isOnline ? 'online' : 'offline'}
        </div>
      </div>
      <div className="image-container">
        <div
          className={classnames('online-status', {
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
    </div>

    <style jsx>
      {`     
      .root.telescope {
        font-family: ${primaryFont};
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        padding: 22px 0;
        margin: 0 auto;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(10, 12, 14, .1);
      }

      :global(.menu-list li:last-child .root.telescope) {
        border-bottom: none;
      }

      :global(.menu-list a:hover) {
        text-decoration: none;
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
  </Link>
);

Telescope.propTypes = propTypes;

export default Telescope;
