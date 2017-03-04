import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActions from '../../modules/dashboard/actions';
import Header from './common/header';
import HeadshotAccountDetail from './common/HeadshotAccountDetail';
import ReservationsLimit from '../../components/profile/ReservationsLimit';
import UsersReservations from '../../components/profile/UsersReservations';
import MembershipUpsell from '../../components/profile/MembershipUpsell';
import s from './Profile.scss';

const { func } = PropTypes;

class Profile extends Component {
  componentWillMount() {
    const { fetchDashboard } = this.props;
    fetchDashboard({});
  }

  render() {
    const { profile, fetchDashboard, refreshIntervalSec } = this.props;
    return (
      <div className={s.ProfileDashboard}>
        <Header
          headerCopy={`Dashboard for ${profile.memberName} (${profile.displayName})`}
          subHeaderCopy={`Member Since ${profile.memberSinceMDY}`}
        />

        <HeadshotAccountDetail
          membershipType={profile.membershipType || '[Membership Type]'}
          profileImageURL={profile.avatarURL}
        />

        <ReservationsLimit />
        <article>
          <section className="missions">
            <h2 className="center margin-top-reg margin-bottom-large">Recent &amp; Upcoming Missions</h2>
            <UsersReservations reservationsList={profile.missionList} refreshAction={fetchDashboard} refreshIntervalSec={refreshIntervalSec} />
            <div className="row-xxwide center-center margin-top-large">
              <Link
                className="btn-primary center-block"
                to="/reservations"
              >
                Make a New Reservation
              </Link>
            </div>
          </section>

          {profile.showUpsellMessage && <section className="interstital padding-top-xsmall padding-bottom-med margin-top-xlarge margin-bottom-small white sans-serif">
            <MembershipUpsell upsellDetails={profile.upsellDetails} />
          </section>}
        </article>

          {/*<section className="recent-pictures row-xxwide">

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
          </section>*/}

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
      </div>);
  }
}
Profile.defaultProps = {
  profile: {},
};
Profile.propTypes = {
  fetchDashboard: func.isRequired,
};

const mapStateToProps = ({ dashboard }) => ({
  ...dashboard,
});
const mapDispatchToProps = dispatch => (bindActionCreators(dashboardActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
