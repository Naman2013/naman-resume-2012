import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import MyPicturesNavigation from '../components/my-pictures/my-pictures-navigation';
import MyPicturesHeader from '../components/my-pictures/my-pictures-header';
import PulseRecommended from '../components/pulse/sidebar/pulse-recommends';
import { fetchPictures, fetchMissionPictures } from '../modules/my-pictures/get-pictures-action';

class MyPictures extends Component {
  render() {
    const { children } = this.props;

    return (

      <div className="clearfix">

        <MyPicturesHeader title={children.props.route.title} />
        <MyPicturesNavigation count={0} />

        <section className="clearfix my-pictures-container">
          {children}
        </section>

        {
          /**
            TODO: add list of related object posts...
            <section className="clearfix my-pictures-sidebar">
            <h2>Here are some ideas on what to image next</h2>
            <PulseRecommended list={list2} type="row" />
            </section>
          */
        }
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
