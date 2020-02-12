/***********************************
 * V4 Dynamic Tabbed Nav
 *
 *
 *
 ***********************************/

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { triangleUp } from 'app/styles/variables/iconURLs';
import styles from './TabbedNav.style';

const { boolean, arrayOf, func, number, shape, string, oneOfType } = PropTypes;

class TabbedNav extends Component {
  static propTypes = {
    tabs: arrayOf(
      shape({
        label: string,
        value: oneOfType([string, number]),
      })
    ).isRequired,
    onTabClick: func.isRequired,
    activeTabValue: oneOfType([string, number]),
    theme: shape({}),
    isClickable: boolean,
  };

  static defaultProps = {
    activeTabValue: 0,
    theme: {},
    isClickable: true,
  };

  changeActiveTab = e => {
    const { tab } = e.currentTarget.dataset;
    this.props.onTabClick(tab);
  };

  render() {
    const { tabs, activeTabValue, theme, isClickable } = this.props;
    
    return (
      <Fragment>
      {isClickable === false && 
	      <div key={uniqueId()} className="root component-container" style={theme}>
        	{tabs.map(tile => (
	          <button
		    disabled={!isClickable}
	            key={uniqueId()}
        	    className="split-nav-item-container"
		    style={{cursor: "default"}}
	            data-tab={tile.value}
        	    onClick={this.changeActiveTab}
	          >
        	    <div style={{cursor: "default"}} className="split-nav-item">{tile.label}</div>
	            <img	
        	      src={triangleUp}
	              className={classnames('arrow', {
        	        'is-hidden': activeTabValue != tile.value,
	              })}
        	      alt="selected icon"
	            />
        	  </button>
	        ))
		}
		</div>
	}

      {isClickable === true && 
	      <div key={uniqueId()} className="root component-container" style={theme}>
        	{tabs.map(tile => (
	          <button
		    disabled={!isClickable}
	            key={uniqueId()}
        	    className="split-nav-item-container"
	            data-tab={tile.value}
        	    onClick={this.changeActiveTab}
	          >
        	    <div className="split-nav-item">{tile.label}</div>
	            <img	
        	      src={triangleUp}
	              className={classnames('arrow', {
        	        'is-hidden': activeTabValue != tile.value,
	              })}
        	      alt="selected icon"
	            />
        	  </button>
	        ))
		}
		</div>
	}

        <style jsx>{styles}</style>

	</Fragment>
    );
  }
}

export default TabbedNav;
