import React, { Component, cloneElement } from 'react';
import { withTranslation } from 'react-i18next';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import TabbedNav from 'app/components/TabbedNav';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';

import { toggleGlobalNavMenu } from 'app/modules/global-navigation/actions';
import MENU_INTERFACE from 'app/components/GlobalNavigation/Menus/MenuInterface';

import store from 'app/store';

import Btn from 'app/atoms/Btn';

import styles from './JoinHeader.style';

const { boolean, string, arrayOf, shape } = PropTypes;

@withTranslation()
class JoinHeader extends Component {
  static propTypes = {
    activeTab: string,
    mainHeading: string,
    subHeading: string,
    showHeading: boolean,
    showTabs: boolean,
    showLogin: boolean,
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
    showHeading: true,
    showTabs: true,
    showLogin: false,
  };

  changeActiveTab = activeTab => {
    // do nothing for now
    // browserHistory.push(activeTab);
  };

  openLoginPanel = props => {
    store.dispatch(
      toggleGlobalNavMenu({
        activeMenu: MENU_INTERFACE.PROFILE.name,
        isLeftOpen: false,
        isRightOpen: true,
        activeLeft: MENU_INTERFACE.MAIN.name,
        activeRight: MENU_INTERFACE.PROFILE.name,
        isNotificationMenuOpen: false,
      })
    );
  };

  render() {
    const { t } = this.props;
    const {
      showHeading,
      showTabs,
      showLogin,
      activeTab,
      mainHeading = t('Ecommerce.JoinMainHeader'),
      subHeading = t('Ecommerce.JoinSubHeader'),
      tabs,
      backgroundImage,
    } = this.props;

    return (
      <div className="root">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <div className="header">
            {showHeading && (
              <div className="inner-header-container">
                <div className="inner-header-text">
                  <div className="big">{mainHeading}</div>
                  <div style={{display: 'inline-block'}} className="little">{subHeading}
	                  {showLogin == true && (
        	            <>
                	      <span style={{display: 'inline-block'}} className="little">
                        	If you are a member or were invited to Slooh by a
	                        teacher, please{' '}
        	                <Link
                	          style={{
                        	    cursor: 'pointer',
                          	    textDecoration: 'none',
 	                           color: '#337ab7',
        	                    fontWeight: 'bold',
                	          }}
                        	  onClick={this.openLoginPanel}
                       		 >
                          	login
                        	</Link>{' '}
                        	to access your account.
                      	    </span>
                    	</>
                  )}		
		  </div>
                </div>
                {showTabs && (
                  <TabbedNav
                    tabs={tabs}
                    activeTabValue={activeTab}
                    onTabClick={this.changeActiveTab}
                    theme={{ position: 'absolute', bottom: 0 }}
		    isClickable={false}
                  />
                )}
              </div>
            )}
          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <div className="inner-header-text">
            <div className="big">{mainHeading}</div>
            <div style={{display: 'inline-block'}} className="little">{subHeading}
            	{showLogin == true && (
              	<>
                	<span style={{display: 'inline-block'}} className="little">
                  	If you are a member or were invited to Slooh by a teacher,
                  	please{' '}
                  	<Link
                    	style={{
                      	textDecoration: 'none',
                      	color: '#337ab7',
                      	fontWeight: 'bold',
                    	}}
                    	onClick={this.openLoginPanel}
                  	>
                	    login
        	          </Link>{' '}
	                  to access your account.
                	</span>
              	</>
            	)}
	    </div>
          </div>
          {showTabs && (
            <TabbedNav
              tabs={tabs}
              activeTabValue={activeTab}
              onTabClick={this.changeActiveTab}
	      isClickable={false}
            />
          )}
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
