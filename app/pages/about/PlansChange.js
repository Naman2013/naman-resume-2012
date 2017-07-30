import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ModalGeneric from '../../components/common/modals/modal-generic';

const PLAN_DESCRIPTIONS = {
  RESERVATION_LIMIT_5: {
    title: '5 Reservation Limit',
    description: 'Point any Slooh telescope at any of the Slooh 500.',
  },
  RESERVATION_LIMIT_UNLIMITED: {
    title: 'Unlimited Reservations',
    description: 'Point any Slooh telescope at any object in the sky, as selected from existing astro-catalogs or by entering coordinates.',
  },
  OBJECTS_SLOOH_500: {
    title: 'Objects: Slooh 500',
    description: 'The Slooh 500 are the most popular objects in the night sky as chosen by the Slooh community.',
  },
  SLOOH_ROAD_TRIP: {
    title: 'Slooh Road Trip',
    description: 'Join Slooh for outdoor events such as the Total Solar Eclipse in Stanley, Idaho on August 21st, 2017',
  },
};

class PlansChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      title: '',
      description: '',
    };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(event) {
    event.preventDefault();

    this.setState({
      modalOpen: false,
    });
  }

  openModal(modalContent) {
    this.setState({
      ...modalContent,
      modalOpen: true,
    });
  }

  render() {
    const { modalOpen, title, description } = this.state;
    const { registerNewSloohCrewURL, registerNewApprenticeURL, registerNewAstronomerURL } = this.props;
    return (

      <div className="plans-container">
        <div className="bg-div-pic clearfix">

          <div className="about pricing">
            <ModalGeneric
              open={modalOpen}
              closeModal={this.closeModal}
              title={title}
              description={description}
            />

            <div className="row first-row">
              <div className="col-xs-6 text-left">
                <h1 className="plan-welcome" id="plan-welcome-head">Pricing Plans</h1>
              </div>

              <div className="col-xs-6 text-right">
                <Link to="/about/contact" className="contact-button regButton"> Contact Us </Link>
              </div>
            </div>

            <div className="row final-row">

              <div className="col-lg-3 col-md-3 col-sm-2 col-xs-2 text-center" />


              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 text-center">

                <article className="plan plan-col">

                  <header className="move-down text-center">
                    <div className="spotlight-icon">
                      <img alt="Apprentice icon" src="https://vega.slooh.com/icons/registration/apprentice.svg" width="70%" />
                    </div>
                  </header>

                  <article className="backdrop dark text-center padding-reg">
                    <h3>Apprentice</h3>

                    <p className="text-large price margin-none"><sup>$</sup>4.95</p>

                    <p className="margin-large margin-none">Monthly | USD</p>

                    <div className="margin-top-med margin-bottom-large pos-relative">30 Day free trial
                      <br />if you act now
                    </div>
                    <ul className="features">
                      <li>Shows: All</li>
                      <li>Telescopes</li>
                      <li>Take Pictures</li>
                      <li>Community</li>
                      <li>5 Reservations <small>monthly</small> <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.RESERVATION_LIMIT_5)}} className="icon control info-white">info</i></li>
                      <li>Objects: Slooh 500 <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.OBJECTS_SLOOH_500)}} className="icon control info-white">info</i></li>
                      <li>Space Situation Room</li>
                      <li>Slooh Road Trip <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.SLOOH_ROAD_TRIP)}} className="icon control info-white">info</i></li>
                    </ul>
                  </article>

                  <footer>
                    <a className="btn-primary continue" href={registerNewApprenticeURL}>Get This Plan</a>
                  </footer>

                </article>

              </div>

              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 text-center">

                <article className="plan plan-col">

                  <header className="move-down text-center">
                    <div className="spotlight-icon"><img alt="astronomer icon" src="https://vega.slooh.com/icons/registration/astronomer.svg" /></div>
                  </header>

                  <article className="dark backdrop text-center padding-reg">

                    <h3 className="margin-top-reg">Astronomer</h3>
                    <p className="text-large price margin-none"><sup>$</sup>24.95</p>

                    <p>Monthly | USD</p>

                    <div className="margin-top-med margin-bottom-large">Become a leader in the
                        <br />Slooh Community</div>

                    <ul className="features">
                      <li>Shows: All</li>
                      <li>Telescopes</li>
                      <li>Take Pictures</li>
                      <li>Community</li>
                      <li>Unlimited Reservations <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.RESERVATION_LIMIT_UNLIMITED)}} className="icon control info-white">info</i>
                      </li>
                      <li>Objects: All
                      </li>
                      <li>Space Situation Room</li>
                      <li>Slooh Road Trip <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.SLOOH_ROAD_TRIP)}} className="icon control info-white">info</i></li>
                    </ul>
                  </article>

                  <footer>
                    <a className="btn-primary continue" href={registerNewAstronomerURL}>Get This Plan</a>
                  </footer>

                </article>


              </div>

            </div>

            <div className="col-lg-3 col-md-3 col-sm-2 col-xs-2 text-center" />

          </div>
        </div>

        <div className="bg-div-white">

          <div className="row">

            <div className="col-lg-12">

              <section className="tab faq row-page">

                <h2 className="border-top margin-top-large padding-top-xsmall">FAQ</h2>

                <div className="border-top margin-bottom-none">

                  <div className="col-full sans-serif padding-small">

                    <input className="pull-right top-stack" id="faq-one" type="checkbox" name="tabs" />
                    <label className="top-stack" htmlFor="faq-one">How many telescopes do you have? </label>

                    <div className="tab-content">
                      <p>
                        Slooh has seven telescopes situated at its flagship observatory, at the Institute of Astrophysics of the Canary Islands, one of the world’s top observatory sites, and three telescopes based in Santiago, Chile, situated at the Catholic University and offering complementary views of the southern skies. We also have a network of over 25 partner observatories bringing you live feeds of outer space.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-top">

                  <div className="col-full sans-serif padding-small">

                    <input className="pull-right top-stack" id="faq-two" type="checkbox" name="tabs" />
                    <label className="top-stack" htmlFor="faq-two">Is Slooh for novices or experts? </label>

                    <div className="tab-content">
                      <p>
                        Slooh Apprentice is perfect for people who share a basic curiosity about space and Slooh Astronomer is appropriate for advanced amateur astronomers who want to track asteroids, comets, supernovae, etc. as well as participate in leading the community.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-top margin-bottom-none">

                  <div className="col-full sans-serif padding-small">

                    <input className="pull-right top-stack" id="faq-three" type="checkbox" name="tabs" />
                    <label className="top-stack" htmlFor="faq-three">How do I control the telescope?</label>

                    <div className="tab-content">
                      <p>
                        You make a reservation for a 5 or 10 minute &quot;mission&quot; on any one of the telescopes. Slooh works like a jukebox--one member is in control while all other paying members can watch along.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-top margin-bottom-none">
                  <div className="col-full sans-serif padding-small">

                    <input className="pull-right top-stack" id="faq-four" type="checkbox" name="tabs" />
                    <label className="top-stack" htmlFor="faq-four">Do I need a strong science background to use Slooh?</label>

                    <div className="tab-content">
                      <p>
                        No, Slooh embraces all perspectives about what is &quot;out there&quot; and the community is open to the spiritual, the artistic, the imaginative, along with the scientific. You will find David Bowie and Vincent Van Gogh next to Albert Einstein and Carl Sagan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-top margin-bottom-none">
                  <div className="col-full sans-serif padding-small">

                    <input className="pull-right top-stack" id="faq-five" type="checkbox" name="tabs" />
                    <label className="top-stack" htmlFor="faq-five">Is there any limit to the number of photos I can take? </label>

                    <div className="tab-content">
                      <p>
                        No, you can snap as many pictures as desired, which will be saved in your &quot;My Pictures&quot; gallery, which you can freely share, on your way to collecting all solar systems objects, Messier objects, Slooh 500, and other catalogs and challenges we create for you.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

        </div>

        <style jsx>{`
          .app-content-container, .static-app-content-container {
            min-width: 400px;
          }

          .plans-container {
            position: relative !important;
          }

          .first-row {
            margin: 50px 25px 50px 25px;
          }

          .plan-welcome {
            color: white;
            font-weight: 300;
          }

          a.contact-button.regButton {
            font-family: "brandon-grotesque",sans-serif;
            text-decoration: none;
            padding: 10px;
            width: 50px;
            margin-top: 10px;
            background-color: #F310A7;
            color: #fff;
            cursor: pointer;
          }

          #plan-welcome-subtitle {

          }

          #plan-welcome-head{

          }

          #plan-welcome-blurb {

          }

          .bg-div-pic {
            background: url(https://vega.slooh.com/assets/images/photos/stellar.jpg) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          }

          div.row.final-row {
            margin-bottom: 50px;
          }

          article.plan.plan-col {
            display: inline;
          }

          .bg-div-white {
            background: #fff;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          }

          .row {
            margin: 0;
          }

        `}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ appConfig }) => ({
  ...appConfig,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(PlansChange);
