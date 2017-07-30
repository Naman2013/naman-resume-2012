import React from 'react';

const Payments = () => (
  <div className="registration payment">
    <form>
      <article className="page">
        <header className="page margin-bottom-huge">
          <h1 className="sloohlogo">
            <img alt="Slooh logo" src="https://vega.slooh.com/assets/images/logos/sloohlogos/Logo-Slooh-White-C.svg" />
          </h1>
          <h1 className="margin-bottom-tiny">Make your payment.</h1>
          <div className="margin-top-tiny center white">Fill out your payment information</div>
        </header>

        <section className="row-xwide">
          <article>
            <section className="col-md-3">

              <aside className="plan backdrop med center padding-reg">
                <header className="margin-top-med margin-bottom-med">
                  <object className="icon white" type="image/svg+xml" data="https://vega.slooh.com/assets/icons/astronaut-white.svg">
                    Your browser does not support SVG
                  </object>
                </header>

                <h3 className="center white text-med lighter">Apprentice</h3>
                <div className="divider margin-top-reg margin-bottom-reg text-small">Your Plan</div>

                <section className="backdrop light padding-med">
                  <div className="text-xlarge"><sup>$</sup>4.95</div>
                  <div className="divider text-small">Monthly | USD</div>
                </section>

                <div className="margin-top-med text-small">Renews [Date]</div>

                <hr />

                <div className="text-small">Get a 30 Day free trial if you purchase right now.</div>

                <hr className="shadow margin-bottom-med" />
                <ul className="features-tight">
                  <li>Public Shows</li>
                  <li>Live Telescope Feeds</li>
                  <li>Take Pictures</li>
                  <li>5 Reservations <small>monthly</small> <i className="icon control info-white">info</i>
                  </li>
                  <li>Objects: Most Popular</li>
                  <li>Video On Demand: All</li>
                </ul>
              </aside>
            </section>

            <section className="col-md-8">
              <fieldset className="border-top border-bottom info-block-row">
                <div className="info-block-half padding-med">
                  <div className="">Choose Billing Preference:</div>
                  <div className="text-small">Special: Pay Annualy to Save <em>[##]</em>%</div>
                </div>

                <div className="border-left info-block-quarter">
                  <label htmlFor="paycc" className="center vertical-center">
                    <input type="radio" name="payschedule" value="monthly" checked /> <strong>Pay Monthly</strong>
                  </label>
                </div>

                <div className="border-left info-block-quarter">
                  <label htmlFor="paypp" className="center vertical-center">
                    <input type="radio" name="payschedule" value="annually" /> Pay Annually
                  </label>
                </div>
              </fieldset>

              <fieldset className="clearfix border-bottom info-block-row margin-bottom-med">
                <div className="info-block-2third">
                  <label htmlFor="paymonthly" className="vertical-center">
                    <input type="radio" name="paywith" value="creditcard" checked /> Pay with Credit Card <img alt="credit cards" src="https://vega.slooh.com/assets/images/logos/cc.png" className="margin-left-small" />
                  </label>
                </div>

                <div className="border-left info-block-third">
                  <label htmlFor="payannually" className="center vertical-center">
                    <input type="radio" name="paywith" value="paypal" className="" /> Pay with <img alt="Paypal logo" src="https://vega.slooh.com/assets/images/logos/pp.png" />
                  </label>
                </div>
              </fieldset>

              <fieldset className="clearfix form-group required">
                <label htmlFor="password">Credit Card Number</label>
                <input className="form-control input-lg" type="text" name="city" />
              </fieldset>
              <fieldset className="form-group pull-left half-width required">
                <label className="" htmlFor="firstname">Expiration Date</label>
                <input className="form-control input-lg pull-left half-width-margin" type="text" name="expirationdatemonth" placeholder="MM" />
                <input className="form-control input-lg half-width-margin" type="text" name="expirationdateyear" placeholder="YYYY" />
              </fieldset>
              <fieldset className="form-group pull-left half-width required">
                <label className="" htmlFor="firstname">CVV2 <a href="">What is this?</a>
                </label>
                <input className="form-control input-lg" type="text" name="cvv2" />
              </fieldset>

              <hr className="light" />

              <h3>Billing Information:</h3>
              <fieldset className="form-group pull-left half-width-margin required">
                <label className="" htmlFor="firstname">First Name</label>
                <input className="form-control input-lg" type="text" name="firstname" />
              </fieldset>
              <fieldset className="form-group pull-right half-width required">
                <label className="" htmlFor="lastname">Last Name</label>
                <input className="form-control input-lg" type="text" name="lastname" />
              </fieldset>
              <fieldset className="clearfix form-group required">
                <label className="" htmlFor="email">Street Address</label>
                <input className="form-control input-lg" type="email" name="streetaddress" placeholder="Street Address and Apt. #" />
              </fieldset>
              <fieldset className="clearfix form-group required">
                <label htmlFor="password">City</label>
                <input className="form-control input-lg" type="text" name="city" placeholder="Enter our City" />
              </fieldset>
              <div className="half-width">
                <fieldset className="form-group pull-left half-width-margin required">
                  <label htmlFor="firstname">State or Province</label>
                  <input className="form-control input-lg" type="text" name="firstname" />
                </fieldset>
                <fieldset className="form-group pull-left half-width-margin required">
                  <label className="" htmlFor="lastname">Zip or Postal Code</label>
                  <input className="form-control input-lg" type="text" name="lastname" />
                </fieldset>
              </div>

              <fieldset className="form-group pull-right half-width required">
                <label htmlFor="lastname">Country</label>
                <select className="form-control input-lg " type="text" name="lastname">
                  <option>Choose a Country</option>
                </select>
              </fieldset>
            </section>

            <article className="clearfix border-top border-bottom margin-top-large info-block-row-double">
              <section className="info-block-third border-right">
                <div className="sloohlogo margin-top-xxlarge">
                  <img alt="Slooh black logo" src="https://vega.slooh.com/assets/images/logos/sloohlogos/Logo-Slooh-Black-C.svg" />Slooh
                </div>
              </section>
              <section className="info-block-2third padding-med border-left">
                <p>Your credit card information is safe. View our <a href="">privacy details</a>. There are no charges over and above your membership dues which are billed monthly. You may cancel at anytime. Starting one month after signing up, Slooh will bill your credit card for monthly membership dues of $4.95.</p>
                <p>By making this purchase, you authorize Slooh to charge your credit card, debit card, or PayPal account. Your membership will automatically renew. Learn more about our <a href="">Refund Policy</a>.</p>
              </section>
            </article>

            <div className="center margin-top-large">
              <button type="button" className="btn-primary center">Join now</button>
            </div>
          </article>
        </section>
      </article>
    </form>
  </div>
);

export default Payments;
