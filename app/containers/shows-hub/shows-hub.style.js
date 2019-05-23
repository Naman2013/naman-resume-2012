import css from 'styled-jsx/css';
import { screenMedium, screenSmall } from 'styles/variables/breakpoints';

export default css`
  .pagination-container {
    margin: 0 auto;
  }
  :global(.slick-slide .upcoming-container .card-shows) {
    width: 100%;
  }

  @media ${screenMedium} {
    :global(.slick-slide .upcoming-container .card-shows) {
      min-width: 600px;
    }
  }
`;
