import React from 'react';



const SloohGiftCard = ({giftCardLinks}) => (
  <div className="root">
    {giftCardLinks.map(card => (
      <div className="register-container slooh-gift-card">
        <div className="slooh-gift-card-heading" dangerouslySetInnerHTML={{__html: card.heading}}/>
        <div className="slooh-gift-card-sub-heading" dangerouslySetInnerHTML={{__html: card.subHeading}}/>
        <a href={card.linkURL} target="_blank">
          <img src={card.imageURL} alt="" />
        </a>
      </div>
    ))}
    


    <style jsx>
      {`
        .register-container {
          border-top: 4px solid #304B76;
          padding: 15px;
          margin: 15px;
        }
        .slooh-gift-card{
          text-align:center;
          margin-bottom: 140px;
        }
        .slooh-gift-card-heading{
          font-size:20px;
          padding:5px;

        }
        .slooh-gift-card-sub-heading{
          font-size:16px;
          padding:5px;
          
        }
      `}
    </style>
  </div>
);



export default SloohGiftCard;
