import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from '../../styles/variables/breakpoints';

export default css`
.root {
  margin: 0;
  padding: 0 35px;
}

.action-container { margin-top: 10px; }

@media ${screenMedium} {
  .root {
    padding: 0;
    margin-top: -10px;
  }

  .action-container { display: none; }
}

@media ${screenLarge} {
  .root {
    width: 250px;
    margin-right: 30px;
    margin-top: 10px;
  }

  .action-container { display: block; }
}
`;
