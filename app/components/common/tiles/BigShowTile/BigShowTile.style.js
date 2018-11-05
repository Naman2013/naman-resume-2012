import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { romance, golda } from 'styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
.card-shows {
  background-image: url("https://vega.slooh.com/assets/v4/dashboard/show-card-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 0 40px;
  font-size: 10px;
  height: 259px;
  width: 600px !important;
  color: ${romance};
  margin: 20px auto;
  font-family: ${primaryFont};
  text-align: center;

}
.show-card-head {
  color: ${golda};
  font-weight: 400;
  padding: 60px 0 20px 0;
  text-transform: uppercase;
}
.show-card-title {
  color: ${romance};
  font-family: ${secondaryFont};
  font-size: 22px;
  line-height: 22px;
  font-weight: 400;
  max-width: 80%;
  margin: 0 auto 55px auto;
}
.show-card-author {
  font-weight: 400;
  text-transform: uppercase;
}
`;
