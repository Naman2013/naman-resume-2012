/**
* V4 Provides Device information App Wide
* How to use on example component, MyComponent
* MyComponent will receive isDesktop, isTablet, isMobile and windowWidth properties.

  import { DeviceContext } from 'providers/DeviceProvider';

  ...

  render() {
    return (
    <Fragment>
      <DeviceContext.Consumer>
        {context => <MyComponent {...context} />}
      </DeviceContext.Consumer>
    </Fragment>
  );
  }
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {
  isDesktop,
  isTablet,
  isMobile,
  isScreenMedium,
  isScreenLarge,
  isScreenXLarge,
} from './deviceConfiguration';

const PAGE_RESIZE_DEBOUNCE = 250;
export const DeviceContext = React.createContext();

class DeviceProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    isDesktop: isDesktop(window.innerWidth),
    isMobile: isMobile(window.innerWidth),
    isTablet: isTablet(window.innerWidth),
    isScreenMedium: isScreenMedium(window.innerWidth),
    isScreenLarge: isScreenLarge(window.innerWidth),
    isScreenXLarge: isScreenXLarge(window.innerWidth),
    windowWidth: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    this.setState({
      isDesktop: isDesktop(window.innerWidth),
      isMobile: isMobile(window.innerWidth),
      isTablet: isTablet(window.innerWidth),
      isScreenMedium: isScreenMedium(window.innerWidth),
      isScreenLarge: isScreenLarge(window.innerWidth),
      isScreenXLarge: isScreenXLarge(window.innerWidth),
      windowWidth: window.innerWidth,
    });
  }, PAGE_RESIZE_DEBOUNCE)

  render() {
    const { children } = this.props;

    return (
      <DeviceContext.Provider value={this.state}>
        {children}
      </DeviceContext.Provider>
    );
  }
}

export default DeviceProvider;
