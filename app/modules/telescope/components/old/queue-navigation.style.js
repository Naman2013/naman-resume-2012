import css from 'styled-jsx/css';
import { blue_tile_feat, astronaut, dukeBlue } from  'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';

export default css`
  .queue-root {
    display: flex;
    justify-content: space-between;
    background-color: ${astronaut};
    background-image: url(${blue_tile_feat});
    color: white;
    font-family: ${secondaryFont};
    height: 68px;
    align-items: center;
  }

  .current-label {
    font-weight: 300;
    font-size: 16px;
    padding-left: 25px;
  }

  .prev {
    transform: rotate(180deg);
  }

  .action-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    height: 100%;
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
    border: 1px solid white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
