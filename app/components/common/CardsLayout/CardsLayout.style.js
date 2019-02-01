import css from 'styled-jsx/css';
import { screenMedium } from '../../../styles/variables/breakpoints';
import { secondaryFont } from '../../../styles/variables/fonts';

export default css`
  .heading {
    margin-top: 60px;
    text-align: center;
    margin-bottom: 20px;
  }

  .heading h1 {
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .heading h2 {
    font-family: ${secondaryFont};
    font-size: 18px;
    text-transform: none;
  }

  .cells-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
  }

  @media ${screenMedium} {
    .cells-wrapper {
      justify-content: space-between;
    }
  }
`;
