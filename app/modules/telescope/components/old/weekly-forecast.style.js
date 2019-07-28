import css from 'styled-jsx/css';
import { hawkesBlue, astronaut } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';

export default css`
  .carousel-container {
    position: relative;
  }

  .week-carousel {
    width: 100%;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: top;
    padding: 0 40px;
    margin-top: 30px;
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
    background: ${astronaut};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .actions-list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    top: 50px;
    width: 100%;
    padding: 0 10px;
  }
  .actions-list > .forecast-action-prev {
    left: 0;
  }
  .actions-list > .forecast-action-next {
    right: 0;
  }
  .forecast-action {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
  }

  .forecast-action:focus {
    outline: none;
  }

  .forecast-name {
    text-align: center;
    font-size: 13px;
  }

  .active-weather-condition-summary {
    padding: 40px;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .title {
    padding: 0;
    font-family: ${primaryFont};
    font-size: 11px;
    color: ${astronaut};
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  .weather-stats {
    list-style-type: none;
    padding: 0;
    font-family: ${secondaryFont};
    font-size: 20px;
  }

  .weather-stat {
    margin-bottom: 10px;
  }

  .condition-summary {
    padding: 40px;
  }

  .secondary-title {
    font-family: ${secondaryFont};
    font-size: 20px;
    padding: 0;
  }

  .condition-summary-content {
    padding: 0;
    font-family: ${secondaryFont};
    font-size: 19px;
  }
`;
