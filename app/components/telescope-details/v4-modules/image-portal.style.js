import css from 'styled-jsx/css';

export default css`
  .image-portal-root {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    box-shadow: inset 0px 0px 13px 0px rgba(26,26,26,0.08);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-clip {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    background-size: cover;
  }
`;
