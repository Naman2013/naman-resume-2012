import React, { Component } from 'react';
import { SubscriptionPlanNoDetails } from 'app/modules/account-settings/components/upgrade-modal/subscription-plan-without-details';
import { Spinner } from 'app/components/spinner/index';
import { getSubscriptionPlansApi } from '../../modules/account-settings/api';
import { getUserInfo } from 'app/modules/User';
import { storeShowOffer } from 'app/modules/User';
import { browserHistory } from 'react-router';
import {
    screenMobile,
    screenSmallMobile,
  } from 'app/styles/variables/breakpoints';
  
class DashboardOffer extends Component{    

    getSubscriptions = (callSource) => {
        const { token, at, cid } = getUserInfo();              
        getSubscriptionPlansApi({token, at, cid, callSource})
            .then(result => {
                if(!result.data.apiError)
                    this.setState({plansdata: result.data, isLoading: false});
            })
            .catch(error => {

            });      
    }

    setSelectedPlan = (subscriptionPlanId, isAstronomyClub, selectBtnLinkURL) => {   
        window.localStorage.setItem('selectedPlanId', subscriptionPlanId);
        window.localStorage.setItem('isAstronomyClub', isAstronomyClub);
    
        /* move to step 2 in the join flow */
        browserHistory.push(selectBtnLinkURL);
       
      };

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            plansdata: []
        };
        this.getSubscriptions(props.callSource);
        storeShowOffer(true);
    }

    render() {
        const { onClose } = this.props;
        const { plansdata } = this.state;
        const { pageHeading1, pageHeading2A, pageHeading2B, subscriptionPlans, selectBtnLinkURL } = plansdata;
        const { isLoading } = this.state;
        
        return(
            <div className="min-height">
                <Spinner loading={isLoading} />
                {subscriptionPlans && (
                    <div>
                        <i
                        className="fa fa-close right cursor"
                        onClick={onClose}
                        role="button"
                        />
                        <h1 className="modal-h center-txt" dangerouslySetInnerHTML={{ __html: pageHeading1 }}/>
                        <div className="two-columns">
                            <p className="modal-p mb-5 font-18" dangerouslySetInnerHTML={{ __html: pageHeading2A }}/>                            
                            <p className="modal-p mb-5 font-18 margin-left" dangerouslySetInnerHTML={{ __html: pageHeading2B }}/>                                                        
                        </div>                        
                        <hr/>
                        {subscriptionPlans.map(plan => (
                            <SubscriptionPlanNoDetails
                                plan={plan}
                                expanded={false}
                                onSelect={()=>this.setSelectedPlan(plan.planID, plan.isAstronomyClub, selectBtnLinkURL)}
                            />
                        ))}
                    </div>
                )}               

                <style jsx>{`
                    .right{
                        float: right;
                    }
                    
                    .center-txt{
                        text-align: center;
                        margin-bottom: 40px;
                    }

                    .min-height{
                        min-height: 200px;
                        width: 770px;                        
                    }

                    .cursor{
                        cursor: pointer;
                    }

                    .font-18{
                        font-size: 18px;
                    }

                    .two-columns{
                        display: flex;
                        text-align: justify;
                    }                    
                    
                    .margin-left{
                        margin-left: 50px;
                    }

                    @media ${screenMobile} {
                        .two-columns{
                            display: unset;
                            text-align: justify;
                        }
                        .min-height{                            
                            width: auto;                        
                        }
                        .margin-left{
                            margin-left: 0px;
                        }
                    }

                    @media ${screenSmallMobile} {
                        .two-columns{
                            display: unset;
                            text-align: justify;
                        }
                        .min-height{                            
                            width: auto;                        
                        }
                        .margin-left{
                            margin-left: 0px;
                        }
                    }
                    `}
                </style>
            </div>
        );
    }
}

export default DashboardOffer;