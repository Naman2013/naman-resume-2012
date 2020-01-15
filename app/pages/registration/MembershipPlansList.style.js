import css from 'styled-jsx/css';
import { screenMedium, screenMobile } from 'app/styles/variables/breakpoints';
import { resetMarginPadding } from 'app/styles/variables/utils';

export default css`
  .subscription-plans-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    ${resetMarginPadding}
    list-style-type: none;
  }

  .subscription-plans-list.with-slider {
    margin: 0 auto;
    max-width: 644px;
  }

  .subscription-plans-list.with-slider .subscription-plans-list-item {
    display: none;
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

  @media ${screenMobile} {
    .subscription-plans-list.with-slider .subscription-plans-list-item {
      display: block;
    }

    .subscription-plans-list.with-slider
      :global(.subscription-plans-list-item) {
      margin: 20px 5%;
    }

    .subscription-plans-list.with-slider :global(> .root) {
      display: none;
    }
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

    .subscription-plans-list.with-slider
      :global(.subscription-plans-list-item) {
      margin: 20px 5%;
    }
  }

  @media only screen and (min-width: 1200px) {
    .subscription-plans-list.with-slider {
      max-width: 965px;
    }

    .subscription-plans-list.with-slider
      :global(.subscription-plans-list-item) {
      max-width: 330px;
      margin: 20px auto;
    }
  }
`;
