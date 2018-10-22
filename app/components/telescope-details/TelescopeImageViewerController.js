import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Telescope from 'components/Telescope';

class TelescopeImageViewerController extends Component {
  static propTypes = {
    activeInstrumentID: PropTypes.string.isRequired,
    render: PropTypes.func,
  };

  static defaultProps = {
    render: noop,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeInstrumentID !== this.props.activeInstrumentID) {
      this.previousInstrumentID = this.props.activeInstrumentID;
    }
  }

  previousInstrumentID = null;

  render() {
    return (
      <Telescope
        activeInstrumentID={this.props.activeInstrumentID}
        previousInstrumentID={this.previousInstrumentID}
        render={this.props.render}
      />
    );
  }
}

export default TelescopeImageViewerController;
