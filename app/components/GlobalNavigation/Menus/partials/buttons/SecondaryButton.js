import React from 'react';
import { Link } from 'react-router';
import { astronaut, golda } from '../../../../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../../../../styles/variables/fonts';

const SecondaryButton = ({ anchor, text }) => (
  <div className="secondary-button">
    <Link className="action" to={anchor}>{text}</Link>
    <style jsx>{`
      .secondary-button {
        font-size: 10px;
        font-family: ${primaryFont};
        color: ${astronaut};
        text-transform: uppercase;
      }

      .secondary-button :global(.action) {
        color: ${astronaut};
        text-decoration: none;
        display: inline-block;
        padding: 20px 0 20px 20px;
      }

      .secondary-button :global(.action:hover) {
        color: ${golda};
      }
    `}
    </style>
  </div>
);

export default SecondaryButton;
