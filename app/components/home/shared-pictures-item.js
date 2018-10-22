import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { white } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';
import { likeImage } from '../../services/my-pictures/like-image';
import { backgroundImageCover, borderRadius } from '../../styles/mixins/utilities';
import Heart from '../common/heart/heart';
import { fetchMyPicturesImageDetails } from '../../modules/my-pictures-image-details/actions';
import SocialSharingBar from '../common/social-sharing-bar';

const {
  bool,
  func,
  number,
  shape,
} = PropTypes;

const mapStateToProps = ({
  myPicturesImageDetails, appConfig,
}) => ({
  myPicturesImageDetails, appConfig,
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
      zoom: PropTypes.string,
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
      linkableFileData: PropTypes.shape({
        'Photo by': PropTypes.shape({}),
        Observatory: PropTypes.shape({}),
        Telescope: PropTypes.shape({}),
        'Observation time': PropTypes.shape({
          text: PropTypes.string,
        },
      ),
      }),
      fileData: PropTypes.shape({
        Observatory: '',
        Telescope: '',
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
      zoom: '0',
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
      socialShareDescription: '',
      fileData: {},
      linkableFileData: {
        'Photo by': {},
        Telescope: {},
        Observatory: {},
        'Observation time': {
          text: '',
        },
      },
      avatarURL: '',
    },
  };

  state = {
  }

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
    const { appConfig, customerImageId, myPicturesImageDetails } = this.props;

    const {
      socialSharePageURL,
    } = appConfig;

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
      linkableFileData,
      socialShareDescription,
      photoViewFullURL,
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

    const photoBy = linkableFileData['Photo by'];
    const observatory = linkableFileData.Observatory;
    const telescope = linkableFileData.Telescope;
    const observatoryTime = linkableFileData['Observation time'];

    const shareDescription = socialShareDescription;

    var encodeurl = require('encodeurl');
    var base64 = require('base-64');
    var myImageTitle = imageTitle;

    if (myImageTitle == '') {
      /* the social sharing modules require a title, so even a space is sufficient */
      myImageTitle = encodeurl(base64.encode('Shared Photo from Slooh.com'));
    }
    else {
      myImageTitle = encodeurl(base64.encode(myImageTitle));
    }

    /* construct the social sharing URL */
    const shareURL = socialSharePageURL +
        "?title=" + myImageTitle +
        "&pagetype=image" +
        "&description=" + encodeurl(base64.encode(socialShareDescription)) +
        "&shareURL=" + encodeurl(base64.encode(photoViewFullURL)) +
        "&imageURL=" + encodeurl(base64.encode(imageURL));

    return (
      <div className="shared-pictures-item">
        {error && <div className="loading">There was an error fetching this photo.</div>}
        {fetching && <div className="loading">Loading...</div>}
        {!error && !fetching && <div className="shared-pictures-item-container">
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
                <div className="socialsharingbar">
                  <SocialSharingBar
                    contentLayout="horizontal"
                    shareTitle={myImageTitle}
                    shareDescription={socialShareDescription}
                    shareURL={shareURL}
                    shareImageURL={imageURL}
                  />
                </div>
              </div>
              <div className="profile-photo" style={profilePhotoStyle} />
            </div>
          </div>
        </div>}
        <style jsx>{`

          .title {
            margin-top: -2px;
          }

          .shared-pictures-item-container {
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
            .shared-pictures-item-container{padding:0px}
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
            .shared-pictures-item .shared-pictures-item-container {display:block}
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
            min-width:150px;
            max-width: 250px;
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

          .socialsharingbar {
            padding-top: 0px;
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default SharedPicturesItem;
