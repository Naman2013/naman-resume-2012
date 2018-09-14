import css from 'styled-jsx/css';
import { shadows, lynch, seashell } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { faintShadow } from 'styles/variables/shadows';
export default css`

  .root {
    display: flex;
    flex-direction: row;
    font-size: 13px;
    font-family: Arial, sans-serif;
    backgroundColor: ${seashell};
    ${faintShadow}
    padding: 15px;
    justify-content: space-between;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .buttons {
    display: flex;
    list-style-type: none;
    margin-left: 15px;
  }

  .action {
    color: ${lynch};
    width: auto;
    font-size: 13px;
    display: inline-block;
    margin-right: 0px;
    padding: 0 10px;
    border-right: 1px solid ${shadows};
  }

  li:last-child .action, .social {
    border-right: 0;
  }
`;
