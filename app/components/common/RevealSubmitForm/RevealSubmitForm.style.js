import css from 'styled-jsx/css';
import {
  seashell,
  shadows,
  romance,
  hawkesBlue,
} from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { profilePhotoStyle } from 'app/styles/mixins/utilities';

export const profPic = photoUrl =>
  Object.assign(profilePhotoStyle(photoUrl), {
    height: '14px',
    width: '14px',
    backgroundSize: 'cover',
    marginRight: '10px',
  });

export default css`
  .root {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    min-height: 120px;
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
    background-color: ${romance};
    border-radius: 5px;
    padding: 50px 40px 40px;
  }
  .fake-input {
    -moz-box-shadow: inset 0 0 7px 0 ${shadows};
    -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
    background-color: ${seashell};
    border-radius: 4px;
    border: 0;
    box-shadow: inset 0 0 7px 0 ${shadows};
    font-family: ${secondaryFont};
    font-size: 16px;
    height: 60px;
    margin: auto;
    padding: 25px;
    resize: none;
    vertical-align: top;
    width: 260px;
  }
  .reveal-form-input {
    -moz-box-shadow: inset 0 0 7px 0 ${shadows};
    -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
    background-color: ${seashell};
    border-radius: 4px;
    border: 0;
    box-shadow: inset 0 0 7px 0 ${shadows};
    font-family: ${secondaryFont};
    font-size: 16px;
    margin: 0 auto 21px;
    padding: 25px;
    resize: none;
    vertical-align: top;
    width: 100%;
  }

  .form-author {
    display: flex;
    font-size: 11px;
    text-transform: uppercase;
    padding-bottom: 4px;
    border-bottom: 1px solid ${hawkesBlue};
  }

  .form-quote {
    padding: 15px;
    font-size: 20px;
  }

  .buttons-wrapper {
    display: flex;
  }

  :global(.form-actions .file-upload-label) {
    margin: 0;
    margin-right: 5px;
  }

  :global(.form-actions .thumbnails-container button) {
    margin: 0;
  }

  @media ${screenMedium} {
    .fake-input {
      width: 540px;
    }
    .reveal-form-input {
      width: 400px;
    }
  }

  @media ${screenLarge} {
    .fake-input {
      width: 540px;
    }
    .reveal-form-input {
      width: 400px;
    }
  }
`;
