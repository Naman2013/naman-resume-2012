import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    padding-bottom: 25px;
  }

  .hide-on-mobile {
    display: none;
  }

  .big-box {
    background-color: ${romance};
  }

  .big-box-background {
    background-image: url('https://vega.slooh.com/assets/images/photos/hero-inspire-background.jpg');
    width: 100%;
    height: 500px;
    background-size: cover;
    background-repeat: no-repeat;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: middle;
    justify-content: center;
  }

  .big-box-header{
    color: ${golden_yellow};
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: ${primaryFont};
  }

  .big-box-title {
    font-size: 40px;
    font-family: ${secondaryFont};
    color: ${romance};
  }

  .full-width {
    width: 100%;
  }

  .show-video-container {
    display:block;
    background: ${astronaut};
    width: 100%;
    margin-top: 10px;
    position: relative;
    justify-content: center;
    align-items: center;
    ${faintShadow}
  }


  @media ${screenLarge} {
    .hide-on-mobile {
      display: block;
    }

    .live-show :global(.root.component-container) {
      box-shadow: none;
      margin-bottom: 15px;
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid ${shadows};
    }

    .live-show :global(.split-nav-item-container) {
      background-color: transparent;
      border: 0;
      color: ${shadows};
    }

    .live-show :global(.arrow) {
      visibility: hidden;
    }

    .live-show :global(.split-nav-item-container.active-item) {
      color: ${astronaut};
      border-bottom: 2px solid ${astronaut};
    }
  }

`;
