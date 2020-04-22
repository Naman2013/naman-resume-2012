import DropDown from 'app/components/common/DropDown';
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import _findIndex from 'lodash/findIndex';
import './styles.scss';

export class Nav extends Component {
  handleSelect = (e, { value }) => {
    browserHistory.push(value);
  };

  getDropDownOpts = opts =>
    opts.map(item => ({
      label: item.title,
      value: item.linkURL,
    }));

  getSelectedIndex = opts => {
    const { location } = this.props;
    const { pathname } = location;
    return _findIndex(opts, { value: pathname });
  };

  render() {
    const { items, getMissions } = this.props;
    const opts = this.getDropDownOpts(items);
    const selectedInd = this.getSelectedIndex(opts);
   
    return (
      <div className="nav-container container-fluid">
        {/* Navigation Items */}
        <ul className="list-inline nav-items d-none d-sm-block">
          {items.map(el => (
            <li key={el.linkURL} className="list-inline-item">
              {el.locked && <img alt="" className="icon" src={el.lockedIconURL} />}
              <Link activeClassName="active-menu-item" to={el.linkURL} onClick={getMissions}>
                {el.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Navigation Dropdown */}
        <div className="nav-dropdown d-block d-sm-none">
          <DropDown
            handleSelect={this.handleSelect}
            selectedIndex={selectedInd}
            options={opts}
          />
        </div>
        <style jsx>{`

        .icon {
          padding: 10px;
        }
        
        `}</style>
      </div>
    );
  }
}
