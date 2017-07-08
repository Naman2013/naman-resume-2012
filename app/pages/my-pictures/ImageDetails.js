import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts } from '../../modules/my-pictures-image-details/actions';
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

  render() {
    const {
      actions,
      error,
      fetching,
    } = this.props;
    console.log(this.props)
    return (
      <div>
        <MyPicturesNavigation
          page="galleries"
        />

        <div className="clearfix my-pictures-container">
        hi
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
  fileData: {}
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
  fileData: PropTypes.shape({})



};

export default ImageDetails;
