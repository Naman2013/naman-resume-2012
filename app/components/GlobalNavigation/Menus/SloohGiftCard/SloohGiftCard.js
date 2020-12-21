import React from 'react';



const SloohGiftCard = () => (
  <div className="root">
    <div className="register-container slooh-gift-card">
      <h2>Slooh Gift Cards are now <br></br>available!</h2>
      <h4>Click the link below and give the gift of the universe</h4>
      <a href="https://www.amazon.com/Slooh-Apprentice-Membership/dp/B01MDNJXIR/ref=sr_1_1?dchild=1&keywords=slooh+apprentice+membership&qid=1606755292&sr=8-1" target="_blank">
        <img src="https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/gift-of-the-universe.png" alt="" />
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
        }
      `}
    </style>
  </div>
);



export default SloohGiftCard;
