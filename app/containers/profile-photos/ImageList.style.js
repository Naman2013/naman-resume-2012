import css from 'styled-jsx/css';

export default css`
  .root {
    display: flex;
    flex-wrap: wrap;
  }
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 40px;
  }

  :global(.uniqclass-for-overflow *) {
    overflow: visible;
  }
`;
