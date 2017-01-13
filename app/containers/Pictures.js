import React, { Component, PropTypes, cloneElement } from 'react';
import MyPicturesNavigation from '../components/my-pictures/my-pictures-navigation';
import MyPicturesHeader from '../components/my-pictures/my-pictures-header';
import PulseRecommended from '../components/pulse/sidebar/pulse-recommends';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const list2 = [
  {
    headline: "As featured in the first Outer Limits episode.",
    icon: "galaxy",
    title: "Andromeda Galaxy (M31)",
    desc: "Closest galaxy to the Milky Way. In approx. 4.5 billion years it will collide with the Milky Way, creating a giant elliptical galaxy.",
    date: "Thursday, October 18th",
    time: "10:05pm EST  ·  7:05pm PST  ·  03:05 UTC",
  }, {
    headline: "Don’t miss the red spot!",
    icon: "jupiter",
    title: "Jupiter",
    desc: "The planet Jupiter is fifth out from the Sun, and two and a half times more massive than all the other planets in the solar system combined.",
    date: "Thursday, October 18th",
    time: "10:05pm EST  ·  7:05pm PST  ·  03:05 UTC",
  }, {
    headline: "Don’t miss the red spot!",
    icon: "jupiter",
    title: "Jupiter",
    desc: "The planet Jupiter is fifth out from the Sun, and two and a half times more massive than all the other planets in the solar system combined.",
    date: "Thursday, October 18th",
    time: "10:05pm EST  ·  7:05pm PST  ·  03:05 UTC",
  }
];

const list = {
  count: 123,
  current: 5,
  pictures: [{
    id: 1,
    url: "http://pic.com"
  }, {
    id: 2,
    url: "http://pic.com"
  }, {
    id: 3,
    url: "http://pic.com"
  }, {
    id: 4,
    url: "http://pic.com"
  }, {
    id: 5,
    url: "http://pic.com"
  }, {
    id: 6,
    url: "http://pic.com"
  }, {
    id: 7,
    url: "http://pic.com"
  }, {
    id: 8,
    url: "http://pic.com"
  }, {
    id: 9,
    url: "http://pic.com"
  }]
};

const list3 = {
  count: 123,
  current: 5,
  pictures: [{
    id: 1,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: true
  }, {
    id: 2,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: false
  }, {
    id: 3,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: false
  }, {
    id: 4,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: false
  }, {
    id: 5,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: true
  }, {
    id: 6,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: true
  }, {
    id: 7,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: true
  }, {
    id: 8,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: false
  }, {
    id: 9,
    url: "http://pic.com",
    name: "Jupiter",
    date: "Created Wednesdey, June 19, 2017",
    icon: "",
    fits: true
  }]
};

const mapStateToProps = ({}, ownProps) => (
  {
    route: ownProps.children.props.route.path
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({}, dispatch)
  }
);

@connect(mapStateToProps, mapDispatchToProps)
class MyPictures extends Component {
  
  componentWillMount(){
    // const {actions: {fetchMyPictures}, route} = this.props;
    // this.props.actions.fetchMyPictures(route)
  }
  
  render() {
    const { children } = this.props;
    return (
      
      <div className="clearfix">
        
        <MyPicturesHeader title={children.props.route.title}/>
        <MyPicturesNavigation count={list3.count}/>
        
        <section className="clearfix my-pictures-container">
          {cloneElement(children, {
            pictures: list3
          })}
        </section>
        
        <section className="clearfix my-pictures-sidebar">
          <h2>Here are some ideas on what to image next</h2>
          <PulseRecommended list={list2} type="row"/>
        </section>
      
      </div>
    );
  }
}

export default MyPictures;

