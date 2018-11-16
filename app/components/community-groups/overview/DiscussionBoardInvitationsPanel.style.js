import css from 'styled-jsx/css';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';
import { moodyBleu, shadows } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

export default css`  

  .discuss-container {
    margin-top: 15px;
  }

  .button-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .button-cancel {
    margin-top: -59px;
    justify-content: flex-start;
  }

  .button-invite {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .customer-links {
    padding: 40px;
    padding-top: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 1px #ced2d8;
  }

  .customer-links h2 {
    font-size: 20px;
    font-family: ${secondaryFont};
  }

  .customer-links p {
    font-family: ${secondaryFont};
    color: ${moodyBleu};
  }
  
  .Rtable {
    display: block;
    font-size: 13px;
    border: 1px solid ${shadows};
    margin-bottom: 15px;
    padding: 5px;
  }
  
  .Rtable-cell {
    box-sizing: border-box;
    flex-grow: 1;
    width: 100%;
    padding: 5px 15px;
    overflow: hidden;
    list-style: none;
  }  

  .Rtable .lastCell {
    border-top: 1px solid ${shadows};
    margin-top: 20px;
    padding: 20px;
  }
  
  .Rtable-cell .but {
    float: right;
  }

  .header {
    display: none;
  }

  @media ${screenMedium} { 
    .Rtable {
      display: flex;
      flex-wrap: wrap;
      border: none;
      margin-bottom: 15px;
      padding: 5px;
    }

    .header {
      display: flex;
      border-bottom: 1px solid ${shadows};
      margin-bottom: 40px;
    }

    .Rtable-cell {
      padding: 0;
    }

    .Rtable-cell .but {
      float: right;
    }

    .Rtable .lastCell {
      border-top: none;
      margin-top: 0;
      padding: 0;
    }

    .Rtable--2cols > .Rtable-cell  { width: 50%;    }
    .Rtable--3cols > .Rtable-cell  { width: 33.33%; }
    .Rtable--4cols > .Rtable-cell  { width: 25%;    }
    .Rtable--5cols > .Rtable-cell  { width: 20%;    }
    .Rtable--6cols > .Rtable-cell  { width: 15%;    }    
    
    .Rtable--6cols .Rtable-cell:last-child { width: 25%; text-align: right; }
  }
`;
