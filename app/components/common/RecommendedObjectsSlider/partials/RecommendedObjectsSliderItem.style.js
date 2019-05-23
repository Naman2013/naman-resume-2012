import css from 'styled-jsx/css';
import {
  astronaut,
  shadows,
  lightHeadedAstronaut,
} from '../../../../styles/variables/colors_tiles_v4';
import {
  secondaryFont,
  AngeliquemadouceColombeFont,
} from '../../../../styles/variables/fonts';

export default css`

  @font-face {
    font-family: 'Angelique';
    src:
      url('/assets/fonts/AngeliquemadouceColombe.woff') format('woff'),
      url('/assets/fonts/AngeliquemadouceColombe.eot') format('eot'),
      url('/assets/fonts/AngeliquemadouceColombe.svg') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  
  .card-object {
    pointer-events: auto;
    text-align: initial;
    width: 300px;
    height: 464px;
    background-color: white;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
    margin: 20px auto;
    padding: 0 40px;
    background-image: url('https://vega.slooh.com/assets/v4/dashboard/object-card-bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .object-icon {
    width: 100%;
    height: 127px;
    background-size: 167.5px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url('https://vega.slooh.com/assets/v4/dashboard/object-icon-container.png');
  }
  .object-icon div {
    width: 100%;
    height: 100%;
  }
  .object-field {
    color: ${lightHeadedAstronaut};
    padding: 15px 0;
  }

  .title {
    border-top: 1px solid #c3c5c7;
    font-family: ${secondaryFont};
    font-size: 20px; 
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
  }

  .details {
    font-family: ${primaryFont};
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  .details-telescope {
    font-family: 'Angelique';
    font-size: 52px; 
    line-height: 0.5;
    padding: 10px 0 16px 0;
    text-transform: none;
  }

  .field-wrapper {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${shadows};
  }

  .field-wrapper img {
    margin-right: 20px;
    width: 14px;
    height: 14px;
  }

  .list-item {
    padding: 20px 0 5px 0;
  }

  .opt-button {
    margin: 20px auto;
  }

  .title {
    border-bottom: 1px solid #c3c5c7;
  }

  .telescope-name-container {
    padding: 0;
    position: relative;
  }

  .telescope-name-container .telescope-name {
    font-family: ${AngeliquemadouceColombeFont};
    font-size: 52px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: capitalize;
    position: relative;
    top: -5px;
  }
`;
