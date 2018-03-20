import React from 'react';
import { white, pink } from '../../../../../styles/variables/colors';
import { primaryFont } from '../../../../../styles/variables/fonts';

const SecondaryButton = ({ anchor, text }) => (
  <div className="secondary-button">
    <a className="action" href={anchor}>{text}</a>
    <style jsx>{`
      .secondary-button {
        font-size: 10px;
        font-family: ${primaryFont};
        color: ${white};
        text-transform: uppercase;
      }

      .action {
        color: ${white};
        text-decoration: none;
        display: inline-block;
        padding: 20px 0 20px 20px;
      }

      .action:hover {
        color: ${pink};
      }
    `}</style>
  </div>
);

export default SecondaryButton;
