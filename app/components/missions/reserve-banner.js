import React from 'react';
import UniversalTime from '../common/universal-time';
import { primaryFont } from '../../styles/variables/fonts';
import { white } from '../../styles/variables/colors';

const ReserveBanner = () => (
  <div className="reserve-banner">
    <div className="title col-md-7">
      <h1>Auto Schedule Telescopes</h1>
      <h2 className="sub-title">
        You can start by selecting an object in Featured Objects, Reserve Slooh 500 or Reserve by
        Catalog, and we’ll pick the time and best telescope for you. Or you can start by selecting a
        time slot in Reserve by Telescope, and we’ll show you which objects can be seen at that time
        and with that telescope. It&#39;s easy, so go for it!
      </h2>
    </div>
    <section className="col-md-4 align-right">
      <UniversalTime />
    </section>

    <style jsx>{`
      @media (min-width: 768px) {
        .reserve-banner {
          padding: 20px;
        }

        h1 {
          margin-top: 70px;
          font-size: 36px;
        }
      }

      .reserve-banner {
        font-family: ${primaryFont};
        background: url(https://vega.slooh.com/assets/images/photos/enigma.png);
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 165px;
        padding: 20px 0px;
        position: relative;
      }

      h1 {
        font-size: 28px;
        margin: 0;
        margin-bottom: 10px;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
      }

      .sub-title {
        font-size: 12px;
        font-weight: normal;
        text-transform: none;
        color: ${white};
        line-height: 18px;
        margin: 0;
        max-width: 65%;
      }
    `}</style>
  </div>
);

export default ReserveBanner;
