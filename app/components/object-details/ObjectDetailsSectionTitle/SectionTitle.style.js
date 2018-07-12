import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { astronaut, lynch, geyser, iron, white_tile_texture } from '../../../styles/variables/colors_tiles_v4';
import { screenLarge, screenXLarge } from '../../../styles/variables/breakpoints';

export default css`

  .title-bg {
    letter-spacing: 1px;
    background-color: white;
    color: ${astronaut};
    font-family: ${secondaryFont};
    transition: height 0.4s ease-in-out;
    width: 100%;
    height: 80px;
    padding-top: 60px;
    font-size: 16px;
    color: ${astronaut};
    text-align: center;
  }

  h1 {
    font-family: ${primaryFont};
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 4px;
    text-transform: uppercase;
  }

  @media ${screenXLarge} {
    .title-bg {
      background: url(${white_tile_texture});
      background-size: 15px;
      height: 148px;
      padding-top: 75px;
      box-shadow: 0px 15px 30px 2px rgba(237,240,242,1);
    }
    
    h1 {
      font-size: 30px;
      margin: 15px;
    }

  }
`;
