import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import MyPicturesNavigation from '../components/my-pictures/my-pictures-navigation';
import MyPicturesHeader from '../components/my-pictures/my-pictures-header';
import PulseRecommended from '../components/pulse/sidebar/pulse-recommends';
import { fetchPictures, fetchMissionPictures } from '../modules/my-pictures/get-pictures-action';


const list2 = [
  {
    headline: 'As featured in the first Outer Limits episode.',
    icon: 'galaxy',
    title: 'Andromeda Galaxy (M31)',
    desc: 'Closest galaxy to the Milky Way. In approx. 4.5 billion years it will collide with the Milky Way, ' +
    'creating a giant elliptical galaxy.',
    date: 'Thursday, October 18th',
    time: '10:05pm EST  ·  7:05pm PST  ·  03:05 UTC',
  }, {
    headline: 'Don’t miss the red spot!',
    icon: 'jupiter',
    title: 'Jupiter',
    desc: 'The planet Jupiter is fifth out from the Sun, and two and a half times more massive than all the other ' +
    'planets in the solar system combined.',
    date: 'Thursday, October 18th',
    time: '10:05pm EST  ·  7:05pm PST  ·  03:05 UTC',
  }, {
    headline: 'Don’t miss the red spot!',
    icon: 'jupiter',
    title: 'Jupiter',
    desc: 'The planet Jupiter is fifth out from the Sun, and two and a half times more massive than all the other ' +
    'planets in the solar system combined.',
    date: 'Thursday, October 18th',
    time: '10:05pm EST  ·  7:05pm PST  ·  03:05 UTC',
  }
];

const list3 = {
  count: 123,
  current: 5,
  pictures: [{
    id: 1,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: true,
  }, {
    id: 2,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: false,
  }, {
    id: 3,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: false,
  }, {
    id: 4,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: false,
  }, {
    id: 5,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: true,
  }, {
    id: 6,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: true,
  }, {
    id: 7,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: true,
  }, {
    id: 8,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: false,
  }, {
    id: 9,
    url: 'http://pic.com',
    name: 'Jupiter',
    date: 'Created Wednesdey, June 19, 2017',
    icon: '',
    fits: true,
  }]
};

const mapStateToProps = ({ pictures }, ownProps) => {
  return {
      route: ownProps.children.props.route.path,
      pictures,
      missionId: ownProps.params.id,
  }
};

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
      fetchPictures,
      fetchMissionPictures,
    }, dispatch),
  }
);

@connect(mapStateToProps, mapDispatchToProps)
class MyPictures extends Component {

  componentWillMount() {
    const { actions: { fetchPictures, fetchMissionPictures }, route } = this.props;
    if(route === 'missions') {
      fetchMissionPictures();
    } else {
      fetchPictures(route);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { actions: { fetchPictures, fetchMissionPictures }, route, missionId } = this.props;

    if (nextProps.route !== route || nextProps.missionId !== missionId) {
      if (nextProps.route === 'missions' && !nextProps.missionId) {
        fetchMissionPictures();
      } else if (nextProps.missionId) {
        fetchPictures(nextProps.route, nextProps.missionId);
      } else {
        fetchPictures(nextProps.route);
      }
    }
  }

  render() {
    const { children, pictures: { images, count }, route, missionId } = this.props;

    return (

      <div className="clearfix">

        <MyPicturesHeader title={children.props.route.title} />
        <MyPicturesNavigation count={count} />

        <section className="clearfix my-pictures-container">
          {count ?
            cloneElement(children, {
              images,
              count,
              route,
              missionId,
            }) : <Spinner />}
        </section>

        <section className="clearfix my-pictures-sidebar">
          <h2>Here are some ideas on what to image next</h2>
          <PulseRecommended list={list2} type="row" />
        </section>

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

