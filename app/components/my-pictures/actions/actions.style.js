import React from 'react';
import { borderRadius } from '../../../styles/mixins/utilities';
import { white, black, turqoise, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';

export const actionsStyles = (`

  .light .action-description {
    color: ${white};
  }

  .dark .action-description {
    color: ${black};
  }

  .action {
    transition: none !important;
    position: relative;
    ${borderRadius('50%')}
    width: 35px;
    height: 35px;
    display: inline-block;
    border: none;
    background: ${turqoise};
    color: ${white};
    margin-right: 5px;
  }

  .action:hover {
    background: ${lightTurqoise};
    color: ${darkBlueGray};
  }

  .action:focus {
    outline: none;
  }

  .action .action-description {
    position: absolute;
    text-align: center;
    visibility: hidden;
  }

  .action:hover .action-description {
    visibility: visible;
    margin-top: 8px;
    margin-left: -75%;
    width: 100px;
  }
  `);
