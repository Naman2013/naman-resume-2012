import React from 'react';
import Header from '../../components/bookclub-handoff/Header';
import Description from '../../components/bookclub-handoff/Description';
import { white } from '../../styles/variables/colors';

function BookclubHandoff() {
  return (
    <div className="bookclub-container">
      <Header />
      <Description />
      <style jsx>{`

        .bookclub-container {
          background-color: ${white};
        }

      `}</style>
    </div>
  );
}

export default BookclubHandoff;
