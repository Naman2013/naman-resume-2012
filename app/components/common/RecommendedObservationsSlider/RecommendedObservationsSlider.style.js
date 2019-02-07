import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from '../../../styles/variables/breakpoints';

export default css`
  @media ${screenMedium} {
    :global(.obs-slider-wrapper .slick-list) {
      z-index: 100;
    }
  }

  @media ${screenLarge} {
    :global(.obs-slider-wrapper .slick-list) {
      z-index: auto;
    }
  }
`;
