import css from 'styled-jsx/css';

export default css`
  .overlay-container {
    background-color: rgba(0, 0, 0, 0.37);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3000;
  }

  .subtitle {
    margin-top: 120px;
    font-family: BrandonGrotesque;
    font-size: 10px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 2px;
    text-align: center;
    color: #fad59a;
  }

  .title {
    margin-top: 40px;
    font-family: AGaramondPro;
    font-size: 40px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }

  .buttons-main {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }

  .buttons-live {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }

  .buttons-main :global(.button-container) {
    min-width: 80px;
    min-height: 80px;
    margin-right: 10px;
  }
`;
