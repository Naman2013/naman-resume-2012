import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from '../../../../styles/variables/breakpoints';
import { hawkesBlue, white_texture_bg, moodyBleu, shadows, lightHeadedAstronaut } from '../../../../styles/variables/colors_tiles_v4';

const borderBottom = `border-bottom: 1px solid ${hawkesBlue};`;
const centerChildren = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const toUpper = `
  text-transform: uppercase;
`;

export default css`
  .card-obs-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    color: ${lightHeadedAstronaut};
  }

  .card-obs {
    pointer-events: auto;
    background: url(${white_texture_bg});
    box-shadow: 0 0 6px 0 ${shadows};
    min-height: 500px;
    max-height: 500px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .top {
    padding: 80px 80px 50px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: initial;
  }

  .bottom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    box-shadow: inset 0 7px 9px -7px ${shadows};
  }

  .buttons {
    display: flex;
    height: 100%;
    font-size: 11px;
  }

  .button {
    ${toUpper}
    padding: 20px 15px;
    ${centerChildren}
  }

  .button:not(:last-child) {
    border-right: 1px solid #dee0e2;
  }

  .capture-date {
    ${toUpper}
    ${centerChildren}
    font-size: 10px;
    color: ${moodyBleu};
    margin-right: 20px;
  }

  .info {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .picture { 
    width: 35%;
    ${centerChildren}
    justify-content: flex-end;
  }

  .title {
    font-size: 24px;
    ${borderBottom}
    line-height: 0.83;
    padding: 12px 0;
  }

  .author {
    font-size: 10px;
    ${borderBottom}
    ${toUpper}
    padding: 4px 0;
  }

  .text {
    font-size: 19px;
    padding: 20px 0;
    color: #616e7d;
  }

  .image-wrapper {
    box-shadow: 0 0 6px 0 #ced2d8;
    padding: 3px;
    margin: 0;
  }

  .image-wrapper img{
    width: 100%;
    height: 100%;
  }

  .links {
    display: flex;
  }

  .link {
    ${centerChildren}
    background-color: ${lightHeadedAstronaut};
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  .link:not(:last-child) {
    margin-right: 25px;
  }

  .details {
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon {
    margin-right: 8px
  }

  .linkIcon {
    width: 20px;
    height: 20px;
    transform: rotate(-45deg);
  }

  @media ${screenMedium} {
    .card-obs {
      width: 95%;
    }

    .image-wrapper {
      width: 240px;
      height: 240px;
    }

    .info {
      width: 48%
    }

    .picture {
      width: 48%
    }

    .top {
      padding: 45px 50px 50px;
    }
  }

  @media ${screenLarge} {
    .card-obs {
      width: 80%;
    }
    .image-wrapper {
      width: 300px;
      height: 300px;
    }
    .info {
      width: 55%
    }
    .picture {
      width: 40%
    }
    .top {
      padding: 80px 80px 50px;
    }
  }
`;