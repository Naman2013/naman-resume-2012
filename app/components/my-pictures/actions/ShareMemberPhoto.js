import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalGeneric from '../../common/modals/modal-generic';
import { shareMemberPicture } from '../../../modules/share-member-photo/actions';
import { actionsStyles } from './actions.style';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({ shareMemberPhoto }) => ({
  ...shareMemberPhoto,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    shareMemberPicture
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ShareMemberPhoto extends Component {

  static propTypes = {
    customerImageId: string.isRequired,
    showSharePrompt: bool.isRequired,
    sharePrompt: string,
    actions: shape({
      sharememberPicture: func.isRequired,
    }),
  };

  static defaultProps = {
    sharePrompt: '',
  };

  state = {
    showPrompt: false,
    sharePrompt: this.props.sharePrompt,
  }

  closeModal = () => {
    this.setState({
      showPrompt: false,
    });
  }

  sharePhoto = (e) => {
    e.preventDefault();

    const {
      actions,
      customerImageId,
    } = this.props;

    actions.shareMemberPicture({
      customerImageId,
    }).then((res) => {
      if (!res.payload.apiError) {
        this.setState({
          showPrompt: res.payload.showSharePrompt,
          sharePrompt: res.payload.sharePrompt,
        });
      }
    });
  }

  render() {
    const { showPrompt, sharePrompt } = this.state;
    return (
      <div>
        <button className="action" onClick={this.sharePhoto}>
          <span className="fa fa-cogs" />
          <div className="action-description share-description">Share</div>
        </button>
        <ModalGeneric
          open={showPrompt}
          closeModal={this.closeModal}
          description={String(sharePrompt)}
        />
        <style jsx>{`
          ${actionsStyles}

          .action:hover .share-description {
            text-align: center;
            width: 80px;
          }
        `}</style>
      </div>
    );
  }
}

export default ShareMemberPhoto;
