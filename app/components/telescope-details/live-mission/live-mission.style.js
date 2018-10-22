import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';

export default css`
  .live-mission {
    font-family: ${primaryFont};
    color: white;
    padding: 15px;
    margin-top: 9px;
    background: rgba(31,31,31,0.40);
  }

  .content {
    position: relative;
  }

  .title {
    font-size: 24px;
    margin-bottom: 5px;
  }

  .current-mission-title-container {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .current-mission-title {
    padding-left: 10px;
  }

  .mission-title {
    font-weight: 600;
  }

  .users-quote {
    font-family: ${secondaryFont};
    font-size: 18px;
    font-style: italic;
    font-weight: 300;
    padding-left: 50px;
    margin-bottom: 30px;
  }

  .heart-container {
    position: absolute;
    top: 10px;
    right: 45px;
  }
`;
