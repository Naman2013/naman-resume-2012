import React, { PureComponent } from 'react';
import Telescope from './Telescope';

export default class ModalTelescope extends PureComponent {
  render() {
    return <Telescope {...this.props} />;
  }
}
