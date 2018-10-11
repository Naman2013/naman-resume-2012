import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { romance, golda, midnight_express, astronaut, blue_tile_canvas } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';

export default css`
.card-guides {
  background-image: url("https://vega.slooh.com/assets/v4/dashboard/guide-card-bg.png");
  background-color: ${midnight_express};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  font-family: ${primaryFont};
  color: ${romance};
  font-weight: 600;
  letter-spacing: 1px;
  padding: 0 40px;
  font-size: 10px;
  width: 300px;
  height: 462px;
  margin: 20px auto;
  text-align: center;
}
.card-guides-head {
  color: ${golda};
  font-weight: 400;
  padding: 200px 0 20px 0;
  font-family: ${primaryFont};
  letter-spacing: 2px;
  text-transform: uppercase;
}
.card-guides-title {
  color: ${romance};
  font-family: ${secondaryFont};
  font-size: 22px;
  line-height: 22px;
  font-weight: 400;
  max-width: 80%;
  margin: 0 auto;
}
`;
