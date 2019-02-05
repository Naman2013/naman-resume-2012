import css from 'styled-jsx/css';
import { white_tile_paper, hawkesBlue, lightHeadedAstronaut, moodyBleu, shadows } from 'styles/variables/colors_tiles_v4';

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
    width: 80%;
    background-image: url(${white_tile_paper});
    box-shadow: 0 0 6px 0 ${shadows};
    min-height: 500px;
    ${centerChildren}
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
    background-image: linear-gradient(to bottom, #edf0f2, rgba(241, 243, 244, 0.89) 8%, rgba(255, 255, 255, 0));
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
    // height: 100%;
  }

  .picture { 
    width: 35%;
    flex-grow: .3;
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
    width: 300px;
    height: 300px;
    box-shadow: 0 0 6px 0 #ced2d8;
    padding: 3px;
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
`;