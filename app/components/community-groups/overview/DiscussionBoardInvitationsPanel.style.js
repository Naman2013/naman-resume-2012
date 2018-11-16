import css from 'styled-jsx/css';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';

export default css`  
  .root {
  }

  .discuss-container {
    margin-top: 15px;
  }

  .button-actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .submit-button {

  }

  .customer-links {
    padding: 0 40px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 1px #ced2d8;
  }

  .customer-links h2 {
    font-size: 24px;
  }

  .customer-links h3 {
    font-size: 16px;
  }
  
  .Rtable {
    display: block;
    font-size: 13px;
    border: 1px solid #ccc;
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
    }

    .Rtable-cell {
      padding: 0;
    }

    .Rtable-cell .but {
      float: right;
    }

    .Rtable--2cols > .Rtable-cell  { width: 50%;    }
    .Rtable--3cols > .Rtable-cell  { width: 33.33%; }
    .Rtable--4cols > .Rtable-cell  { width: 25%;    }
    .Rtable--5cols > .Rtable-cell  { width: 20%;    }
    .Rtable--6cols > .Rtable-cell  { width: 15%;    }    
    
    .Rtable--6cols .Rtable-cell:last-child { width: 25%; text-align: right; }
  }
`;
