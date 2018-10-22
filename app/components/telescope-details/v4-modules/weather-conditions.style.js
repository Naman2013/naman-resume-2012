import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { hawkesBlue } from 'styles/variables/colors_tiles_v4';

export default css`
  .data-set,
  .datum {
    list-style-type: none;
    padding: 0;
  }

  .datum {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .title {
    font-family: ${primaryFont};
    font-size: 11px;
  }

  .field {
    font-family: ${secondaryFont};
    font-size: 20px;
  }
`;
