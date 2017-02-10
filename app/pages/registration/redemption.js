import React from 'react';

const Redemption = () => (
  <div className="registration join">
    <form>
      <article className="page">
        <header className="page">
          <h1 className="sloohlogo crosspromo">
            <img alt="Slooh logo" src="assets/images/logos/sloohlogos/Logo-Slooh-White-C.svg" />
            <span className="margin-right-xlarge margin-left-xlarge border-right" style={{ display: 'inline-block' }} />
            <img alt="Sponsored by logo" src="assets/images/logos/logo-celestron.png" />
          </h1>
          <h1>Your Code is Approved!</h1>
          <h2>Enter your details to get started.</h2>
        </header>

        <section className="row-med">
          <article className="backdrop dark padding-xxlarge">
            <fieldset className="form-group pull-left half-width-margin required">
              <label className="" htmlFor="firstname">First Name</label>
              <input className="form-control input-lg" type="text" name="firstname" />
            </fieldset>
            <fieldset className="form-group pull-right half-width required">
              <label className="" htmlFor="lastname">Last Name</label>
              <input className="form-control input-lg " type="text" name="lastname" />
            </fieldset>
            <fieldset className="clearfix form-group required">
              <label className="" htmlFor="email">Email</label>
              <input className="form-control input-lg" type="email" name="email" />
            </fieldset>
            <fieldset className="clearfix form-group required">
              <label htmlFor="password">Password <a href="" className="control">Show</a></label>
              <input className="form-control input-lg password" type="password" name="password" placeholder="Password should be at least 8 charachters with at least 1 number." />
              <div className="passwordstrength">
                <span className="lvl1">.</span><span className="lvl2">.</span><span className="lvl3">.</span><span className="lvl4">.</span>
              </div>
            </fieldset>

            <button type="button" className="btn btn-lg btn-primary clearfix col-sm-12">Sign up</button>

            <div className="clearfix center margin-top-huge">
              <p>Already a Slooh Memeber? <a href="">Sign-in Now</a></p>
            </div>

            {
              /**
              <p className="divider-img clearfix">or</p>

              <div className="clearfix">
                  <button className="sign-up google btn-default">Sign up with Google</button>
                  <button className="sign-up facebook btn-default">Sign up with Facebook</button>
              </div>
              */
            }
          </article>

          <footer className="page contrast-shadow white margin-top-large">
            By joining Slooh, you agree to our
            <a href="">Terms and Conditions</a> and
            <a href="">Privacy Policy</a>
          </footer>
        </section>

      </article>
    </form>
  </div>
);

export default Redemption;
