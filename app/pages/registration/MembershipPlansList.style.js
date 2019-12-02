import css from 'styled-jsx/css';
import { screenMedium } from 'app/styles/variables/breakpoints';
import { resetMarginPadding } from 'app/styles/variables/utils';

export default css`
  .subscription-plans-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    ${resetMarginPadding}
    list-style-type: none;
  }

  .subscription-plans-list-item {
    width: 300px;
    height: auto;
    position: relative;
    ${resetMarginPadding}
    margin-top: 10px;
  }

  .subscription-plans-list-item :global(div) {
    margin: 0;
  }

  @media ${screenMedium} {
    .subscription-plans-list {
      margin-top: 20px;
    }

    .subscription-plans-list:after {
      content: '';
      flex: auto;
    }

    .subscription-plans-list-item {
      margin: 20px 10px 0;
    }
  }
`;
