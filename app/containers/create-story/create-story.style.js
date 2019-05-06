import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import {
  hawkesBlue,
  seashell,
  astronaut,
  romance,
  shadows,
  midnight_express,
  geyser,
  lightHeadedAstronaut,
  faintGray,
} from '../../styles/variables/colors_tiles_v4';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from '../../styles/variables/breakpoints';

export default css`
  .root {
    background-color: ${seashell};
    padding-top: 50px;
  }

  .create-form-container {
    border: 1px solid ${shadows};
    background-color: ${romance};
  }

  .inner-container {
    padding: 50px;
  }

  @media ${screenMedium} {
  }

  @media ${screenLarge} {
  }
`;
