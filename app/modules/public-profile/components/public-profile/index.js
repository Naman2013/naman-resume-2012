/* eslint-disable */
import React, {Component} from 'react';

export class PublicProfile extends Component {

  fetchData = () => {
    const { getPublicProfile } = this.props;
    const { customerUUID } = this.props.params;
    getPublicProfile(customerUUID);
  };

  componentWillMount = () => {
    this.fetchData();
  };

  render() {
    // const {  } = props;
    return <div>Loadable</div>;
  }
};
