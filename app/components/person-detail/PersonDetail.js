import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

export const profilePhotoWrapperStyle = `
  .profile-photo {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
`;
class PersonDetail extends Component {

  render() {
    const {
      toggleModal,
      photo,
      name,
      bio,
      index,
    } = this.props;

    const profilePhotoStyle = {
      'backgroundImage': `url(${photo})`,
      height: '100px',
      width: '100px',
      borderRadius: '50%',
      backgroundSize: '100%',
      backgroundPosition: 'center',
      display: 'inline-block'
    };

    return (
      <div className="person-detail">
        <div className="profile-photo" style={profilePhotoStyle}></div>

        <div className="profile-name">
          <h4 className="username">
            {name}
          </h4>
          <a onClick={() => toggleModal(true, index)} className="link">View Bio</a>
        </div>

        <style jsx>{`
          .person-detail {}
          .profile-name {
            display: inline-block
          }
          .username {}
          .link {}
          ${profilePhotoWrapperStyle}
          `}</style>
      </div>
    );
  }
}

PersonDetail.defaultProps = {
  photo: '',
  name: '',
  bio: '',
  toggleModal: null,
};

PersonDetail.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  toggleModal: PropTypes.func,
};

export default PersonDetail;
