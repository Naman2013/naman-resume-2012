import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import {
  astronaut,
  shadows,
  lynch
} from 'app/styles/variables/colors_tiles_v4';

import { screenMedium } from 'app/styles/variables/breakpoints';


export default css`

  .select-container {
    display: block;
    width: 100%;
    padding-bottom: 15px;
  }
  .title-text {
    display: block;
    font-size: 10px;
    font-weight: bold;
    color: ${astronaut};
    text-transform: uppercase;
    padding: 15px 0;
    border-bottom: 1px solid ${shadows};
  }

  @media ${screenMedium} {
    .select-container {
      display: inline-block;
      width: 50%;
    }
  }

`;
