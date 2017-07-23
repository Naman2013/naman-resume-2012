import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTags } from '../../modules/tag-management/Tags';
import MissionTags from '../../components/common/tags/mission-tags';

const mapStateToProps = ({ myPicturesImageDetails }) => ({
  myPicturesImageDetails,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setTags
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageInfoPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: props.myPicturesImageDetails.observationLog,
      showSaveButton: false,
    };
  }

  handleEditorChange = (e) => {
    this.setState({ editorValue: e.value });
  }

  setObservationLog = () => {
    this.props.actions.setTags({
      scheduledMissionId: this.props.myPicturesImageDetails.scheduledMissionId,
      tagClass: 'image',
      tagType: 'observation',
      text: '',
      customerImageId: this.props.customerImageId,
    })
  }

  toggleSaveButton = (value) => {
    this.setState({
      showSaveButton: value
    });
  }

  render() {
    const {
      scheduledMissionId,
      observationLog,
      error,
      fetching,
      canEditFlag,
      imageTitle,
      imageURL,
      fileData,
    } = this.props.myPicturesImageDetails;

    return (
      <div className="panel-container">
        <div className="section">
          <h4 className="header">Observation Log</h4>
          {true &&
            <div>
              <textarea
                id="observationLog"
                cols="50"
                rows="7"
                value={this.state.editorValue}
                onChange={this.handleEditorChange}
                onFocus={() => this.toggleSaveButton(true)}
              />
              {this.state.showSaveButton && <button onClick={this.setObservationLog} className="btn btn-primary">Save</button>}
            </div>
          }
          {(!true) && (observationLog.length > 0 ? <div dangerouslySetInnerHTML={{ __html: observationLog }} /> : <div>There is no observation log for this photo.</div>)}
        </div>
        <div className="section">
          <h4 className="header">Image Tags</h4>
          <div>
            <MissionTags
              tagClass="image"
              tagType="observation"
              customerImageId={this.props.customerImageId}
              scheduledMissionId={Number(scheduledMissionId)}
              canEditFlag={true}
            />
          </div>
        </div>
        <div className="">
          <h4 className="header">File Data</h4>
          <div>{Object.keys(fileData).map((key) => {
            return <div key={key}><span className="bold">{key}</span>: {fileData[key]}</div>;
          })}</div>
        </div>
        <style jsx>
        {`
          .panel-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
          }

          .section {
            text-align: center;
          }
          .bold {
            font-weight: bold;
          }
          .header {
            text-align: center;
            font-weight: bold;
            margin-bottom: 10px;
          }
          `}
        </style>
      </div>
    );
  }
}

ImageInfoPanel.defaultProps = {
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
  actions: {},
};

ImageInfoPanel.propTypes = {
  myPicturesImageDetails: PropTypes.shape({
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
  }),
  // actions: PropTypes.shape({
  //   fetchImageDetailsAndCounts,
  // }),
};

export default ImageInfoPanel;
