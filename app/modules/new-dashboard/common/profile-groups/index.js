/** *********************************
 * V4 Private Profile Groups
 *
 ********************************** */

import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import GroupImportGoogleClassrooms from 'app/pages/community-groups/GroupImportGoogleClassrooms';
import GroupCreate from 'app/pages/community-groups/GroupCreate';
import { Modal } from '../../../../components/modal';
import { customModalStylesBlackOverlay } from '../../../../styles/mixins/utilities';
import CenterColumn from '../../../../components/common/CenterColumn';
import PromptWithClose from '../../../../components/community-groups/prompt-with-close';
import './styles.scss';
import { Button } from '../../components/button';


@withTranslation()
class ProfileGroups extends Component {
  state = {
    showPrompt: false,
    promptText: '',
    showImportPopup: false,
    showCreatePopup: false,
    profileGroupList: [],    
  };

  

  componentWillReceiveProps(props) {
    this.setState({profileGroupList: props.profileGroupList});
}
  componentDidMount() {
    const { getProfileGroupList } = this.props;
    getProfileGroupList({ callSource: 'profile' }); 
  }
   
  updateGroupItemInfo = (id, resData) => {
    // const { getProfile, params } = this.props;
    // getProfile(params.customerUUID);
    const { profileGroupList } = this.state;    
    this.setState({profileGroupList: profileGroupList.filter(group=>  group.discussionGroupId !== id)});
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
    const { data} = this.props;
    const { groupControls = {} } = data;

    const {
      canCreateNewClubs,
      canImportGoogleClassrooms,
      createNewClubButtonText,
      importGoogleClassroomsPrompt,
    } = groupControls;
    
    return (
      <Fragment>
        {canCreateNewClubs && (
          <Button
              type={"button"}
              onClickEvent={() => this.setState({ showCreatePopup: true })} 
              text={createNewClubButtonText}                                             
              style={"button-border club-btn-mar-10"}
              icon={null}
          />

          // <buttongetMyClubListDataAction


          //   onClick={() => this.setState({ showCreatePopup: true })}
          //   className="btn btn-primary float-right club-btn"
          //   type="button"
          // >
          //   {createNewClubButtonText}
          // </button>
        )}

        {canImportGoogleClassrooms && (
          <Button
              type={"button"}
              onClickEvent={() => this.setState({ showImportPopup: true })} 
              text={importGoogleClassroomsPrompt}                                             
              style={"button-border"}
              icon={null}
          />
          // <button
          //   className="btn btn-primary float-right club-btn"
          //   onClick={() => this.setState({ showImportPopup: true })}
          //   type="button"
          // >
          //   {importGoogleClassroomsPrompt}
          // </button>
        )}
      </Fragment>
    );
  };

  render() {
    // const { data, t } = this.props;
    // const { emptySetGroupsDisplay } = data;
    const {
      showPrompt,
      promptText,
      showImportPopup,
      showCreatePopup,  
      // profileGroupList,
        } = this.state;
    const {getMyClubListDataAction}=this.props;
    return (
      <div className="profile-groups">
        {/* <CenterColumn customClass="profile-groups-container" > */}
          {this.renderClubBtns()}

          {/* <ContainerWithTitle title={t('Profile.MyClubs')}>
            {profileGroupList.length > 0 ? (
              <DeviceContext.Consumer>
                {context => (
                  <GroupTiles
                    filterType="mine"
                    closeModal={this.closeModal}
                    updateGroupItemInfo={this.updateGroupItemInfo}
                    updatePrompt={this.updatePrompt}
                    groups={profileGroupList}
                    isMobile={context.isMobile}
                  />
                )}
              </DeviceContext.Consumer>
            ) : (
              <div>{emptySetGroupsDisplay}</div>
            )}
          </ContainerWithTitle> */}
        {/* </CenterColumn> */}
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
          <GroupImportGoogleClassrooms getMyClubListDataAction={getMyClubListDataAction} />
        </Modal>
        <Modal
          show={showCreatePopup}
          onHide={() => this.setState({ showCreatePopup: false })}
        >
          <GroupCreate />
        </Modal>
      </div>
    );
  }
}

export default ProfileGroups;
