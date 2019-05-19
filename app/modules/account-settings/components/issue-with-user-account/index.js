import React from 'react';
import UpgradeModal from '../../containers/upgrade-modal';

const IssueWithUserAccount = props => {
  const { errorData, hideIssueWithUserAccountModal, isModalVisible } = props;
  return isModalVisible ? (
    <UpgradeModal
      show={isModalVisible}
      onHide={hideIssueWithUserAccountModal}
      errorData={errorData}
    />
  ) : null;
};

export { IssueWithUserAccount };
