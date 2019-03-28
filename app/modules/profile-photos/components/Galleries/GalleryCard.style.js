import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { primaryFont } from 'app/styles/variables/fonts';
import { romance, shadows } from 'app/styles/variables/colors_tiles_v4';

const borderColor = 'rgb(217, 222, 228, 0.35)';

export default css`
  .root {
    margin-top: 20px;
    flex-basis: 100%;
  }

  .galleryCard {
    display: flex;
    flex-direction: column;    
    width: 100%;
    height: 100%;
    box-shadow: 0 0 6px 0 ${shadows};
    font-size: 10px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    padding: 30px 40px;
    color: ${romance};
    background-position: center;
    position: relative;
  }

  .inCenter {
    margin-left: 2%;
    margin-right: 2%;
  }

  .gallery-name {
    font-size: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${borderColor};
  }

  .info {
    display: flex;
  }

  .text {
    line-height: 22px;
    font-size: 10px;
    letter-spacing: 2px;
    padding: 7px 0; 
  }

  .date {
    width: 50%;
    box-sizing: border-box;
    border-right: 1px solid ${borderColor};
  }

  .images-count {
    width: 50%;
    box-sizing: border-box;
    // border-left: 0.5px solid ${borderColor};
    padding-left: 14px;
    text-transform: uppercase;
  }

  .more {
    position: absolute;
    top: 15px;
    right: 25px;

  }

  @media ${screenMedium} {
    .root {
      flex-basis: 48%;
    }

    .galleryCard {
      position: absolute;
      top: 0;
      left: 0;
      dispaly: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-bottom: 0 40px 40px 40px;
    }

    .galleryCardWrapper {
      padding-top: 100%;
      position: relative;
    }

    .info {
      border-bottom: 1px solid ${borderColor};
    }
  }

  @media ${screenLarge} {
    .root {
      flex-basis: 32%;
    }
  }
`;
