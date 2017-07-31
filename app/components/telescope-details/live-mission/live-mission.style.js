import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';

export default `
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

  .current-mission-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .mission-title {
    font-weight: 600;
    padding-left: 10px;
  }

  .users-quote {
    font-family: ${secondaryFont};
    font-size: 18px;
    font-style: italic;
    font-weight: 300;
    padding-left: 50px;
    margin-bottom: 30px;
  }

  .footer {
    padding: 10px;
    margin: 0 -15px -15px -15px;
    background: rgba(31,31,31,0.60);
  }

  .mission {
    margin-top: 10px;
  }

  .heart-container {
    position: absolute;
    top: 10px;
    right: 45px;
  }
`;
