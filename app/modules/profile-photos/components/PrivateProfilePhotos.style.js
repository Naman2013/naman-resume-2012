import css from 'styled-jsx/css';
import { screenMedium, screenLarge, screenXLarge } from 'app/styles/variables/breakpoints';
import { shadows } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .root-wrapper {
    width: 100%;
    margin: 0 auto;
  }
  
  .body-wrapper {
    margin: 0 10px 20px 10px;    
  }

  .header-wrapper {
    box-shadow: 0 0 6px 0 ${shadows};
  }

  @media ${screenMedium} {
    .root-wrapper {
      width: 620px;
    }
  
    .header-wrapper {
      box-shadow: none;
    }
  }

  @media ${screenLarge} {
    .root-wrapper {
      width: 780px;
    }
  }
  
  @media ${screenXLarge} {
    .root-wrapper {
      width: 940px;
    }
  }
`;
