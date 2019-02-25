import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { screenMedium, screenLarge } from '../../../styles/variables/breakpoints';
import { romance, astronaut, black } from '../../../styles/variables/colors_tiles_v4';

export default css`
  .loading {
    width: 50%;
    margin:  25px 50%;
    transform: translateX(-50%);
    text-transform: lowercase;
  }

  .rest-of-list {
    height: 100%;
    overflow-y: auto;
  }

  .action-menu-container {
    position: relative;
  }

  .create-gallery {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .action-create {
    margin: 5px;
    padding-top: 2px;
    border-radius: 50%;
    background: ${romance};
    color: ${astronaut};
    border: 2px solid ${astronaut};
  }

  .action-create:hover {
    background: ${astronaut};
    color: ${romance};
  }

  .name-input {
    border: none;
    color: ${astronaut};
    width: 90%;
    padding: 10px 5px;
  }

  .name-input::-webkit-input-placeholder,
  .name-input:-ms-input-placeholder,
  .name-input::-moz-placeholder,
  .name-input:-moz-placeholder {
    color: ${astronaut};
  }

  :global(.add-gallery-context-menu) {
    margin-top: -30px;
    margin-left: 30px;
    margin-right: -200px;
    z-index: 999999;
    background-color: ${romance};
    color: ${black};
    padding-bottom: 30px;
    overflow: hidden;
    font-size: 14px;
  }
`;
