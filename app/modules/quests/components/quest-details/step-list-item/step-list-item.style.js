import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  primaryFont,
  secondaryFont,
} from '../../../../../styles/variables/fonts';
import {
  astronaut,
  shadows,
  romance,
} from '../../../../../styles/variables/colors_tiles_v4';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from '../../../../../styles/variables/breakpoints';

export default css`
  .root {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 15px 15px;
    background-color: ${romance};
    ${faintShadow}
  }

  .root.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .root.hidden {
    display: none;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 25px;
    font-family: ${secondaryFont};
    font-weight: normal;
    font-size: 18px;
    text-transform: capitalize;
    color: ${astronaut};
    border-bottom: 1px solid ${shadows};
  }

  .action-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
    padding-right: 0;
    margin: 0;
    font-family: ${primaryFont};
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 10px;
    color: ${astronaut};
    height: 50px;
  }

  .action-left {
    flex: 3;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .action-right {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
  }

  .justify-flex-end {
    justify-content: flex-end;
  }

  .action-message {
    margin-right: 5px;
    display: none;
  }

  .check-icon {
    height: 40px;
    width: 40px;
    display: none;
  }

  .check {
    display: block;
  }

  .arrow-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-left: 1px solid ${shadows};
  }

  .arrow-container > img {
    margin-bottom: 4px;
  }

  @media ${screenMedium} {
    .root {
      padding: 25px;
      margin: 15px 0;
    }

    .title {
      padding: 15px 0;
    }

    .action-container {
      height: auto;
      padding: 15px 0;
    }

    .arrow-container {
      display: block;
      height: auto;
      width: auto;
      border: 0;
    }

    .action-message {
      display: block;
    }

    .check-icon {
      display: block;
    }

    .check {
      display: none;
    }
  }
`;
