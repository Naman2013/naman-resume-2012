import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTierLimits } from '../../modules/tier-limits/actions';
import s from './ReservationsLimit.scss';

const { func, shape } = PropTypes;
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
    const { actions, refreshIntervalSec } = this.props;
    actions.fetchTierLimits({});

    const intervalInSeconds = refreshIntervalSec * 1000;

    this.refreshInterval = setInterval(() => {
      actions.fetchTierLimits({});
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
  actions: shape({
    fetchTierLimits: func.isRequired,
  })
};

const mapStateToProps = ({ tierLimits }) => ({
  ...tierLimits,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchTierLimits,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsLimit);
