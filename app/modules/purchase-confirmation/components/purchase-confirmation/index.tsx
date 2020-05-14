import * as React from 'react';
import { Spinner } from 'app/components/spinner/index';
import HubHeader from 'app/components/common/HubHeader';
import { AccountType } from 'app/modules/account-settings/components/account-details/account-type';
import { IPurchaseConfirmationResponse } from 'app/modules/purchase-confirmation/types';
import { AccountDetailsHeader } from 'app/modules/account-settings/components/account-details/header';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router';

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
    const {
      pageHeading1,
      pageHeading2,
      gettingStartedBtn,
      explainationText,
    } = purchaseConfirmationData;
    if (isLoading) return <Spinner loading={isLoading} />;
    return (
      <>
        <HubHeader
          showIcon
          icon="https://vega.slooh.com/assets/v4/icons/slooh_logo_astronaut.svg"
          title={pageHeading1}
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
              showInfoButton={false}
            />
          )}

        <div className="top-bot-10 left-right-minus-20">
          <AccountDetailsHeader title={pageHeading2} showhr={true}/>
          <Container>
            <p dangerouslySetInnerHTML={{ __html: explainationText }} />
          </Container>

          {gettingStartedBtn && (
            <div className="text-center">
              <Link to={gettingStartedBtn.linkUrl} className="btn btn-primary">
                {gettingStartedBtn.linkLabel}
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
}
