import css from 'styled-jsx/css';
import { primaryFont } from 'styles/variables/fonts';
import { astronaut, hawkesBlue } from 'styles/variables/colors_tiles_v4';

export default css`
  .observatory-data-list {
    padding: 0;
    list-style-type: none;
  }

  .datum {
    padding: 30px;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .datum:last-child { border-bottom: none; }

  .title {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    font-family: ${primaryFont};
    color: ${astronaut};
  }

  .time-information {
    display: flex;
    align-items: center;
  }

  .time-field {
    font-family: ${primaryFont};
    font-weight: 300;
    font-size: 34px;
    color: ${astronaut};
    margin: 0;
  }

  .time-label {
    font-family: ${primaryFont};
    transform: rotate(90deg);
    font-size: 10px;
  }

  .time-meta-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .local-time-line {
    padding: 0;
    margin: 0;
    font-family: ${primaryFont};
    font-size: 10px;
  }
`;
