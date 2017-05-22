import React from 'react';
import Header from '../../components/bookclub-handoff/Header';
import Description from '../../components/bookclub-handoff/Description';
import { white } from '../../styles/variables/colors';

function BookclubHandoff() {
  return (
    <div className="bookclub-container">
      <Header />
      <Description />
      <img alt="Book" className="bookclub-img" src="/assets/images/bookclub/KindlePromo.png" />
      <style jsx>{`

        .bookclub-container {
          background-color: ${white};
        }

      `}</style>
    </div>
  );
}

export default BookclubHandoff;
