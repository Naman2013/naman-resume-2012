import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { shadows } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .padding {
    padding: 30px 40px;
    box-shadow: 0 0 6px 0 ${shadows};
  }

  .observation-title {
    font-family: ${secondaryFont};
    text-transform: none;
    margin-bottom: 15px;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottom {
    display: flex;
  }

  .likes {
    flex-basis: 25%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #dee0e2;
  }

  .comments {
    flex-basis: 25%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #dee0e2;
  }

  .details {
    flex-basis: 50%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .details span {
    text-transform: uppercase;
  }

  .icon {
    margin-right: 8px;
  }

  .observation-image-wrapper {
    width: 100%;
    padding-top: 100%;
    position: relative;
  }

  .image-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #dee0e2;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 98%;
    height: 98%;
    margin: 1%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  .inCenter {
    margin-left: 2%;
    margin-right: 2%;
  }

  .observationCard {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 6px 0 #ced2d8;
    font-size: 11px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    color: #41566f;
  }

  .root {
    margin-top: 20px;
    color: black;
    flex-basis: 100%;
  }

  @media ${screenMedium} {
    .root {
      flex-basis: 48%;
      max-width: 48%;
    }
    .mission-image-wrapper {
      display: flex;
    }
  }

  @media ${screenLarge} {
    .root {
      flex-basis: 32%;
      max-width: 32%;
    }
  }
`;
