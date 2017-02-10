import React from 'react';
import Header from './common/header';

const PaymentInfo = () => (
  <div className="settings payment">
    <article>

      <Header
        headerCopy="Billing"
      />

      <section className="tab edit account-details row-page">
        <h2>Payment Method</h2>
        <div className="border-top margin-bottom-large">
          <div className="border-bottom">
            <div className="col-full sans-serif padding-small">
              <input className="pull-right top-stack" id="tab-one" type="checkbox" name="tabs" />
              <label className="pull-right tab-label top-stack payment" htmlFor="tab-one" />
              <div className="tab-content">
                <strong>Billing Type</strong>: [Billing Type]<br />
                <strong>Amount:</strong> [Amount]<br />
                <strong>Next Payment:</strong> [MM/DD/YYYY]<br />

                <hr className="light col-2third margin-top-small margin-bottom-small" />

                <div className="clearfix"><strong>[Payment Method]</strong>
                  <br />[Card Type]
                  <br />XXXX-XXXX-XXXX-[####]
                </div>

                <div>[MM/YYYY]</div>

                <hr className="light col-2third margin-top-small margin-bottom-small" />

                <div className="clearfix"><strong>[First LastName]</strong></div>
                <div>
                  [Street 1]
                  <br />[City, State]
                  <br />[Postal Code]
                  <br />[Country]
                </div>
              </div>

              <div className="tab-form-long">
                <p className="text-small">Use the form below to change the payment method associated with your Slooh subscription.</p>
                <form id="payment-info">

                  <fieldset className="border-top border-bottom row-full">

                    <div className="col-half padding-small padding-left-tiny">
                      <div className="">Choose Billing Preference:</div>
                      <small>Special: Pay Annually to Save <em>[##]</em>%</small>
                    </div>

                    <div className="border-left col-fourth">
                      <label htmlFor="paymonth" className="padding-reg">
                        <input type="radio" name="payschedule" value="monthly" checked />Pay Monthly
                      </label>
                    </div>

                    <div className="border-left col-fourth padding-reg">
                      <label htmlFor="payannual" className="">
                        <input type="radio" name="payschedule" value="annually" /> Pay Annually
                      </label>
                    </div>
                  </fieldset>

                  <fieldset className="clearfix border-bottom info-block-row margin-bottom-med hide-overflow">
                    <div className="col-2third hide-overflow">
                      <label htmlFor="paymonthly" className="padding-reg padding-left-tiny badding-bottom-none">
                        <input type="radio" name="paywith" value="creditcard" checked /> Pay with Credit Card <img alt="Credit card" src="assets/images/logos/cc.png" className="margin-left-small" />
                      </label>
                    </div>

                    <div className="border-left col-third hide-overflow">
                      <label htmlFor="payannually" className="padding-reg hide-overflow">
                        <input type="radio" name="paywith" value="paypal" /> Pay with <img alt="Paypal" src="assets/images/logos/pp.png" />
                      </label>
                    </div>
                  </fieldset>

                  <fieldset className="clearfix form-group required">
                    <label htmlFor="password">Credit Card Number</label>
                    <input className="form-control input-lg" type="text" name="city" />
                  </fieldset>
                  <fieldset className="form-group pull-left half-width required">
                    <label className="" htmlFor="firstname">Expiration Date</label>
                    <input className="form-control charfour-width margin-right-xxsmall input-lg pull-left" type="text" name="expirationdatemonth" placeholder="MM" maxLength="2" />
                    <input className="form-control charfour-width input-lg" type="text" name="expirationdateyear" placeholder="YYYY" maxLength="4" />
                  </fieldset>
                  <fieldset className="form-group pull-left char-four-width required">
                    <label className="" htmlFor="firstname">CVV2
                      <small><a href="">What is this?</a></small>
                    </label>
                    <input className="form-control charfour-width input-lg" type="text" name="cvv2" maxLength="4" />
                  </fieldset>
                  <hr className="light" />
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
                    <input className="form-control input-lg" type="text" name="city" placeholder="Enter Your City" />
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

                  <button type="button" className="btn-primary center">Save</button>
                </form>

                <article className="clearfix margin-top-large row-full border-top">
                  <section className="info-block-third padding-top-large">
                    <div className="sloohlogo margin-top-huge">
                      <img alt="Slooh" src="assets/images/logos/sloohlogos/Logo-Slooh-Black-C.svg" />Slooh
                    </div>
                  </section>
                  <section className="info-block-2third padding-med margin-top-reg border-left">
                    <p>Your credit card information is safe. View our <a href="">privacy details</a>. There are no charges over and above your membership dues which are billed monthly. You may cancel at anytime. Starting one month after signing up, Slooh will bill your credit card for monthly membership dues of $4.95.</p>
                    <p>By making this purchase, you authorize Slooh to charge your credit card, debit card, or PayPal account. Your membership will automatically renew. Learn more about our <a href="">Refund Policy</a>.</p>
                  </section>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
);

export default PaymentInfo;
