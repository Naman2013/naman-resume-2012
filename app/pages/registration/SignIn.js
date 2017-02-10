import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './common/Header';
import { login } from '../../modules/Login';

const mapStateToProps = ({ user }) => ({
  statusCode: user.statusCode,
  isAuthorized: user.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    login,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      passwd: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      passwd: event.target.value,
    });
  }


  handleSignin(event) {
    event.preventDefault();
    const { username, passwd } = this.state;
    this.props.actions.login({
      username,
      passwd,
    });
  }

  render() {
    const { username, passwd } = this.state;

    return (
      <div className="registration paid-signin">
        <Header
          text="Sign-In To Slooh"
        />

        <form method="POST" onSubmit={this.handleSignin}>
          <article className="page">
            <section className="row-wide">
              <article className="dark backdrop">
                <section className="col-md-6 border-dark-right padding-xxlarge center">
                  <div className="text-large margin-bottom-large padding-small">To view this content you must be signed-in as an</div>

                  <div className="clearfix">
                    <div className="spotlight-icon visible-lg-inline-block">
                      <img alt="Astronaut icon" src="assets/icons/astronaut.svg" width="70%" />
                    </div>
                    <div className="text-medium visible-lg-inline-block margin-left-xlarge">Apprentice</div>
                  </div>

                  <div className="divider-img clearfix padding-tb-reg">or</div>

                  <div className="clearfix">
                    <div className="spotlight-icon visible-lg-inline-block">
                      <img alt="Galaxy icon" src="../assets/icons/galaxy.svg" />
                    </div>
                    <div className="text-medium visible-lg-inline-block margin-left-xlarge">Astronomer</div>
                  </div>

                  <div className="clearfix margin-top-large">
                    <a href="">Learn more about our plans</a>
                  </div>

                </section>

                <section className="col-md-6 border-dark-left padding-xxlarge">
                  <fieldset className="clearfix form-group required margin-top-xlarge">
                    <label className="" htmlFor="email">Email or Username</label>
                    <input
                      onChange={this.handleUsernameChange}
                      value={username}
                      className="form-control input-lg"
                      type="email"
                      name="email"
                    />
                  </fieldset>
                  <fieldset className="clearfix form-group required">
                    <label htmlFor="password">Password <a href="" className="control">Show</a> <a href="" className="control pull-right">Forgotten Password</a>
                    </label>
                    <input
                      onChange={this.handlePasswordChange}
                      value={passwd}
                      className="form-control input-lg password"
                      type="password"
                      name="password"
                    />
                  </fieldset>

                  <button
                    type="submit"
                    className="btn btn-lg btn-primary clearfix col-sm-12"
                    >
                      Sign in
                  </button>
                  {
                    /**
                    <p className="divider-img clearfix">or</p>

                    <div className="clearfix center">
                        <button className="sign-in google">Sign-in</button>
                        <button className="sign-in facebook">Sign-in</button>
                    </div>
                    */
                  }
                  <div className="spacer-huge" />
                  <div className="clearfix margin-top-med">Don&apos;t have an account yet? <a href="">Join now</a>
                  </div>
                </section>
              </article>
            </section>
          </article>
        </form>
      </div>
    );
  }
}

export default SignIn;
