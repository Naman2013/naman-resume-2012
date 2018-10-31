import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  astronaut,
  geyser,
} from '../../../styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from '../../../styles/variables/breakpoints';

export default css`
  .root {
    display: flex;
    flex-direction: column;
    padding: 25px;
    margin: 15px 0;
    ${faintShadow}
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: ${secondaryFont};
    font-weight: normal;
    font-size: 18px;
    text-transform: capitalize;
    color: ${astronaut};
    border-bottom: 1px solid ${geyser};
    padding-bottom: 30px;
  }

  .action-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    margin: 0;
    padding: 0;
    padding-top: 20px;
    font-family: ${primaryFont};
    font-weight: 800;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 10px;
    color: ${astronaut};
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
  }

  .action-message {
    margin-right: 5px;
  }

  .check-icon {
    height: 40px;
    width: 40px;
  }
`;
