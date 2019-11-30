import css from 'styled-jsx/css';
import { seashell, shadows } from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';

export default css`
  .form-container {
    width: 100%;
  }
  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .flex-right {
    display: flex;
    justify-content: flex-end;
  }
  .form {
    padding: 15px;
  }
  .form-input-txt {
    -moz-box-shadow: inset 0 0 7px 0 ${shadows};
    -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
    background-color: ${seashell};
    border-radius: 4px;
    border: 0;
    box-shadow: inset 0 0 7px 0 ${shadows};
    font-family: ${secondaryFont};
    font-size: 16px;
    padding: 25px;
    resize: none;
    vertical-align: top;
    width: 100%;
    margin-bottom: 15px;
  }
  :global(.form-input) {
    margin-bottom: 15px;
  }

  :global(.form-acitons label) {
    margin: 0;
    margin-right: 5px;
  }

  :global(.form-container .multi-upload-image-list) {
    padding-left: 25px !important;
    padding-right: 25px !important;
    margin-bottom: 0;
  }

  :global(.form-actions .thumbnails-container button) {
    margin: 0;
  }
`;
