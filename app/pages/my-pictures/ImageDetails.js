import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts } from '../../modules/my-pictures/actions';
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
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.actions.fetchImageDetailsAndCounts({});
  }

  render() {
    const {
      actions,
      error,
      fetching,
    } = this.props;
    return (
      <div>
        <MyPicturesNavigation
          page="galleries"
        />

        <div className="clearfix my-pictures-container">
          <div>
          </div>
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
  fileData: {
    label: '',
    value: '',
  },
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
  fileData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),



};

export default ImageDetails;
