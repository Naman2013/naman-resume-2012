import css from 'styled-jsx/css';
import { romance, lightHeadedAstronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

export default css`
/* GRID */
.object-details-grid {
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
  width: 90%;
  margin: 0 auto;
  background-color: ${romance};
  font-family: ${secondaryFont};
  font-size: 18px;
  transition: width 0.3s ease-in-out;
}

.object-details-grid div {
  color: ${lightHeadedAstronaut};
  padding: 40px;
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  border-bottom: solid 1px ${geyser};
  width: 100%;
}

.object-details-grid h2 {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-family: ${primaryFont};
  margin: 0;
  margin-bottom: 25px;
}

.object-details-grid p {
  margin: 0;
  padding: 0;
  font-size: 20px;
  letter-spacing: 1px;
  font-family: ${secondaryFont};
}
`;
