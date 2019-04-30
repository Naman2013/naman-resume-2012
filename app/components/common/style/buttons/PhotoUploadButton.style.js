import css from 'styled-jsx/css';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

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

  input[type='file'] {
    display: none;
  }

  .button-text {
    margin: 0 5px;
    display: flex;
    align-items: center;
  }

  .button-input-container {
    position: relative;
  }

  .button-inner-container {
    display: flex;
    margin: auto;
    justify-content: space-between;
  }

  label {
    border: 1px dashed;
    font-size: 11px;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
  }

  .text {
    vertical-align: middle;
  }

  .fa-image {
    font-size: 13px;
  }
  .button-container {
    font-family: ${primaryFont};
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border: 1px dashed ${astronaut};
    background-color: transparent;
    border-radius: 100px;
    width: 110px;
    margin: 15px 0;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    width: 120px;
    height: 40px;
  }
`;
