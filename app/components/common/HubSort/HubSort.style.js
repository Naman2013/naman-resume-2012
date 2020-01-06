import css from 'styled-jsx/css';
import { astronaut, seashell } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .root {
  }

  .dots-container {
    position: absolute;
    right: 0;
    height: 40px;
    width: 40px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px dashed ${astronaut};
  }

  :global(.slooh-select__menu-list) {
    cursor: pointer;
  }

  .context-container {
    position: absolute;
    right: 0;
  }

  .sort-dropdown-container {
    background-color: ${seashell};
  }

  @media screen and (max-width: 450px) {
    .context-container.toggle {
      width: 100%;
    }
  }
`;
