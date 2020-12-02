import * as React from 'react';
import { Spinner } from 'app/components/spinner/index';
import HubHeader from 'app/components/common/HubHeader';
import { AccountType } from 'app/modules/account-settings/components/account-details/account-type-new/account-type';
import { IPurchaseConfirmationResponse } from 'app/modules/purchase-confirmation/types';
import { AccountDetailsHeader } from 'app/modules/account-settings/components/account-details/header';
import { Container } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import { Button as NewButton } from "app/modules/new-dashboard/components/button";
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
            <div>
              <h3 className="thank-text">Thank you for your purchase!</h3>
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
              <h3 className="thank-text">
                Scroll down to learn more about how to best use  Slooh or                                          
              </h3>
              <NewButton
                  type={"button"}
                  onClickEvent={()=>browserHistory.push("/NewDashboard")} 
                  text={"Go to My Dashboard"}                                             
                  style={"go-to-dashboard-btn"}
                  icon={null}
                />    
              <iframe 
                className="video-frame"
                width="400" 
                height="250" 
                src="https://www.youtube.com/embed/ArOYe0WFKiA" 
                // frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                // allowfullscreen
                >
              </iframe> 
              <h5 className="watch-text">Watch this short quick-start video for maximum escape velocity into space with slooh </h5>
              <NewButton
                  type={"button"}
                  onClickEvent={()=>browserHistory.push("/NewDashboard")} 
                  text={"Go to My Dashboard"}                                             
                  style={"go-to-dashboard-btn"}
                  icon={null}
                />   
            </div>
          )}

        <br/>
        <br/>

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

          .thank-text{
            color: #000;
            text-align: center;
            margin-top: 5px;
            font-weight: bold;
            font-family: Adobe Garamond Pro,adobe-garamond-pro,Adobe Garamond,Garamond,serif;
          }

          .go-to-dashboard-btn{
            color: #41566f;
            border-radius: 15px;
            border: 1px dashed #41566f;
            font-family: Adobe Garamond Pro,adobe-garamond-pro,Adobe Garamond,Garamond,serif;
            font-weight: bold;
            font-size: 16px;
            background-color: #FFF;
            padding: 2px 15px;
            margin: 10px auto 0px auto;
            display: block;
          }

          .video-frame{
            display: block;
            margin: 20px auto;
          }

          .watch-text{
            color: #000;
            text-align: center;
            margin-top: 5px;           
            font-family: Brandon Grotesque,brandon-grotesque,sans-serif;
          }

          `}
          </style>
        </div>
      </>
    );
  }
}
