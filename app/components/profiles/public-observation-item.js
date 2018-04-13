import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { likeImage } from '../../services/my-pictures/like-image';
import Heart from '../common/heart/heart';
import { fetchMyPicturesImageDetails } from '../../modules/my-pictures-image-details/actions';
import { backgroundImageCover, borderRadius } from '../../styles/mixins/utilities';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

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
  ...myPicturesImageDetails,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMyPicturesImageDetails,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PublicObservationItem extends Component {
  static propTypes = {
    avatarURL: string,
    canDownloadFlag: bool,
    canEditFlag: bool,
    canLikeFlag: bool,
    canShareFlag: bool,
    customerImageId: number,
    fileData: shape({
      'Photo by': string,
      'Scheduled by': string,
      'Observation date': string,
      'Observation time': string,
      Observatory: string,
    }),
    imageTitle: string,
    imageURL: string,
    likePrompt: string,
    likesCount: number,
    linkableFileData: shape({
      'Photo by': PropTypes.shape({}),
      Observatory: PropTypes.shape({}),
      Telescope: PropTypes.shape({}),
      'Observation time': PropTypes.shape({
        text: PropTypes.string,
      }),
    }),
    observationLog: string,
    originX: string,
    originY: string,
    photoViewFullURL: string,
    scheduledMissionId: string,
    shareToken: string,
    showLikePrompt: bool,
    socialShareDescription: string,
    zoom: string,
  };

static defaultProps = {
  avatarURL: '',
  canDownloadFlag: false,
  canEditFlag: false,
  canLikeFlag: false,
  canShareFlag: false,
  customerImageId: 0,
  fileData: {
    'Photo by': '',
    'Scheduled by': '',
    'Observation date': '',
    'Observation time': '',
    Observatory: '',
  },
  imageTitle: '',
  imageURL: '',
  likePrompt: '',
  likesCount: 0,
  linkableFileData: {
    'Photo by': {},
    Telescope: {},
    Observatory: {},
    'Observation time': {
      text: '',
    },
  },
  observationLog: '',
  originX: '',
  originY: '',
  photoViewFullURL: '',
  scheduledMissionId: '',
  shareToken: '',
  showLikePrompt: false,
  socialShareDescription: '',
  zoom: '',
};

componentDidMount() {
  const { isActive, actions, customerImageId } = this.props;

  if (isActive) {
    actions.fetchMyPicturesImageDetails({
      customerImageId,
      useShareToken: 'n',
      callSource: 'sharedpictures',
    });
  }
}

componentWillReceiveProps(nextProps) {
  const { actions, isActive } = this.props;

  if ((isActive !== nextProps.isActive) && nextProps.isActive) {
    actions.fetchMyPicturesImageDetails({
      customerImageId: nextProps.customerImageId,
      useShareToken: 'n',
      callSource: 'sharedpictures',
    });
  }
}

  render() {
    const {
      avatarURL,
      canLikeFlag,
      customerImageId,
      error,
      fetching,
      fileData,
      imageTitle,
      imageURL,
      likePrompt,
      likesCount,
      linkableFileData,
      observationLog,
      photoViewFullURL,
      shareToken,
      showLikePrompt,
      socialShareDescription,
    } = this.props;

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

    const photoBy = linkableFileData['Photo by'];
    const observatory = linkableFileData.Observatory;
    const telescope = linkableFileData.Telescope;
    const observatoryTime = linkableFileData['Observation time'];
    console.log(this.props)
    return (
      <div className="observation-item">
        {error && <div className="loading">There was an error fetching this photo.</div>}
        {fetching && <div className="loading">Loading...</div>}
        {!error && !fetching && <div className="observation-item-container">
          <div className="info-panel">
            <div className="title" dangerouslySetInnerHTML={{ __html: imageTitle }} />
            <div className="description" dangerouslySetInnerHTML={{ __html: observationLog }} />
            <Heart
              {...heartProps}
              likeAction={likeImage}
              showLikeText={false}
            />
            <div className="telescopeAndUser">
              <div>
                <h4 className="telescope">
                  <span
                    className="block"
                    dangerouslySetInnerHTML={{ __html: `${photoBy.label}: ` }}
                  />
                  {photoBy.hasLink ? <Link to={photoBy.linkUrl}>{photoBy.text}</Link> :
                  <span
                    dangerouslySetInnerHTML={{ __html: `${photoBy.text} ` }}
                  />
                  }
                </h4>

                <h3 className="title telescope">
                  {telescope.hasLink ? <Link to={telescope.linkUrl}>{telescope.text}</Link> :
                  <span
                    dangerouslySetInnerHTML={{ __html: `${telescope.text} ` }}
                  />
                  }
                </h3>
                <h4 className="observatory">
                  {observatory.hasLink ? <Link to={observatory.linkUrl}>{observatory.text}</Link> :
                  <span
                    dangerouslySetInnerHTML={{ __html: `${observatory.text} ` }}
                  />
                  }
                </h4>
              </div>
              <div className="profile-photo" style={profilePhotoStyle} />
            </div>
          </div>
          <Link to={`/my-pictures/show-image/${customerImageId}/${shareToken}`}>
            <div style={{ backgroundImage: `url(${imageURL})` }} className="shared-image" />
          </Link>
        </div>}
        <style jsx>{`

          .title {
            margin-top: -2px;
          }

          .observation-item-container {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            height: 100%;
            flex-wrap: wrap;
            -ms-flex-wrap: wrap;
          }

          @media(max-width:767px){
            .observation-item-container{padding:0px}
          }

          .shared-image {
            ${backgroundImageCover}
            height: auto;
            width: 500px;
          }

          :global(.pulse-post-extras) .shared-image {
            width: 365px;
          }

          .shared-image:before {
            display: block;
            content: "";
            width: 100%;
            padding-top: 68.49%;
          }
            @media(max-width:640px){
            .observation-item .observation-item-container {display:block}
            .shared-image, .info-panel{width:100%}


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


          .observation-item :global(.buttonOnly:hover .action-description){
            display: none;
          }

          .info-panel {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: 25px;
            color: #2d3949;
            min-width:300px;
            max-width: 500px;
            max-height: 340px;
            background-color: ${white};
            position: relative;
          }

          :global(.pulse-post-extras) .info-panel {
            height: 250px;
          }

          .title {
            text-transform: uppercase;
            font-weight: bold;
            width: 80%;
          }

          .description {
            font-family: ${secondaryFont};
            margin-top: 15px;
            overflow-y: auto;
            max-height: 100px;
            font-size: 1rem;
            white-space: pre-wrap;
          }

          .telescopeAndUser {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            margin-top: auto;
            padding-top: 10px;
          }

          .telescope, .observatory {
            font-size: 1.1rem;
            margin-top: 5px;
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

          .block {
            display: block;
          }

          @media(max-width:950px){
            .info-panel {
              width: 500px;
            }
          }

        `}</style>
      </div>
    )
  }
};

export default PublicObservationItem;
