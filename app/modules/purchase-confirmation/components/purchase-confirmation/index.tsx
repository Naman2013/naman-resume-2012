import * as React from 'react';
import { Spinner } from 'app/components/spinner/index';
import HubHeader from 'app/components/common/HubHeader';
import { AccountType } from 'app/modules/account-settings/components/account-details/account-type';
import { IPurchaseConfirmationResponse } from 'app/modules/purchase-confirmation/types';
import { AccountDetailsHeader } from 'app/modules/account-settings/components/account-details/header';
import { Container } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import Button from 'app/components/common/style/buttons/Button';

type TPurchaseConfirmationProps = {
  getPurchaseConfirmation: Function;
  purchaseConfirmationData: IPurchaseConfirmationResponse;
  isLoading: boolean;
  conditionType: String;
  routeParams: any;
  newHeader: boolean;
  closeModal: Function;
};

export class PurchaseConfirmation extends React.PureComponent<
  TPurchaseConfirmationProps
> {
  componentDidMount(): void {
    const { getPurchaseConfirmation} = this.props;
    let conditionType=this.props.conditionType === undefined ? this.props.routeParams === undefined ? '' : this.props.routeParams.tab : this.props.conditionType;
    // const conditionType=this.props.conditionType || ((this.props.routeParams !== undefined) ? this.props.routeParams.tab : '');
    getPurchaseConfirmation(conditionType);
  }

  render(): React.ReactNode {
    const { isLoading, purchaseConfirmationData, newHeader, closeModal } = this.props;
    const {
      pageHeading1,
      pageHeading2,
      gettingStartedBtn,
      explainationText,     
    } = purchaseConfirmationData;
    if (isLoading) return <Spinner loading={isLoading} />;
    return (
      <>        
        {newHeader ? (
            <div>
              <h1 className="modal-h" dangerouslySetInnerHTML={{ __html: pageHeading1 }}/>
              <p className="modal-p mb-5" dangerouslySetInnerHTML={{ __html: pageHeading2 }}/>
            </div>
            ):(
          <HubHeader
          showIcon
          icon="https://vega.slooh.com/assets/v4/icons/slooh_logo_astronaut.svg"
          title={pageHeading1}
        />
        )}
        <div className="confirm-dialog">
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

        <div className="top-bot-10 left-right-20">
          <AccountDetailsHeader title={pageHeading2} showhr={true}/>
          <Container>
            <p dangerouslySetInnerHTML={{ __html: explainationText }} />
          </Container>

          {gettingStartedBtn && (
            <div className="centerBtn">             
              <Button onClickEvent={closeModal ? ()=>closeModal() : ()=>{browserHistory.push(gettingStartedBtn.linkUrl);}} text={gettingStartedBtn.linkLabel}/>
            </div>
          )}
        </div>
        <style>{`
          .confirm-dialog {
            background-color: #FFF;
            padding: 20px; 
          }

          .centerBtn{
            display:flex;
            justify-content: center;
            margin-bottom: 10px;
          }

          `}
          </style>
        </div>
      </>
    );
  }
}
