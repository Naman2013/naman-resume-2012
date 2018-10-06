import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './column-tabs.style';

class ColumnTabs extends Component {
  static propTypes = {
    activeTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tabConfiguration: PropTypes.arrayOf(PropTypes.shape({
      tabTitle: PropTypes.string.isRequired,
      content: PropTypes.func.isRequired,
    })),
  }

  static defaultProps = {
    activeTabIndex: 0,
    tabConfiguration: [
      { tabTitle: 'Live', content: () => (<h1>Live stuff!</h1>) },
      { tabTitle: 'Queue', content: () => (<h1>Queue</h1>) },
      { tabTitle: 'Cond.', content: () => (<h1>Conditions!</h1>) },
      { tabTitle: 'Scope', content: () => (<h1>About the telescope..</h1>) },
    ],
  }

  state = { activeTabIndex: this.props.activeTabIndex }

  handleTabClick = (event) => {
    this.setState({ activeTabIndex: event.currentTarget.dataset.index });
  }

  render() {
    return (
      <div>
        <div>
          <ul className="column-tab-set">
            {this.props.tabConfiguration.map((tab, index) => (
              <li className="column-tab">
                <button
                  className={classnames('column-tab-button', { active: (index == this.state.activeTabIndex) })}
                  data-index={index}
                  onClick={this.handleTabClick}
                >
                  {tab.tabTitle}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {this.props.tabConfiguration[this.state.activeTabIndex].content()}
        </div>

        <style jsx>{style}</style>
      </div>
    );
  }
}

export { ColumnTabs };
