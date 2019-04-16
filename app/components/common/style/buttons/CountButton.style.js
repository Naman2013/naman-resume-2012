import css from 'styled-jsx/css';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

export default css`
  button {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.25s ease-in-out;
  }

  button:focus {
    outline: none;
  }
  .text {
    vertical-align: middle;
    font-size: 13px;
    margin: 0 5px;
  }
  .button-container {
    font-family: ${primaryFont};
    display: block;
    border: 1px dashed ${astronaut};
    background-color: transparent;
    border-radius: 100px;
    width: 110px;
    margin: 15px 0;
    font-size: 11px;
    font-weight: bold;
    padding: 5px 0;
    text-transform: uppercase;
    width: 50px;
    height: 40px;
  }
  
  .button-container.no-border {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active.button-container {
    background-color: ${astronaut};
  }
  .active .button-icon,
  .active .text {
    color: ${romance};
  }


`;
