import React from 'react';
import Header from './common/header';

const Notifications = () => (
  <div className="about careers">
    <article>

      <Header
        headerCopy="Notifications"
      />

      <section className="account-details row-page">
        <h2>Notifications</h2>
        <p className="sans-serif">How and when we reach out is up to you. Change any settings below and click “Save Changes” when you are done.</p>

        <div className="border-top margin-bottom-large">
          <div className="border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Recieve Mission Status
            </div>
            <div className="col-3fifth sans-serif border-left padding-small">
              Stay up-to-date on the latest weather and telescope availability reports.
            </div>

            <div className="col-fifth sans-serif text-center padding-top-xsmall">
              <input className="tgl tgl-flip" id="RMS" type="checkbox" checked />
              <label className="tgl-btn pull-right" htmlFor="RMS" data-tg-off="Nope" data-tg-on="Yes!" />
            </div>
          </div>
          <div className="border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              FITS Files
            </div>
            <div className="col-3fifth sans-serif border-left padding-small">
              Not sure what the specific preference for this one would be at
              this time. Consult with Ed. Only relevant to Astronomers.
            </div>

            <div className="col-fifth sans-serif text-center padding-top-xsmall">
              <input className="tgl tgl-flip" id="FITS" type="checkbox" checked />
              <label className="tgl-btn pull-right" data-tg-off="Nope" data-tg-on="Yes!" htmlFor="FITS" />
            </div>
          </div>
          <div className="border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Events and Objects
            </div>
            <div className="col-3fifth sans-serif border-left padding-small">
              Stay in the loop with the world of Slooh: we’ll keep you up-todate
              on new shows, community events, and celestial sightings.
            </div>

            <div className="col-fifth sans-serif text-center padding-top-xsmall">
              <input className="tgl tgl-flip" id="EO" type="checkbox" checked />
              <label className="tgl-btn pull-right" data-tg-off="Nope" data-tg-on="Yes!" htmlFor="EO" />
            </div>

          </div>
          <div className="border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Illuminations
            </div>

            <div className="col-3fifth sans-serif border-left padding-small">
              Receive updates when people comment on content that you post to Illuminations.
            </div>

            <div className="col-fifth sans-serif text-center padding-top-xsmall">
              <input className="tgl tgl-flip" id="CC" type="checkbox" checked />
              <label className="tgl-btn pull-right" data-tg-off="Nope" data-tg-on="Yes!" htmlFor="CC" />
            </div>

          </div>
          <div className="border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Discussion Board
            </div>

            <div className="col-3fifth sans-serif border-left padding-small">
              Receive notifications when community members reply to your discussion board topics.
            </div>

            <div className="col-fifth sans-serif text-center padding-top-xsmall">
              <input className="tgl tgl-flip" id="DB" type="checkbox" checked />
              <label className="tgl-btn pull-right" data-tg-off="Nope" data-tg-on="Yes!" htmlFor="DB" />
            </div>
          </div>
          <div className="border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Contact Preferences
            </div>
            <div className="col-3fifth sans-serif border-left padding-small">
              Let us know how you roll: do you prefer email updates, SMS text updates, or both.
            </div>
            <div className="col-fifth sans-serif text-center padding-top-xsmall">
              <select className="form-control input" type="text" name="lastname">
                <option>email</option>
                <option>SMS</option>
                <option>both</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
);

export default Notifications;
