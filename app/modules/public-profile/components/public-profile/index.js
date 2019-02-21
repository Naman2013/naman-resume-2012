/* eslint-disable */
import React, {Component} from 'react';

export class PublicProfile extends Component {

  fetchData = () => {
    const { getPublicProfile } = this.props;
    getPublicProfile();
  };

  componentWillMount = () => {
    this.fetchData();
  };

  render() {
    // const {  } = props;
    return <div>Loadable</div>;
  }
};
