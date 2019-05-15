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
  .header {
    background-image: url('https://vega.slooh.com/assets/v4/common/night_cliffs.png');
    background-size: cover;
    background-position: center;
    width: auto;
    height: 400px;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: ${astronaut};
  }

  .inner-header-container {
    position: relative;
    width: 620px;
    height: 260px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: ${romance};
  }

  .inner-header-text {
    background-color: ${romance};
    font-family: ${secondaryFont};
    padding: 50px;
  }

  .big {
    font-size: 24px;
    padding-bottom: 15px;
  }

  .little {
    font-size: 19px;
  }
`;
