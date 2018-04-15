import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = ({
  user,

}) => ({
  user,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Profile extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super();
  }

  render() {
    const {
      params,
      user,
      children,
    } = this.props;

    return (
      <div>
        <div>Profile</div>
        {cloneElement(children)}
      </div>
    );
  }
}

export default Profile;
