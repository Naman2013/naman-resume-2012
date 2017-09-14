import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import like from '../../../services/community-content/like';
import ModalGeneric from '../../common/modals/modal-generic';
import style from './heart.scss';
import { black, lightTurqoise, darkBlueGray, turqoise, white } from '../../../styles/variables/colors';

/*

  light theme - light page background => light heart
  dark theme - dark page background => dark heart
  buttonOnly theme - turqoise and only the button

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
    showLikeText: PropTypes.bool,
  }

  static defaultProps = {
    membershipType: '',
    likePrompt: '',
    showLikePrompt: false,
    likeAction: like,
    canLikeFlag: true,
    count: 0,
    theme: 'light', // light, dark or 'buttonOnly'
    likeType: 'post',
    showLikeText: true,
  }

  state = {
    count: this.props.count,
    showPrompt: false,
    likePrompt: this.props.likePrompt,
  }

  // for caching purposes if we need this information later
  likeResult = {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.count !== this.state.count) {
      this.setState({
        count: nextProps.count,
      })
    }
  }

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
    const { apiError, showLikePrompt, likePrompt, count, likesCount } = likeResult;
    this.likeResult = likeResult;
    if (!apiError) {
      this.setState({
        count: count || likesCount,
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
    const { theme, canLikeFlag, showLikeText } = this.props;
    const { count, likePrompt, showPrompt } = this.state;
    const heartClass = classnames(
      style.heart,
      theme,
      {
        clickable: canLikeFlag,
      }
    );

    return (
      <div className={`heart-wrapper ${theme}`}>
        <button
          onClick={this.handleClick}
          className={`${heartClass} heart-button`}
        >
          <i className="fa fa-heart" />
          <span className={style.count}>{count}</span>
        </button>
        {theme === 'buttonOnly' && <div className="action-description">Like</div>}
        {showLikeText && <span onClick={this.handleClick} className="likeText">Like</span>}
        <ModalGeneric
          open={showPrompt}
          closeModal={this.closeModal}
          description={String(likePrompt)}
        />
        <style jsx>{`
          .heart-wrapper {
            height: 45px;
            width: 75px;
            margin-top: -20px;
            white-space: nowrap;
          }

          .heart-wrapper.buttonOnly {
            height: auto;
            width: auto;
            margin-top: -8px;
            margin-right: 5px;
          }

          .heart-button {
            display: inline-block;
          }

          .likeText {
            display: inline-block;
            font-size: 14px;
            padding-left: 10px;
            margin-top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          }

          .heart.buttonOnly {
            color: ${turqoise};
          }

          .heart.buttonOnly .count {
            color: ${white};
          }
          .heart.buttonOnly:hover {
            color: ${lightTurqoise};
          }

          .heart.buttonOnly + .action-description {
            color: ${black};
            text-align: center;
            visibility: hidden;
          }

          .heart.buttonOnly:hover + .action-description {
            visibility: visible;
          }

          .heart.buttonOnly:hover .count {
            color: ${darkBlueGray};
          }
        `}</style>
      </div>
    );
  }
}
