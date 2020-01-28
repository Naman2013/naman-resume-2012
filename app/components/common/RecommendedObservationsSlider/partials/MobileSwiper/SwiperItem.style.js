import css from 'styled-jsx/css';

export default css`
  .obs-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }

  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mobile-swiper-root {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    background: #000000;
  }
`;
