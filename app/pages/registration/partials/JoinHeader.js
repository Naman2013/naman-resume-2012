import React, { Component, cloneElement } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import TabbedNav from 'components/TabbedNav';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import styles from './JoinHeader.style';

const {
  string
} = PropTypes;

const TABS = [
  {
    label: 'Step 1',
    value: '/join/step1',
  },
  {
    label: 'Step 2',
    value: '/join/step2',
  },
  {
    label: 'Step 3',
    value: '/join/step3',
  },
];

class JoinHeader extends Component {

  static propTypes = {
    activeTab: string,
    mainHeading: string,
    subHeading: string,
  };

  static defaultProps = {
    activeTab: '/join/step1',
    mainHeading: 'Joining Slooh is easy!',
    subHeading: 'Join Slooh in three easy steps! Simply select a plan, enter your details, make your payment and you\'re in!',
  }


  changeActiveTab = (activeTab) => {
    // do nothing for now
    // browserHistory.push(activeTab);
  }

  render() {
    const {
      activeTab,
      mainHeading,
      subHeading,
    } = this.props;



    return (
      <div className="root">
        <DisplayAtBreakpoint
          screenMedium
          screenLarge
          screenXLarge
        >
          <div className="header">
            <div className="inner-header-container">
              <div className="inner-header-text">
                <div className="big">{mainHeading}</div>
                <div className="little">{subHeading}</div>
              </div>
              <TabbedNav
                tabs={TABS}
                activeTabValue={activeTab}
                onTabClick={this.changeActiveTab}
              />
            </div>

          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint
          screenSmall
        >
          <div>
            <TabbedNav
              tabs={TABS}
              activeTabValue={activeTab}
              onTabClick={this.changeActiveTab}
            />
          </div>
        </DisplayAtBreakpoint>
        <style>{styles}</style>
      </div>
    );
  }
}

export default JoinHeader;
