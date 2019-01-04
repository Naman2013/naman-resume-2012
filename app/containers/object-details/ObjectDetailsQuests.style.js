import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    display: flex;
    flex-wrap: wrap;
  }

  .card-container__quests {
    position: relative;
  }

  .tile {
    position: relative;
    ${resetMarginPadding}
    margin-bottom: 10px;
    padding: 0 10px;
  }

  @media ${screenMedium} {
    .card-container__quests {
      display: flex;
      flex-wrap: wrap;
      margin-top: 65px;
    }
  }

  @media ${screenLarge} {
    .card-container__quests {
      margin-top: 40px;
    }
  }
`;
