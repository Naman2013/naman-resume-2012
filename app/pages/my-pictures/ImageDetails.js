import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import forOwn from 'lodash';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts } from '../../modules/my-pictures-image-details/actions';
import RichTextEditor from '../../components/rich-text-editor/RichTextEditor';

import style from './my-pictures-gallery.scss';

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
        <div className="clearfix my-pictures-container">
        <div>

        </div>
        <aside>
          <h3>Observation Log</h3>
          {canEditFlag ?
            <div>
              <RichTextEditor
                editorValue={this.state.editorValue}
                onChange={this.handleEditorChange}
              />
            </div>
          : <div>cant edit</div>
        }
          <h3>Image Tags</h3>
          <h3>File Data</h3>
          <div>{forOwn(fileData, (key, value) => {
            return <div>{key}: {value}</div>;
          })}</div>
        </aside>
        </div>
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
