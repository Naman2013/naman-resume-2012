import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
.card-object {
  width: 300px;
  height: 464px;
  background-color: white;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
  margin: 20px auto;
  padding: 0 40px;
  background-image: url("https://vega.slooh.com/assets/v4/dashboard/object-card-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;

}
.object-icon {
  width: 100%;
  height: 127px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: url("https://vega.slooh.com/assets/v4/dashboard/object-icon-container.png");
}
.object-icon div {
  width: 100%;
  height: 100%;
}
.object-name {
  color: ${astronaut};
  font-family: ${secondaryFont};
  font-size: 20px;
  padding: 20px 0;
  border-top: 1px solid ${shadows};
}
.list-item {
  padding: 20px 0 5px 0;
  border-top: 1px solid ${shadows};
  border-bottom: 1px solid ${shadows};
}

`;
