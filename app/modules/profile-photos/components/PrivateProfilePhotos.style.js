import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { shadows } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .body-wrapper {
    margin: 0 10px 20px 10px;    
  }

  .header-wrapper {
    box-shadow: 0 0 6px 0 ${shadows};
  }

  @media ${screenMedium} {
    .header-wrapper {
      margin: 0 72px;
      box-shadow: none;
    }

    .body-wrapper {
      margin: 0 74px 20px 74px;
    }
  }

  @media ${screenLarge} {
    .header-wrapper {
      margin: 0 42px;
    }

    .body-wrapper {
      margin: 0 42px 20px 42px;
    }
  }
`;
