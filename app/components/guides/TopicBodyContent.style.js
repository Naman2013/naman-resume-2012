import css from 'styled-jsx/css';
import { secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';

export default css`
  .root {
    background-color: white;
    padding: 20px 35px;
  }

  .title-wrapper {
    padding: 15px 0;
  }

  p {
    font-family: ${secondaryFont};
    line-height: 1.5;
    font-size: 18px;
  }

  @media ${screenMedium} {
    .root {
      padding: 60px 40px;
    }

    .title-wrapper {}
  }
`;
