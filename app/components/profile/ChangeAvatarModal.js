import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  uploadAvatar,
  setAvatar,
  clearAvatarData,
} from '../../modules/avatar/actions';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import s from './ChangeAvatarModal.scss';

const { bool, func, string, shape } = PropTypes;
class ChangeAvatarModal extends Component {

  uploadAvatar = (event) => {
    event.preventDefault();
    const { cid, token, at } = this.props.user;
    const { actions } = this.props;
    const data = new FormData();
    data.append('cid', cid);
    data.append('token', token);
    data.append('at', at);
    data.append('attachment', event.target.files[0]);
    data.append('name', 'attachment');
    data.append('enctype', 'multipart/form-data');

    actions.uploadAvatar(data);
  }

  saveAvatar = () => {
    const { imageURL, actions, closeModal } = this.props;
    actions.setAvatar({ imageURL }).then((result) => {
      if (result.payload && !result.payload.apiError) {
        closeModal();
      }
    });
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.clearAvatarData();
  }

  render() { // always show Modal, and rely on parent to show/hide modal so component unmounts on close
    const { saveAvatar, uploadAvatar } = this;
    const { closeModal, loading, imageURL, setAvatarError, uploadError } = this.props;
    const showGenericError = setAvatarError || uploadError;
    return (
      <Modal show>
        <div className={s.ChangeAvatarModal}>
          <h1 className={s.ChangeAvatarModalTitle}>Upload Avatar Image</h1>
          <section className={s.ChangeAvatarModalContent}>
            <div className={s.uploadLabel}>
              Choose a JPEG, GIF, or PNG (max 100kB)
            </div>
            {(!loading && imageURL) && <div
              style={{ background: `url(${imageURL})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
              className={s.profilePic}
            />}
            {(loading && !showGenericError) && <GenericLoadingBox />}
            {showGenericError &&
              <div>There was an issue uploading your avatar. Please try again.</div>
            }
          </section>
          <section className={s.ChangeAvatarModalActionContainer}>
            <label htmlFor="avatar-upload" className={`file-input-label`}>
              Browse for Image
              <input
                id="avatar-upload"
                type="file"
                onChange={uploadAvatar}
                accept="image/*"
              />
            </label>
            <span className={s.ChangeAvatarModalAction} onClick={saveAvatar}>Save Avatar</span>
            <span className={s.ChangeAvatarModalAction} onClick={closeModal}>
              Cancel
            </span>
          </section>
        </div>
      </Modal>
    );
  }
}

ChangeAvatarModal.defaultProps = {
  show: false,
  setAvatarError: false,
  actions: {}
};

ChangeAvatarModal.propTypes = {
  show: bool,
  closeModal: func.isRequired,
  imageURL: string,
  loading: bool,
  setAvatarError: bool,
  uploadError: bool,
  actions: shape({
    clearAvatarData: func.isRequired,
    setAvatar: func.isRequired,
    uploadAvatar: func.isRequired,
  }),
};

const mapStateToProps = ({ avatar, user }) => ({
  ...avatar,
  user
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    uploadAvatar,
    setAvatar,
    clearAvatarData,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatarModal);
