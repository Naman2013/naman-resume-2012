import css from 'styled-jsx/css';
import { screenMedium, screenLarge, screenXLarge } from 'styles/variables/breakpoints';

export default css`
  .root { display: none; width: 100%; }

  .root.screenSmall { display: block; }

  @media ${screenMedium} {
    .root.screenSmall { display: none; }
    .root.screenMedium { display: block; }
  }

  @media ${screenLarge} {
    .root.screenSmall { display: none; }
    .root.screenMedium { display: none; }
    .root.screenLarge { display: block; }
  }

  @media ${screenXLarge} {
    .root.screenSmall { display: none; }
    .root.screenMedium { display: none; }
    .root.screenLarge { display: none; }
    .root.screenXLarge { display: block; }
  }
`;
