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
      <a href="https://www.amazon.com/Saturn-Above-Various/dp/0997621109/ref=sr_1_2?ie=UTF8&qid=1495454535&sr=8-2&keywords=the+saturn+above+it" rel="noopener noreferrer" target="_blank"><img alt="Book" className="bookclub-img" src="assets/images/bookclub/KindlePromo.png" /></a>
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
