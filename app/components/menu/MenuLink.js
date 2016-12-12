import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';



class MenuLink extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    const { handleClick, index, data } = this.props;
    if(data.link) {
      hashHistory.push(data.link);
    }
    handleClick(index);
  }

  parseDataNav(en) {
    return `nav-${en.toLowerCase()}`;
  }

  render() {
    const { data } = this.props;
    const { label } = data;

    return (
      <li>
        <a onClick={this.handleMenuClick} data-nav={this.parseDataNav(label.en)}>
          {label.en}
        </a>
      </li>
    );
  }
}

export default MenuLink;
