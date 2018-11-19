import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, seashell, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

.image-upload-label {
  cursor: pointer;
}

.image-upload-label [type=file] {
  display: none;

}

.browse {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100px;
  padding: 10px 20px;
  background-color: transparent;
  border: 1px dashed ${astronaut};
  text-align: left;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: bold;
  font-family: ${primaryFont};
  color: ${astronaut};
}

`;
