import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { faintShadow } from '../../styles/variables/shadows';

export default css`
  .root {
    background: white;
    padding: 20px 35px;
    ${faintShadow}
  }

  .action-container {
    margin-top: 20px;
    display: none;
  }

  .title-wrapper {
    padding: 15px 0;
  }

  @media ${screenMedium} {
    .root {
      padding: 60px 40px;
    }

    .action-container {
      display: block;
    }
  }

  @media ${screenLarge} {
    .root {
      padding: 70px;
      width: 100%;
    }

    .action-container {
      display: none;
    }
  }
`;
