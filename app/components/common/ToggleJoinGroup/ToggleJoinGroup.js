import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import pick from  'lodash/pick';
import { connect } from 'react-redux';
import ToggleJoinGroupButton from 'components/common/style/buttons/ToggleJoinGroupButton';
import { toggleJoinGroup } from 'services/community-groups/toggle-join-group';

const {
  bool,
  func,
  shape,
  number,
  oneOfType,
  string,
} = PropTypes;

const RESPONSE_FIELDS = [
  'joinPromptIconUrl',
  'joinPrompt',
  'memberCountDisplay',
];

class ToggleJoinGroup extends Component {
  static propTypes = {
    discussionGroupId: oneOfType([string, number]).isRequired,
    joinPromptIconUrl: string,
    joinPrompt: string,
    updateGroupItemInfo: func,
    user: shape({
      at: oneOfType([string, number]),
      token: oneOfType([string, number]),
      cid: oneOfType([string, number]),
    }),
  };
  static defaultProps = {
    joinPromptIconUrl: '',
    joinPrompt: '',
    updateGroupItemInfo: noop,
    user: {},
  };

  state = {
    icon: this.props.joinPromptIconUrl,
    text: this.props.joinPrompt,
  }

  toggleGroup = () => {
    const {
      user,
      discussionGroupId,
      joinPrompt,
      updateGroupItemInfo,
    } = this.props;
    toggleJoinGroup({
      at: user.at,
      token: user.token,
      cid: user.cid,
      discussionGroupId,
    }).then((res) => {

      if (!res.data.apiError) {
        updateGroupItemInfo(
          discussionGroupId,
          pick(res.data, RESPONSE_FIELDS)
        );
        this.setState(() => ({
          icon: res.data.joinPromptIconUrl,
          text: joinPrompt ? res.data.joinPrompt : null,
        }));
      }
    });
  }
  render () {
    const {
      icon,
      text,
    } = this.state;
    return (
      <Fragment>
        <ToggleJoinGroupButton
          icon={icon}
          text={text}
          onClickEvent={this.toggleGroup}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  user,
}) => ({
  user,
});
export default connect(mapStateToProps, null)(ToggleJoinGroup);
