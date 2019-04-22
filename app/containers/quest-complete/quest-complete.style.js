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
import { faintShadow } from 'app/styles/variables/shadows';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';
import {
  questShield,
} from '../../styles/variables/iconURLs';
export default css`
  .root {
    margin-top: -45px;
    background-color: ${seashell};
    height: 125vw;;
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
    margin-bottom: 0;
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
  .top-shield-container {
    position: absolute;
    width: 90%;
    text-align: center;
    height: 100px;
    top: -30px;
  }

  .top-blue-shield {
    position: absolute;
    background: url(${questShield});
    background-size: cover;
    background-repeat: no-repeat;
    height: 78px;
    width: 78px;
    left: 50%;
    transform: translateX(-50%);
  }

  .top-icon-content {
    z-index: 999;
  }

  .top-icon-container {
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

  .did-you-know {
    padding: 25px;

  }

  .did-you-know-caption {
    padding-bottom: 15px;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: bold;
    color: ${astronaut};

  }
  .did-you-know-text {
    padding-bottom: 15px;
    font-family: ${secondaryFont};
    font-size: 16px;
    color: ${astronaut};

  }

  .more-quests-container {
    position: relative;
    margin: 50px;
    margin-top: 0;
    padding: 25px;
    ${faintShadow}
  }

  .more-quests-caption {
    padding: 25px;
    font-family: ${secondaryFont};
    font-size: 18px;
    color: ${astronaut};
  }

  .more-quests-tile {
    position: relative;
  }

  .inner-center :global(.more-quests-tile > .root) {
    position: relative;
  }

  .inner-center :global(.more-quests-tile > .root .quest-info) {
    left: 0;
  }
`;
