import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { LeaderboardPage } from 'app/modules/leaderboard/components/leaderboard-page';
import { leaderboardDataSelector } from 'app/modules/leaderboard/selectors';
import { ACTIONS } from '../reducer';

const { getLeaderboard } = ACTIONS;

const mapStateToProps = createStructuredSelector({
  leaderboardData: leaderboardDataSelector,
});

const mapDispatchToProps = {
  getLeaderboard,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LeaderboardPage);
