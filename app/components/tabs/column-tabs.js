import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColumnTabs extends Component {
  static propTypes = {
    activeTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tabConfiguration: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.func.isRequired,
    })),
  }

  static defaultProps = {
    activeTabIndex: 0,
    tabConfiguration: [{ content: () => 'Please provide tab configuration.' }],
  }

  state = { activeTabIndex: this.props.activeTabIndex }

  render() {
    return (
      <div>
        <div>
          <ul>
            {this.props.tabConfiguration.map(tab => (
              <li>
                <button>{tab.tabTitle}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {this.props.tabConfiguration[this.state.activeTabIndex].content()}
        </div>
      </div>
    );
  }
}

export { ColumnTabs };
