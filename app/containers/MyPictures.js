import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import MyPicturesHeader from '../components/my-pictures/my-pictures-header';
import OtherFeaturedObjects from '../components/common/OtherFeaturedObjects/OtherFeaturedObjects';


class MyPictures extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="clearfix">
        <MyPicturesHeader />
        <section>
          {cloneElement(children)}
        </section>
        <OtherFeaturedObjects params={{ featuredType: 'myPictures' }} layoutDirection="row" style={{ margin: 0 }} />
      </div>
    );
  }
}

MyPictures.propTypes = {
  children: PropTypes.object,
  actions: PropTypes.object,
  pictures: PropTypes.object,
};


export default MyPictures;
