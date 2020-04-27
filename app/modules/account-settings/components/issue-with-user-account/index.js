import React from 'react';
import { browserHistory } from 'react-router';
import UpgradeModal from '../../containers/upgrade-modal';

const IssueWithUserAccount = props => {
  const {
    errorData,
    hideIssueWithUserAccountModal,
    isModalVisible,
    subscriptionPlansCallSource,
    upsellCallSource,
  } = props;
  const onHideModal = onlyCloseModal => {
    hideIssueWithUserAccountModal();
    if (!onlyCloseModal) {
      browserHistory.goBack();
    }
  };
  return isModalVisible ? (
    <UpgradeModal
      show={isModalVisible}
      onHide={onHideModal}
      errorData={errorData}
      subscriptionPlansCallSource={subscriptionPlansCallSource}
      upsellCallSource={upsellCallSource}
    />
  ) : null;
};

export { IssueWithUserAccount };
