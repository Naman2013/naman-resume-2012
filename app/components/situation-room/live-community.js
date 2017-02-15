import React, { Component, PropTypes } from 'react';
import styles from './live-club.scss';
import Scrollbars from 'react-custom-scrollbars';
import { instagram } from '../community/tools/community-icon';
import Masonry from 'react-masonry-component';

class LiveCommunity extends Component {

  prepareData(list) {
    return list.map((v, k) =>
      <section className={styles.liveCommunityPost} key={k}>

        <header className={styles.liveCommunityPostHeader}>
          <div className="icon">{instagram}</div>
          <div className="inst-name">
            <span>{v.name}</span><br/>
            <span className="inst">{v.instagram}</span>
          </div>
        </header>

        <div className={styles.liveCommunityPostDesc}>
          <img className="img" src={v.img}/>
          <div className="desc">{v.text}</div>
        </div>

      </section>
    )
  }

  thumbVertical({ style, ...props }) {
      return <div {...props} style={style} className="scroll-bar-thumb"/>
  };

  render() {

    const { list } = this.props;

    return (
      <article className={styles.liveCommunity}>
        <Scrollbars className="scroll-bar" autoHide={false} renderThumbVertical={this.thumbVertical}>
          <Masonry>
            {this.prepareData(list)}
          </Masonry>
        </Scrollbars>
      </article>
    )
  }
}


export default LiveCommunity;

LiveCommunity.propTypes = {
  list: PropTypes.array
};
