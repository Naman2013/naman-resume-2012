import css from 'styled-jsx/css';
import { lightHeadedAstronaut, hawkesBlue } from '../../../styles/variables/colors_tiles_v4';
import { helvetica } from '../../../styles/variables/fonts';
import { screenMedium } from '../../../styles/variables/breakpoints';

export default css`
  .root h2 {
    margin: 30px 0 0;
    border-bottom: none;
    font-family: ${helvetica};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 1.75px;
    color: ${lightHeadedAstronaut};
    text-transform: uppercase;
    text-align: center;
  }

  @media ${screenMedium} {
    .root h2 {
      margin: 0;
      border-bottom: 1px solid ${hawkesBlue};
      line-height: 62px;
      text-align: left;
    }
  }
`;
