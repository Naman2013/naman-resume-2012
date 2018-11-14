import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Telescope from 'components/Telescope';
import { StarShareCamera } from 'components/telescope-details/star-share-camera';

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
      <div>
        <Telescope
          activeInstrumentID={this.props.activeInstrumentID}
          previousInstrumentID={this.previousInstrumentID}
          render={this.props.render}
        />
        <StarShareCamera />
      </div>
    );
  }
}

export default TelescopeImageViewerController;
