import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  ul {
    margin: 0 auto;
    padding: 0;
    list-style-type: none;
    width: 96%;
  }

  .topic {
    margin-bottom: 10px;
  }

  @media ${screenMedium} {
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
`;
