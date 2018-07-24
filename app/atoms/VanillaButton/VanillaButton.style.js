import css from 'styled-jsx/css';

export default css`
  button {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.25s ease-in-out;
  }

  button:focus {
    outline: none;
  }
`;
