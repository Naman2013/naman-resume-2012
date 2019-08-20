import css from 'styled-jsx/css';

export default css`
  .badges-list {
    min-width: 320px;
    max-width: 320px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding-top: 20px;
    padding: 0 30px 30px;
  }

  .badges-list :global(a) {
    width: 33%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .badges-list-item-div {
    margin-top: 30px;
    width: 100px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .badges-list-item-img-span {
    min-width: 100px;
    min-height: 60px;
    width: 100px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px;
  }

  .badges-list-item-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
  .badges-list-item-description {
    min-width: 100px;
    width: 100px;
    padding: 0px;
    margin-left: -10px;
  }
`;
