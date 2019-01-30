import css from 'styled-jsx/css';
import { raven } from '../../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../../styles/variables/fonts';

export default css`
  .stats-details {
    padding: 20px 30px 30px;
  }

  .stats-details-text {
    font-family: ${primaryFont};
    font-size: 18px;
    line-height: 28px;
    color: ${raven};
  }
`;
