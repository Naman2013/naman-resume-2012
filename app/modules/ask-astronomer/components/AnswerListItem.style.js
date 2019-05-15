import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  hawkesBlue,
  astronaut,
  romance,
  shadows,
  midnight_express,
  geyser,
  lightHeadedAstronaut,
  faintGray,
} from '../../../styles/variables/colors_tiles_v4';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from '../../../styles/variables/breakpoints';

export default css`
  .top-answer {
    background-color: ${astronaut};
    padding: 20px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
    color: ${romance};
    height: 50px;
  }

  .answer-list-item {
    border-bottom: 1px solid ${shadows};
  }
`;
