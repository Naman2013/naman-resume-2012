import css from 'styled-jsx/css';
import { screenLarge } from 'app/styles/variables/breakpoints';

export default css`
  .details-root {
    display: flex;
    padding: 0;
  }

  .viewer {
    width: 100%;
  }

  .column {
    width: 100%;
  }

  @media ${screenLarge} {
    .viewer {
      margin: 30px auto;
      width: 90%;
    }

    .column {
      margin: 0 20px;
      width: 300px;
    }
  }
`;
