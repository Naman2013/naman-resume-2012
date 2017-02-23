import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as avatarActions from '../../modules/avatar/actions';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import s from './ChangeAvatarModal.scss';

const { bool, func, string } = PropTypes;
class ChangeAvatarModal extends Component {

  constructor(props) {
    super(props);

    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.saveAvatar = this.saveAvatar.bind(this);
  }

  uploadAvatar(event) {
    event.preventDefault();
    const { cid, token, at } = this.props.user;
    const { uploadAvatar } = this.props;
    const data = new FormData();
    data.append('cid', cid);
    data.append('token', token);
    data.append('at', at);
    data.append('attachment', event.target.files[0]);
    data.append('name', 'attachment');
    data.append('enctype', 'multipart/form-data');

    uploadAvatar(data);
  }

  saveAvatar() {
    const { imageURL, setAvatar, closeModal } = this.props;
    setAvatar({ imageURL }).then((result) => {
      if (result.payload && !result.payload.apiError) {
        closeModal();
      }
    });
  }

  componentWillUnmount() {
    const { clearAvatarData } = this.props;
    clearAvatarData();
  }

  render() { // always show Modal, and rely on parent to show/hide modal so component unmounts on close
    const { uploadAvatar, saveAvatar } = this;
    const { closeModal, loading, imageURL, setAvatarError } = this.props;
    return (
      <Modal show>
        <div className={s.ChangeAvatarModal}>
          <h1 className={s.ChangeAvatarModalTitle}>Upload Avatar Image</h1>
          <section className={s.ChangeAvatarModalContent}>
            <div className={s.uploadLabel}>
              Choose a JPEG, GIF, or PNG (max 100kB)
            </div>
            {(!loading && imageURL) && <div style={{ backgroundImage: `url(${imageURL})` }} className={s.profilePic} />}
            {loading && <GenericLoadingBox />}
            {setAvatarError &&
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
};

ChangeAvatarModal.propTypes = {
  show: bool,
  closeModal: func.isRequired,
  imageURL: string,
  loading: bool,
  setAvatarError: bool,
  clearAvatarData: func.isRequired,
  setAvatar: func.isRequired,
  uploadAvatar: func.isRequired,
};

const mapStateToProps = ({ avatar, user }) => ({
  ...avatar,
  user
});
const mapDispatchToProps = dispatch => (bindActionCreators(avatarActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatarModal);
