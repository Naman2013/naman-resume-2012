/** **********************************************************************************
 * V4 Join with an Invitation Code - Enter Email Address/Invitation Code
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styles from './checkoutPersonalInfo.style';

const { string, func } = PropTypes;
@withTranslation()
class checkoutPersonalInfo extends Component {

  render() {
    //  const { pathname, t } = this.props;
    //const { accountFormDetails } = this.state;
    return (
      <div>
            <>
            <p>mkjndjsndkjn</p>
            </>

        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({ form: 'joinAccountForm', enableReinitialize: true })(
    checkoutPersonalInfo
  )
);
