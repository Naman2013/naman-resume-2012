import css from 'styled-jsx/css';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

export default css`
input[type="file"] {
  display: none;
}
.button-text {
  margin: 0 5px;
}
.button-input-container {
  position: relative;
}

.button-inner-container {
  display: flex;
  margin: auto;
  justify-content: space-between;
}
.text {
  vertical-align: middle;

}

.fa-image {
  font-size: 13px;
}
.button-container {
  font-family: ${primaryFont};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px dashed ${astronaut};
  background-color: transparent;
  border-radius: 100px;
  width: 110px;
  margin: 15px 0;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  width: 120px;
  height: 40px;
}
`;
