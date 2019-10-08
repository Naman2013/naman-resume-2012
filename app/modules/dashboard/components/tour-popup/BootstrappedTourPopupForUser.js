import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { withTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { Link } from 'react-router';
import { customModalStyles } from '../../../../styles/mixins/utilities';
import { DASHBOARD_DISMISS_TOUR_POPUP } from '../../../../services/dashboard';
import BobbieTileWelcomeToPlan from '../../../../components/common/tiles/BobbieTile/BobbieTileWelcomeToPlan';

import styles from './BootstrappedTourPopup.styles';
import messages from './BootstrappedTourPopup.messages';

const { bool, string, shape, func } = PropTypes;
@withTranslation
class BootstrappedTourPopupForUser extends Component {
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

    API.post(DASHBOARD_DISMISS_TOUR_POPUP, { cid, at, token }).then(res =>
      validateResponseAccess(res.data)
    );
  };

  render() {
    const {
      canDismiss,
      dismissText,
      hasLink,
      linkLabel,
      linkURL,
      subTitle,
      subscriptionPlanName,
      content,
      title,
      user,
      t,
      hasRelatedGuide,
      relatedGuide,
    } = this.props;

    const { showModal } = this.state;

    return (
      <div className="root">
        <Modal
          isOpen={showModal}
          style={customModalStyles}
          contentLabel={t('.Tour')}
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

export default BootstrappedTourPopupForUser;
