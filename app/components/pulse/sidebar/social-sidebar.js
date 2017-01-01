import React, { Component, PropTypes } from 'react';
import styles from '../style/social-sidebar.scss';


const SocialSidebar = ({ list }) =>
  <section className={styles.socialSidebar}>
    <nav className={styles.socialSidebarTabs}>
      <div className={`${styles.socialSidebarTab} active`}><img className="soc-img"
                                                                src="./assets/icons/facebook_logo.png" alt="Facebook"/>Facebook
      </div>
      <div className={styles.socialSidebarTab}><img className="soc-img" src="./assets/icons/twitter_logo.png"
                                                    alt="Twitter"/>Twitter
      </div>
    </nav>

    <section className={styles.socialSidebarContent}>

      <header>
        <b>131231 Comments</b>
        <span><span>Sort By </span> <select name=""><option value="1">Newest</option></select></span>
      </header>

      <textarea placeholder="Add comment..." name=""></textarea>

      <div className="comment-block"></div>
      <div className="comment-block"></div>
      <div className="comment-block"></div>
      <div className="comment-block"></div>
      <div className="comment-block"></div>
      <div className="comment-block"></div>
      <div className="comment-block"></div>
    </section>
  </section>;


export default SocialSidebar;
