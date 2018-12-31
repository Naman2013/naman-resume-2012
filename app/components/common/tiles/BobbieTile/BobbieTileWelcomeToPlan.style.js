import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, geyser, blue_tile_feat, golden } from 'styles/variables/colors_tiles_v4';
import { resetMarginPadding } from 'styles/variables/utils';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';


export default css`
  div, h3, ul, li {
    ${resetMarginPadding}
  }

  .root {
    background: white;
  }

  .tile-content-container {
    font-family:  ${secondaryFont};
  }

  .tile-content-container h1 {
    font-size: 20px;
    letter-spacing: 1px;
    padding: 25px 0;
    color: ${astronaut};
    border-bottom: 1px solid ${geyser};
    font-weight: 300;
  }

  .middle-content {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    margin-top: 40px;
  }

  .text-content {
    flex: 50%;
  }

  .text-content h2 {
     font-size: 18px;
     color: ${astronaut};
     letter-spacing: 1px;
     margin: 0;
     padding: 0;
  }

  .middle-content .guide-tile {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 250px;
    margin: 0 auto;      
    background: url(${blue_tile_feat});
    text-align: center;
  }

  .middle-content .guide-tile .title {
    margin: 0;
    margin-bottom: 10px;
    padding-top: 100px;
    font-family: ${primaryFont};
    color: ${golden};
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 2px;
    font-size: 10px;
  }

  .middle-content .guide-tile .subTitle {
    margin: 0;
    font-family: ${secondaryFont};
    color: white;
    font-weight: 300;
    font-size: 20px;
    letter-spacing: 1px;
  }

  .guide-tile-frame {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
  }

  .bottom {
    transform: rotate(180deg);
    bottom: 0;
    left:0;
  }

  .top-right { transform: rotate(90deg) }

  .plan-name {
    list-style-type: none;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid ${geyser};
    border-top: 1px solid ${geyser};
  }

  .author-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .__html-blob-content-container__ {
    font-size: 18px;
  }

  .__html-blob-content-container__,
  .read-duration {
    display: none;
  }

  .__html-blob-content-container__ :global(p) {
    margin-bottom: 10px;
  }

  @media ${screenMedium} {
    .__html-blob-content-container__,
    .read-duration {
      display: block;
    }

    .middle-content .guide-tile {
      width: 250px;
      margin: 0;
    }

    .text-content {
      padding-right: 40px;
    }
    
    .author-name img,
    .author-name span { display: none; }

    .tile-content-container {
      /* padding: 40px 50px; */
    }

    ul {
      display: flex;
      padding: 10px 0;
      margin-bottom: 20px;
      border-bottom: 1px solid ${geyser};
    }
  }

  @media ${screenLarge} {
    .tile-content-container {
      /* padding: 80px; */
    }

    .title {
      font-size: 24px;
    }
  }
`;
