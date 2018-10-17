/***********************************
* V4 Dynamic Tabbed Nav
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { dropShadowContainer } from 'styles/mixins/utilities';
import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import styles from './TabbedNav.style';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
  oneOfType,
} = PropTypes;

class TabbedNav extends Component {
  static propTypes = {
    tabs: arrayOf(shape({
      label: string,
      value: oneOfType([string, number]),
    })).isRequired,
    onTabClick: func.isRequired,
    activeTabValue: oneOfType([string, number]),
    theme: shape({}),
  }

  static defaultProps = {
    activeTabValue: 0,
    theme: {},
  };

  changeActiveTab = (e) => {
    const { tab } = e.currentTarget.dataset;
    this.props.onTabClick(tab);
  }

  render() {
    const {
      tabs,
      activeTabValue,
      theme,
    } = this.props;
    return (<div key={uniqueId()} className="root component-container" style={theme}>
      {tabs.map((tile) => (
        <div key={uniqueId()} className="split-nav-item-container" data-tab={tile.value} onClick={this.changeActiveTab}>
          <div className="split-nav-item" dangerouslySetInnerHTML={{ __html: tile.label }} />
          <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
            className={classnames('arrow', {
            'is-hidden': activeTabValue != tile.value,
          })} />
        </div>
      ))}
      <style jsx>{styles}</style>
    </div>);
  }
}

export default TabbedNav;
