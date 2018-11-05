import css from 'styled-jsx/css';
import { astronaut, hawkesBlue } from 'styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';

export default css`
  .large-format-nav-root {
    -webkit-box-shadow: 0px 5px 35px -11px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 35px -11px rgba(0,0,0,0.57);
    box-shadow: 0px 5px 35px -11px rgba(0,0,0,0.57);
    display: flex;
    justify-content: center;
  }

  .option-list {
    padding: 0;
    margin: 0;
    display: flex;
    list-style-type: none;
  }

  .option-container {
    display: flex;
    align-items: center;
    background: white;
    border-left: 1px solid ${hawkesBlue};
  }

  .option-container.active {
    -webkit-box-shadow: 0px -4px 15px 0px rgba(0,0,0,0.14);
    -moz-box-shadow: 0px -4px 15px 0px rgba(0,0,0,0.14);
    box-shadow: 0px -4px 15px 0px rgba(0,0,0,0.14);
    border-bottom: 5px solid ${astronaut};
  }

  .option-container:last-child {
    border-right: 1px solid ${hawkesBlue};
  }

  .coin {
    background-color: ${astronaut};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .option {
    padding: 30px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .option:focus { outline: none; }
`;
