import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router';
import { intlShape, injectIntl } from 'react-intl';
import { customModalStyles } from '../../../styles/mixins/utilities';
import { DASHBOARD_DISMISS_TOUR_POPUP } from '../../../services/dashboard';
import BobbieTileWelcomeToPlan from '../../../components/common/tiles/BobbieTile/BobbieTileWelcomeToPlan';

import styles from './BootstrappedTourPopup.styles';
import messages from './BootstrappedTourPopup.messages';

const { bool, string, shape, func } = PropTypes;

class BootstrappedTourPopup extends Component {
  static propTypes = {
    canDismiss: bool,
    dismissText: string,
    hasLink: bool,
    linkLabel: string,
    linkURL: string,
    subTitle: string,
    content: string,
    title: string,
    user: shape({
      at: string,
      token: string,
      cid: string,
      subscriptionPlanName: string,
    }).isRequired,
    intl: intlShape.isRequired,
    validateResponseAccess: func.isRequired,
    hasRelatedGuide: bool.isRequired,
    relatedGuide: shape({}),
  };

  static defaultProps = {
    canDismiss: false,
    dismissText: 'Save For Later',
    hasLink: false,
    linkLabel: '',
    linkURL: '',
    subTitle: '',
    content: '',
    title: '',
    user: {
      at: null,
      cid: null,
      token: null,
      subscriptionPlanName: null,
    },
    relatedGuide: {},
  };

  state = {
    showModal: true,
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  dismissTour = () => {
    const { validateResponseAccess, user } = this.props;
    const { cid, at, token } = user;

    this.closeModal();

    axios
      .post(DASHBOARD_DISMISS_TOUR_POPUP, { cid, at, token })
      .then(res => validateResponseAccess(res.data));
  };

  render() {
    const {
      canDismiss,
      dismissText,
      hasLink,
      linkLabel,
      linkURL,
      subTitle,
      content,
      title,
      user,
      intl,
      hasRelatedGuide,
      relatedGuide,
    } = this.props;

    const { showModal } = this.state;

    const { subscriptionPlanName } = user;

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
          <BobbieTileWelcomeToPlan
            title={title}
            subTitle={subTitle}
            planName={subscriptionPlanName}
            HTMLBlob={content}
            hasRelatedGuide={hasRelatedGuide}
            relatedGuide={relatedGuide}
          />

          {hasLink ? (
            <button className="user-btn">
              <Link to={linkURL}>
                <span dangerouslySetInnerHTML={{ __html: linkLabel }} />
              </Link>
            </button>
          ) : null}
          {canDismiss ? (
            <span
              className="dismiss-link"
              onClick={this.dismissTour}
              dangerouslySetInnerHTML={{ __html: dismissText }}
            />
          ) : null}
        </Modal>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(BootstrappedTourPopup);
