import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { white_tile, astronaut, blue_tile_canvas, geyser } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';
import { faintShadow } from 'styles/variables/shadows';

export default css`
.root {
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 11px;
  font-weight: bold;
  justify-content: space-evenly;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
}

.is-hidden {
  visibility: hidden;
}

.split-nav-item {
  margin: 0 5px;
  margin-top: 15px;
}

.component-container {
  margin: 0 25px;
  ${faintShadow}
}

.split-nav-item-container {
  border: 1px solid ${geyser};
  flex: 0 50%;
}
`;
