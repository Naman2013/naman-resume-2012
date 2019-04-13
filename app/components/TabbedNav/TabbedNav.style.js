import css from 'styled-jsx/css';
import { primaryFont } from 'app/styles/variables/fonts';
import {
  geyser,
  romance,
} from 'app/styles/variables/colors_tiles_v4';
import { faintShadow } from 'app/styles/variables/shadows';

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
  background-color: ${romance};
}

.arrow {
  margin-bottom: -5px;
}

.is-hidden {
  visibility: hidden;
}

.split-nav-item {
  cursor: pointer;
  margin: 0 5px;
  margin-top: 15px;
  font-family: ${primaryFont};
  text-transform: uppercase;
}

.component-container {
  ${faintShadow}
}

.split-nav-item-container {
  border: 1px solid ${geyser};
  flex: 0 50%;
}
`;
