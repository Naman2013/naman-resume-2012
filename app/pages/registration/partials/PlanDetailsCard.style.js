import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  astronaut,
  romance,
  golden_yellow,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenLarge } from 'app/styles/variables/breakpoints';
import {
  backgroundImageCover,
  dropShadowContainer,
} from 'app/styles/mixins/utilities';

export default css`
  .root {
    margin: 15px auto;
    border: 1px solid ${shadows};
    background-color: ${romance};
    ${faintShadow}
  }
  .emphasize {
    font-size: 10px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .plan-name {
    padding: 5px;
    font-family: ${secondaryFont};
    font-size: 24px;
  }

  .plan-details-container {
    width: 100%;
    padding: 15px;
  }

  .plan-cost-container {
    padding: 15px;
    border-left: 1px solid ${shadows};
  }

  .small-scr-strike {
    font-size: 45px;
    text-decoration: line-through;
  }

  @media only screen (min-width: 400px) and (max-width: 500px) {
    .small-scr {
      font-size: 35px;
    }

    .small-scr-strike {
      font-size: 35px;
      text-decoration: line-through;
    }
  }
  @media only screen and (max-width: 400px) {
    .small-scr {
      font-size: 25px;      
    }
    
    .small-scr-strike {
      font-size: 25px;
      text-decoration: line-through;
    }
  }

  .plan-cost {
    font-family: ${primaryFont};
    font-size: 45px;
    font-weight: light;
    padding: 15px;
  }

  .border-bottom {
    border-bottom: 1px solid ${shadows};
  }

  .padded-top-bottom {
    padding: 15px 0;
  }

  .no-padded{
    padding: 0px;
  }

  .post-cost {
    display: block;
    text-align: right;
  }

  .plan-info {
    padding: 15px;
  }

  .flex {
    display: flex;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .flex-without-padding {
    display: flex;
    // padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .audience-type {
    font-family: ${secondaryFont};
    font-size: 18px;
    font-style: italic;
  }
`;
