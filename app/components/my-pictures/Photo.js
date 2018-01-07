import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Markdown from 'react-remarkable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router';
import PhotoActions from './actions/PhotoActions';
import s from './Photo.scss';

const mapStateToProps = ({ galleries, user }) => ({
  // error: galleries.error,
  // errorBody: galleries.errorBody,
  // fetching: galleries.fetching,
  // galleryList: galleries.galleryList,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    // fetchGalleries,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Photo extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showHoverMenu: false,
  }

  showMenu = () => {
    this.setState({
      showHoverMenu: true,
    });
  }

  hideMenu = () => {
    this.setState({
      showHoverMenu: false,
    });
  }

  render() {
    const {
      imageURL,
      scheduledMissionId,
      handlePhotoClick,
      imageTitle,
      overlayText,
      detailsUrl,
      customerImageId,
      canEditFlag,
      canShareFlag,
      user,
    } = this.props;

    const {
      showHoverMenu
    } = this.state;

    const hoverStyle = classnames({
      showMenu: showHoverMenu
    });

    const inlinePhotoStyle = {
      backgroundImage: `url(${imageURL})`,
    };

    return (
      <div className={s.photoRoot}>

        <Link to={detailsUrl} className={s.photoLink} style={inlinePhotoStyle}>
          <div
            className={`innerPhotoContainer content ${hoverStyle}`}
            onMouseOver={this.showMenu}
            onMouseLeave={this.hideMenu}
          >
            <h3 className={s.photoTitle}>{imageTitle}</h3>
            <div className={s.photoMarkdownContent}>
              {
                overlayText.map((markdownText, index) => <Markdown key={`markdown-text-${index}`} source={markdownText} />)
              }
            </div>

            <ul className={s.photoMenu}>
              <li>
                <PhotoActions
                  canShareFlag={canShareFlag}
                  canEditFlag={canEditFlag}
                  imageURL={imageURL}
                  customerImageId={customerImageId}
                  user={user}
                  actionSource="photoRoll"
                  scheduledMissionId={scheduledMissionId}
                />
              </li>
            </ul>
          </div>
        </Link>
      </div>
    );
  }
}

Photo.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  overlayText: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePhotoClick: PropTypes.func.isRequired,
};

export default Photo;
