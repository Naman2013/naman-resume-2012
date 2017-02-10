import React from 'react';

const Redeem = () => (
  <div className="registration join">
    <form>
      <article className="page">
        <header className="page">
          <h1 className="sloohlogo crosspromo">
            <img alt="Slooh" src="assets/images/logos/sloohlogos/Logo-Slooh-White-C.svg" />
            <span className="margin-right-xlarge margin-left-xlarge border-right" style={{ display: 'inline-block' }} />
            <img alt="Sponsored by logo" src="assets/images/logos/logo-celestron.png" />Celestron
          </h1>
          <h1 className="margin-top-large">
            Enjoy Slooh Free for 90 Days
          </h1>
        </header>

        <section className="row-wide margin-top-large">

          <article className="dark backdrop">
            <section className="col-md-6 border-dark-right padding-xlarge margin-top-med center">
              <div className="text-large">A <sup>$</sup>75 Value</div>
              <div className="text-large">Courtesey of Celestron</div>
              <div className="spotlight-icon margin-top-large margin-bottom-large"><img alt="galaxy icon" src="assets/icons/galaxy.svg" />
              </div>
              <div className="text-large">Astronomer</div>
              <div className="text-xlarge">90 Days Free</div>
            </section>

            <section className="col-md-6  padding-xlarge margin-top-med border-dark-left">
              <div className="margin-bottom-reg margin-left-med left text-capitalize">What You Get:</div>
              <ul className="features">
                <li>Public Shows</li>
                <li>Live Telescope Feeds</li>
                <li>Take Pictures</li>
                <li>Unlimited Reservations <i className="icon control info-white">info</i>
                </li>
                <li>Objects: All <i className="icon control info-white">info</i>
                </li>
                <li>Video On Demand: All</li>
              </ul>
            </section>

            <section className="col-md-12 border-dark-top clearfix padding-tb-xlarge padding-lr-xxlarge">

              <fieldset className="required pull-left">
                <label htmlFor="firstname">Redeem Code</label>
                <input className="form-control input-lg fifth-width-margin" type="text" name="firstname" />
                <input className="form-control input-lg fifth-width-margin" type="text" name="firstname" />
                <input className="form-control input-lg fifth-width-margin" type="text" name="firstname" />
                <input className="form-control input-lg fifth-width-margin" type="text" name="firstname" />

                <button type="button" className="btn-primary">Redeem</button>
              </fieldset>

              <div className="message">
                This code does not register. Try again or <a href="">Contact Us</a><i className="cautiwarningon" />
              </div>
            </section>

          </article>

        </section>
      </article>
    </form>
  </div>
);

export default Redeem;
