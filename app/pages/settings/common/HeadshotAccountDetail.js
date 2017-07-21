import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChangeAvatarModal from '../../../components/profile/ChangeAvatarModal';
import s from './HeadshotAccountDetail.scss';

class HeadshotAccountDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarModalIsOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    const { avatarModalIsOpen } = this.state;
    this.setState({
      avatarModalIsOpen: !avatarModalIsOpen,
    });
  }
  render() {
    const { toggleModal } = this;
    const { profileImageURL, membershipType } = this.props;
    const { avatarModalIsOpen } = this.state;
    return (
      <div className={s.headshotAccountDetailRoot}>
        <div className={s.accountDetail}>
          <p>{membershipType}</p>
        </div>

        {
          profileImageURL ?
            <div style={{ backgroundImage: `url(${profileImageURL})` }} className={`${s.profilePicture}`} />
            :
            <div className={`${s.profilePicture}`} />
        }


        <div className={s.accountDetail}>
          <span className="changeAvatar" onClick={toggleModal}>Change Avatar</span>
        </div>
        {avatarModalIsOpen && <ChangeAvatarModal
          closeModal={toggleModal}
        />}
      </div>
    );
  }
}

HeadshotAccountDetail.defaultProps = {
  profileImageURL: '',
  membershipType: '',
};

HeadshotAccountDetail.propTypes = {
  profileImageURL: PropTypes.string,
  membershipType: PropTypes.string.isRequired,
};

export default HeadshotAccountDetail;
