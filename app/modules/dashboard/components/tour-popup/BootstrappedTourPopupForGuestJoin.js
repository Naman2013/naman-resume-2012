import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { withTranslation } from 'react-i18next';
import Modal from 'react-modal';
import Request from 'app/components/common/network/Request';
import { Link } from 'react-router';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL } from 'app/services/registration/registration.js';
import SubscriptionPlanCardDashboard from 'app/pages/registration/partials/SubscriptionPlanCardDashboard';
import { customModalStyles } from '../../../../styles/mixins/utilities';
import styles from './BootstrappedTourPopup.styles';
import messages from './BootstrappedTourPopup.messages';

const { bool, string, shape, func } = PropTypes;
@withTranslation
class BootstrappedTourPopupForGuestJoin extends Component {
  static propTypes = {
    subTitle: string,
    content: string,
    title: string,
    subscriptionPlanCallSource: string,
    intl: intlShape.isRequired,
    validateResponseAccess: func.isRequired,
  };

  static defaultProps = {
    subTitle: '',
    content: '',
    title: '',
  };

  state = {
    showModal: true,
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const {
      subTitle,
      content,
      title,
      t,
      subscriptionPlanCallSource,
    } = this.props;

    let { showModal } = this.state;

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
          <Request
            serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
            requestBody={{ callSource: this.props.subscriptionPlanCallSource }}
            method="POST"
            render={({ serviceResponse }) => (
              <div className="root">
                {serviceResponse.subscriptionPlans &&
                  serviceResponse.subscriptionPlans.map(subscriptionPlan => (
                    <SubscriptionPlanCardDashboard {...subscriptionPlan} />
                  ))}
              </div>
            )}
          />
        </Modal>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default BootstrappedTourPopupForGuestJoin;
