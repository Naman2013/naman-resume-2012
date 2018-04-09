export default parent => (`
  .${parent}::-webkit-scrollbar {
    width: 4px;
  }

  .${parent}::-webkit-scrollbar-track {
    background-color: #9b9b9b;
  }

  .${parent}::-webkit-scrollbar-thumb {
    background-color: #2e2e37;
    // add fancy white ribbon from design
    box-shadow: 3px 0px 0px 3px #fff;
  }
`);
