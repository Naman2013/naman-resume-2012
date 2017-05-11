import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import like from '../../../services/community-content/like';
import ModalGeneric from '../../common/modals/modal-generic';
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
    membershipType: PropTypes.string,
    showLikePrompt: PropTypes.bool,
    likePrompt: PropTypes.string,
    canLikeFlag: PropTypes.bool,
    likeAction: PropTypes.func,
    count: PropTypes.number,
    theme: PropTypes.string,
    likeType: PropTypes.string,
    likeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    params: PropTypes.object,
  }

  static defaultProps = {
    membershipType: '',
    likePrompt: '',
    showLikePrompt: false,
    likeAction: like,
    canLikeFlag: true,
    count: 0,
    theme: 'light',
    likeType: 'post',
  }

  state = {
    count: this.props.count,
    showPrompt: false,
    likePrompt: this.props.likePrompt,
  }

  // for caching purposes if we need this information later
  likeResult = {}

  handleClick = (event) => {
    event.preventDefault();
    const {
      at,
      authorId,
      type,
      likeAction,
      token,
      canLikeFlag,
      cid,
      likeId,
      objectSlug,
      likeType,
      showLikePrompt,
      params,
      membershipType
    } = this.props;
    if (showLikePrompt) {
      this.setState({
        showPrompt: true,
      });
    } else {
      likeAction({
        ...params,
        authorId,
        at,
        type,
        token,
        cid,
        likeId,
        likeType,
        membershipType,
        objectSlug,
      }).then(result => this.handleLikeResult(result.data));
    }
  }

  handleLikeResult(likeResult) {
    const { apiError, showLikePrompt, likePrompt, count } = likeResult;
    this.likeResult = likeResult;
    if (!apiError) {
      this.setState({
        count,
      });
    }

    if (showLikePrompt) {
      this.setState({
        showPrompt: true,
        likePrompt,
      });
    }
  }

  closeModal = () => {
    this.setState({
      showPrompt: false,
    });
  }

  render() {
    const { theme, canLikeFlag } = this.props;
    const { count, likePrompt, showPrompt } = this.state;
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
        <ModalGeneric
          open={showPrompt}
          closeModal={this.closeModal}
          description={String(likePrompt)}
        />
      </button>
    );
  }
}
