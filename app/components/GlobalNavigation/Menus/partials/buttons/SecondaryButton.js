import React from 'react';
import { Link } from 'react-router';
import { white, pink } from '../../../../../styles/variables/colors';
import { primaryFont } from '../../../../../styles/variables/fonts';

const SecondaryButton = ({ anchor, text }) => (
  <div className="secondary-button">
    <Link to={anchor} className="action">{text}</Link>
    <style jsx>{`
      .secondary-button {
        font-size: 10px;
        font-family: ${primaryFont};
        color: ${white};
        text-transform: uppercase;
      }

      .secondary-button :global(.action) {
        color: ${white};
        text-decoration: none;
        display: inline-block;
        padding: 20px 0 20px 20px;
      }

      .secondary-button :global(.action:hover) {
        color: ${pink};
      }
    `}</style>
  </div>
);

export default SecondaryButton;
