import React, { Component } from 'react';
import ModalGeneric from '../../components/common/modals/modal-generic';

const PLAN_DESCRIPTIONS = {
  FREE_TRIAL: {
    title: 'This is all about free trials',
    description: 'Something about free trials being awesome!',
  },
  RESERVATION_LIMIT_5: {
    title: '5 Reservation Limit',
    description: 'Five reservations is pretty good.',
  },
  RESERVATION_LIMIT_UNLIMITED: {
    title: 'Unlimited Reservations',
    description: 'This is more like it!',
  },
  OBJECTS_ALL: {
    title: 'Objects All',
    description: 'This is another type of reservation, you can reserve any type of object',
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
    console.log(modalContent);
    this.setState({
      ...modalContent,
      modalOpen: true,
    });
  }

  render() {
    const { modalOpen, title, description } = this.state;

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
                    <img alt="Jupiter icon" className="" src="../assets/icons/jupiter.svg" />
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
                    <li>Public Shows</li>
                    <li className="not">Live Telescope Feeds</li>
                    <li>Take Occasional Pictures</li>
                    <li>Community</li>
                    <li className="not">Reservations</li>
                    <li className="not">Objects: Most Popular</li>
                    <li>Video On Demand: Featured</li>
                  </ul>
                </article>
                <footer>
                  <button className="btn-primary continue">Get This Plan</button>
                </footer>
              </article>

              <article className="plan">

                <header className="move-down text-center">
                  <div className="spotlight-icon">
                    <img alt="Astronout icon" src="../assets/icons/astronaut.svg" width="70%" />
                  </div>
                </header>

                <article className="backdrop dark text-center padding-reg">
                  <h3>Apprentice</h3>

                  <p className="text-large price margin-none"><sup>$</sup>4.95</p>

                  <p className="margin-large margin-none">Monthly | USD</p>

                  <div className="margin-top-med margin-bottom-large pos-relative">30 Day free trial
                    <br />if you act now <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.FREE_TRIAL)}} className="icon control info-white">info</i>
                  </div>
                  <ul className="features">
                    <li>Public Shows</li>
                    <li>Live Telescope Feeds</li>
                    <li>Take Pictures</li>
                    <li>Community</li>
                    <li>5 Reservations <small>monthly</small> <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.RESERVATION_LIMIT_5)}} className="icon control info-white">info</i></li>
                    <li>Objects: Most Popular</li>
                    <li>Video On Demand: All</li>
                  </ul>
                </article>

                <footer>
                  <button className="btn-primary continue">Get This Plan</button>
                </footer>

              </article>

              <article className="plan">

                <header className="move-down text-center">
                  <div className="spotlight-icon"><img alt="Galaxy icon" src="../assets/icons/galaxy.svg" /></div>
                </header>

                <article className="dark backdrop text-center padding-reg">

                  <h3 className="margin-top-reg">Astronomer</h3>
                  <p className="text-large price margin-none"><sup>$</sup>24.95</p>

                  <p>Monthly | USD</p>

                  <div className="margin-top-med margin-bottom-large">Become a leader in the
                      <br />Slooh Community</div>

                  <ul className="features">
                    <li>Public Shows</li>
                    <li>Live Telescope Feeds</li>
                    <li>Take Pictures</li>
                    <li>Community</li>
                    <li>Unlimited Reservations <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.RESERVATION_LIMIT_UNLIMITED)}} className="icon control info-white">info</i>
                    </li>
                    <li>Objects: All <i onClick={() => {this.openModal(PLAN_DESCRIPTIONS.OBJECTS_ALL)}} className="icon control info-white">info</i>
                    </li>
                    <li>Video On Demand: All</li>
                  </ul>
                </article>

                <footer>
                  <button className="btn-primary continue">Get This Plan</button>
                </footer>

              </article>

            </section>

            <section className="tab faq row-page">

              <h2 className="border-top margin-top-large padding-top-xsmall">FAQ</h2>

              <div className="border-top margin-bottom-none">

                <div className="col-full sans-serif padding-small">

                  <input className="pull-right top-stack" id="faq-one" type="checkbox" name="tabs" />
                  <label className="top-stack" htmlFor="faq-one">Question</label>

                  <div className="tab-content">
                    <p>
                      Answer So she was considering in her own mind (as well as she
                      could, for the hot day made her feel very sleepy and stupid),
                      whether the pleasure of making a daisy-chain would be worth
                      the trouble of getting up and picking the daisies, when
                      suddenly a White Rabbit with pink eyes ran close by her.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-top">

                <div className="col-full sans-serif padding-small">

                  <input className="pull-right top-stack" id="faq-two" type="checkbox" name="tabs" />
                  <label className="top-stack" htmlFor="faq-two">Question</label>

                  <div className="tab-content">
                    <p>
                      Answer So she was considering in her own mind (as well as she
                      could, for the hot day made her feel very sleepy and stupid),
                      whether the pleasure of making a daisy-chain would be worth
                      the trouble of getting up and picking the daisies, when
                      suddenly a White Rabbit with pink eyes ran close by her.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-top margin-bottom-none">

                <div className="col-full sans-serif padding-small">

                  <input className="pull-right top-stack" id="faq-three" type="checkbox" name="tabs" />
                  <label className="top-stack" htmlFor="faq-three">Question</label>

                  <div className="tab-content">
                    <p>
                      Answer So she was considering in her own mind (as well as she
                      could, for the hot day made her feel very sleepy and stupid),
                      whether the pleasure of making a daisy-chain would be worth
                      the trouble of getting up and picking the daisies, when
                      suddenly a White Rabbit with pink eyes ran close by her.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-top margin-bottom-none">
                <div className="col-full sans-serif padding-small">

                  <input className="pull-right top-stack" id="faq-four" type="checkbox" name="tabs" />
                  <label className="top-stack" htmlFor="faq-four">Question</label>

                  <div className="tab-content">
                    <p>
                      Answer So she was considering in her own mind (as well as she
                        could, for the hot day made her feel very sleepy and stupid),
                        whether the pleasure of making a daisy-chain would be worth
                        the trouble of getting up and picking the daisies, when
                        suddenly a White Rabbit with pink eyes ran close by her.
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

export default PlansChange;
