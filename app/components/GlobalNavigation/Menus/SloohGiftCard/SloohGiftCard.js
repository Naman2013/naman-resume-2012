import { Button } from 'app/modules/new-dashboard/components/button';
import React from 'react';
import classnames from 'classnames';


const SloohGiftCard = ({giftCardLinks, borderTop, theme}) => (
  <div className="root">
    {giftCardLinks && giftCardLinks.length > 0 && giftCardLinks.map(card => (
      <div className={classnames("register-container slooh-gift-card", { "borderTop" : borderTop}, {[`${theme}`] : theme})}>
        <div className="slooh-gift-card-heading" dangerouslySetInnerHTML={{__html: card.sloohDynamicAdsHeading}}/>
        <div className="slooh-gift-card-sub-heading" dangerouslySetInnerHTML={{__html: card.sloohDynamicAdsSubHeading}}/>
        <div className="slooh-gift-card-description" dangerouslySetInnerHTML={{__html: card.description}}/>
        <center>
          {/* <a href={card.sloohDynamicAdsLink} target={card.sloohDynamicAdsLink ? "_blank" : null}> */}
            {card.showAdImage && (
                <img onClick={()=>window.open(card.sloohDynamicAdsLink, card.openInNewWindowFlag ? "_blank" : null)} className="adImg" src={card.sloohDynamicAdsImages} alt="" />
            )}            
            <br/>
            {card.showAdButton && (
              <Button
                type={"button"}
                onClickEvent={()=>window.open(card.sloohDynamicAdsLink, card.openInNewWindowFlag ? "_blank" : null)} 
                text={card.buttonLabelText}                                             
                style={"button-border"}
                icon={null}
              />
            )}            
          {/* </a> */}
        </center>
        
        
        
      </div>
    ))}
    


    <style jsx>
      {`
        .register-container {          
          // padding: 15px;
          margin: 15px;
        }
        .slooh-gift-card{
          text-align:center;
          margin-bottom: 10px;
        }
        .slooh-gift-card-heading{
          font-size:20px;
          padding:5px;

        }
        .slooh-gift-card-sub-heading{
          font-size:16px;
          padding:5px;
          
        }
        .slooh-gift-card-description{
          font-size:14px;
          padding:5px;
          
        }
        .adImg{
          width: 80%;
          margin: 30px 0px;
          cursor: pointer;
        }
        .borderTop{
          border-top: 4px solid #304B76;
        }

        .dark .slooh-gift-card-heading{
          font-size:20px;
          padding:5px;
          color: #FFFFFF;
        }
        .dark .slooh-gift-card-sub-heading{
          font-size:16px;
          padding:5px;
          color: #FFFFFF;
        }
      `}
    </style>
  </div>
);



export default SloohGiftCard;
