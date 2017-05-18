import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchErrors } from '../../modules/authorization/actions';
import s from './RedirectConfirmation.scss';

const mapStateToProps = ({ authorization }) => ({
  authorization,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchErrors,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class RedirectConfirmation extends Component {
  componentDidMount() {
    this.props.actions.fetchErrors();
  }

  render() {
    return (
      <div className={s.redirectConfirmationRoot}>
        <h5 className={s.messageTitle}>One moment please...</h5>
      </div>
    );
  }
}

export default RedirectConfirmation;
