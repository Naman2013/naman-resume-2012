/***********************************
* V4 Aside content for shows
* this will hold the three tab nav on desktop
* and will never be shown on tablet/mobile
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Host from 'components/Host';
import DetailsTab from './DetailsTab';
import styles from './AsideContainerDetailsOnly.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class AsideContainerDetailsOnly extends Component {
  static propTypes = {
    hosts: arrayOf(shape({})),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    hosts: [],
  };

  state = {

  }



  render() {
    const {
      hosts,
    } = this.props;

    const {

    } = this.state;

    return (
      <div className="root">
        {hosts.map(host => <Host {...host} />)}
        <DetailsTab {...this.props} />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AsideContainerDetailsOnly;
