/** *********************************
 * V4 Follow Object
 * Button Component that can toggles
 * user's state of following a specific object
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from '../common/style/buttons/LargeButtonWithRightIcon';
import fetchFollowObject from '../../services/objects/object-follow';

const { number, oneOfType, shape, string } = PropTypes;

class FollowObjectButton extends Component {
  static propTypes = {
    followButtonIconURL: PropTypes.string.isRequired,
    followButtonText: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  state = {
    icon: this.props.followButtonIconURL,
    text: this.props.followButtonText,
  };

  toggleFollow = () => {
    const { objectId, user } = this.props;

    fetchFollowObject({
      at: user.at,
      token: user.token,
      cid: user.cid,
      objectId,
    }).then(res => {
      if (!res.data.apiError) {
        this.setState({
          icon: res.data.promptIconUrl,
          text: res.data.followPrompt,
        });
      }
    });
  };

  render() {
    const { text, icon } = this.state;
    const { width, height } = this.props;
    return (
      <GenericButton
        theme={{
          height: height !== undefined ? height : '40px',
          width: width !== undefined ? width : '160px',
        }}
        onClickEvent={this.toggleFollow}
        text={text}
        icon={icon}
      />
    );
  }
}

export default FollowObjectButton;
