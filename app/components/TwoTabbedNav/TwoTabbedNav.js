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
import { astronaut, geyser, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

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

class TwoTabbedNav extends Component {
  static propTypes = {
    firstTitle: string.isRequired,
    firstTabIsActive: bool,
    firstTabOnClick: func.isRequired,
    secondTitle: string.isRequired,
    secondTabIsActive: bool,
    secondTabOnClick: func.isRequired,
  }

  static defaultProps = {
    firstTabIsActive: true,
    secondTabIsActive: false,
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
    } = this.props;
    return (<div className="root component-container">
      <div className={classnames('split-nav-item-container', {
          'active-item': firstTabIsActive,
        })} onClick={firstTabOnClick}>
        <div className="split-nav-item" dangerouslySetInnerHTML={{ __html: firstTitle }} />
        <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
          className={classnames('arrow', {
          'is-hidden': !firstTabIsActive,
        })} />
      </div>
      <div
        className={classnames('split-nav-item-container', {
          'active-item': secondTabIsActive,
        })}
        onClick={secondTabOnClick}
      >
        <div className="split-nav-item" dangerouslySetInnerHTML={{ __html: secondTitle }} />
        <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg" className={classnames('arrow',{
          'is-hidden': !secondTabIsActive,
        })} />
      </div>
      <style jsx>{`

        .root {
          align-items: center;
          display: flex;
          flex-direction: row;
          font-size: 11px;
          font-weight: bold;
          justify-content: space-evenly;
          padding: 0;
          text-align: center;
          text-transform: uppercase;
          width: 100%;
          background-color: ${romance};
        }

        .is-hidden {
          visibility: hidden;
        }

        .split-nav-item {
          margin: 0 5px;
          margin-top: 15px;
          cursor: pointer;
        }

        .component-container {
          width: 100%;
          ${dropShadowContainer}
        }

        .split-nav-item-container {
          border: 1px solid ${geyser};
          flex: 0 50%;
        }

      `}</style>
    </div>);
  }
}

export default TwoTabbedNav;
