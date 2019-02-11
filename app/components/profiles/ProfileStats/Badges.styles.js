import css from 'styled-jsx/css';

export default css`
  .badges-list {
    min-width: 298px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 0 30px 30px;
  }

  .badges-list :global(a) {
    width: 33%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .badges-list-item img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
`;
