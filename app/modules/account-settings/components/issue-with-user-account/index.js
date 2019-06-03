import React from 'react';
import UpgradeModal from '../../containers/upgrade-modal';

const IssueWithUserAccount = props => {
  const {
    errorData,
    hideIssueWithUserAccountModal,
    isModalVisible,
    subscriptionPlansCallSource,
  } = props;
  return isModalVisible ? (
    <UpgradeModal
      show={isModalVisible}
      onHide={hideIssueWithUserAccountModal}
      errorData={errorData}
      subscriptionPlansCallSource={subscriptionPlansCallSource}
    />
  ) : null;
};

export { IssueWithUserAccount };
