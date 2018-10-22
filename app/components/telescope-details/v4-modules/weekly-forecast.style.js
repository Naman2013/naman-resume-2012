import css from 'styled-jsx/css';
import { hawkesBlue } from 'styles/variables/colors_tiles_v4';

export default css`
  .carousel-container {
    position: relative;
  }

  .week-carousel {
    width: 100%;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .day-forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .forecast-coin {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .actions-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 50px;
    width: 100%;
    padding: 0 10px;
  }

  .forecast-action {
    background: none;
    border: none;
    cursor: pointer;
  }

  .forecast-action:focus { outline: none; }

  .active-weather-condition-summary {
    padding: 40px;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .active-weather-title {

  }
`;
