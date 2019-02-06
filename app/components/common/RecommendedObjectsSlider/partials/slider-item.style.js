import css from 'styled-jsx/css';
import { astronaut, shadows } from '../../../../styles/variables/colors_tiles_v4';
import { secondaryFont } from '../../../../styles/variables/fonts';

export default css`
  .card-object {
    text-align: initial;
    width: 300px;
    height: 464px;
    background-color: white;
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
    margin: 20px auto;
    padding: 0 40px;
    background-image: url("https://vega.slooh.com/assets/v4/dashboard/object-card-bg.png");
    background-size: 100%;
    background-repeat: no-repeat;

  }
  .object-icon {
    width: 100%;
    height: 127px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url("https://vega.slooh.com/assets/v4/dashboard/object-icon-container.png");
  }
  .object-icon div {
    width: 100%;
    height: 100%;
  }
  .object-field {
    color: ${astronaut};
    font-family: ${secondaryFont};
    font-size: 20px;
    padding: 15px 0;
  }

  .title {
    border-top: 1px solid #c3c5c7;
  }

  .details {
    font-size: 12px;
    letter-spacing: 0.6px;
    font-weight: bold;
    text-transform: uppercase;
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
    border-bottom: 1px solid #c3c5c7
  }
`;
