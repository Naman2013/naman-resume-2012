import React, { Component, cloneElement } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import TabbedNav from 'components/TabbedNav';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import styles from './JoinHeader.style';

const {
  string,
  arrayOf,
  shape,
} = PropTypes;


class JoinHeader extends Component {

  static propTypes = {
    activeTab: string,
    mainHeading: string,
    subHeading: string,
    tabs: arrayOf(shape({
      label: string,
      value: string,
    })),
  };

  static defaultProps = {
    tabs: [],
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
      tabs,
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
                tabs={tabs}
                activeTabValue={activeTab}
                onTabClick={this.changeActiveTab}
                theme={ {position: 'absolute', bottom: 0 } }
              />
            </div>

          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint
          screenSmall
        >
          <div className="inner-header-text">
            <div className="big">{mainHeading}</div>
            <div className="little">{subHeading}</div>
          </div>
            <TabbedNav
              tabs={tabs}
              activeTabValue={activeTab}
              onTabClick={this.changeActiveTab}
            />

        </DisplayAtBreakpoint>
        <style>{styles}</style>
      </div>
    );
  }
}

export default JoinHeader;
