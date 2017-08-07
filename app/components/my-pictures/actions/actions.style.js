import React from 'react';
import { borderRadius } from '../../../styles/mixins/utilities';
import { white, turqoise, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';

export const actionsStyles = (`
  .action {
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
  `);
