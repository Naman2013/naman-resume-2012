import React, { Component, PropTypes } from 'react';
import PulsePostBy from '../../components/pulse/pulse-post-by'
import PulsePostDate from '../../components/pulse/pulse-post-date'
import PulsePostImage from '../../components/pulse/pulse-post-image'
import PulsePostTag from '../../components/pulse/pulse-post-tag'
import PulsePostTools from '../../components/pulse/tools/pulse-post-tools'
import styles from './pulse-post.scss';

const post = {
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
  "I wanted to realy a little bit more about the process \r\n \r \n" +
  "I just finished this painting in my studio and thought I would share it with the Slooh community. " +
  "Hope you like it. It took me about 5 months to get it done, since I have a full time job. I have been really " +
  "thinking through what it means to be a Gemini and the conflict with the perception Carl Sagan had that its a " +
  "“pseudo-science” to consider the stars can have any power over our lives. I respectfully disagree with " +
  "Mr. Sagan and have been completing a series of paintings on each of the zodiacal symbols. " +
  "I wanted to realy a little bit more about the process \r\n \r \n" +
  "I just finished this painting in my studio and thought I would share it with the Slooh community. " +
  "Hope you like it. It took me about 5 months to get it done, since I have a full time job. I have been really " +
  "thinking through what it means to be a Gemini and the conflict with the perception Carl Sagan had that its a " +
  "“pseudo-science” to consider the stars can have any power over our lives. I respectfully disagree with " +
  "Mr. Sagan and have been completing a series of paintings on each of the zodiacal symbols. " +
  "I wanted to realy a little bit more about the process \r\n \r \n",
  postBy: {
    image: "",
    name: "Sarah Blake",
    post: ["guardian"],
    from: "New York, NY, USA. Member since 2011"
  },
  postTag: ["astro", "super-star", "victor"],
  postTools: {
    hot: 250,
    likes: 1250,
  }
};

const PulsePostContent = () =>

  <div className={styles.PulsePostList}>

    <PulsePostImage image={post.postImage} imageBy={post.postImageBy}/>

    <figure className={styles.PulsePostListInfo}>
      <h2 className={styles.PulsePostListInfoTitle}>{post.postTitle}</h2>

      <div className="row">
        <div className="col-md-6">
          <PulsePostBy {...post.postBy} />
        </div>
        <div className="col-md-5 pull-right">
          <PulsePostTools {...post.postTools} share={true} />
        </div>
      </div>

      <PulsePostDate date={post.postDate} category={post.postCategory}/>

      <figcaption className={styles.PulsePostListInfoDesc}>{post.postDesc}</figcaption>

      <PulsePostTag tags={post.postTag}/>
    </figure>

  </div>;


export default PulsePostContent;

