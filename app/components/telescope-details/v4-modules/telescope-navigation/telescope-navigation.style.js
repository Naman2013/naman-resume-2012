import css from 'styled-jsx/css';
import { primaryFont } from 'styles/variables/fonts';
import { faintShadow } from 'styles/variables/shadows';

export default css`
  .small-screen-select {
    ${faintShadow}
    padding: 5px 10px;
    border-radius: 50px;
    position: relative;
  }

  .active-selection-box {
    display: flex;
    align-items: center;
    width: 100%;
    font-family: ${primaryFont};
  }

  .active-selection-title {
    font-size: 11px;
    font-weight: 800;
    flex-grow: 2;
    text-transform: uppercase;
    padding: 0 10px;
  }

  .image-container {
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }

  .chevron-box {
    padding-right: 20px;
  }

  .navigation-options {
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
`;
