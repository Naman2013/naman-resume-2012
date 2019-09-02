import css from 'styled-jsx/css';

export default css`
  .badges-list {
    min-width: 320px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding-top: 20px;
    padding: 0 30px 30px;
  }

  .blue-shield-badge {
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(https://vega.slooh.com/assets/v4/common/quest_shield.png);
    width: 75px;
    height: 75px;
    left: calc(50% - 47px);
    top: -15px;
  }

  .badges-list :global(a) {
    width: 33%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .badges-list-item-div {
    margin-top: 40px;
    width: 100px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  .badges-list-item-img-span {
    min-width: 100px;
    min-height: 60px;
    width: 100px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px;
    position: relative;
  }

  .badges-list-item-img {
    object-fit: cover;
    position: absolute;
    width: 30px;
    height: 30px;
    left: 25px;
    top: 5px;
}
  }
  .badges-list-item-description {
    min-width: 100px;
    width: 100px;
    padding: 0px;
    margin-left: -10px;
    text-align: center;
    margin-top: 5px;
  }
`;
