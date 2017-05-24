import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pink } from '../../styles/variables/colors';
import { profilePhotoStyle } from '../../styles/mixins/utilities';

export const profilePhotoWrapperStyle = `
  .profile-photo {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
`;
class PersonDetail extends Component {

  static defaultProps = {
    photo: '',
    firstName: '',
    lastName: '',
    bio: '',
    toggleModal: null,
  };

  static propTypes = {
    photo: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    bio: PropTypes.string,
    toggleModal: PropTypes.func,
  };

  render() {
    const {
      toggleModal,
      photo,
      firstName,
      lastName,
      bio,
      index,
    } = this.props;

    return (
      <div className="person-detail">
        <div className="profile-photo" style={profilePhotoStyle(photo)}></div>

        <div className="profile-name">
          <h4 className="username">
            <div>{firstName}</div>
            <div>{lastName}</div>
          </h4>
          <a onClick={() => toggleModal(true, index)} className="link">View Bio</a>
        </div>

        <style jsx>{`
          .person-detail {
            display: flex;
            flex-direction: row;
            margin-bottom: 15px;
          }
          .profile-name {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 25px;
          }
          .username {
            font-size: 16px;
            text-transform: uppercase;
            font-weight: bold;
          }
          a.link {
            color: ${pink};
            cursor: pointer;
            font-size: 15px;
            font-weight: bold;
          }
          ${profilePhotoWrapperStyle}
          `}</style>
      </div>
    );
  }
}

export default PersonDetail;
