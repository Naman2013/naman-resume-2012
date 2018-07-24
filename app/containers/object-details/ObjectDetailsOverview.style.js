import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { astronaut, lynch, geyser, iron, white_tile_texture } from '../../../styles/variables/colors_tiles_v4';
import { screenLarge, screenXLarge } from '../../../styles/variables/breakpoints';

export default css`

  .contain {
    margin: 5%;
    padding: 25px;
    background-color: #f2f2f2;
  }
  .contain ul {
    float: right;
    list-style: none;
  }
  h1 {
    font-size: 30px;
    font-weight: 600;
    border-bottom: solid 2px;
  }
  .card-container__specialists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .specialists-card {
    font-size: 1em;
    background-color: white;
    padding: 25px;
    margin: 25px 0;
    min-width: 28%;
  }
  .specialists-icon {
    background-color: #3C4A55;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    padding: 10px;
  }

  }
`;
