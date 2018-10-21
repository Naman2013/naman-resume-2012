import css from 'styled-jsx/css';
import { screenLarge } from 'styles/variables/breakpoints';

export default css`
  .content-container, .column-container {
    margin: 0;
    padding: 0;
  }

  @media ${screenLarge} {
    .root {
      display: flex;
      flex-direction: row-reverse;
    }

    .content-container {
      flex: 40%;
    }

    .column-container {
      flex: 10%;
    }
  }
`;
