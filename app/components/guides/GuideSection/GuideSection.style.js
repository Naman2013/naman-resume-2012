import css from 'styled-jsx/css';
import { screenMedium, screenLarge, screenXLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
  }

  @media ${screenMedium} {
    .root {
      padding: 0 0;
    }

    .content-container {
      padding: 0 60px;
    }
  }

  @media ${screenLarge} {
    .root {
      padding 0 80px;
    }
  }

  @media ${screenXLarge} {
    .root {
      padding: 0 100px;
    }
  }
`;
