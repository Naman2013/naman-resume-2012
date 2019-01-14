import css from 'styled-jsx/css';
import {
  romance,
  golden_yellow,
  nightfall,
  dukeBlue,
} from '../../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../../styles/variables/fonts';
import { screenMedium } from '../../../styles/variables/breakpoints';

export default css`
  .root {
    position: relative;
    height: 92px;
    width: 100%;
    background-color: ${nightfall};
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    padding-left: 40px;
  }

  .header-icon-container {
    display: none;
  }

  .header-icon {
    display: block;
    width: 40px;
    height: 40px;
    position: absolute;
    right: 26px;
    top: 26px;
    background-color: ${nightfall};
    mask-repeat: no-repeat;
    mask-size: contain;
  }

  .header-title {
    display: flex;
    flex: 1;
    align-items: center;
    color: ${romance};
    font-family: ${primaryFont};
    font-size: 18px;
  }

  @media ${screenMedium} {
    .header-icon-container {
      display: block;
      width: 92px;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-left: 1px solid ${dukeBlue};
    }
  }
`;
