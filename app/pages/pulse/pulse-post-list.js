import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import PulsePostBy from '../../components/pulse/pulse-post-by'
import PulsePostDate from '../../components/pulse/pulse-post-date'
import PulsePostImage from '../../components/pulse/pulse-post-image'
import styles from './pulse-post.scss';

const list = [
  {
    id: 1,
    postImage: "",
    postImageBy: "Image by Sarah Blake, all rights reserved.",
    postTitle: "My new Gemini painting is finally finished!",
    postDate: "March 12, 2017",
    postCategory: "ART_CULTURE",
    postDesc: "I just finished this painting in my studio and thought I would share it with the Slooh community. " +
    "Hope you like it. It took me about 5 months to get it done, since I have a full time job. I have been really " +
    "thinking through what it means to be a Gemini and the conflict with the perception Carl Sagan had that its a " +
    "“pseudo-science” to consider the stars can have any power over our lives. I respectfully disagree with " +
    "Mr. Sagan and have been completing a series of paintings on each of the zodiacal symbols. " +
    "I wanted to realy a little bit more about the process",
    postBy: {
      image: "",
      name: "Sarah Blake",
      post: ["guardian"],
      from: "New York, NY, USA. Member since 2011"
    }
  }, {
    id: 2,
    postImage: "",
    postImageBy: "Image by Sarah Blake, all rights reserved.",
    postTitle: "My new Gemini painting is finally finished!",
    postDate: "March 12, 2017",
    postCategory: "SCIENCE_LOG",
    postDesc: "I just finished this painting in my studio and thought I would share it with the Slooh community. " +
    "Hope you like it. It took me about 5 months to get it done, since I have a full time job. I have been really " +
    "thinking through what it means to be a Gemini and the conflict with the perception Carl Sagan had that its a " +
    "“pseudo-science” to consider the stars can have any power over our lives. I respectfully disagree with " +
    "Mr. Sagan and have been completing a series of paintings on each of the zodiacal symbols. " +
    "I wanted to realy a little bit more about the process",
    postBy: {
      image: "",
      name: "Sarah Blake",
      post: ["guardian"],
      from: "New York, NY, USA. Member since 2011"
    }
  }, {
    id: 3,
    postImage: "",
    postImageBy: "Image by Sarah Blake, all rights reserved.",
    postTitle: "My new Gemini painting is finally finished!",
    postDate: "March 12, 2017",
    postCategory: "DIY",
    postDesc: "I just finished this painting in my studio and thought I would share it with the Slooh community. " +
    "Hope you like it. It took me about 5 months to get it done, since I have a full time job. I have been really " +
    "thinking through what it means to be a Gemini and the conflict with the perception Carl Sagan had that its a " +
    "“pseudo-science” to consider the stars can have any power over our lives. I respectfully disagree with " +
    "Mr. Sagan and have been completing a series of paintings on each of the zodiacal symbols. " +
    "I wanted to realy a little bit more about the process",
    postBy: {
      image: "",
      name: "Sarah Blake",
      post: ["guardian", "astronomer"],
      from: "New York, NY, USA. Member since 2011"
    },
  }
];

class PulsePostList extends Component {

  prepareData(list, url) {
    return list.map(v =>
      <div className={styles.PulsePostList} key={v.id}>

        <PulsePostImage image={v.postImage} imageBy={v.postImageBy}/>

        <figure className={styles.PulsePostListInfo}>
          <Link to={`slooh-pulse/post/${v.id}`}><h2 className={styles.PulsePostListInfoTitle}>{v.postTitle}</h2></Link>

          <PulsePostDate date={v.postDate} category={v.postCategory}/>

          <figcaption className={styles.PulsePostListInfoDesc}>
            {v.postDesc}... (<Link to={"#"}>See full entry</Link>)
          </figcaption>

          <PulsePostBy {...v.postBy} />

        </figure>

        <hr/>
      </div>
    );
  }

  render() {

    const { location: { pathname } } = this.props;

    return (
      <div>
        {this.prepareData(list, pathname)}
      </div>
    );
  }
}

export default PulsePostList;
