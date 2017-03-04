import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
      <div className="about pricing">
        <ModalGeneric
          open={modalOpen}
          closeModal={this.closeModal}
          title={title}
          description={description}
        />
        <article className="page">
          <section className="tab account-details row-page">

            <h2>Pricing Plans</h2>

            <section className="row-wide">

              <article className="plan">
                <header className="move-down text-center">
                  <div className="spotlight-icon">
                    <img alt="Slooh Crew icon" className="" src="https://vega.slooh.com/icons/registration/sloohcrew.svg" />
                  </div>
                </header>
                <article className="backdrop dark text-center padding-reg">
                  <h3>Slooh Crew</h3>

                  <p className="text-large margin-none">Free</p>

                  <p>&nbsp;</p>

                  <div className="margin-top-med margin-bottom-large">Join the
                    <br />Slooh Community
                  </div>

                  <ul className="features">
                    <li>Shows: Public Only</li>
                    <li className="not">Live Telescope Feeds</li>
                    <li className="not">Take Pictures</li>
                    <li>Community</li>
                    <li className="not">Reservations</li>
                    <li>Objects: None</li>
                    <li className="not">Space Situation Room</li>
                    <li className="not">Slooh Road Trip</li>
                  </ul>
                </article>
                <footer>
                  <a className="btn-primary continue" href={registerNewSloohCrewURL}>Get This Plan</a>
                </footer>
              </article>

              <article className="plan">

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
                    <li>Live Telescope Feeds</li>
                    <li>Take Pictures</li>
                    <li>Community</li>
                    <li>5 Reservations <small>monthly</small> <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.RESERVATION_LIMIT_5)}} className="icon control info-white">info</i></li>
                    <li>Objects: Slooh 500 <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.OBJECTS_SLOOH_500)}} className="icon control info-white">info</i></li>
                    <li>Space Situation Room</li>
                    <li>Slooh Road Trip</li>
                  </ul>
                </article>

                <footer>
                  <a className="btn-primary continue" href={registerNewApprenticeURL}>Get This Plan</a>
                </footer>

              </article>

              <article className="plan">

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
                    <li>Live Telescope Feeds</li>
                    <li>Take Pictures</li>
                    <li>Community</li>
                    <li>Unlimited Reservations <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.RESERVATION_LIMIT_UNLIMITED)}} className="icon control info-white">info</i>
                    </li>
                    <li>Objects: All
                    </li>
                    <li>Space Situation Room</li>
                    <li>Slooh Road Trip</li>
                  </ul>
                </article>

                <footer>
                  <a className="btn-primary continue" href={registerNewAstronomerURL}>Get This Plan</a>
                </footer>

              </article>

            </section>

            <section className="tab faq row-page">

              <h2 className="border-top margin-top-large padding-top-xsmall">FAQ</h2>

              <div className="border-top margin-bottom-none">

                <div className="col-full sans-serif padding-small">

                  <input className="pull-right top-stack" id="faq-one" type="checkbox" name="tabs" />
                  <label className="top-stack" htmlFor="faq-one">How many telescopes do you have?
</label>

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
                      You make a reservation for a 5 or 10 minute “mission” on any one of the telescopes. Slooh works like a jukebox--one member is in control while all other paying members can watch along.
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
                      No, Slooh embraces all perspectives about what is ‘out there’ and the community is open to the spiritual, the artistic, the imaginative, along with the scientific. You will find David Bowie and Vincent Van Gogh next to Albert Einstein and Carl Sagan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-top margin-bottom-none">
                <div className="col-full sans-serif padding-small">

                  <input className="pull-right top-stack" id="faq-five" type="checkbox" name="tabs" />
                  <label className="top-stack" htmlFor="faq-five">Is there any limit to the number of photos I can take?
</label>

                  <div className="tab-content">
                    <p>
                      No, you can snap as many pictures as desired, which will be saved in your “My Pictures” gallery, which you can freely share, on your way to collecting all solar systems objects, Messier objects, Slooh 500, and other catalogs and challenges we create for you.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </article>
      </div>
    );
  }
}

const mapStateToProps = ({ appConfig }) => ({
  ...appConfig,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(PlansChange);
