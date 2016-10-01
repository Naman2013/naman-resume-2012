import React, { Component } from 'react';

export default class MenuLink extends Component {
  handleClick = () => {
    const { props: { handleClick, index } } = this;
    handleClick(index);
  };

  parseDataNav = en => `nav-${en.toLowerCase()}`;

  render() {
    const { handleClick, parseDataNav, props: { data } } = this;

    return (
      <li>
        <a
          onClick={handleClick}
          data-nav={parseDataNav(data.label.en)}>
          {data.label.en}
        </a>
      </li>
    );
  }
}
