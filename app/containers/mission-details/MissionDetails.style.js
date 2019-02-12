import css from 'styled-jsx/css';

export default css`
  .header-wrapper {
    height: 50px;
    width: 100%;
    background-color: #34455b;
  }

  .header {
    margin: 0 20px;
    display: flex;
    height: 100%;
    align-items: center;
  }

  .arrowBack {
    transform: rotate(180deg);
  }

  .back {
    font-size: 11px;
    margin-left: 9px;
    text-transform: uppercase;
    color: white;
  }
`;
