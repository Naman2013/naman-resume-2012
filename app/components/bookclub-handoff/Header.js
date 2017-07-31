import React from 'react';
import { white, pink } from '../../styles/variables/colors';

const btnPrimary = {
  background: pink,
  color: white,
  height: '40px',
  lineHeight: '40px',
  fontSize: '13px',
  textAlign: 'center',
  WebkitTransition: 'all 0.1s ease-in',
  MozTransition: 'all 0.1s ease-in',
  OTransition: 'all 0.1s ease-in',
  transition: 'all 0.1s ease-in',
  display: 'inline-block',
  margin: '0 250px',
  border: 'none',
  borderRadius: 0,
  textDecoration: 'none',
  padding: '0 40px',
};

function Header() {
  return (
    <div className="header-container">
      <header className="main">
        <div className="title-text">
          <span className="primary-text">Literary Visions</span>
          <span className="secondary-text">of space</span>
        </div>
        <img alt="Book" className="bookclub-img" src="https://vega.slooh.com/assets/images/bookclub/Book_Graphic.png" />
      </header>
      <a href="https://www.amazon.com/Saturn-Above-Various/dp/0997621109/ref=sr_1_2?ie=UTF8&qid=1495454535&sr=8-2&keywords=the+saturn+above+it" rel="noopener noreferrer" target="_blank" style={btnPrimary}>GET YOUR COPY ON AMAZON</a>
      <style jsx>{`
        .title-text {
          margin-left: 150px;
          text-transform: uppercase;
          color: ${white};
        }
        .primary-text {
          font-weight: bold;
          font-size: 22px;
          display: block;
          font-size: 30px;
        }

        .secondary-text {
          font-weight: bold;
          font-size: 42px;
          display: block;
          font-size: 56px;
          margin-top: -20px;
        }

        .header-container {
          height: 350px;
          width: 100%;
        }
        .main {
          height: 300px;
          width: 100%;
          background: url(https://vega.slooh.com/assets/images/bookclub/BG.png) center top/cover no-repeat;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .bookclub-img {
          height: 275px;
          margin-top: 175px;
        }
      `}</style>
    </div>
  );
}

export default Header;
