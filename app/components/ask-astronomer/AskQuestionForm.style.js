import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, romance, midnight_express, geyser, blue_tile_guides, white_tile_texture, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

  .modal-content {
    border-radius: 0;
  }

  .ask-modal {
    font-family: ${primaryFont};
    text-transform: uppercase;
  }

  .container {
    padding: 40px;
    width: 100%;
  }

  .question-title {
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-size: 12px;
    width: 100%;
    padding-bottom: 40px;
    font-weight: 600;
    letter-spacing: 1.5px;
  }

  .button-input-container {
    flex: 1;
  }


  .flex-right {
    display: flex;
    justify-content: flex-end;
    flex: 2;
  }

  .counter {
    font-family: ${primaryFont};
    font-size: 10px;
    letter-spacing: 3px;
    margin: -30px 20px 30px 0;
    color: #8D969F;
    display: flex;
    justify-content: flex-end;
  }

  .question-input {
    border-width: 0px;
    height: 200px;
    width: 100%;
    padding: 20px;
    color: #8D969F !important;
    vertical-align: top;
    letter-spacing: .5px;
    resize: none; 
    box-shadow: inset 0px 0px 14px 1px rgba(240,240,240,1);
  } 
  
  .question-button {
    display: block;
    width: 100px;
    padding: 5px 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 10px;
    margin-top: 10px;
  }

  .guide-link {
    font-style: italic;
    letter-spacing: 1px;
    flex: 1;
  }

  .guide-link .styld {
    color: #41566F !important;
  }

  .btn-row {
    display: flex;
    align-items: center;
  }

  .loader {
    display: block;
    text-align: center;
    font-size: 12px;
  }
`;
