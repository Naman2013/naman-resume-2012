import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import classnames from 'classnames';

class MenuLink extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    const { handleClick, index, data } = this.props;
    if(data.pageLink) {
      hashHistory.push(data.pageLink);
    }
    handleClick(index);
  }

  parseDataNav(en) {
    return `nav-${en.toLowerCase()}`;
  }

  render() {
    const { data } = this.props;
    const { text } = data;
    const isSpacer = data.type === 'NAV_TYPE_MENU_SPACER';
    const menuLinkClass = classnames({ spacer: isSpacer });
    return (
      <li className={menuLinkClass}>
        <a onClick={this.handleMenuClick} data-nav={this.parseDataNav(text)}>
          {!isSpacer && <img src={data.iconUrl} />}
          {text}
        </a>
      </li>
    );
  }
}

export default MenuLink;
