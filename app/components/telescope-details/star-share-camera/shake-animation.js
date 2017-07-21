export default `
  @keyframes shake-keyframes {
    15%,40%,75%,100% {
      transform-origin:center center
    }
    15% {
      transform:scale(1.4, 1.2);
    }
    40% {
      transform:scale(0.9, 0.9);
    }
    75% {
      transform:scale(1.08, 1);
    }
    100% {
      transform:scale(1, 1);
    }
  }

  .shake {
    animation: shake-keyframes 0.5s ease-out;
  }
`;
