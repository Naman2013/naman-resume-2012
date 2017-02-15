import React, { Component } from 'react';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import PhotoView from '../../components/my-pictures/PhotoView';
import AddContent from '../../components/publish-post/add-content';
import AddTags from '../../components/publish-post/add-tags';
import WhatToImageNext from '../../components/my-pictures/WhatToImageNext';
import style from './my-pictures-gallery.scss';

const galleryList = [
  [
    {
      imageURL: 'http://placehold.it/1000x1000?text=First_gallery',
      imageId: 1,
      imageTitle: 'lorem',
      overlayText: ['asdfasdf', 'lorem'],
    },
    {
      imageURL: 'http://placehold.it/1000x500?text=First_gallery',
      imageId: 2,
      imageTitle: 'lorem',
      overlayText: ['asdfasdf', 'lorem'],
    },
    {
      imageURL: 'http://placehold.it/500x1000?text=First_gallery',
      imageId: 3,
      imageTitle: 'lorem',
      overlayText: ['asdfasdf', 'lorem'],
    },
  ],
  [
    {
      imageURL: 'http://placehold.it/1000x1000?text=Second_gallery',
      imageId: 1,
      imageTitle: 'lorem',
      overlayText: ['asdfasdf', 'lorem'],
    },
    {
      imageURL: 'http://placehold.it/1000x500?text=Second_gallery',
      imageId: 2,
      imageTitle: 'lorem',
      overlayText: ['asdfasdf', 'lorem'],
    },
    {
      imageURL: 'http://placehold.it/500x1000?text=Second_gallery',
      imageId: 3,
      imageTitle: 'lorem',
      overlayText: ['asdfasdf', 'lorem'],
    },
  ],
];
const tagList = [
  {
    tagIndex: 1,
    tagText: 'first tag',
  },
  {
    tagIndex: 2,
    tagText: 'lorem tag',
  },
  {
    tagIndex: 3,
    tagText: 'another one',
  },
  {
    tagIndex: 4,
    tagText: 'another one',
  },
  {
    tagIndex: 5,
    tagText: 'another one',
  },
];

const data = [
  {
    label: 'Observation Date',
    data: new Date().toString(),
  },
  {
    label: 'Exposure Time',
    data: '50 seconds',
  },
  {
    label: 'CCD Temperature',
    data: '-30C',
  },
  {
    label: 'Binning',
    data: '3x3',
  },
  {
    label: 'Filter',
    data: 'Luminance',
  },
  {
    label: 'Telescope',
    data: 'Slooh.com T1HM PlaveWave CDK @ f/6.8',
  },
  {
    label: 'Instrument',
    data: 'Slooh.com T1HM Fli ProLine PL09000 @ 0.717arcsec/pix@Bin1x1',
  },
];

class Galleries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleries: galleryList,
      tags: tagList,
      fileData: data,
      activeGallery: 0,
    };

    this.handleGalleryChange = this.handleGalleryChange.bind(this);
    this.emptyHandle = this.emptyHandle.bind(this);
  }

  handleGalleryChange(direction) {
    const { activeGallery } = this.state;

    this.setState({
      activeGallery: activeGallery + direction,
    });
  }

  emptyHandle() {}

  render() {
    const { galleries, activeGallery, tags, fileData } = this.state;
    return (
      <div>
        <MyPicturesNavigation
          page="galleries"
        />

        <div className="clearfix my-pictures-container">
          <div className={style.myPicturesGallery}>
            <button
              className={style.changeGalleryBtn}
              onClick={() => this.handleGalleryChange(-1)}
              disabled={!galleries[activeGallery - 1]}
            >
              <i className="fa fa-angle-left" />
            </button>
            <div className={`${style.photoViewContainer} clearfix`}>
              <div className="col-xs-8">
                <h3 className={`${style.photoTitle} col-xs-12`}>
                  Great Hercules Cluster
                  <span className={style.mark}>(M13)</span>
                </h3>
                <PhotoView
                  imagesPerPage={1}
                  fetching={false}
                  imageList={galleries[activeGallery]}
                  type="gallery"
                  error={false}
                />
                <div className={`${style.featured} col-xs-12`}>
                  Featured in the gallery
                  &quot;<span className={style.galleryName}>December Shots Collected</span>&quot;
                </div>
              </div>
              <div className="col-xs-4">
                <div className={style.iconsContainer}>
                  <button className={`${style.actionButton} heart`}>
                    <i className="fa fa-heart">
                      <span className={style.count}>122</span>
                    </i>
                  </button>
                  <button className={style.actionButton}>
                    <i className="fa fa-plus" />
                  </button>
                  <button className={style.actionButton}>
                    <i className="fa fa-arrow-down" />
                  </button>
                  <button className={style.actionButton}>
                    <i className="fa fa-close" />
                  </button>
                  <button className={style.actionButton}>
                    <i className="fa fa-share-alt" />
                  </button>
                </div>
                <div className={style.photoDescription}>
                  <header className={`${style.sectionHeader} title`}>
                    Observation log
                  </header>
                  <textarea className={style.logInput} />
                  <header className={`${style.sectionHeader} title`}>
                    Image tags
                  </header>
                  <AddTags
                    newTagText="Hey there!"
                    tags={tags}
                    handleAddNewTag={this.emptyHandle}
                    handleRemoveTag={this.emptyHandle}
                    handleTagTextChange={this.emptyHandle}
                  />
                  <header className={`${style.sectionHeader} title`}>
                    File data
                  </header>
                  <div className={style.fileDataContainer}>
                    {
                      fileData.map((d, key) => {
                        return (
                          <div key={key} className="row">
                            <div className="col-xs-5 title">{d.label}</div>
                            <div className="col-xs-7">{d.data}</div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <button
              className={style.changeGalleryBtn}
              onClick={() => this.handleGalleryChange(1)}
              disabled={!galleries[activeGallery + 1]}
            >
              <i className="fa fa-angle-right" />
            </button>
          </div>
        </div>

        <WhatToImageNext />
      </div>
    );
  }
}

export default Galleries;
