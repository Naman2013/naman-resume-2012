import React from 'react';
import { white, darkGray } from '../../styles/variables/colors';

const Button = ({ children }) => (
  <div className="root">
    <button className="action">
      { children }
    </button>

    <style jsx>{`
      .root {
        display: inline-block;
      }

      .action {
        border: none;
        cursor: pointer;
        color: ${white};
        border-right: 1px solid ${darkGray};
        text-align: center;
        background: none;
        width: 60px;
        height: 60px;

        transition-property: color background;
        transition-duration: 0.15s;
        transition-timing-function: ease-in-out;
      }

      .action:hover {
        color: ${darkGray};
        background: ${white};
      }

      .action:focus {
        outline: none;
      }
    `}</style>
  </div>
);

export default Button;
