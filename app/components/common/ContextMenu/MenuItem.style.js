import css from 'styled-jsx/css';
import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

export default css`
.menu-item {
  position: relative;
  margin: 0;
  padding: 0;
  margin-left: 70px;
  width: 75%;
  color: ${astronaut};
}

.dot-container {
  position: absolute;
  left: -50px;
  top: 43px;
}

.action {
  display: block;
  padding-bottom: 30px;
  padding-top: 40px;
  margin-left: -15px;
  padding-left: 20px;
  font-family: ${secondaryFont};
  border-bottom: 1px solid ${geyser};
  text-transform: capitalize;
  text-decoration: none;
  color: ${astronaut};
}
`;
