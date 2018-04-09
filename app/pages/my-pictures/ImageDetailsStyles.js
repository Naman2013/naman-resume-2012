import css from 'styled-jsx/css';
import { white } from '../../styles/variables/colors';

export default css`
  .my-pictures-container {
    padding: 20px;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    -ms-flex-wrap: wrap;
  }

  .left {
    flex: 3;
    padding-right: 25px;
  }

  .right {
    flex: 1.5;
    background-color: ${white};
    padding: 10px;
  }

  .right-top {
    flex: 1.5;
    padding: 10px;
  }
`;
