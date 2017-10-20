import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { getTags, resetClientTagData } from '../../modules/tag-management/Tags';
import MissionTags from '../../components/common/tags/mission-tags';
import { setTag } from '../../services/tags/set-tag';

const mapStateToProps = ({ user, myPicturesImageDetails }) => ({
  user,
  myPicturesImageDetails,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getTags,
    resetClientTagData,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageInfoPanel extends Component {
  constructor(props) {
    super(props);
    props.actions.resetClientTagData();

    this.state = {
      editorValue: '',
      showSaveButton: false,
      showSavedText: false,
      showSavingText: false,
      showErrorText: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // once getImageDetails call is made and we have scheduledMissionId, make getTags call
    if (nextProps.myPicturesImageDetails.canEditFlag && typeof nextProps.myPicturesImageDetails.scheduledMissionId !== 'undefined') {
      this.props.actions.getTags({
        tagClass: 'image',
        tagType: 'user',
        customerImageId: this.props.customerImageId,
        scheduledMissionId: nextProps.myPicturesImageDetails.scheduledMissionId
      });
    }

    this.setState({
      editorValue: nextProps.myPicturesImageDetails.observationLog,
    });
  }

  handleEditorChange = (e) => {
    this.setState({ editorValue: e.target.value });
  }

  setObservationLog = () => {
    const { user } = this.props;
    this.setState({
      showSavingText: true,
      showErrorText: false,
    });

    setTag({
      // at: 3, // for testing purposes
      // cid: 185651, // for testing purposes
      // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
      at: user.at,
      token: user.token,
      cid: user.cid,
      scheduledMissionId: this.props.myPicturesImageDetails.scheduledMissionId,
      tagClass: 'image',
      tagType: 'observation',
      text: this.state.editorValue,
      customerImageId: this.props.customerImageId,
    }).then((res) => {
      if (!res.data.apiError) {
        this.setState({
          showSavedText: true,
          showSavingText: false,
        });
        setTimeout(() => {
          this.setState({
            showSavedText: false,
          });
        }, 2000)
      } else {
        this.setState({
          showErrorText: true,
          showSavingText: false,
        });
        setTimeout(() => {
          this.setState({
            showErrorText: false,
          });
        }, 2000)
      }

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
      linkableFileData,
    } = this.props.myPicturesImageDetails;
    return (
      <div className="height-100">
        {fetching && <div className="message">Loading Image Details...</div>}
        {error && <div className="message">Could not get image details.</div>}
        {(!fetching && !error) && <div className="panel-container">
          <div className="section obsLog">
            <h4 className="header">Observation Log</h4>
            {canEditFlag &&
              <div>
                <textarea
                  id="observationLog"
                  cols="50"
                  rows="7"
                  value={this.state.editorValue}
                  onChange={this.handleEditorChange}
                  onFocus={() => this.toggleSaveButton(true)}
                />
                  {this.state.showSaveButton && <div className="button">
                    {this.state.showSavedText && <div>Saved!</div>}
                    {this.state.showSavingText && <div>Saving...</div>}
                    {this.state.showErrorText && <div>There was an issue saving.</div>}
                  <button onClick={this.setObservationLog} className="btn btn-primary">Save</button>
                </div>}
              </div>
            }
            {(!canEditFlag) && (observationLog.length > 0 ? <div className="obslog" dangerouslySetInnerHTML={{ __html: observationLog }} /> : <div>There is no observation log for this photo.</div>)}
          </div>
          {canEditFlag && <div className="section">
            <h4 className="header">Image Tags</h4>
            <div>
              <MissionTags
                tagClass="image"
                tagType="user"
                customerImageId={this.props.customerImageId}
                scheduledMissionId={Number(scheduledMissionId)}
                canEditFlag={canEditFlag}
                buttonStyle="btn btn-primary"
              />
            </div>
          </div>}
          <div className="">
            <h4 className="header">File Data</h4>
            <div>{Object.keys(linkableFileData).map((key) => (<div key={key}>
                <span
                  className="bold"
                  dangerouslySetInnerHTML={{ __html: `${linkableFileData[key].label}: ` }}
                />
                {linkableFileData[key].hasLink ? <Link to={linkableFileData[key].linkUrl}>{linkableFileData[key].text}</Link> :
                <span
                  dangerouslySetInnerHTML={{ __html: `${linkableFileData[key].text} ` }}
                />
                }
              </div>)
            )}</div>
          </div>
        </div>}
        <style jsx>
        {`
          .height-100 {
            height: 100%;
          }

          .message {
            text-align: center;
            margin-top: 100px;
          }
          .panel-container {
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
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

          .obslog {
            white-space: pre-wrap;
            text-align: left;
          }
          `}
        </style>

        <style jsx global>
        {`
          .panel-container .ReactTags__tag {
            display: inline-block;
            margin: 5px;
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
    linkableFileData: {},
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
    linkableFileData: PropTypes.shape({})
  }),
  // actions: PropTypes.shape({
  //   fetchImageDetailsAndCounts,
  // }),
};

export default ImageInfoPanel;
