import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { likeImage } from '../../../services/my-pictures/like-image';
import Heart from '../../common/heart/heart';
import { fetchMyPicturesImageDetails } from '../../../modules/my-pictures-image-details/actions';
import {
  backgroundImageCover,
  profilePhotoStyle,
} from '../../../styles/mixins/utilities';
import { white, black } from '../../../styles/variables/colors';
import { secondaryFont } from '../../../styles/variables/fonts';

const {
  arrayOf,
  bool,
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
    commentsCount: number,
    commentsForumId: number,
    commentsThreadId: number,
    commentsTopicId: number,
    customerImageId: number,
    iconFileData: {
      Category: {
        hasLink: bool,
        iconUrl: string,
        label: string,
        linkUrl: string,
        text: string,
      },
      Domain: {
        hasLink: bool,
        iconUrl: string,
        label: string,
        linkUrl: string,
        text: string,
      },
      Member: {
        hasLink: bool,
        iconUrl: string,
        label: string,
        linkUrl: string,
        text: string,
      },
      Telescope: {
        hasLink: bool,
        iconUrl: string,
        label: string,
        linkUrl: string,
        text: string,
      }
    },
    imageTitle: string,
    imageURL: string,
    likePrompt: string,
    likesCount: number,
    observationLog: string,
    observationTimeDisplay: arrayOf(string),
    originX: string,
    originY: string,
    photoViewFullURL: string,
    scheduledMissionId: string,
    shareToken: string,
    showCommentsLink: bool,
    showLikePrompt: bool,
    zoom: string,
  };

static defaultProps = {
  avatarURL: '',
  canDownloadFlag: false,
  canEditFlag: false,
  canLikeFlag: false,
  canShareFlag: false,
  commentsCount: 0,
  commentsForumId: 0,
  commentsThreadId: 0,
  commentsTopicId: 0,
  customerImageId: 0,
  iconFileData: {
    Category: {
      hasLink: false,
      iconUrl: '',
      label: '',
      linkUrl: '',
      text: '',
    },
    Domain: {
      hasLink: false,
      iconUrl: '',
      label: '',
      linkUrl: '',
      text: '',
    },
    Member: {
      hasLink: false,
      iconUrl: '',
      label: '',
      linkUrl: '',
      text: '',
    },
    Telescope: {
      hasLink: false,
      iconUrl: '',
      label: '',
      linkUrl: '',
      text: '',
    }
  },
  imageTitle: '',
  imageURL: '',
  likePrompt: '',
  likesCount: 0,
  observationLog: '',
  observationTimeDisplay: [],
  originX: '',
  originY: '',
  photoViewFullURL: '',
  scheduledMissionId: '',
  shareToken: '',
  showCommentsLink: false,
  showLikePrompt: false,
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
    commentsCount,
    commentsForumId,
    commentsThreadId,
    commentsTopicId,
    customerImageId,
    error,
    fetching,
    iconFileData,
    imageTitle,
    imageURL,
    likePrompt,
    likesCount,
    observationLog,
    observationTimeDisplay,
    shareToken,
    showCommentsLink,
    showLikePrompt,
  } = this.props;

    const heartProps = {
      canLikeFlag,
      showLikePrompt,
      likePrompt,
      count: likesCount,
      theme: 'buttonOnly',
      likeId: customerImageId,
    };

    const infoIcon = url => Object.assign(profilePhotoStyle(url), {
      height: '50px',
      width: '50px',
      margin: '0 auto',
    });

    const member = iconFileData.Member;
    const domain = iconFileData.Domain;
    const category = iconFileData.Category;
    const telescope = iconFileData.Telescope;
    const observatoryTime = observationTimeDisplay.join('  |  ')
    return (
      <div className="observation-item">
        {error && <div className="loading">There was an error fetching this photo.</div>}
        {fetching && <div className="loading">Loading...</div>}
        {!error && !fetching && <div className="observation-item-container">
          <div className="info-panel">
            <div className="title" dangerouslySetInnerHTML={{ __html: imageTitle }} />
            <div className="time" dangerouslySetInnerHTML={{ __html: observatoryTime }} />
            <div className="description" dangerouslySetInnerHTML={{ __html: observationLog }} />
            <div className="actions">
              <Heart
                {...heartProps}
                likeAction={likeImage}
                showLikeText={false}
              />
              {showCommentsLink && <Link
                to={`/discussions/forums/${commentsForumId}/topics/${commentsTopicId}/threads/${commentsThreadId}`}>
                  <span>{`Comments (${commentsCount})`}</span>
                </Link>}
            </div>
            <div className="iconFileData">
              <div className="title">
                <span
                  className="block"
                  dangerouslySetInnerHTML={{ __html: `${member.label} ` }}
                />
                {member.hasLink ? <Link to={member.linkUrl}><div style={infoIcon(member.iconUrl)} /></Link> :
                <div style={infoIcon(member.iconUrl)} />
                }
              </div>
              <div className="title">
              <span
                className="block"
                dangerouslySetInnerHTML={{ __html: `${category.label} ` }}
              />
                {category.hasLink ? <Link to={category.linkUrl}><div style={infoIcon(category.iconUrl)} /></Link> :
                <div style={infoIcon(category.iconUrl)} />
                }
              </div>

              <div className="title">
              <span
                className="block"
                dangerouslySetInnerHTML={{ __html: `${telescope.label} ` }}
              />
                {telescope.hasLink ? <Link to={telescope.linkUrl}><div style={infoIcon(telescope.iconUrl)} /></Link> :
                <div style={infoIcon(telescope.iconUrl)} />
                }
              </div>
              <div className="title">
              <span
                className="block"
                dangerouslySetInnerHTML={{ __html: `${domain.label} ` }}
              />
                {domain.hasLink ? <Link to={domain.linkUrl}><div style={infoIcon(domain.iconUrl)} /></Link> :
                <div style={infoIcon(domain.iconUrl)} /> }
              </div>
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
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
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
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          }

          :global(.pulse-post-extras) .info-panel {
            height: 250px;
          }

          .title {
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            width: 80%;
          }

          .actions {
            height: 75px;
            padding: 15px 0;
          }

          .description {
            font-family: ${secondaryFont};
            margin-top: 15px;
            overflow-y: auto;
            max-height: 100px;
            font-size: 1rem;
            white-space: pre-wrap;
          }

          .iconFileData {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            margin-top: auto;
            padding-top: 10px;
          }


          .loading {
            color: ${black};
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
