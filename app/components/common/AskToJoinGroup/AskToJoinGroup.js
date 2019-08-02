import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import ToggleJoinGroupButton from 'app/components/common/style/buttons/ToggleJoinGroupButton';
import { askToJoin } from 'app/services/community-groups/ask-to-join';

const { bool, func, shape, number, oneOfType, string } = PropTypes;

class AskToJoinGroup extends Component {
  static propTypes = {
    discussionGroupId: oneOfType([string, number]).isRequired,
    askPromptIconUrl: string,
    askPrompt: string,
    updatePrompt: func,
    user: shape({
      at: oneOfType([string, number]),
      token: oneOfType([string, number]),
      cid: oneOfType([string, number]),
    }),
  };
  static defaultProps = {
    askPromptIconUrl: '',
    askPrompt: '',
    updatePrompt: noop,
    user: {},
  };

  state = {
    icon: this.props.askPromptIconUrl,
    text: this.props.askPrompt,
  };

  toggleGroup = () => {
    const { user, discussionGroupId, askPrompt, updatePrompt } = this.props;
    const { text } = this.state;

    askToJoin({
      at: user.at,
      token: user.token,
      cid: user.cid,
      discussionGroupId,
    }).then(res => {
      if (!res.data.apiError) {
        updatePrompt({
          promptText: res.data.statusMessage,
          showPrompt: res.data.statusMessage,
        });
        this.setState(() => ({
          icon: res.data.askPromptIconUrl,
          text: res.data.askPrompt ? res.data.askPrompt : text,
        }));
      }
    });
  };
  render() {
    const { disabled } = this.props;
    const { icon, text } = this.state;
    return (
      <Fragment>
        <ToggleJoinGroupButton
          icon={icon}
          text={text}
          onClickEvent={this.toggleGroup}
          disabled={disabled}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});
export default connect(
  mapStateToProps,
  null
)(AskToJoinGroup);
