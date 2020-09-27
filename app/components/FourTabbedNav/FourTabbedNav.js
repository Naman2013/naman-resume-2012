/***********************************
 * V4 Observations Page
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { dropShadowContainer } from 'app/styles/mixins/utilities';
import {
  astronaut,
  geyser,
  romance,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { faintShadow } from 'app/styles/variables/shadows';

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

class FourTabbedNav extends Component {
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
    fourthTabIsActive: bool,
    fourthTabOnClick: func.isRequired,
  };

  static defaultProps = {
    firstTabIsActive: true,
    secondTabIsActive: false,
    thirdTabIsActive: false,
    fourthTabIsActive: false,
  };

  state = {};

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
      fourthTitle,
      fourthTabIsActive,
      fourthTabOnClick,
    } = this.props;
    return (
      <div className="root component-container">
        <div className="split-nav-item-container" onClick={firstTabOnClick}>
          <div
            className={classnames("split-nav-item",{'active': firstTabIsActive})}
            dangerouslySetInnerHTML={{ __html: firstTitle }}
          />
          <img
            src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
            className={classnames('arrow-live', {
              'is-hidden': !firstTabIsActive,
            })}
          />
        </div>
        <div className="split-nav-item-container" onClick={secondTabOnClick}>
          <div
            className={classnames("split-nav-item",{'active': secondTabIsActive})}
            dangerouslySetInnerHTML={{ __html: secondTitle }}
          />
          <img
            src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
            className={classnames('arrow-live', {
              'is-hidden': !secondTabIsActive,
            })}
          />
        </div>
        <div className="split-nav-item-container" onClick={thirdTabOnClick}>
          <div
            className={classnames("split-nav-item",{'active': thirdTabIsActive})}
            dangerouslySetInnerHTML={{ __html: thirdTitle }}
          />
          <img
            src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
            className={classnames('arrow-live', {
              'is-hidden': !thirdTabIsActive,
            })}
          />
        </div>
        <div className="split-nav-item-container" onClick={fourthTabOnClick}>
          <div
            className={classnames("split-nav-item",{'active': fourthTabIsActive})}
            dangerouslySetInnerHTML={{ __html: fourthTitle }}
          />
          <img
            src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
            className={classnames('arrow-live', {
              'is-hidden': !fourthTabIsActive,
            })}
          />
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

          .arrow-live {
            margin-bottom: -5px;
          }

          .is-hidden {
            visibility: hidden;
          }

          .split-nav-item {
            cursor: pointer;
            margin: 0 5px;
            margin-top: 15px;
            color: #8d969f;
          }

          .active{
            color: #41566f;
          }

          .component-container {
            ${faintShadow}
          }

          .split-nav-item-container {
            border: 1px solid ${geyser};
            flex: 0 50%;
          }
        `}</style>
      </div>
    );
  }
}

export default FourTabbedNav;
