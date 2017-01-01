import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import PulsePostBy from '../../components/pulse/pulse-post-by';
import PulsePostTools from '../../components/pulse/tools/pulse-post-tools'
import { iconCategory as icon } from '../../components/pulse/tools/pulse-icon';
import styles from './object-post.scss';

const list = [
  {
    id: 1,
    postImage: "",
    postImageBy: "Image by Sarah Blake, all rights reserved.",
    postTitle: "My new Gemini painting is finally finished!",
    postDate: "March 12, 2017",
    postCategory: "ART_CULTURE",
    postDesc: "I just finished this painting in my studio and thought I would share it with the Slooh community. " +
    "Hope you like it. It took me about 5 months to get it done, since I have a full time job. I have been really ",
    postBy: {
      image: "",
      name: "Sarah Blake",
      post: ["guardian"],
      from: "New York, NY, USA. Member since 2011"
    },
    postTools: {
      hot: 250,
      likes: 1250,
    }
  }, {
    id: 2,
    postImage: "",
    postImageBy: "Image by Sarah Blake, all rights reserved.",
    postTitle: "My new Gemini painting is finally finished!",
    postDate: "March 12, 2017",
    postCategory: "SCIENCE_LOG",
    postDesc: "I respectfully disagree with " +
    "Mr. Sagan and have been completing a series of paintings on each of the zodiacal symbols. " +
    "I wanted to realy a little bit more about the process",
    postBy: {
      image: "",
      name: "Sarah Blake",
      post: ["guardian"],
      from: "New York, NY, USA. Member since 2011"
    },
    postTools: {
      hot: 250,
      likes: 1250,
    }
  }, {
    id: 3,
    postImage: "",
    postImageBy: "Image by Sarah Blake, all rights reserved.",
    postTitle: "My new Gemini painting is finally finished!",
    postDate: "March 12, 2017",
    postCategory: "DIY",
    postDesc: "It took me about 5 months to get it done, since I have a full time job. I have been really " +
    "thinking through what it means to be a Gemini and the conflict with the perception Carl Sagan had that its a " +
    "“pseudo-science” to consider the stars can have any power over our lives. I respectfully disagree with ",
    postBy: {
      image: "",
      name: "Sarah Blake",
      post: ["guardian", "astronomer"],
      from: "New York, NY, USA. Member since 2011"
    },
    postTools: {
      hot: 250,
      likes: 1250,
    }
  }
];

class ObjectPostList extends Component {

  prepareData(list) {
    return list.map((v, k) =>
      <div key={k}>
        <div className={styles.ObjectPostList} key={v.id}>
          <span className={styles.ObjectPostListID}>{v.id}.</span>

          <figure className={styles.ObjectPostListInfo}>
            <Link to={`slooh-pulse/post/${v.id}`}><h2 className={styles.ObjectPostListInfoTitle}>{v.postTitle}</h2>
            </Link>

            <div className="row">
              <div className="col-md-6">
                <PulsePostBy {...v.postBy} />
              </div>

              <div className="col-md-2 pull-right">
                <img className="icon" src={icon.icon[v.postCategory]}/>
              </div>

              <div className="col-md-3 pull-right">
                <div className={styles.ObjectPostListToolsHot}>
                  <PulsePostTools {...v.postTools} share={false}/>
                </div>
              </div>
            </div>

            <figcaption className={styles.ObjectPostListInfoDesc}>
              <h3>HOW IT MADE THE LIST</h3>
              "{v.postDesc}"
            </figcaption>

          </figure>

        </div>

        <hr className={styles.ObjectPostListHr}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.prepareData(list)}
      </div>
    );
  }
}

export default ObjectPostList;
