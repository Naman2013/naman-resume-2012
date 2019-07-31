/***********************************
 * V4 Resources Button
 ***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import questActions from 'app/modules/quest-details/actions';
import { validateResponseAccess } from 'app/modules/authorization/actions';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import ResourcesButton from './resources-button';
import { GET_APPENDIX } from 'app/services/quests';
import ResourcesModal from './modals/resources-modal';
import { ACTION } from '../../reducer';

const { bool, func, number, shape, string } = PropTypes;

class ConnectedResourcesButton extends Component {
  static propTypes = {
    questId: string.isRequired,
    moduleId: string.isRequired,
  };

  static defaultProps = {};

  openResourcesModal = e => {
    e.preventDefault();
    const { actions, questId, moduleId, user } = this.props;
    actions.getAppendix();
    axios
      .post(GET_APPENDIX, {
        questId,
        moduleId,
        at: user.at,
        cid: user.cid,
        token: user.token,
      })
      .then(res => {
        actions.getAppendixSuccess();
        actions.validateResponseAccess(res);
        actions.setAndOpenModal({
          modalComponent: (
            <ResourcesModal {...res.data} closeModal={actions.closeModal} />
          ),
          modalStyles: customModalStylesBlackOverlay,
        });
      })
      .catch(() => {
        actions.getAppendixError();
      });
  };

  render() {
    return (
      <Fragment>
        <ResourcesButton
          {...this.props}
          openResources={this.openResourcesModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, questDetails }) => ({
  user,
  modal: questDetails.modal,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setAndOpenModal: questActions.setAndOpenModal,
      closeModal: questActions.closeModal,
      validateResponseAccess,
      getAppendix: ACTION.getAppendix,
      getAppendixSuccess: ACTION.getAppendixSuccess,
      getAppendixError: ACTION.getAppendixError,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedResourcesButton);
