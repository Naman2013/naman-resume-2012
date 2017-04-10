import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
    canLikeFlag: PropTypes.bool,
    likeAction: PropTypes.func,
    count: PropTypes.number,
    theme: PropTypes.string,
    likeType: PropTypes.string,
    likeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }

  static defaultProps = {
    likeAction: like,
    canLikeFlag: true,
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
    const { at, likeAction, token, canLikeFlag, cid, likeId, likeType } = this.props;
    if (!canLikeFlag) return;
    likeAction({
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
    const { theme, canLikeFlag } = this.props;
    const { count } = this.state;
    const heartClass = classnames(
      style.heart,
      theme,
      {
        clickable: canLikeFlag,
      }
    );
    return (
      <button
        onClick={this.handleClick}
        className={heartClass}
      >
        <i className="fa fa-heart" />
        <span className={style.count}>{count}</span>
      </button>
    );
  }
}
