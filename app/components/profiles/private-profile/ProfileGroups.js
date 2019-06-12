/** *********************************
 * V4 Private Profile Groups
 *
 ********************************** */

import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import ReactModal from 'react-modal';
import GroupImportGoogleClassrooms from 'app/pages/community-groups/GroupImportGoogleClassrooms';
import GroupCreate from 'app/pages/community-groups/GroupCreate';
import { Modal } from '../../modal';
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
    showImportPopup: false,
    showCreatePopup: false,
  };

  updateGroupItemInfo = () => {
    const { getProfile, params } = this.props;
    getProfile(params.customerUUID);
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

  renderClubBtns = () => {
    const { privateProfileData = {} } = this.props;
    const { groupControls = {} } = privateProfileData;

    const {
      canCreateNewClubs,
      canImportGoogleClassrooms,
      createNewClubButtonText,
      createNewClubLinkUrl,
      importGoogleClassroomsPrompt,
      importGoogleClassroomsURL,
    } = groupControls;

    return (
      <Fragment>
        {canCreateNewClubs && (
          <button
            onClick={() => this.setState({ showCreatePopup: true })}
            className="btn btn-primary float-right club-btn"
            type="button"
          >
            {createNewClubButtonText}
          </button>
        )}

        {canImportGoogleClassrooms && (
          <button
            className="btn btn-primary float-right club-btn"
            onClick={() => this.setState({ showImportPopup: true })}
            type="button"
          >
            {importGoogleClassroomsPrompt}
          </button>
        )}
      </Fragment>
    );
  };

  render() {
    const { groupsCount, groupsList } = this.props.groupsData;
    const { privateProfileData } = this.props;
    const {
      showPrompt,
      promptText,
      groups,
      showImportPopup,
      showCreatePopup,
    } = this.state;
    const { intl } = this.props;

    return (
      <div className="profile-groups">
        <CenterColumn>
          {this.renderClubBtns()}

          <ContainerWithTitle title={intl.formatMessage(messages.MyClubs)}>
            {groupsCount > 0 ? (
              <DeviceContext.Consumer>
                {context => (
                  <GroupTiles
                    filterType="mine"
                    closeModal={this.closeModal}
                    updateGroupItemInfo={this.updateGroupItemInfo}
                    updatePrompt={this.updatePrompt}
                    groups={groupsList}
                    isMobile={context.isMobile}
                  />
                )}
              </DeviceContext.Consumer>
            ) : (
              <div>{privateProfileData.emptySetGroupsDisplay}</div>
            )}
          </ContainerWithTitle>
        </CenterColumn>
        <ReactModal
          ariaHideApp={false}
          isOpen={showPrompt}
          style={customModalStylesBlackOverlay}
          contentLabel="Groups"
          shouldCloseOnOverlayClick={false}
          onRequestClose={this.closeModal}
        >
          {promptText}
        </ReactModal>

        <Modal
          show={showImportPopup}
          onHide={() => this.setState({ showImportPopup: false })}
        >
          <GroupImportGoogleClassrooms />
        </Modal>
        <Modal
          show={showCreatePopup}
          onHide={() => this.setState({ showCreatePopup: false })}
        >
          <GroupCreate />
        </Modal>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(ProfileGroups);
