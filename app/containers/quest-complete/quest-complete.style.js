import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import {
  hawkesBlue,
  seashell,
  shadows,
  astronaut,
  romance,
  midnight_express,
  geyser,
  golda,
  lightHeadedAstronaut,
  faintGray,
  questDetailsTexture,
} from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';
import {
  questShield,
} from '../../styles/variables/iconURLs';
export default css`
  .root {
    margin-top: -45px;
    background-color: ${seashell};
  }
  .inner-root-header {
    background-image: url(${questDetailsTexture});
    margin-top: 0;
    width: 100%;
    height: 500px;

  }
  .inner-center {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }

  .congrats {
    color: ${golda};
    text-transform: uppercase;
    font-size: 11px;
    font-weight: bold;
  }

  .quest-completed {
    color: ${romance};
    text-transform: uppercase;
    font-size: 36px;
    font-weight: bold;
  }

  .inner-center-intro {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    justify-content: space-between;
    height: 90px;
  }
  .inner-container {
    background-color: ${romance};
    position: relative;
    padding: 50px;
    margin: 50px;
  }
  .content-container {
    text-align: left;
    height: auto;

  }

  .awarded {
    font-family: ${primaryFont};
    font-weight: bold;
    font-size: 11px;
    text-transform: capitalize;
    color: ${astronaut};
  }
  .earned-in {
    font-family: ${secondaryFont};
    font-weight: normal;
    font-size: 18px;
    color: ${astronaut};
  }
  .shield-container {
    position: absolute;
    width: 90%;
    text-align: center;
    height: 100px;
    top: -30px;
  }

  .blue-shield {
    position: absolute;
    background: url(${questShield});
    background-size: cover;
    background-repeat: no-repeat;
    height: 78px;
    width: 78px;
    left: 50%;
    transform: translateX(-50%);
  }

  .icon-content {
    z-index: 999;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
  }
  .step-list {
    background-color: ${romance};
  }
  .step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 25px;
    font-family: ${secondaryFont};
    font-weight: normal;
    font-size: 18px;
    text-transform: capitalize;
    color: ${astronaut};
    border-bottom: 1px solid ${shadows};

  }

  .check-icon {
    height: 40px;
    width: 40px;
  }
`;
