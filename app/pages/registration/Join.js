import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styles from './Join.style';
import { createStructuredSelector } from 'reselect';
import { makeUserSelector } from 'app/modules/user/selectors';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Join extends Component {
  static defaultProps = {};

  state = {};

  constructor(props){
    super(props);
    const { router, user } = props;
    if (user.isAuthorized) {
      // router.push('/profile/private');
     //router.push('/NewDashboard');
    }
  }

  render() {
    const { location, children } = this.props;
    return (
      <div className="join-root">
        {cloneElement(children, {
          pathname: location.pathname,
        })}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeUserSelector(),
});


export default compose(connect(mapStateToProps, null)) (Join);
