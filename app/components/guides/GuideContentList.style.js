import css from 'styled-jsx/css';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`
  .root {
    margin: 0;
    padding: 0;
  }

  @media ${screenLarge} {
    .root {
      margin-top: 95px;
    }
  }
`;
