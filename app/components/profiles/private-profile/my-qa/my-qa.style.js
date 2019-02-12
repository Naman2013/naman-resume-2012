import css from 'styled-jsx/css';

import { screenMedium } from '../../../../styles/variables/breakpoints';

export default css`
  .root {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 0;
  }

  .main-block {
    margin-right: 20px;
  }

  @media ${screenMedium} {
    .root {
      justify-content: space-between;
      margin-top: 20px;
    }

    .main-block {
      min-width: 620px;
    }
  }
`;
