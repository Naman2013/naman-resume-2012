import React, { Component, Fragment } from 'react';
//import './styles.scss';

export class WriteObservationStep1 extends Component {
  componentDidMount() {
    const { getMyPictures } = this.props;
    getMyPictures({
      viewType: 'photoRoll',
    });
  }

  render() {
    const { onHide, show } = this.props;

    return (
      <Fragment>
        <h1 className="modal-h">Select an Image for your Observation.</h1>
      </Fragment>
    );
  }
}
