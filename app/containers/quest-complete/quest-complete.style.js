import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import {
  hawkesBlue,
  seashell,
  astronaut,
  romance,
  midnight_express,
  geyser,
  lightHeadedAstronaut,
  faintGray,
} from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';
import {
  questShield,
} from '../../styles/variables/iconURLs';
export default css`
  .root {
    background-color: ${seashell};
  }
  .inner-container {
    background-color: ${romance};
    position: relative;
    padding: 25px;
    margin: 50px;
  }
  .shield-container {
    position: absolute;
    width: 100%;
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
`;
