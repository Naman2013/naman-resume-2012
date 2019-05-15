import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import {
  astronaut,
  lynch,
  romance,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';

export default css`
  .root {
    height: 340px;
    overflow-y: scroll;
    color: ${astronaut};
  }

  .multi-select-label {
    cursor: pointer;
    display: block;
    margin-bottom: 2px;
    padding: 5px 0 5px 20px;
    font-size: 16px;
    border-radius: 0;
    color: ${astronaut};
  }

  .multi-select-label.active,
  .multi-select-label:hover {
    color: ${romance};
    background-color: ${astronaut};
  }
`;
