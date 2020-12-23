import React from 'react';



const SloohGiftCard = () => (
  <div className="root">
    <div className="register-container slooh-gift-card">
      <div className="slooh-gift-card-heading">Slooh gift cards are now available! <br></br>available!</div>
      <div className="slooh-gift-card-sub-heading">Click the link below and give the gift of the universe</div>
      <a href="https://www.amazon.com/Slooh-Apprentice-Membership/dp/B01MDNJXIR/ref=sr_1_1?dchild=1&keywords=slooh+apprentice+membership&qid=1606755292&sr=8-1" target="_blank">
        <img src="https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/gift-of-the-universe.jpg" alt="" />
      </a>
    </div>


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
