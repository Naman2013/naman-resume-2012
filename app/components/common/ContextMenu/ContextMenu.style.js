import css from 'styled-jsx/css';
import { primaryFont } from 'styles/variables/fonts';
import { faintGray, astronaut } from 'styles/variables/colors_tiles_v4';

export const CONTAINER_WIDTH = 440;

export default css`
  .root {
    width: 100px;
    overflow: hidden;
  }

  .menu-container {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 110px;
    width: ${Math.abs(CONTAINER_WIDTH)}px;
    height: 100%;
    background-color: ${faintGray};
    transition: right ease-out 0.15s;
  }

  .header-container {
    margin: 0;
    padding: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${astronaut};
    background-color: white;
  }

  .context-header {
    margin: 0;
    padding: 0;
    font-family: ${primaryFont};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 800;
  }

  .available-sections {
    margin: 0;
    padding: 0;
    font-family: ${primaryFont};
    font-size: 12px;
  }
`;
