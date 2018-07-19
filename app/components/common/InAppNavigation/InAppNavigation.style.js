import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { astronaut, dukeBlue } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';

export default css`
  .mobile-back-text-container {
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

  .core-navigation-container {
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #253446;
    padding: 0;
    font-family: ${secondaryFont};
    color: white;
  }

  .back-arrow { display: none; }

  .title {
    padding: 0;
    margin: 0;
    padding-left: 40px;
    font-weight: 100;
    text-transform: capitalize;
    font-size: 16px;
  }

  .back-arrow {
    background: none;
    height: 100%;
    width: 100px;
    height: 100px;
    border: none;
    border-right: 1px solid ${dukeBlue};
    cursor: pointer;
  }

  @media ${screenMedium} {
    .mobile-back-text-container { display: none; }
    .back-arrow { display: block; }
  }
`;
