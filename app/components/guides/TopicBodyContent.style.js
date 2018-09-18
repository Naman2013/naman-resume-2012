import css from 'styled-jsx/css';
import { secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    background: white;
    padding: 20px 35px;
  }

  .action-container {
    margin-top: 20px;
    display: none;
  }

  .title-wrapper {
    padding: 15px 0;
  }

  .cms-content :global(p) {
    font-family: ${secondaryFont};
    line-height: 1.5;
    font-size: 18px;
    margin-bottom: 10px;
  }

  @media ${screenMedium} {
    .root {
      padding: 60px 40px;
    }

    .title-wrapper {
      padding-bottom: 40px;
    }

    .action-container { display: block; }
  }

  @media ${screenLarge} {
    .root {
      padding: 70px;
      width: 90%;
    }

    .action-container { display: none; }
  }
`;
