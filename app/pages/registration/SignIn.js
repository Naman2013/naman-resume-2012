import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import Header from './common/Header';
import Tier from './common/Tier';
import FormErrorMessage from './common/FormErrorMessage';
import { login, loginReset } from '../../modules/Login';

const mapStateToProps = state => ({
  statusCode: state.user.statusCode,
  isAuthorized: state.user.isAuthorized,
  login: state.login,
  forgotPasswordURL: state.appConfig.forgotPasswordURL,
  registerNewMemberURL: state.appConfig.registerNewMemberURL,
  errorHandlerBody: state.authorization.errorHandlerBody,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    login,
    loginReset,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class SignIn extends Component {
  static propTypes = {
    forgotPasswordURL: PropTypes.string,
    registerNewMemberURL: PropTypes.string,
  }

  static defaultProps = {
    forgotPasswordURL: '',
    registerNewMemberURL: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      passwd: '',
      badLogin: false,
      passwordFieldType: 'password',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }

  handleUsernameChange(event) {
    this.props.actions.loginReset();

    this.setState({
      username: event.target.value,
      badLogin: false,
    });
  }

  handlePasswordChange(event) {
    this.props.actions.loginReset();

    this.setState({
      passwd: event.target.value,
      badLogin: false,
    });
  }


  handleSignin(event) {
    event.preventDefault();
    const { username, passwd } = this.state;

    if (!username || !passwd) {
      this.setState({
        badLogin: true,
      });
    } else {
      this.props.actions.login({
        username,
        passwd,
      });
    }
  }

  toggleShowPassword(event) {
    event.preventDefault();
    const { passwordFieldType } = this.state;
    this.setState({
      passwordFieldType: passwordFieldType === 'password' ? 'text' : 'password',
    });
  }

  render() {
    const { username, passwd, badLogin, passwordFieldType } = this.state;
    const { loggingIn, loginFailed, loginSuccess } = this.props.login;
    const { forgotPasswordURL, registerNewMemberURL, errorHandlerBody } = this.props;

    if (!errorHandlerBody.upsellPageArray) {
      return null;
    }

    const {
      title1,
      title2,
      tiersPrompt1,
      tiersPrompt2,
      tiersSeparator,
      plansLinkPrompt,
      plansLinkTitle,
      plansLinkURL,
      emailUsernamePrompt,
      passwordPrompt,
      passwordShowTitle,
      forgotPasswordPrompt,
      forgotPasswordTitle,
      forgotPasswordLinkURL,
      signInButtonPrompt,
      registerAccountPrompt,
      registerAccountTitle,
      registerAccountLinkURL,
      membershipTierCount,
      membershipTierArray,
    } = errorHandlerBody.upsellPageArray;

    return (
      <div className="registration paid-signin">
        <Header
          text={title2}
        />

        <form method="POST" onSubmit={this.handleSignin}>
          <article className="page">
            <section className="row-wide">
              <article className="dark backdrop">
                <section className="col-md-6 border-dark-right padding-xxlarge center">
                  <div className="text-large margin-bottom-large padding-small">{tiersPrompt1}<br />{tiersPrompt2}</div>

                  {
                    membershipTierArray.map((tier, index) => (
                      <div key={uniqueId()}>
                        <Tier
                          tierName={tier.tierName}
                          tierIconURL={tier.tierIconURL}
                        />
                        {
                          /** display this if we are not on the last tier type */
                          membershipTierArray.length - 1 !== index ?
                            <div className="divider-img clearfix padding-tb-reg">{tiersSeparator}</div> : null
                        }
                      </div>
                      ),
                    )
                  }

                  <div className="clearfix margin-top-large">
                    <a href={plansLinkURL}>{plansLinkTitle}</a>
                  </div>

                </section>

                <section className="col-md-6 border-dark-left padding-xxlarge">

                  {
                    loginFailed || badLogin ?
                      <FormErrorMessage
                        messageTitle="Sign in Error"
                        messageBody="Please check your username and password."
                      /> : null
                  }

                  <fieldset className="clearfix form-group required margin-top-xlarge">
                    <label className="" htmlFor="email">{emailUsernamePrompt}</label>
                    <input
                      onChange={this.handleUsernameChange}
                      value={username}
                      className="form-control input-lg"
                      type="text"
                      name="email"
                    />
                  </fieldset>
                  <fieldset className="clearfix form-group required">
                    <label htmlFor="password">
                      {passwordPrompt} <a onClick={this.toggleShowPassword} href="" className="control">{passwordShowTitle}</a> <a href={forgotPasswordLinkURL} className="control pull-right">{forgotPasswordTitle}</a>
                    </label>
                    <input
                      onChange={this.handlePasswordChange}
                      value={passwd}
                      className="form-control input-lg password"
                      type={passwordFieldType}
                      name="password"
                    />
                  </fieldset>

                  <button
                    type="submit"
                    className="btn btn-lg btn-primary clearfix col-sm-12"
                  >
                    {signInButtonPrompt}
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
                  <div className="clearfix margin-top-med">{registerAccountPrompt} <a href={registerAccountLinkURL}>{registerAccountTitle}</a>
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
