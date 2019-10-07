import css from 'styled-jsx/css';
import { screenMedium } from 'app/styles/variables/breakpoints';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  astronaut,
  romance,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';

export default css`
  .show-tile-root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: ${primaryFont};
    position: relative;
    background-color: ${romance};
    width: 300px;
    height: 300px;
    color: ${astronaut};
    padding: 25px;
    border: 1px solid ${shadows};
    border-bottom: 4px solid ${astronaut};
  }

  .show-tile-root :global(a) {
    display: block;
    height: 100%;
  }

  .title {
    margin: 0;
    margin-bottom: 10px;
    font-family: ${secondaryFont};
    font-size: 16px;
    font-weight: 400;
  }

  .sub-title {
    margin: 0;
    font-family: ${primaryFont};
    color: ${astronaut};
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 15px 0;
    border-top: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
  }

  .description {
    margin-top: 10px;
    font-family: ${secondaryFont};
    color: ${astronaut};
    font-size: 19px;
    overflow: hidden;
  }

  .actions {
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
    margin: 10px 0 0 0;
    width: 100%;
  }

  .actions button {
    margin: 0 5px;
  }
`;
