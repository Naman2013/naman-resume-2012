import React, { Component, cloneElement } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import TabbedNav from 'app/components/TabbedNav';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import styles from './JoinHeader.style';
import messages from './JoinHeader.messages';

const { boolean, string, arrayOf, shape } = PropTypes;

class JoinHeader extends Component {
  static propTypes = {
    activeTab: string,
    mainHeading: string,
    subHeading: string,
    showTabs: boolean,
    tabs: arrayOf(
      shape({
        label: string,
        value: string,
      })
    ),
  };

  static defaultProps = {
    tabs: [],
    activeTab: '/join/step1',
    showTabs: true,
    mainHeading: <FormattedMessage {...messages.JoinMainHeader} />,
    subHeading: <FormattedMessage {...messages.JoinSubHeader} />,
  };

  changeActiveTab = activeTab => {
    // do nothing for now
    // browserHistory.push(activeTab);
  };

  render() {
    const {
      showTabs,
      activeTab,
      mainHeading,
      subHeading,
      tabs,
      backgroundImage,
    } = this.props;

    return (
      <div className="root">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <div className="header">
            <div className="inner-header-container">
              <div className="inner-header-text">
                <div className="big">{mainHeading}</div>
                <div className="little">{subHeading}</div>
              </div>
              {showTabs && <TabbedNav
                tabs={tabs}
                activeTabValue={activeTab}
                onTabClick={this.changeActiveTab}
                theme={{ position: 'absolute', bottom: 0 }}
              />
              }
            </div>
          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <div className="inner-header-text">
            <div className="big">{mainHeading}</div>
            <div className="little">{subHeading}</div>
          </div>
          {showTabs && <TabbedNav
            tabs={tabs}
            activeTabValue={activeTab}
            onTabClick={this.changeActiveTab}
          />
          }
        </DisplayAtBreakpoint>
        <style jsx>{styles}</style>
        <style jsx>
          {`
            .header {
              background-image: url(${backgroundImage});
            }
          `}
        </style>
      </div>
    );
  }
}

export default JoinHeader;
