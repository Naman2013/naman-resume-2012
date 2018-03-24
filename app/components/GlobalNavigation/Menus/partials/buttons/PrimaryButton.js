import React from 'react';
import { white, pink } from 'styles/variables/colors';
import { primaryFont } from 'styles/variables/fonts';

const PrimaryButton = ({ text, anchor }) => (
  <div className="primary-button">
    <span className="fa fa-circle" />
    <a className="action" href={anchor}>{text}</a>
    <style jsx>{`
      .primary-button {
        font-family: ${primaryFont};
        color: ${white};
        text-transform: uppercase;
        font-size: 13px;
      }

      .fa {
        font-size: 10px;
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

export default PrimaryButton;
