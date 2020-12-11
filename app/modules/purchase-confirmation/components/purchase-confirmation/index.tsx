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
import './styles.scss';

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
      purchaseThankYouText,
      firstExplanationText,
      secondExplanationText,     
      welcomeVideoStreamURL,
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
         {purchaseConfirmationData &&
          purchaseConfirmationData.accountTypeSection && (
            <div>
              <div className="desktop-graphics">
                <img className="graphic-image" src={purchaseConfirmationData.accountTypeSection.currentSubscriptionPlan.imageUrl} alt="" />
                <h3 className="thank-text">{purchaseThankYouText}</h3> 
              </div>
              <div className="mobile-graphics">
                <h3 className="thank-text">{purchaseThankYouText}</h3> 
                <img className="graphic-image" src={purchaseConfirmationData.accountTypeSection.currentSubscriptionPlan.imageUrl} alt="" />
              </div>
            </div>
          )}   
        
        <div className="confirm-dialog">
        {purchaseConfirmationData &&
          purchaseConfirmationData.accountTypeSection && (
            <div>
              {/* <h3 className="thank-text">{purchaseThankYouText}</h3> */}
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
                purchaseThankYouText={purchaseThankYouText}
              />
              <h4 className="scroll-down-text">
                {firstExplanationText}                                          
              </h4>
              {/* <Button 
                onClickEvent={()=>browserHistory.push(gettingStartedBtn.linkUrl)} 
                text={gettingStartedBtn.linkLabel}/> */}
              {/* <NewButton
                  type={"button"}
                  onClickEvent={()=>browserHistory.push(gettingStartedBtn.linkUrl)} 
                  text={gettingStartedBtn.linkLabel}                                             
                  style={"go-to-dashboard-btn"}
                  icon={null}
                />     */}
                <br/>
                <br/>
              <iframe 
                className="video-frame"
                // width="400" 
                // height="250" 
                src={welcomeVideoStreamURL}
                // frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                // allowfullscreen
                >
              </iframe> 
              <br/>
              <br/> 
              <h4 className="scroll-down-text">{secondExplanationText}</h4>
              <br/>
              <Button 
                mod={"go-to-dashboard-btn"}
                onClickEvent={()=>browserHistory.push(gettingStartedBtn.linkUrl)} 
                text={gettingStartedBtn.linkLabel}/>
              {/* <NewButton
                  type={"button"}
                  onClickEvent={()=>browserHistory.push(gettingStartedBtn.linkUrl)} 
                  text={gettingStartedBtn.linkLabel}                                             
                  style={"go-to-dashboard-btn"}
                  icon={null}
                />    */}
            </div>
          )}

        <br/>
        <br/>

        <div className="top-bot-10 left-right-20">
          <AccountDetailsHeader title={pageHeading2} showhr={true} headerClass/>
          <Container>
            <p dangerouslySetInnerHTML={{ __html: explainationText }} />
          </Container>
          
          {gettingStartedBtn && (
            <div className="centerBtn">             
              <Button onClickEvent={closeModal ? ()=>closeModal() : ()=>{browserHistory.push(gettingStartedBtn.linkUrl);}} text={gettingStartedBtn.linkLabel}/>
            </div>
          )}
        </div>
        {/* <style>{`
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
          </style> */}
        </div>
      </>
    );
  }
}
