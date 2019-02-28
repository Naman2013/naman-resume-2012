import css from 'styled-jsx/css';

export default css`
  .portal {
    width: 100%;
    overflow: hidden;
    background: none;
    position: relative;
    background-color: black;
  }

  .portal:before {
    content: '';
    padding-top: 100%;
    float: left;
  }

  svg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .tile-actions {
    list-style-type: none;
    padding: 35px 40px;
  }
`;
