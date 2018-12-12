import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .vertical-helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .dash-hero {
    height: 625px;
    width: 100%;
    vertical-align: middle;
    text-align: center;
    transition: height ease-in-out 0.3s;
    background-color: white;
  }

  .hero-img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 90%;
    background-position: 50%;
    background-image: url("https://vega.slooh.com/assets/v4/dashboard/dashboard_graphic_v4.png");
  }

  .dash-nav {
    position: absolute;
    top: 687px;
    height: 160px;
    width: 100%;
  }

  @media all and (min-width: 641px) and (max-width: 768px) {

    .dash-nav {
      top: 507px;
      display: flex;
      height: 115px;
      font-size: 9px;
    }
    
    .dash-nav-item img {
      height: 22px;
      margin: 30px 0 20px 0;
    }
  }

  @media all and (max-width: 640px){
    .dash-nav {
      display: none;
    }
  }


  @media ${screenMedium} {
    .dash-hero {
      background-color: #213043;
      background-image: url("https://vega.slooh.com/assets/v4/dashboard/Darkest_Pattern_Canvas.png");
      background-size: 100px;
    }

    .hero-img {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      max-width: 1080px;
      background-repeat: no-repeat;
      background-size: 80%;
      background-position: 50%;
      background-image: url("https://vega.slooh.com/assets/v4/dashboard/dashboard_graphic_desktop_v4.png");
    }
  }
`;
