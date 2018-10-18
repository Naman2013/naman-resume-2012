import css from 'styled-jsx/css';
import { blue_tile_feat, astronaut, dukeBlue } from  'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

export default css`
  .queue-root {
    display: flex;
    justify-content: space-between;
    background-color: ${astronaut};
    background-image: url(${blue_tile_feat});
    color: white;
    font-family: ${secondaryFont};
  }

  .current-label {
    font-weight: 300;
    font-size: 16px;
    padding-left: 25px;
  }

  .action-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
  }

  .action-container {
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-left: 1px solid ${dukeBlue};
  }

  .action {
    cursor: pointer;
    background: none;
    outline: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
