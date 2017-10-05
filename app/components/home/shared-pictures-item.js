import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { white, darkBlueGray } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';
import { likeImage } from '../../services/my-pictures/like-image';
import { backgroundImageCover, borderRadius } from '../../styles/mixins/utilities';
import Heart from '../common/heart/heart';
import { fetchMyPicturesImageDetails } from '../../modules/my-pictures-image-details/actions';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({
  myPicturesImageDetails,
}) => ({
  myPicturesImageDetails,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMyPicturesImageDetails,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class SharedPicturesItem extends Component {

  static propTypes = {
    actions: shape({
      fetchMyPicturesImageDetails: func.isRequired,
    }).isRequired,
    myPicturesImageDetails: shape({
      fetching: PropTypes.bool,
      error: PropTypes.bool,
      imageTitle: PropTypes.string,
      imageURL: PropTypes.string,
      zoom: PropTypes.number,
      originx: PropTypes.number,
      originy: PropTypes.number,
      observationLog: PropTypes.string,
      shareToken: PropTypes.string,
      likesCount: PropTypes.number,
      canLikeFlag: PropTypes.bool,
      showLikePrompt: PropTypes.bool,
      likePrompt: PropTypes.string,
      canDownloadFlag: PropTypes.bool,
      canEditFlag: PropTypes.bool,
      avatarURL: PropTypes.string,
      fileData: PropTypes.shape({
        Observatory: '',
        Telescope: ''
      }),
    }),
    customerImageId: number.isRequired,
    isActive: bool,
    imageIndex: number.isRequired,
  };

  static defaultProps = {
    isActive: false,
    myPicturesImageDetails: {
      fetching: false,
      error: false,
      imageTitle: '',
      imageURL: '',
      zoom: 0,
      originx: 0,
      originy: 0,
      observationLog: '',
      shareToken: '',
      likesCount: 0,
      canLikeFlag: false,
      showLikePrompt: false,
      likePrompt: '',
      canDownloadFlag: false,
      canEditFlag: false,
      fileData: {},
      avatarURL: '',
    },
  };

  state = {
  }

  componentDidMount() {
    const { isActive, actions, customerImageId, imageIndex } = this.props;

    if (isActive) {
      actions.fetchMyPicturesImageDetails({
        customerImageId,
        useShareToken: 'n',
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { actions, isActive } = this.props;

    if ((isActive !== nextProps.isActive) && nextProps.isActive) {
      actions.fetchMyPicturesImageDetails({
        customerImageId: nextProps.customerImageId,
        useShareToken: 'n',
      });
    }
  }


  render() {
    const { customerImageId, myPicturesImageDetails } = this.props;
    const {
      imageURL,
      observationLog,
      imageTitle,
      fetching,
      fileData,
      error,
      avatarURL,
      canLikeFlag,
      showLikePrompt,
      likePrompt,
      likesCount,
      shareToken,
    } = myPicturesImageDetails;

    const profilePhotoStyle = {
      backgroundImage: `url(${avatarURL})`,
    };

    const heartProps = {
      canLikeFlag,
      showLikePrompt,
      likePrompt,
      count: likesCount,
      theme: 'buttonOnly',
      likeId: customerImageId,
    };
    return (
      <div className="shared-pictures-item">
        {error && <div className="loading">There was an error fetching this photo.</div>}
        {fetching && <div className="loading">Loading...</div>}
        {!fetching && <div className="container">
          <Link to={`/my-pictures/show-image/${customerImageId}/${shareToken}`}>
            <div style={{ backgroundImage: `url(${imageURL})` }} className="shared-image" />
          </Link>
          <div className="info-panel">
            <Heart
              {...heartProps}
              likeAction={likeImage}
              showLikeText={false}
            />
            <div className="title" dangerouslySetInnerHTML={{ __html: imageTitle }} />
            <div className="description" dangerouslySetInnerHTML={{ __html: observationLog }} />
            <div className="telescopeAndUser">
              <div>
              <h4
                className="telescope"
                dangerouslySetInnerHTML={{ __html: `Photo By: ${fileData['Photo by']}` }}
              />
                <h3
                  className="title telescope"
                  dangerouslySetInnerHTML={{ __html: fileData.Telescope }}
                />
                <h4 className="observatory"
                  dangerouslySetInnerHTML={{ __html: fileData.Observatory }}
                />
              </div>
              <div className="profile-photo" style={profilePhotoStyle} />
            </div>
          </div>
        </div>}
        <style jsx>{`

          .container {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            height: 100%;
            flex-wrap: wrap;
          }

          .shared-image {
            ${backgroundImageCover}
            height: auto;
            width: 500px;
          }

          .shared-image:before {
            display: block;
            content: "";
            width: 100%;
            padding-top: 68.49%;
          }

          .profile-photo {
            ${backgroundImageCover};
            ${borderRadius('50%')};
            background-repeat: no-repeat;
            background-position: center;
            width: 45px;
            height: 45px;
            min-width: 45px;
            min-height: 45px;
          }

          .shared-pictures-item :global(.buttonOnly){
            height: 45px;
            width: 75px;
            white-space: nowrap;
            top: 5px;
            right: -6px;
            position: absolute;
          }

          .shared-pictures-item :global(.buttonOnly:hover .action-description){
            display: none;
          }

          .info-panel {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: 25px;
            color: #2d3949;
            width: 250px;
            background-color: ${white};
            position: relative;
          }

          .title {
            text-transform: uppercase;
            font-weight: bold;
          }

          .description {
            font-family: ${secondaryFont};
            margin-top: 15px;
            overflow-y: auto;
            max-height: 150px;
            font-size: 1rem;
          }

          .telescopeAndUser {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            margin-top: auto;
            padding-top: 20px;
          }

          .telescope, .observatory {
            font-size: 1.1rem;
          }

          .loading {
            color: ${white};
            text-align: center;
            padding: 100px;
            font-size: 2rem;
            margin: 0 auto;
            height: 347px;
            width: auto;
          }

          @media(max-width:950px){
            .info-panel {
              width: 500px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default SharedPicturesItem;
