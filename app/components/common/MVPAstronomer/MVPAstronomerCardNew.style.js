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
    padding: 5px;
    margin: 0 0 15px;
    min-width: 28%;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    text-decoration: none;
    min-width: 160px;
  }

  .mvp-name{
    cursor: pointer;
    margin-left: 5px;
  }

  .mvp-card h5 {
    font-family: ${secondaryFont};
    color: ${lightHeadedAstronaut};
    font-size: 12px;
    // border-bottom: 1px solid ${hawkesBlue};
    padding: 8px 0;
    margin-bottom: 0;
  }

  .mvp-gravity {
    font-size: 8px;
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
    padding: 0px 0 0px 12px;
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
    padding: 0px 5px 0px 0px;
  }

  .mvp-icon{
    display: flex;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .mvp-icon-container {
    width: 25px;
    height: 25px;
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
