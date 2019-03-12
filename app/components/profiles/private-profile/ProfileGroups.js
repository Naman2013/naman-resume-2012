/** *********************************
 * V4 Private Profile Groups
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import { injectIntl, intlShape } from 'react-intl';

import { ContainerWithTitle } from '../../common/ContainerWithTitle';
import CenterColumn from '../../common/CenterColumn';
import GroupTiles from '../../groups-hub/group-tiles';
import { customModalStylesBlackOverlay } from '../../../styles/mixins/utilities';
import { DeviceContext } from '../../../providers/DeviceProvider';
import PromptWithClose from '../../community-groups/prompt-with-close';

import styles from './ProfileGroups.styles';
import messages from './ProfileGroups.messages';

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
          <Button className="float-right create-club-btn">
            create new club
          </Button>
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
