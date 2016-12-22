import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import PulsePostBy from '../../components/pulse/pulse-post-by'
import { iconCategory } from '../../components/pulse/pulse-icon'
import styles from './pulse-post.scss';

const categoryName = {
  art: "Arts & Culture",
  since: "Science Log",
  human: "Human Spirit",
  diy: "Arts & Culture"
};

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
      post: "guardian",
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
      post: "guardian",
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
      post: "guardian",
      from: "New York, NY, USA. Member since 2011"
    },
  }
];

class PulsePost extends Component {

  prepareData = (list, url) =>
    list.map(v =>
      <div className={styles.pulsePost} key={v.id}>
        <figure className={styles.pulsePostImage}>
          <img src={v.postImage}/>
          <figcaption className={styles.pulsePostImageBy}>{v.postImageBy}</figcaption>
        </figure>

        <figure className={styles.pulsePostInfo}>
          <h2 className={styles.pulsePostInfoTitle}>{v.postTitle}</h2>

          <div className={styles.pulsePostInfoDateCategory}>
            Posted on {v.postDate} in
            <Link
              to={url.substring(0, url.lastIndexOf("/") + 1) + v.postCategory}> {iconCategory.title[v.postCategory]} </Link>
            <img src={iconCategory.icon[v.postCategory]}/>
          </div>

          <figcaption className={styles.pulsePostInfoDesc}>
            {v.postDesc}... (<Link to={"#"}>See full entry</Link>)
          </figcaption>

          <PulsePostBy {...v.postBy} />
        </figure>
      </div>
    );

  render() {
    const { location: { pathname } } = this.props;
    return (
      <div>
        {this.prepareData(list, pathname)}
      </div>
    );
  }
}

export default PulsePost;
