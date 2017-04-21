import React, { PropTypes, Component } from 'react';
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
    showPrompt: false,
  }

  // for caching purposes if we need this information later
  likeResult = {}

  handleClick = (event) => {
    event.preventDefault();
    const { at, likeAction, token, canLikeFlag, cid, likeId, likeType, showLikePrompt } = this.props;
    if (showLikePrompt) {
      this.setState({
        showPrompt: true,
      });
    } else {
      likeAction({
        at, token, cid, likeId, likeType,
      }).then(result => this.handleLikeResult(result.data));
    }
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

  closeModal = () => {
    this.setState({
      showPrompt: false,
    });
  }

  render() {
    const { theme, canLikeFlag, likePrompt } = this.props;
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
        <ModalGeneric
          open={this.state.showPrompt}
          closeModal={this.closeModal}
          description={String(likePrompt)}
        />
      </button>
    );
  }
}
