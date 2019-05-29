import css from 'styled-jsx/css';

export default css`
  .image-portal-root {
    width: 220px;
    height: 220px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: inset 0 0 13px -1px rgba(26, 26, 26, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-clip {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    background-size: cover !important;
  }
`;
