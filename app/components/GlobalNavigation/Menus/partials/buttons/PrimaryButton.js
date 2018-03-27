import React from 'react';
import { Link } from 'react-router';
import { white, pink } from 'styles/variables/colors';
import { primaryFont } from 'styles/variables/fonts';

const PrimaryButton = ({ text, anchor }) => (
  <div className="primary-button">
    <span className="fa fa-circle" />
    <Link className="action" to={anchor}>{text}</Link>
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

      .primary-button :global(.action) {
        color: ${white};
        text-decoration: none;
        display: inline-block;
        padding: 20px 0 20px 20px;
      }

      .primary-button :global(.action:hover) {
        color: ${pink};
      }
    `}
    </style>
  </div>
);

export default PrimaryButton;
