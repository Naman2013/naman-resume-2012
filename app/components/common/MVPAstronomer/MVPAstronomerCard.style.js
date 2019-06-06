import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  hawkesBlue,
  romance,
  midnight_express,
  lightHeadedAstronaut,
} from '../../../styles/variables/colors_tiles_v4';

export default css`
  .ask-an-astronomer-card.mvp-card {
    margin: 0;
    padding: 25px 40px;
  }

  .mvp-card {
    background-color: ${romance};
    width: 100%;
    padding: 25px;
    margin: 0 0 25px;
    min-width: 28%;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    text-decoration: none;
  }

  .mvp-card h5 {
    font-family: ${secondaryFont};
    color: ${lightHeadedAstronaut};
    font-size: 20px;
    border-bottom: 1px solid ${hawkesBlue};
    padding: 15px 0;
    margin-bottom: 0;
  }

  .mvp-gravity {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: ${lightHeadedAstronaut};
    font-family: ${primaryFont};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mvp-gravity-rank {
    padding: 10px 0 10px 12px;
    border-left: 1px solid ${hawkesBlue};
    display: flex;
    align-items: center;
  }

  .mvp-gravity-rank span {
    margin-top: 2px;
  }

  .mvp-gravity-rank .star {
    width: 8px;
    height: 8px;
    margin-right: 6px;
  }

  .mvp-gravity-label {
    padding: 10px 0;
  }

  .mvp-icon-container {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url('https://vega.slooh.com/assets/v4/common/Level_Image_Container_Blue_Normal.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .mvp-icon-content {
    width: 100%;
    height: 100%;
    margin-top: 4px;
  }
`;
