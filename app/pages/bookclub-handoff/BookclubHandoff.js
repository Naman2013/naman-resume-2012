import React from 'react';
import Header from '../../components/bookclub-handoff/Header';
import Footer from '../../components/bookclub-handoff/Footer';
import Description from '../../components/bookclub-handoff/Description';
import { white } from '../../styles/variables/colors';

function BookclubHandoff() {
  return (
    <div className="bookclub-container">
      <Header />
      <Description />
      <a href="https://www.amazon.com/Saturn-Above-Anthology-Short-Fiction-ebook/dp/B01N9TMRWP/ref=sr_1_1?s=digital-text&ie=UTF8&qid=1497297145&sr=1-1&keywords=the+saturn+above+it" rel="noopener noreferrer" target="_blank"><img alt="Book" className="bookclub-img" src="https://vega.slooh.com/assets/images/bookclub/KindlePromo.png" /></a>
      <Footer />
      <style jsx>{`

        .bookclub-container {
          background-color: ${white};
        }

      `}</style>
    </div>
  );
}

export default BookclubHandoff;
