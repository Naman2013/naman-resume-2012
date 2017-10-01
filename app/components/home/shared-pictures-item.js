import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { white, darkBlueGray } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';
import { backgroundImageCover } from '../../styles/mixins/utilities';

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
    } = myPicturesImageDetails;
    return (
      <div className="shared-pictures-item">
        {error && <div className="loading">There was an error fetching this photo.</div>}
        {fetching && <div className="loading">Loading...</div>}
        {!fetching && <div className="container">
          <div style={{ backgroundImage: `url(${imageURL})` }} className="shared-image" />
          <div className="info-panel">
            <div className="title" dangerouslySetInnerHTML={{ __html: imageTitle }} />
            <div className="description" dangerouslySetInnerHTML={{ __html: observationLog }} />
            <div className="telescopeAndUser">
              <h3
                className="title telescope"
                dangerouslySetInnerHTML={{ __html: fileData.Telescope }}
              />
              <h4 className="observatory"
                dangerouslySetInnerHTML={{ __html: fileData.Observatory }}
              />
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

          .info-panel {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: 25px;
            color: #2d3949;
            width: 250px;
            background-color: ${white};
          }

          .title {
            text-transform: uppercase;
            font-weight: bold;
          }

          .description {
            font-family: ${secondaryFont};
            margin-top: 15px;
            overflow-y: scroll;
            max-height: 150px;
            font-size: 1rem;
          }

          .telescopeAndUser {
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
