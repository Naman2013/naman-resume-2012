import React from 'react';
import { Link } from 'react-router';
import Header from './common/header';
import HeadshotAccountDetail from './common/HeadshotAccountDetail';

const Profile = () => (
  <div className="settings profile">

    <Header
      headerCopy="Dashboard for Joe Bob"
      subHeaderCopy="Member Since [Month] [DD], [YYYY]"
    />

    <HeadshotAccountDetail
      membershipLevel="[Membership level]"
      profileImageURL=""
      membershipType="[Membership Type]"
    />

    <article>
      <section className="missions">
        <h2 className="center margin-top-reg margin-bottom-large">Recent &amp; Upcoming Missions</h2>
        <article className="card-xwide sans-serif ">

          <section className="col-3fourth border-right padding-top-xxsmall padding-bottom-small padding-left-med">
            <header className="padding-bottom-xxsmall">
              <h3>
                <i className="name icon-large icon-galaxy" /> [Mission Title]
              </h3>
            </header>

            <section className="row-page margin-top-xxsmall margin-bottom-xsmall sans-serif border-bottom border-top padding-none">
              <div className="col-third padding-small padding-bottom-xxsmall mission-type">
                <p className="text-small">[Mission type]</p>
              </div>
              <div className="col-third border-left border-right padding-small padding-bottom-xxsmall mission-location">
                <p className="icon-small icon-location text-small">[Mission Location]</p>
              </div>
              <div className="col-third padding-small padding-bottom-xxsmall padding-left-none mission-telescope-name">
                <p className="icon-small icon-telescope text-small">[Mission Telescope Name]</p>
              </div>
            </section>
            <section className="row-xxwide sans-serif">
              <div className="date-time">
                <span className="margin-right-med icon-small icon-calendar ">[Date]</span>
                <span>EST <strong>[Time]</strong></span>
                <span className="padding-right-xsmall padding-left-xsmall margin-left-xsmall margin-right-xsmall border-right border-left">PST <strong>[Time]</strong> </span>
                <span>UTC <strong>[Time]</strong></span>
              </div>
            </section>
          </section>

          <aside className="col-quarter padding-top-large padding-left-med padding-right-med center-center">
            <figure>

              <div className="dhm-label">
                <span className="padding-none padding-right-med border-right">D</span>
                <span className="padding-none padding-right-reg padding-left-reg border-none">H</span>
                <span className="padding-none padding-left-med  border-left">M</span>
              </div>

              <div className="dhm text-xxlarge">
                <span className="">00</span>:<span className="">00</span>:<span className="">00</span>
              </div>

              <figcaption className="padding-top-xxsmall">[MESSAGE TEXT]</figcaption>
            </figure>
          </aside>
        </article>

        <article className="card-xwide sans-serif ">

          <section className="col-3fourth border-right padding-top-xxsmall padding-bottom-small padding-left-med">
            <header className="padding-bottom-xxsmall">
              <h3>
                <i className="name icon-large icon-planet" /> [Mission Title]</h3>
            </header>

            <section className="row-page margin-top-xxsmall margin-bottom-xsmall sans-serif border-bottom border-top padding-none">
              <div className="col-third padding-small padding-bottom-xxsmall mission-type">
                <p className="text-small">[Mission type]</p>
              </div>
              <div className="col-third border-left border-right padding-small padding-bottom-xxsmall mission-location">
                <p className="icon-small icon-location text-small">[Mission Location]</p>
              </div>
              <div className="col-third padding-small padding-bottom-xxsmall padding-left-none mission-telescope-name">
                <p className="icon-small icon-telescope text-small">[Mission Telescope Name]</p>
              </div>
            </section>
            <section className="row-xxwide sans-serif">
              <div className="date-time">
                <span className="margin-right-med icon-small icon-calendar ">[Date]</span>
                <span>EST <strong>[Time]</strong></span>
                <span className="padding-right-xsmall padding-left-xsmall margin-left-xsmall margin-right-xsmall border-right border-left">PST <strong>[Time]</strong> </span>
                <span>UTC <strong>[Time]</strong></span>
              </div>
            </section>
          </section>

          <aside className="col-quarter padding-top-large padding-left-med padding-right-med center-center">
            <figure>
              <div className="dhm-label">
                <span className="padding-none padding-right-med border-right">D</span>
                <span className="padding-none padding-right-reg padding-left-reg border-none">H</span>
                <span className="padding-none padding-left-med  border-left">M</span>
              </div>

              <div className="dhm text-xxlarge">
                <span className="">00</span>:<span className="">00</span>:<span className="">00</span>
              </div>

              <figcaption className="padding-top-xxsmall">[MESSAGE TEXT]</figcaption>
            </figure>
          </aside>

        </article>

        <article className="card-xwide sans-serif ">

          <section className="col-3fourth border-right padding-top-xxsmall padding-bottom-small padding-left-med">
            <header className="padding-bottom-xxsmall">
              <h3 className=""><i className="name icon-large icon-science" /> [Mission Title]</h3>
            </header>

            <section className="row-page margin-top-xxsmall margin-bottom-xsmall sans-serif border-bottom border-top padding-none">
              <div className="col-third padding-small padding-bottom-xxsmall mission-type">
                <p className="text-small">[Mission type]</p>
              </div>
              <div className="col-third border-left border-right padding-small padding-bottom-xxsmall mission-location">
                <p className="icon-small icon-location text-small">[Mission Location]</p>
              </div>
              <div className="col-third padding-small padding-bottom-xxsmall padding-left-none mission-telescope-name">
                <p className="icon-small icon-telescope text-small">[Mission Telescope Name]</p>
              </div>
            </section>
            <section className="row-xxwide sans-serif">
              <div className="date-time">
                <span className="margin-right-med icon-small icon-calendar ">[Date]</span>
                <span>EST <strong>[Time]</strong></span>
                <span className="padding-right-xsmall padding-left-xsmall margin-left-xsmall margin-right-xsmall border-right border-left">PST <strong>[Time]</strong> </span>
                <span>UTC <strong>[Time]</strong></span>
              </div>
            </section>
          </section>

          <aside className="col-quarter padding-top-large padding-left-med padding-right-med center-center">
            <figure>
              <div className="icon-xxlarge icon-weather" />
              <figcaption>[MESSAGE TEXT]</figcaption>
            </figure>
          </aside>
        </article>

        <div className="row-xxwide center-center margin-top-large">
          <Link
            className="btn-primary center-block"
            to="/reservations"
          >
            Make a New Reservation
          </Link>
        </div>
      </section>

      <aside className="interstital padding-top-xsmall padding-bottom-med margin-top-xlarge margin-bottom-small white sans-serif">

        <article className="row-page padding-top-large center-block">
          <div className="col-2third">
            <i className="spotlight-icon icon-large icon-galaxy pull-left" />
            <div className="pull-left margin-left-small" style={{ width: '490px' }}>
              <h2 className="white">Consider an Astronmer upgrade</h2>
              <p>
                Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse
                nec urnat laoreet sodales nisi, quis iaculis nulla iaculis vitao
                ewagittis.
              </p>
            </div>
          </div>

          <div className="col-third text-center white">
            <div className="pull-left">
              <div className="text-large price margin-botttom-none padding-bottom-tiny">
                <sup>$</sup>24.95
              </div>
              <div>Monthly | USD</div>
            </div>
            <Link
              className="btn-primary pull-right margin-top-xsmall"
              to=""
            >
              Level Up Now!
          </Link>
          </div>
        </article>
      </aside>

      <section className="recent-pictures row-xxwide">

        <h2 className="center margin-top-large margin-bottom-large ">Recent Pictures</h2>
        <article>

          <a href="">
            <div className="slooh-thumbnail" style={{ backgroundImage: 'url(../assets/images/photos/stellar-1.jpg)' }} />
          </a>

          <a href="">
            <div className="slooh-thumbnail" style={{ backgroundImage: 'url(../assets/images/photos/stellar-2.jpg)' }} />
          </a>

          <a href="">
            <div className="slooh-thumbnail" style={{ backgroundImage: 'url(../assets/images/photos/stellar-3.jpg)' }} />
          </a>

          <a href="">
            <div className="slooh-thumbnail" style={{ backgroundImage: 'url(../assets/images/photos/stellar-4.jpg)' }} />
          </a>
        </article>

        <div className="row-xxwide center-center">
          <Link
            className="btn-primary center-block"
            to="/my-pictures"
          >
              Go To My Pictures
          </Link>
        </div>
      </section>

      {
          /**
          <section className="row-xxwide objects-followed">

              <h2 className="center margin-bottom-large padding-top-large border-top">Objects Followed</h2>

              <article className="card-xwide sans-serif ">
                  <aside className="col-quarter padding-med center-center">

                      <i className="name icon-large icon-galaxy"></i>

                      <h3 className="margin-top-xlarge">[Object Name]</h3>
                      <p className="text-small">[Object Message]</p>

                      <div className="margin-top-xlarge">
                          <input className='tgl tgl-flip' id='follow1' type='checkbox' checked>
                          <label className='tgl-btn  center-block' data-tg-off='Not Following' data-tg-on='Following!' for='follow1'></label>
                      </div>

                  </aside>

                  <section className="col-3fourth border-left">

                      <div className="row-full padding-small padding-right-none">
                          <i className="name icon-large icon-diy pull-left margin-left"></i>
                          <div className="pull-left">
                              <span className="text-capitalize text-regular">DIY</span>
                              <p className="text-small">[diy copy]</p>
                          </div>
                      </div>
                      <div className="row-full border-top border-bottom padding-small padding-right-none">
                          <i className="name icon-large icon-spirit pull-left"></i>
                          <span className="text-capitalize text-regular">Human Spirit</span>
                          <p className="text-small">[Human Spirit copy]</p>
                      </div>
                      <div className="row-full padding-small padding-top-small padding-right-none">
                          <i className="name icon-large icon-art pull-left"></i>
                          <span className="text-capitalize text-regular">Art &amp; Culture</span>
                          <p className="text-small">[Art &amp; Culture copy]</p>
                      </div>

                  </section>


              </article>

              <article className="card-xwide sans-serif ">

                  <aside className="col-quarter padding-med center-center">

                      <i className="name icon-large icon-planet"></i>

                      <h3 className="margin-top-xlarge">[Object Name]</h3>
                      <p className="text-small">[Object Message]</p>

                      <div className="margin-top-xlarge">
                          <input className='tgl tgl-flip' id='follow2' type='checkbox' checked>
                          <label className='tgl-btn  center-block' data-tg-off='Not Following' data-tg-on='Following!' for='follow2'></label>
                      </div>

                  </aside>

                  <section className="col-3fourth border-left">

                      <div className="row-full padding-small padding-right-none">
                          <i className="name icon-large icon-diy pull-left"></i>
                          <span className="text-capitalize text-regular">DIY</span>
                          <p className="text-small">[diy copy]</p>
                      </div>
                      <div className="row-full border-top border-bottom padding-small padding-right-none">
                          <i className="name icon-large icon-spirit pull-left"></i>
                          <span className="text-capitalize text-regular">Human Spirit</span>
                          <p className="text-small">[Human Spirit copy]</p>
                      </div>
                      <div className="row-full padding-small padding-top-small padding-right-none">
                          <i className="name icon-large icon-art pull-left"></i>
                          <span className="text-capitalize text-regular">Art &amp; Culture</span>
                          <p className="text-small">[Art &amp; Culture copy]</p>
                      </div>

                  </section>


              </article>

          </section>
          */
        }
    </article>
  </div>
);

export default Profile;
