import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { white, black, pink } from '../../../styles/variables/colors';
import { secondaryFont, primaryFont } from '../../../styles/variables/fonts';
import { fetchGalleryPictures } from '../../../modules/my-pictures-gallery-pictures/actions';
import { removeImageFromGallery } from '../../../services/my-pictures/remove-image-from-gallery';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({ galleryPictures, user }) => ({
  user,
  ...galleryPictures,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGalleryPictures,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class RemoveFromGallery extends Component {

  static propTypes = {
    maxImageCount: number.isRequired,
    firstImageNumber: number.isRequired,
    customerImageId: number.isRequired,
    galleryId: number.isRequired,
    actions: shape({
      fetchGalleryPictures: func.isRequired,
    }),
    user: shape({
      at: string,
      token: string,
      cid: string,
    }).isRequired,
  };
  static defaultProps = {
    user: {
      at: '',
      token: '',
      cid: ''
    }
  };

  state = {
    confirmModalIsOpen: false,
  };


  removeFromGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      user,
      customerImageId,
      galleryId,
      actions,
      maxImageCount,
      firstImageNumber,
    } = this.props;

    this.setState({
      removeLoading: true,
    });

    removeImageFromGallery({
      galleryId,
      customerImageId,
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      this.setState({
        removeLoading: false,
        removeResponse: res.data.response,
      });

      actions.fetchGalleryPictures({
        galleryId,
        maxImageCount,
        firstImageNumber,
        pagingMode: 'api',
      });
    });
  }

  showModal = (e, bool) => {
    e.preventDefault();
    this.setState({
      confirmModalIsOpen: bool,
    });
  }

  render() {
    const { confirmModalIsOpen } = this.state;

    const customModalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '650px',
        padding: '50px 25px',
        fontFamily: primaryFont,
      },
      overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0)'
      }
    };

    return (
      <div>
        <button className="action" onClick={e => this.showModal(e, true)}>
          <span className="fa fa-minus" />
        </button>
        <Modal
          style={customModalStyles}
          isOpen={confirmModalIsOpen}
          contentLabel="Remove Confirm"
          onRequestClose={e => this.showModal(e, false)}
        >
          <i className="fa fa-close" onClick={e => this.showModal(e, false)} />
          <div>Are you sure you want to remove this image from the gallery?</div>
          <div className="button-container">
            <button className="button-action button-cancel" onClick={e => this.showModal(e, false)}>
              Cancel
            </button>
            <button className="button-action button-confirm" onClick={this.removeFromGallery}>
              Yes
            </button>
          </div>
        </Modal>
        <style jsx>{`
          .button-container {
            float: right;
          }
          .button-action {
            height: 40px;
            line-height: 40px;
            width: 50px;
            font-size: 13px;
            display:  inline-block;
            text-align: center;
            margin: 0 10px;
            border: none;
            border-radius: 0;
            text-decoration: none;
          }
          .button-cancel {
            background-color: ${white};
            color: ${black};
          }
          .button-confirm {
            background-color: ${white};
            color: ${pink};
          }
          .fa-close {
            position: absolute;
            top: 5px;
            right: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default RemoveFromGallery;
