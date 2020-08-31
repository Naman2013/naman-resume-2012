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
  .replies-list-contanier {
    display: flex;
    flex-direction: row;
    border-top: 1px solid ${shadows};
  }

  .replies-list {
    // flex: 0 0 93%;
    flex: 1;
  }

  .num-replies {
    background-color: ${romance};
    width: 45px;
  }

  .replies-number {
    float: left;
    /* Safari */
    -webkit-transform: rotate(90deg);
    /* Firefox */
    -moz-transform: rotate(90deg);
    /* IE */
    -ms-transform: rotate(90deg);
    /* Opera */
    -o-transform: rotate(90deg);
    display: block;
    transform-origin: 0 100%;
    line-height: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
    height: 30px;
    width: 100%;
    white-space: nowrap;
  }
`;
