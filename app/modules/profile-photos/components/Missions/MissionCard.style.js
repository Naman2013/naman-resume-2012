import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { romance, hawkesBlue, shadows, lightHeadedAstronaut } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .circle {
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    background-color: #6A6A6A;
    position: absolute;
    top: 12px;
    left: 12px;
    border-radius: 50%;
    border: 2px solid ${romance};
  }

  .card-bottom {
    display: flex;
  }
  .card-bottom btn1 {
    color: red;
    margin-right: 10px;
  }
  .display-none {
    display: none;
  }

  .mission-title {
    font-family: ${secondaryFont};
    text-transform: none;
    padding-bottom: 15px;
    border-bottom: 1px solid ${hawkesBlue};
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mission-details {
    width: 100%;
  }

  .mission-details-tile {
    display: inline-block;
    width: 50%;
    padding: 7px 0;
  }

  .mission-details-date {
    box-sizing: border-box;
  }

  .mission-details-images {
    padding-left: 15px;
    border-left: 1px solid ${hawkesBlue};
  }

  .mission-telescope {
    border-top: 1px solid ${hawkesBlue};
    border-bottom: 1px solid ${hawkesBlue};
    padding: 7px 0;
  }

  .onhover-field {
    border-bottom: 1px solid ${hawkesBlue};
    padding: 7px 0;
  }

  .mission-image-wrapper {
    display: none;
    justify-content: center;
    margin-top: 30px;
  }

  .mission-image-border {
    width: 154px;
    height: 154px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${hawkesBlue}; 
  }

  .mission-image {
    border-radius: 50%;
    width: 140px;
    height: 140px;
  }

  .inCenter {
    margin-left: 2%;
    margin-right: 2%;
  }

  .missionCard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${romance};    
    width: 100%;
    height: 100%;
    min-height: 136px;
    box-shadow: 0 0 6px 0 ${shadows};
    font-size: 10px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    padding: 30px 40px;
    color: ${lightHeadedAstronaut};
  }

  .show-onhover {
    display: none;
  }

  .root {
    margin-top: 20px;
    color: black;
    flex-basis: 100%;
  }

  @media ${screenMedium} {
    .root {
      flex-basis: 48%;
      max-width: 48%;
    }
    .mission-image-wrapper {
      display: flex;
    }
    .missionCard {
      min-height: 370px;
    }
  //   .missionCard:hover {
  //     background-color: rgba(0, 0, 0, 0.8);
  //     color: ${romance};
  //   }

  //   .missionCard:hover .mission-image-wrapper {
  //     display: none;
  //   }

  //   .missionCard:hover .mission-telescope {
  //     margin-bottom: 0;
  //   }

  //   .missionCard:hover .show-onhover {
  //     display: flex;
  //   }
  }

  @media ${screenLarge} {
    .root {
      flex-basis: 32%;
      max-width: 32%;
    }
  }
`;
