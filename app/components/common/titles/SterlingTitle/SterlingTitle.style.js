import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';

export default css`
  .root {
    text-align: center;
    color: #41566F;
    padding: 40px 40px 20px 40px;
  }

  .title {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: ${primaryFont};
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: 800;
  }

  .sub-title {
    margin: 0;
    padding: 0;
    opacity: 0;
    font-size: 16px;
    font-family: ${secondaryFont};
    transition: opacity 0.25s ease-in;
    text-transform: capitalize;
  }

  @media ${screenMedium} {
    .root {
      padding-top: 60px;
      padding-bottom: 40px;
    }

    .sub-title {
      opacity: 1;
    }
  }
`;
