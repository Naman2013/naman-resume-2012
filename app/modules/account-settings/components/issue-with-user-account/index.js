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
    upsellReturnLinkLabel,
    upsellReturnLinkType,
    upsellReturnLinkUrl
  } = props;
  const onHideModal = onlyCloseModal => {
    hideIssueWithUserAccountModal();
    // if (!onlyCloseModal) {    
        // browserHistory.goBack();
    // }
    // if(upsellReturnLinkType === "navigate")
    //   browserHistory.push(upsellReturnLinkUrl);
  };
  
  return isModalVisible ? (
    <UpgradeModal
      show={isModalVisible}
      onHide={onHideModal}
      errorData={errorData}
      subscriptionPlansCallSource={subscriptionPlansCallSource}
      upsellCallSource={upsellCallSource}
      returnLinkType={upsellReturnLinkType}
      returnLinkLabel={upsellReturnLinkLabel}
      returnLinkUrl={upsellReturnLinkUrl}

    />
  ) : null;
};

export { IssueWithUserAccount };
