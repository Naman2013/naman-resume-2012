import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tierLimitsActions from '../../modules/tier-limits/actions';
import s from './ReservationsLimit.scss';

const { func, obj } = PropTypes;
class ReservationsLimit extends Component {

  constructor(props) {
    super(props);

    this.updateLimits = this.updateLimits.bind(this);
  }

  componentWillMount() {
    this.updateLimits(this.props);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  updateLimits() {
    const { fetchTierLimits, refreshIntervalSec } = this.props;
    fetchTierLimits({});

    const intervalInSeconds = refreshIntervalSec * 1000;

    this.refreshInterval = setInterval(() => {
      fetchTierLimits({});
    }, intervalInSeconds);
  }

  render() {
    const { showLimitText, limitText } = this.props;
    return (
      <div className={s.ReservationsLimit}>
        {showLimitText && <span dangerouslySetInnerHTML={{ __html: limitText }} />}
      </div>
    );
  }
}

ReservationsLimit.defaultProps = {
  intervalInSeconds: 300,
};

ReservationsLimit.propTypes = {
  fetchTierLimits: func.isRequired,
};

const mapStateToProps = ({ tierLimits }) => ({
  ...tierLimits,
});
const mapDispatchToProps = dispatch => (bindActionCreators(tierLimitsActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsLimit);
