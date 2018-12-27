import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router';
import { intlShape, injectIntl } from 'react-intl';
import { customModalStyles } from 'styles/mixins/utilities';
import Request from 'components/common/network/Request';
import { DASHBOARD_DISMISS_TOUR_POPUP } from 'services/dashboard';
// import { connect } from 'react-redux';
import BobbieTileWelcomeToPlan from 'components/common/tiles/BobbieTile/BobbieTileWelcomeToPlan';
import messages from './BootstrappedTourPopup.messages';

const {
  bool,
  string,
  shape,
  number,
} = PropTypes;

class BootstrappedTourPopup extends Component {

  static propTypes = {
    canDismiss: bool,
    dismissText: string,
    hasLink: bool,
    linkLabel: string,
    linkURL: string,
    subTitle: string,
    text: string,
    content: string,
    title: string,
    user: shape({
      at: string,
      token: string,
      cid: string,
      subscriptionPlanName: string,
    }).isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    canDismiss: false,
    dismissText: 'Save For Later',
    hasLink: false,
    linkLabel: '',
    linkURL: '',
    subTitle: '',
    text: '',
    content: '',
    title: '',
    user: {
      at: null,
      cid: null,
      token: null,
      subscriptionPlanName: null,
    },
  };


  state = {
    showModal: true,
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    })
  }

  dismissTour = () => {
    const {
      validateResponseAccess,
      user,
    } = this.props;

    this.closeModal();

      axios.post(DASHBOARD_DISMISS_TOUR_POPUP, ...user)
      .then(res => validateResponseAccess(res.data));
  }

  render() {
    const {
      canDismiss,
      dismissText,
      hasLink,
      linkLabel,
      linkURL,
      subTitle,
      text,
      content,
      title,
      user,
      intl,
    } = this.props;

    const {
      showModal,
    } = this.state;
    
    const { subscriptionPlanName } = this.props.user;

    return (
      <div className="root">
        <Modal
          isOpen={showModal}
          style={customModalStyles}
          contentLabel={intl.formatMessage(messages.Tour)}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          <BobbieTileWelcomeToPlan title={title} planName={subscriptionPlanName} HTMLBlob={content} />

          {hasLink ? <button className="user-btn">
            <Link to={linkURL}>
              <span dangerouslySetInnerHTML={{ __html: linkLabel }} />
            </Link>
          </button> : null}
          {canDismiss ? <span onClick={this.dismissTour} dangerouslySetInnerHTML={{ __html: dismissText }} /> : null}
        </Modal>
        <style jsx>{`
          .root {
            margin: 0;
            padding: 0;
            width: 100%;
          }
          .fa-close {
            float: right;
            margin: -10px -10px 0 0;
          }
        `}
        </style>
      </div>
    );
  }
}

export default injectIntl(BootstrappedTourPopup);
