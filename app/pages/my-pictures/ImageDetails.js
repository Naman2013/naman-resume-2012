import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts } from '../../modules/my-pictures-image-details/actions';
import RichTextEditor from '../../components/rich-text-editor/RichTextEditor';
import MissionTags from '../../components/common/tags/mission-tags';
import { white } from '../../styles/variables/colors';

const mapStateToProps = ({ myPicturesImageDetails }) => ({
  ...myPicturesImageDetails
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchImageDetailsAndCounts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: props.observationLog,
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    const {
      params: {
        customerImageId,
        shareToken,
      }
    } = this.props;
    this.props.actions.fetchImageDetailsAndCounts({
      customerImageId,
      shareToken,
    });
  }

  handleEditorChange = (editorHTML) => {
    this.setState({ editorValue: editorHTML });
  }

  render() {
    const {
      scheduledMissionId,
      observationLog,
      error,
      fetching,
      canEditFlag,
      fileData,
    } = this.props;
    return (
      <div>
        <MyPicturesNavigation
          page="galleries"
        />
        <div className="clearfix my-pictures-container container">
          <div className="left">

          </div>
          <aside className="right">
            <h4 className="header">Observation Log</h4>
            {canEditFlag ?
              <div>
                <RichTextEditor
                  editorValue={this.state.editorValue}
                  onChange={this.handleEditorChange}
                />
              </div>
            : <div dangerouslySetInnerHTML={{ __html: observationLog }} />
          }
            <h4 className="header">Image Tags</h4>
            <div>
              <MissionTags
                tagClass="image"
                tagType="observation"
                scheduledMissionId={scheduledMissionId}
              />
            </div>
            <h4 className="header">File Data</h4>
            <div>{Object.keys(fileData).map((key) => {
              return <div key={key}><span className="bold">{key}</span>: {fileData[key]}</div>;
            })}</div>
          </aside>
        </div>
        <style jsx>
          {`
            .container {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
            .left {
              flex: 3;
            }
            .right {
              flex: 1;
              background-color: ${white};
              padding: 5px;
            }
            .bold {
              font-weight: bold;
            }
            .header {
              text-align: center;
              font-weight: bold;
            }
          `}
        </style>
      </div>
    );
  }
}

ImageDetails.defaultProps = {
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
  actions: {},
};

ImageDetails.propTypes = {
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
  fileData: PropTypes.shape({}),
  // actions: PropTypes.shape({
  //   fetchImageDetailsAndCounts,
  // }),
  params: PropTypes.shape({
    customerImageId: PropTypes.string,
    shareToken: PropTypes.string,
  }).isRequired,
};

export default ImageDetails;
