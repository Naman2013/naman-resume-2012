import React, { cloneElement, Component } from 'react';

export class Missions extends Component {
  componentWillMount = () => {};

  fetchData = () => {
    // const { getMissions, params } = this.props;
    // const { customerUUID } = params;
    // getMissions(customerUUID);
  };

  render() {
    const { params, children } = this.props;
    return <div>test</div>;
  }
}
