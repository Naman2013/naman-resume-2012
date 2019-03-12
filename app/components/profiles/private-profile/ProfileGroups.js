/** *********************************
 * V4 Private Profile Groups
 *
 ********************************** */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Modal from 'react-modal';
import { Link } from 'react-router';
import { DeviceContext } from '../../../providers/DeviceProvider';
import { customModalStylesBlackOverlay } from '../../../styles/mixins/utilities';
import CenterColumn from '../../common/CenterColumn';

import { ContainerWithTitle } from '../../common/ContainerWithTitle';
import PromptWithClose from '../../community-groups/prompt-with-close';
import GroupTiles from '../../groups-hub/group-tiles';
import messages from './ProfileGroups.messages';

import styles from './ProfileGroups.styles';

const { shape, number, arrayOf } = PropTypes;

class ProfileGroups extends Component {
  static defaultProps = {
    groupsData: {},
  };

  static propTypes = {
    groupsData: shape({
      groupsCount: number.isRequired,
      groupsList: arrayOf(shape({})).isRequired,
    }),
    intl: intlShape.isRequired,
  };

  state = {
    showPrompt: false,
    promptText: '',
    groups: this.props.groupsData.groupsList,
  };

  updateGroupItemInfo = (id, resData) => {
    const newGroupsList = this.state.groups.map(group => {
      if (group.discussionGroupId === id) {
        return Object.assign(group, resData);
      }
      return group;
    });

    this.setState(() => ({
      groups: newGroupsList,
    }));
  };

  updatePrompt = data => {
    this.setState({
      showPrompt: data.showPrompt,
      promptText: (
        <PromptWithClose
          promptText={data.promptText}
          closeForm={this.closeModal}
        />
      ),
    });
  };

  closeModal = () => {
    this.setState({
      showPrompt: false,
      promptText: '',
    });
  };

  render() {
    const { groupsCount } = this.props.groupsData;

    const { showPrompt, promptText, groups } = this.state;
    const { intl } = this.props;

    return (
      <div className="profile-groups">
        <CenterColumn>
          <Link
            to="/profile/private/groups/create"
            className="btn btn-primary float-right club-btn"
          >
            create new club
          </Link>

          <Link
            to="/profile/private/groups/importGoogleClassrooms"
            className="btn btn-primary float-right club-btn"
          >
            Import Google classrooms
          </Link>

          <ContainerWithTitle title={intl.formatMessage(messages.MyClubs)}>
            {groupsCount > 0 ? (
              <DeviceContext.Consumer>
                {context => (
                  <GroupTiles
                    filterType="mine"
                    closeModal={this.closeModal}
                    updateGroupItemInfo={this.updateGroupItemInfo}
                    updatePrompt={this.updatePrompt}
                    groups={groups}
                    isMobile={context.isMobile}
                  />
                )}
              </DeviceContext.Consumer>
            ) : (
              <div>{intl.formatMessage(messages.noGroups)}</div>
            )}
          </ContainerWithTitle>
        </CenterColumn>
        <Modal
          ariaHideApp={false}
          isOpen={showPrompt}
          style={customModalStylesBlackOverlay}
          contentLabel="Groups"
          shouldCloseOnOverlayClick={false}
          onRequestClose={this.closeModal}
        >
          {promptText}
        </Modal>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(ProfileGroups);
