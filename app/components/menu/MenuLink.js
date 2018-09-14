import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';

class MenuLink extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    const { handleClick, index, data } = this.props;
    const hasPageLinkProtocol = data.pageLink.split(':')[0] === 'https';
    if (data.pageLink) {
      if (hasPageLinkProtocol) {
        window.open(data.pageLink);
      } else {
        browserHistory.push(data.pageLink);
      }
    }
    if (!hasPageLinkProtocol) {
      handleClick(index);
    }
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
          {
            !isSpacer && <img alt="" src={data.iconUrl} />
          }
          {text}
        </a>
      </li>
    );
  }
}

export default MenuLink;
