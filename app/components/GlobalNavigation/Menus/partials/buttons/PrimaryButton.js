import React from 'react';
import { Link } from 'react-router';
import { astronaut, golda, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

const PrimaryButton = ({ text, anchor }) => (
  <div className="primary-button">
    <Link className="action" to={anchor}><a className="link-text">{text}</a></Link>
    <style jsx>{`
      .primary-button {
        font-family: ${primaryFont};
        color: ${astronaut};
        text-transform: uppercase;
      }

      .fa {
        font-size: 10px;
      }

      .primary-button :global(.action) {
        color: ${astronaut};
        text-decoration: none;
        display: block;
        width: 100%;
        padding: 0 20px;
      }

      .primary-button :global(.action:hover) {
        color: ${golda};
      }

      .link-text {
        display: block;
        width: 100%;
        border-bottom: 1px solid ${shadows};
        font-size: 16px;
        font-weight: bold;
        color: ${astronaut};
        text-transform: uppercase;
        font-weight: bold;
        padding: 20px;
      }

    `}
    </style>
  </div>
);

export default PrimaryButton;
