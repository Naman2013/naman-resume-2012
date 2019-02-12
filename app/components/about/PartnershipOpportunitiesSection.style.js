import css from 'styled-jsx/css';
import { screenMedium } from '../../styles/variables/breakpoints';
import { faintShadow } from '../../styles/variables/shadows';
import { hawkesBlue, faintGray } from '../../styles/variables/colors_tiles_v4';
import { secondaryFont } from '../../styles/variables/fonts';

export default css`
  .root {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 40px 10px;
    background-color: ${faintGray}
  }

  .form {
    width: 100%;
    ${faintShadow}
  }

  .contacts {
    width: 100%;
    ${faintShadow}
    margin-top: 20px;
    height: fit-content;
  }

  .header-info {
    padding: 40px 10px;
    font-family: ${secondaryFont};
    border-bottom: 1px solid ${hawkesBlue};
  }

  .header-info h1 {
    margin-top: 0;
    font-size: 24px;
  }
  
  .header-info h2{
    margin-bottom: 0;
    font-size: 19px;
  }

  .bottom-inputs {
    padding: 30px 10px 40px 10px;
  }

  .inputs-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 20px;
  }

  .row-item {
    width: 100%;
  }

  .row-item:nth-of-type(2) {
    margin-top: 20px;
  }

  .input-label {
    margin-bottom: 5px;
  }


  .input {
    padding: 14px 12px;
  }

  .common-input {
    width: 100%;
    box-shadow: inset 0 0 7px 4px #edf0f2;
    background-color: #f4f5f6;
    border: none;
    font-family: ${secondaryFont};
    color: #6e7b8a;
  }

  .text-area {
    padding: 25px 30px;
    margin-bottom: 30px;
    resize: none;
  }

  .bottom-buttons {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }

  .contact-header {
    height: 200px;
    background-color: lightblue;

  }

  .contact-data {
    padding: 20px 40px 40px 40px;
  }

  .contact-title {
    font-family: ${secondaryFont};
    font-size: 24px;
    line-height: 2;
  }

  .contact-label {
    font-size: 11px;
    text-transform: uppercase;
    padding: 15px 0;
    border-top: 1px solid ${hawkesBlue};
  }

  .contact-label-icon {
    margin-right: 15px;
  }

  @media ${screenMedium} {
    .root {
      padding: 40px;
    }

    .form {
      width: 68%;
    }
  
    .contacts {
      width: 30%;
      margin-top: 0;
    }

    .row-item {
      width: 48%;
    }

    .row-item:nth-of-type(2) {
      margin-top: 0;
    }

    .bottom-inputs {
      padding: 30px 50px 40px 50px;
    }

    .header-info {
      padding: 50px;
    }

    .bottom-buttons {
      flex-direction: row;
      justify-content: flex-end;
      align-items: initial;
    }
  }
`;
