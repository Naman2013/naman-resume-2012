/**
* V4 Provides Device information App Wide
* How to use on example component, MyComponent
* MyComponent will receive isDesktop, isTablet, isMobile and windowWidth properties.

  import { DeviceContext } from 'providers/DeviceProvider';

  ...

  render() {
    return (
    <div>
      <DeviceContext.Consumer>
        {context => <MyComponent {...context} />}
      </DeviceContext.Consumer>
    </div>
  );
  }
*/

import React, { Component } from 'react';
import { isDesktop, isTablet, isMobile } from './deviceConfiguration';

export const DeviceContext = React.createContext();

class DeviceProvider extends Component {
  state = {
    isDesktop: isDesktop(window.innerWidth),
    isMobile: isMobile(window.innerWidth),
    isTablet: isTablet(window.innerWidth),
    windowWidth: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      isDesktop: isDesktop(window.innerWidth),
      isMobile: isMobile(window.innerWidth),
      isTablet: isTablet(window.innerWidth),
      windowWidth: window.innerWidth,
    });
  }

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
