import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Features from '../../components/plans/features';

class PlansChange extends Component {

  updateFeaturesPopState(ID) {
    const { apprenticeFeatures } = this.state;
    const newApprecentice = apprenticeFeatures.map((feature) => {
      if (feature.id === ID) {
        return Object.assign({}, feature, { toolTipOpen: true });
      }

      return Object.assign({}, feature, { toolTipOpen: false });
    });

    this.setState({
      apprenticeFeatures: newApprecentice,
    });
  }

  openPopup = (selectedPopID) => {
    this.updateFeaturesPopState(selectedPopID);
  }

  resetPopup = (event) => {
    console.log('handle reset');
  }

  render() {
    const { apprenticeFeatures } = this.state;
    const { registerNewSloohCrewURL, registerNewApprenticeURL, registerNewAstronomerURL } = this.props;
    return (

      <div className="plans-container">
        <div className="bg-div-pic clearfix">

          <div className="about pricing">

            <div className="row first-row">
              <div className="col-sm-6 text-left">
                <h1 className="plan-welcome" id="plan-welcome-head">Pricing Plans</h1>
              </div>

              <div className="col-sm-6 text-right">
                <Link to="/about/contact" className="button btn-primary help-page-button">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="row final-row">

                <div className="col-lg-3 col-md-3 col-sm-6 text-center" style={{ marginLeft: '13%' }}>

                  <article className="plan plan-col">

                    <header className="move-down text-center">
                      <div className="spotlight-icon"><img alt="astronomer icon" src="https://vega.slooh.com/icons/registration/sloohcrew.svg" /></div>
                    </header>

                    <article className="dark backdrop text-center padding-reg">

                      <h3 className="margin-top-reg">Slooh Crew</h3>
                      <p className="text-large price margin-none">Free</p>

                      <p>
                        Introducing Slooh
                      </p>

                      <div className="margin-top-med margin-bottom-large">
                        Introducing Slooh to the Community
                      </div>

                      <Features
                        features_array={FEATURE_ARRAY_SLOOH_CREW}
                        openPopup={this.openPopup}
                        closeAllPopup={this.resetPopup}
                      />

                    </article>

                    <footer>
                      <a className="btn-primary continue" href={registerNewAstronomerURL}>Register Free</a>
                    </footer>

                  </article>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-6 text-center">

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

                      <Features
                        features_array={apprenticeFeatures}
                        openPopup={this.openPopup}
                      />

                    </article>

                    <footer>
                      <a className="btn-primary continue" href={registerNewApprenticeURL}>Get This Plan</a>
                    </footer>

                  </article>

                </div>

                <div className="col-lg-3 col-md-3 col-sm-6 text-center">

                  <article className="plan plan-col">

                    <header className="move-down text-center">
                      <div className="spotlight-icon"><img alt="astronomer icon" src="https://vega.slooh.com/icons/registration/astronomer.svg" /></div>
                    </header>

                    <article className="dark backdrop text-center padding-reg">

                      <h3 className="margin-top-reg">Astronomer</h3>
                      <p className="text-large price margin-none"><sup>$</sup>24.95</p>

                      <p>Monthly | USD</p>

                      <div className="margin-top-med margin-bottom-large">Become a leader in the
                          <br />Slooh Community
                      </div>

                      <Features
                        features_array={FEATURE_ARRAY_ASTRONOMER}
                        openPopup={this.openPopup}
                      />

                    </article>

                    <footer>
                      <a className="btn-primary continue" href={registerNewAstronomerURL}>Get This Plan</a>
                    </footer>

                  </article>
                </div>

            </div>
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

          .static-app-content-container section.row-wide {
            margin: 0 auto;
            position: relative;
            height: auto;
            overflow: auto;
          }

          .plans-container {
            position: relative !important;
          }

          .row.first-row {
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
