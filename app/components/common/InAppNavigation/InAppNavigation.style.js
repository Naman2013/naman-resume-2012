import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';

export default css`
  .back-text-container {
    padding: 20px 25px;
    display: flex;
    align-items: center;
  }

  .icon-arrow {
    transform: rotate(180deg);
  }

  .back-text {
    padding: 0;
    margin: 0;
    letter-spacing: 1.25px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    background-color: white;
    padding-left: 12px;
    font-size: 12px;
    font-weight: 800;
    color: ${astronaut};
  }

  .title {
    padding: 40px;
    margin: 0;
    font-family: ${secondaryFont};
    background-color: #253446;
    color: white;
    font-weight: 100;
    text-transform: capitalize;
    font-size: 16px;
  }
`;
