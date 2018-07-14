import css from 'styled-jsx/css';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`
  .root {
    margin: 0;
    padding: 0 35px;
  }

  @media ${screenMedium} {
    .root {
      padding: 0;
      margin-top: -10px;
    }
  }

  @media ${screenLarge} {
    .root {
      width: 78%;
      margin-top: 95px;
    }
  }
`;
