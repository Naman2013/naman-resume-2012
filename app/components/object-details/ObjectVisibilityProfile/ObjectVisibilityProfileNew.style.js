import css from 'styled-jsx/css';
import { primaryFont } from 'app/styles/variables/fonts';
import { astronaut, lightHeadedAstronaut } from 'app/styles/variables/colors_tiles_v4';
import { faintShadow } from 'app/styles/variables/shadows';
import { resetMarginPadding } from 'app/styles/variables/utils';
import { screenLarge, screenMobile, screenTablet } from 'app/styles/variables/breakpoints';

export default css`

  .obs-visibility-root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .select-field {
    ${faintShadow}
    ${resetMarginPadding}
    display: inline-block;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .day-sell {
    ${faintShadow}
    ${resetMarginPadding}
    display: inline-block;
    margin-right: 15px;
    padding: 5px 7.5px;
    cursor: pointer;
    min-width: 60px;
  }
  .day-sell:focus {
    outline:0;
  }
  .day-sell:active {
    outline:none;
  }

  .day-month {
    text-align: center;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    outline: none;
  }

  .rise-set-subtitle {
    margin-top: 15px;
  }

  .is-active {
    border-bottom: 3px solid ${lightHeadedAstronaut};
  }

  .option-label {
    ${resetMarginPadding}
    border-bottom: 3px solid ${lightHeadedAstronaut};
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-weight: 600;
    font-size: 12px;
    padding: 10px 15px;
    cursor: pointer;
  }

  .field-value-name {
    display: inline-block;
    // margin-right: 40px;
    min-width: 130px;
  }

  .select {
    position: absolute;
    left: 0;
    width: 100%;
    opacity: 0;
  }

  .rise-title {  
    
    font-family: ${primaryFont};
    font-weight: 600;
    font-size: 24px; 
    color: ${astronaut};
    text-align: center;
  }

  .rise-subtitle {  
    
    font-family: ${primaryFont};
    font-weight: 500;
    font-size: 20px; 
    color: ${astronaut};
    text-align: center;
  }

  .rise-visibility-text {  
    
    font-family: ${primaryFont};
    font-weight: 500;
    font-size: 20px; 
    color: ${astronaut};
    text-align: center;
  }

  .local-rise-title{
    font-size: 11px;
    text-transform: uppercase;    
    letter-spacing: 1px;
    font-weight: 600;
    font-family: ${primaryFont};
    margin: 0;
    margin-bottom: 10px;
    white-space: nowrap;
  }

  .read-more{
    background: ${astronaut};
    color: white;
    padding-left: 30px;
    padding-top: 2px;
    height: 25px;
    cursor: pointer;
  }

  .center-label{
    // text-align center;
    margin-left: 0.5in;
    font-family: ${primaryFont};
    font-size: 16px;
  }

  .select option {
    font-family: ${primaryFont};
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
  }

  .chart-div{
    width: 100%;
    height: 500px;
    border: none;
    box-shadow: 0px 0px 3px 3px rgb(0 0 0 / 10%);
  }

  .enlarge-button{
    cursor: pointer;
    position: absolute;
    right: 0px;
    border: 1px dashed #41566f;
    padding: 5px;
  }

  .visibility-div{
    position: relative;
  }

  @media ${screenLarge} {
    .obs-visibility-root {
      // flex-direction: row;
    }
  }
  
  @media ${screenMobile} {
    .center-label{     
      margin-left: 10px;
    }
  }
`;
