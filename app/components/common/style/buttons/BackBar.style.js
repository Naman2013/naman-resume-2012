import css from 'styled-jsx/css';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

export default css`
  .top-bar {
    font-family: ${primaryFont};
    background-color: ${astronaut};
    color: ${romance};
    font-weight: bold;
    font-size: 11px;
    text-transform: uppercase;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    width: 100%;
  }

  .back {
    margin-left: 10px;
  }
`;
