import * as React from 'react';
import { Spinner } from 'app/components/spinner/index';
import HubHeader from 'app/components/common/HubHeader';
import { AccountType } from 'app/modules/account-settings/components/account-details/account-type';
import { IPurchaseConfirmationResponse } from 'app/modules/purchase-confirmation/types';

type TPurchaseConfirmationProps = {
  getPurchaseConfirmation: () => void;
  purchaseConfirmationData: IPurchaseConfirmationResponse;
  isLoading: boolean;
};

export class PurchaseConfirmation extends React.PureComponent<
  TPurchaseConfirmationProps
> {
  componentDidMount(): void {
    const { getPurchaseConfirmation } = this.props;
    getPurchaseConfirmation();
  }

  render(): React.ReactNode {
    const { isLoading, purchaseConfirmationData } = this.props;
    if (isLoading) return <Spinner loading={isLoading} />;
    return (
      <>
        <HubHeader
          showIcon
          icon="https://vega.slooh.com/assets/v4/icons/slooh_logo_astronaut.svg"
          title="Your purchase confirmation"
        />
        {purchaseConfirmationData &&
          purchaseConfirmationData.accountTypeSection && (
            <AccountType
              currentSubscriptionPlan={
                purchaseConfirmationData.accountTypeSection
                  .currentSubscriptionPlan
              }
              accountTypeHeading={
                purchaseConfirmationData.accountTypeSection.accountTypeHeading
              }
              accountStatusLabel={
                purchaseConfirmationData.accountTypeSection.accountStatusLabel
              }
              accountStatus={
                purchaseConfirmationData.accountTypeSection.accountStatus
              }
            />
          )}
      </>
    );
  }
}
