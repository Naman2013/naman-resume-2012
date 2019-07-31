import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { resetMarginPadding } from 'app/styles/variables/utils';

export default css`
  .button-container {
    ${resetMarginPadding}
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    margin-top: 20px;
  }

  li:first-child {
    margin-right: 10px;
  }

  @media ${screenMedium} {
    .button-container {
      justify-content: flex-start;
    }
  }

  @media ${screenLarge} {
    .button-container {
      justify-content: space-between;
    }
  }
`;
