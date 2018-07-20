import css from 'styled-jsx/css';
import { faintGray } from 'styles/variables/colors_tiles_v4';

export const CONTAINER_WIDTH = 440;

export default css`
  .root {
    display: relative;
    width: 100px;
    overflow: hidden;
  }

  .menu-container {
    position: absolute;
    top: 108px;
    width: ${Math.abs(CONTAINER_WIDTH)}px;
    height: 100%;
    background-color: ${faintGray};
    transition: right ease-out 0.15s;
  }
`;
