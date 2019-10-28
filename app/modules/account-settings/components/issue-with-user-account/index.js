import React from 'react';
import { browserHistory } from 'react-router';
import UpgradeModal from '../../containers/upgrade-modal';

const IssueWithUserAccount = props => {
  const {
    errorData,
    hideIssueWithUserAccountModal,
    isModalVisible,
    subscriptionPlansCallSource,
  } = props;
  const onHideModal = () => {
    hideIssueWithUserAccountModal();
    browserHistory.goBack();
  }
  return isModalVisible ? (
    <UpgradeModal
      show={isModalVisible}
      onHide={onHideModal}
      errorData={errorData}
      subscriptionPlansCallSource={subscriptionPlansCallSource}
    />
  ) : null;
};

export { IssueWithUserAccount };
