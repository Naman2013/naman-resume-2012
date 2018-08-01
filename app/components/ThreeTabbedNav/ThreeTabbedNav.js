/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { dropShadowContainer } from 'styles/mixins/utilities';
import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import styles from './ThreeTabbedNav.style';

const {
  any,
  arrayOf,
  bool,
  func,
  instanceOf,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class ThreeTabbedNav extends Component {
  static propTypes = {
    firstTitle: string.isRequired,
    firstTabIsActive: bool,
    firstTabOnClick: func.isRequired,
    secondTitle: string.isRequired,
    secondTabIsActive: bool,
    secondTabOnClick: func.isRequired,
    thirdTitle: string.isRequired,
    thirdTabIsActive: bool,
    thirdTabOnClick: func.isRequired,
  }

  static defaultProps = {
    firstTabIsActive: true,
    secondTabIsActive: false,
    thirdTabIsActive: false,
  };

  state = {
  };

  render() {
    const {
      firstTitle,
      firstTabIsActive,
      firstTabOnClick,
      secondTitle,
      secondTabIsActive,
      secondTabOnClick,
      thirdTitle,
      thirdTabIsActive,
      thirdTabOnClick,
    } = this.props;
    return (<div className="root component-container">
      <div className="split-nav-item-container" onClick={firstTabOnClick}>
        <div className="split-nav-item" dangerouslySetInnerHTML={{ __html: firstTitle }} />
        <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
          className={classnames('arrow', {
          'is-hidden': !firstTabIsActive,
        })} />
      </div>
      <div className="split-nav-item-container" onClick={secondTabOnClick}>
        <div className="split-nav-item" dangerouslySetInnerHTML={{ __html: secondTitle }} />
        <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg" className={classnames('arrow',{
          'is-hidden': !secondTabIsActive,
        })} />
      </div>
      <div className="split-nav-item-container" onClick={thirdTabOnClick}>
        <div className="split-nav-item" dangerouslySetInnerHTML={{ __html: thirdTitle }} />
        <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg" className={classnames('arrow',{
          'is-hidden': !thirdTabIsActive,
        })} />
      </div>
      <style jsx>{styles}</style>
    </div>);
  }
}

export default ThreeTabbedNav;
