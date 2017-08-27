import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import orderBy from 'lodash/orderBy';
import { lightBlack, turqoise, pink, white } from '../../../styles/variables/colors';


const {
  arrayOf,
  shape,
  func,
  number,
  string,
  bool,
} = PropTypes;

class GalleryListMenuItem extends Component {

  static propTypes = {
    customerImageId: number.isRequired,
    galleryList: arrayOf(shape({
    })).isRequired,
    galleryAction: func.isRequired,
    response: string,
    loading: bool,
    currentGalleryId: string,
  };
  static defaultProps = {
    response: null,
    loading: false,
    currentGalleryId: null,
  };
  state = {
  };

  handleClick = (e, gallery) => {
    const {
      customerImageId,
      galleryAction,
    } = this.props;
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      loading: true,
    });

    galleryAction({
      galleryId: gallery.galleryId,
      customerImageId,
    });
  }

  render() {
    const {
      galleryList,
      response,
      currentGalleryId,
      loading,
    } = this.props;

    const publicIcon = classnames('fa public-icon', {
      'fa-eye': true,
      'fa-eye-slash': false,
    });

    const sortedGalleries = orderBy(galleryList, ['created'], ['desc']);
    return (
      <ul className="menu-list">
        {sortedGalleries.map(gallery => (<li
          onClick={e => this.handleClick(e, gallery)}
          key={gallery.galleryId}
        >
          <div className="menu-item">
            <i className={publicIcon} />
            {(response &&
              currentGalleryId === gallery.galleryId) &&
              <span dangerouslySetInnerHTML={{ __html: response }} />}
            {currentGalleryId !== gallery.galleryId && <span className="no-transition">
              <span className="galleryTitle">{gallery.title}</span>
              <span className="count no-transition">(<span dangerouslySetInnerHTML={{ __html: gallery.galleryPictureCount }} />)</span>
              {!gallery.created && <span className="new"> new!</span>}
              </span>
            }
          </div>
        </li>))}
        <style jsx>
         {`

           .menu-list {
              list-style: none;
              padding: 0;
           }
           .menu-item {
             transition: none !important;
             display: block;
             padding: 10px 5px;
             border-top: 1px solid ${lightBlack};
           }

           .menu-item:hover {
             transition: none !important;
             color: ${white};
             background-color: ${pink};
           }
           .menu-list:first-child {
             border-top: none;
           }

           .count {
             display: inline-block;
             vertical-align: middle;
             margin: 0 5px;
           }

           .no-transition {
             transition: none !important;
           }

           .public-icon {
             color: ${turqoise};
             margin-right: 5px;
           }

           .new {
             display: inline-block;
             vertical-align: middle;
             font-weight: bold;
             text-transform: capitalize;
             color: ${turqoise};
           }

           .galleryTitle {
              display: inline-block;
              vertical-align: middle;
              max-width: 70%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }


          `}
        </style>
      </ul>

    );
  }
}

export default GalleryListMenuItem;
