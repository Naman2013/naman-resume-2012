import React from 'react';
import { Link } from 'react-router';
import { astronaut, golda } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

const PrimaryButton = ({ text, anchor }) => (
  <div className="primary-button">
    <span className="fa fa-circle" />
    <Link className="action" to={anchor}>{text}</Link>
    <style jsx>{`
      .primary-button {
        font-family: ${primaryFont};
        color: ${astronaut};
        text-transform: uppercase;
        font-size: 13px;
      }

      .fa {
        font-size: 10px;
      }

      .primary-button :global(.action) {
        color: ${astronaut};
        text-decoration: none;
        display: inline-block;
        padding: 20px 0 20px 20px;
      }

      .primary-button :global(.action:hover) {
        color: ${golda};
      }
    `}
    </style>
  </div>
);

export default PrimaryButton;
