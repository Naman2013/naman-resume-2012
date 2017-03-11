import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import like from '../../../services/community-content/like';
import style from './heart.scss';
/*

  light theme - light page background => light heart
  dark theme - dark page background => dark heart

*/

const mapStateToProps = ({ user }) => ({
  ...user,
});

@connect(mapStateToProps)
export default class Heart extends Component {
  static propTypes = {
    count: PropTypes.number,
    theme: PropTypes.string,
    likeType: PropTypes.string,
    likeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }

  static defaultProps = {
    count: 0,
    theme: 'light',
    likeType: 'post',
  }

  state = {
    count: this.props.count,
  }

  // for caching purposes if we need this information later
  likeResult = {}

  handleClick = (event) => {
    event.preventDefault();
    const { at, token, cid, likeId, likeType } = this.props;
    like({
      at, token, cid, likeId, likeType,
    }).then(result => this.handleLikeResult(result.data));
  }

  handleLikeResult(likeResult) {
    const { apiError } = likeResult;
    this.likeResult = likeResult;
    if (!apiError) {
      this.setState(prevState => ({
        count: prevState.count + 1,
      }));
    }
  }

  render() {
    const { theme } = this.props;
    const { count } = this.state;

    return (
      <button
        onClick={this.handleClick}
        className={`${style.heart} ${theme}`}
      >
        <i className="fa fa-heart" />
        <span className={style.count}>{count}</span>
      </button>
    );
  }
}
