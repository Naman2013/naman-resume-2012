import { Button } from 'app/modules/new-dashboard/components/button';
import React from 'react';
import classnames from 'classnames';
import './styles.scss';

const SloohGiftCard = ({giftCardLinks, borderTop, theme}) => (
  <div className="root">
    {giftCardLinks && giftCardLinks.length > 0 && giftCardLinks.map(card => (
      <div className={classnames("register-container slooh-gift-card", { "borderTop" : borderTop}, {[`${theme}`] : theme})}>
        <br/>
        {card.showAdTitle && (
            <div className="slooh-gift-card-heading" dangerouslySetInnerHTML={{__html: card.sloohDynamicAdsHeading}}/>
        )}
        {card.showAdSubtitle && (
            <div className="slooh-gift-card-sub-heading" dangerouslySetInnerHTML={{__html: card.sloohDynamicAdsSubHeading}}/> 
        )}
        
        {/* <div className="slooh-gift-card-description" dangerouslySetInnerHTML={{__html: card.description}}/> */}
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


    
  </div>
);



export default SloohGiftCard;
