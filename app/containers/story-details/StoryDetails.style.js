import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import {
  astronaut,
  romance,
  golden_yellow,
  shadows,
  seashell,
} from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge, screenXLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

  .root {
    background-color: ${seashell};
  }

  .main-root {
    margin-bottom: 25px;
  }
  
  .shadowed {
    ${faintShadow}
  }

  .header-container {
    background-color: ${romance};
    padding: 15px 15px 0 15px;
    overflow: auto;
  }

  .story-title {
    font-size: 26px;
    font-family: ${secondaryFont};
    padding-bottom: 25px;
  }

  .vert-line-container {
    position: relative;
    padding-top: 15px;
    padding-bottom: 25px;
  }

  .vert-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    border-right: 1px solid ${shadows};
  }

  .story-main-image-container {
    position: relative;
    background-color: ${romance};
    margin: 25px auto;
    border-radius: 100%;
    border: 1px solid ${shadows};
    height: 250px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .story-main-image {
    border-radius: 100%;
    height: 200px;
    width: 200px;
  }

  .flex {
    display: flex;
    flex-direction: row;
  }

  flex-vert {
    display: flex;
    flex-direction: column;
  }

  .actions {
    align-items: center;
    justify-content: space-between;
  }

  .author {
    flex: 3;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 10px;
    letter-spacing: 1px;
  }

  .short {
    flex: 1;
    display: block;
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid ${shadows};
  }

  .by-line {
    color: ${astronaut};
    border-top: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
    align-items: center;
    padding-bottom: 0;
    flex-direction: column;
  }

  .story-details :global(.component-container) {
    box-shadow: none;
  }

  .story-details :global(.split-nav-item-container) {
    border-top: 0;
  }

  @media ${screenMedium} {

    .by-line {
      flex-direction: row;
    }

    .header-container {
      padding: 100px 100px 0 100px;
    }

    .story-title {
      font-size: 40px;
      padding-bottom: 25px;
    }

    .story-main-image-container {
      height: 500px;
      width: 500px;
    }

    .story-main-image {
      height: 440px;
      width: 440px;
    }
  }

  @media ${screenLarge} {

    .by-line {
      flex-direction: row;
    }
    .header-container {
      padding: 100px 100px 0 100px;
    }

    .story-title {
      font-size: 40px;
      padding-bottom: 25px;
    }

    .story-main-image-container {
      height: 500px;
      width: 500px;
    }

    .story-main-image {
      height: 440px;
      width: 440px;
    }
  }

  @media ${screenXLarge} {

    .by-line {
      flex-direction: row;
    }
    .header-container {
      padding: 100px 100px 0 100px;
    }

    .story-title {
      font-size: 40px;
      padding-bottom: 25px;
    }

    .story-main-image-container {
      height: 500px;
      width: 500px;
    }

    .story-main-image {
      height: 440px;
      width: 440px;
    }
  }
`;
