import React from 'react';
import Header from './common/header';

const Account = () => (
  <div className="settings account">
    <article>

      <Header
        headerCopy="Account Settings"
      />

      <section className="account-details row-page">
        <h2>Account Details</h2>
        <div className="border-top margin-bottom-large">
          <div className="tab edit border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Name on Account
            </div>

            <div className="col-4fifth sans-serif border-left padding-small">
              <input className="pull-right" id="tab-one" type="checkbox" name="tabs" />
              <label className="pull-right tab-label top-stack" htmlFor="tab-one" />
              <div className="tab-content pull-left">[First LastName]</div>
              <div className="tab-form">
                <p className="text-xsmall">If you want to change the name associated with your Slooh customer account, please do so below.</p>
                <form>
                  <fieldset className="form-group pull-left half-width-margin">
                    <label className="" htmlFor="firstname">First Name</label>
                    <input className="form-control input-lg" type="text" name="firstname" />
                  </fieldset>
                  <fieldset className="form-group pull-right half-width">
                    <label className="" htmlFor="lastname">Last Name</label>
                    <input className="form-control input-lg" type="text" name="lastname" />
                  </fieldset>

                  <button type="button" className="btn-primary center">Save</button>
                </form>
              </div>
            </div>
          </div>
          <div className="tab edit border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Account Type
            </div>
            <div className="col-4fifth sans-serif border-left padding-small">
              <a className="pull-right" href="">Upgrade</a>
              <div className="tab-content pull-left">[Account Type]</div>
            </div>
          </div>
          <div className="tab border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Account Status
            </div>
            <div className="col-4fifth sans-serif border-left padding-small">
              <a className="pull-right" href="">Renew</a>
              <div className="tab-content pull-left">[Account status]</div>
            </div>
          </div>
          <div className="tab edit border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Display Name
            </div>
            <div className="col-4fifth sans-serif border-left padding-small">
              <input className="pull-right" id="tab-three" type="checkbox" name="tabs" />
              <label className="pull-right tab-label top-stack" htmlFor="tab-three" />

              <div className="tab-content pull-left">[Display Name]</div>
              <div className="tab-form">
                <p className="text-xsmall">Use the form below to change your display name for your Slooh account.</p>
                <form>
                  <fieldset className="form-group pull-left col-full">
                    <label className="" htmlFor="firstname">Display Name</label>
                    <input className="form-control input-lg" type="text" name="firstname" />
                  </fieldset>

                  <button type="button" className="btn-primary center">Save</button>
                </form>
              </div>
            </div>
          </div>
          <div className="tab edit border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Location
            </div>
            <div className="col-4fifth sans-serif border-left padding-small">
              <input className="pull-right" id="tab-threeB" type="checkbox" name="tabs" />
              <label className="pull-right tab-label top-stack" htmlFor="tab-threeB" />
              <div className="tab-content pull-left">[Street 1] | [Street 2] | [City, State] | [Postal Code] | [Country]</div>
              <div className="tab-form-long">
                <p className="text-xsmall">Use the form below to change your display name for your Slooh account.</p>
                <form className="padding-left-tiny">
                  <fieldset className="form-group pull-left col-full">
                    <fieldset className="clearfix form-group">
                      <label className="" htmlFor="email">Street Address</label>
                      <input className="form-control input-lg" type="email" name="streetaddress" placeholder="Street Address and Apt. #" />
                    </fieldset>
                    <fieldset className="clearfix form-group">
                      <label htmlFor="password">City</label>
                      <input className="form-control input-lg" type="text" name="city" placeholder="Enter our City" />
                    </fieldset>
                    <div className="half-width">
                      <fieldset className="form-group pull-left half-width-margin">
                        <label htmlFor="firstname">State or Province</label>
                        <input className="form-control input-lg" type="text" name="firstname" />
                      </fieldset>
                      <fieldset className="form-group pull-left half-width-margin">
                        <label className="" htmlFor="lastname">Zip or Postal Code</label>
                        <input className="form-control input-lg" type="text" name="lastname" />
                      </fieldset>
                    </div>
                  </fieldset>
                  <button type="button" className="btn-primary center">Save</button>
                </form>
              </div>
            </div>
          </div>
          <div className="tab edit border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Log-in
            </div>
            <div className="col-4fifth sans-serif border-left padding-small">
              <input className="pull-right" id="tab-fourB" type="checkbox" name="tabs" />
              <label className="pull-right tab-label top-stack" htmlFor="tab-fourB" />

              <div className="tab-content pull-left">[Log-in]</div>

              <div className="tab-form">
                <p className="text-xsmall">Use the form below to change your log-in for your Slooh account.</p>
                <form>
                  <fieldset className="form-group pull-left col-full">
                    <label className="" htmlFor="firstname">Login</label>
                    <input className="form-control input-lg" type="text" name="firstname" />
                  </fieldset>

                  <button type="button" className="btn-primary center">Save</button>
                </form>
              </div>
            </div>
          </div>
          <div className="tab edit border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-small sans-serif">
              Email
            </div>

            <div className="col-4fifth sans-serif border-left padding-small">
              <input className="pull-right" id="tab-four" type="checkbox" name="tabs" />
              <label className="pull-right tab-label top-stack" htmlFor="tab-four" />

              <div className="tab-content pull-left">[Email]</div>

              <div className="tab-form">
                <p className="text-xsmall">Use the form below to change your email for your Slooh account.</p>
                <form>
                  <fieldset className="form-group pull-left col-full">
                    <label className="" htmlFor="firstname">Email Address</label>
                    <input className="form-control input-lg" type="text" name="firstname" />
                  </fieldset>

                  <button type="button" className="btn-primary center">Save</button>
                </form>
              </div>
            </div>
          </div>
          <div className="tab edit border-bottom">
            <div className="col-fifth padding-top-small padding-bottom-none sans-serif">
              Change Password<br />
              <small><a href="">Forgot your password?</a></small>
            </div>

            <div className="col-4fifth sans-serif border-left padding-small">
              <input className="pull-right" id="tab-five" type="checkbox" name="tabs" />
              <label className="pull-right tab-label top-stack" htmlFor="tab-five"></label>

              <div className="tab-content pull-left">[Password]</div>

              <div className="tab-form">
                <p className="text-xsmall">Use the form below to change your password for your Slooh account.</p>
                <form>
                  <fieldset className="form-group pull-left half-width-margin">
                    <label className="" htmlFor="firstname">Current Password
                      <button className="text pull-right text-xsmall padding-right-xxsmall">Show</button>
                    </label>
                    <input className="form-control input-lg" type="password" name="firstname" />
                  </fieldset>

                  <fieldset className="form-group pull-left half-width-margin">
                    <label className="" htmlFor="firstname">New Password
                      <button className="text pull-right text-xsmall padding-right-xxsmall">Show</button>
                    </label>
                    <input className="form-control input-lg" type="password" name="firstname" />
                  </fieldset>
                  <a href="" className="clearfix">Forgot your password?</a>
                  <button type="button" className="btn-primary center clearfix">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
);

export default Account;
