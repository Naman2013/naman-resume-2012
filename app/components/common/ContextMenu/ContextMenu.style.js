import css from 'styled-jsx/css';
import { primaryFont } from 'styles/variables/fonts';
import { faintGray, astronaut, lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';
import { shadyBottomShadow } from 'styles/variables/shadows';

export const CONTAINER_WIDTH = 440;

export default css`
  .root {
    width: 100px;
    overflow: hidden;
  }

  .application-veil {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(100, 100, 100, 0.5);
  }

  .dots-container {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 50%;
    width: 52px;
    height: 52px;
    background-color: ${lightHeadedAstronaut};
  }

  .menu-container {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 98px;
    width: ${Math.abs(CONTAINER_WIDTH)}px;
    height: 100%;
    background-color: ${faintGray};
    transition: right ease-out 0.15s;
  }

  .header-container {
    ${shadyBottomShadow}
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
