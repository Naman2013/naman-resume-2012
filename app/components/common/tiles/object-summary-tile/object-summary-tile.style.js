import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { astronaut, hawkesBlue } from 'styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';

export default css`
  .object-summary-tile-root {
    ${faintShadow};
    font-family: ${primaryFont};
    padding: 40px;
  }

  .title {
    font-family: ${secondaryFont};
    color: ${astronaut};
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    border-bottom: 1px solid ${hawkesBlue};
    padding-bottom: 15px;
    margin: 0;
  }

  .vertical-line {
    width: 1px;
    background-color: ${hawkesBlue};
    margin: 0 auto;
  }

  .horizontal-line {
    background-color: ${hawkesBlue};
    height: 1px;
    width: 100%;
    margin: 0 auto;
  }
`;
