import React, { Component } from 'react';

export default class ListObservatoryChildren extends Component {
  getStatusClass(status) {
    switch (status) {
      case 'offline': {
        return 'scope_offline'; // FIXME: Use `scope-offline` instead of `scope_offline`
      }
      case 'noinfo': {
        return 'scope_noinfo';
      }
      case 'online': {
        return 'scope_online';
      }
      default: {
        return '';
      }
    }
  }

  render() {
    return (
      <p>
        {this.props.data.map((child, i) => {
          if (typeof child !== 'undefined') { // FIXME: Is imposible when server return undefined
            return (
              <li
                key={i}
                className={this.getStatusClass(child.teleOnlineStatus)}
              >
                <a href={child.telePageURL}>
                  {child.teleName}
                </a>
              </li>
            );
          }
        })}
      </p>
    );
  }
}
