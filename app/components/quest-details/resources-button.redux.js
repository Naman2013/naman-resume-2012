/***********************************
* V4 Resources Button
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import questActions from 'modules/quest-details/actions';
import { validateResponseAccess } from 'modules/authorization/actions';
import { customModalStylesBlackOverlay } from 'styles/mixins/utilities';
import ResourcesButton from './resources-button';
import { GET_APPENDIX } from 'services/quests';
import ResourcesModal from './modals/resources-modal';


const {
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;


class ConnectedResourcesButton extends Component {

  static propTypes = {
    questId: string.isRequired,
    moduleId: string.isRequired,
  }

  static defaultProps = {

  }


  openResourcesModal = (e) => {
    e.preventDefault();
    const {
      actions,
      questId,
      moduleId,
      user,
    } = this.props;
    axios.post(GET_APPENDIX, {
      questId,
      moduleId,
      at: user.at,
      cid: user.cid,
      token: user.token,
    }).then((res) => {
      actions.validateResponseAccess(res);

      actions.setAndOpenModal({
        modalComponent: <ResourcesModal {...res.data} />,
        modalStyles: customModalStylesBlackOverlay,
      });
    })
  }

  render() {
    console.log('this.props', this.props)
    return (
      <Fragment>
        <ResourcesButton
          {...this.props}
          openResources={this.openResourcesModal}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({
  user,
  questDetails,
}) => ({
  user,
  modal: questDetails.modal,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setAndOpenModal: questActions.setAndOpenModal,
    validateResponseAccess,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedResourcesButton);
