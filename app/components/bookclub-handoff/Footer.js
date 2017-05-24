import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommunityPerspectives from '../common/community-perspectives/community-perspectives';
import { fetchContent } from '../../modules/pulse/get-post-action';
import { pink, darkBlueGray, gray } from '../../styles/variables/colors';
import { secondaryFont, primaryFont } from '../../styles/variables/fonts';

function mapStateToProps({ post }, ownProps) {
  return {
    communityPosts: post.content.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchContent,
    }, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Footer extends Component {
  static defaultProps = {
    communityPosts: [],
    actions: {},
  };

  static propTypes = {
    communityPosts: PropTypes.arrayOf(PropTypes.shape({
      postId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })),
  };


  constructor(props) {
    super(props);
    props.actions.fetchContent({
      slug: 'space-book-club',
      slugLookupId: '611',
    });
  }

  render() {
    const {
      communityPosts
    } = this.props;

    return (
      <div className="footer-wrapper">
        <div className="logo-container center">
          <img alt="Book" className="bookclub-img" src="/assets/images/bookclub/Space_BookClub_Logo.png" />
        </div>
        <div className="community-title center">
          <span className="community-name">Community Perspectives</span>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/publish-post" className="community-link">Upload your own</a>
        </div>
        <CommunityPerspectives
          communityContent={communityPosts}
        />
        <style jsx>{`
          a.community-link {
            color: ${pink};
          }
          .community-name {
            font-size: .9rem;
            text-transform: uppercase;
          }
          .center {
            margin: 0 auto;
          }
          .logo-container {
            margin-top: 75px;
            margin-bottom: 75px;
            text-align: center;
            width: 250px;
          }
          .community-title {
            margin-bottom: 25px;
          }
        `}</style>
      </div>
    );
  }
}

export default Footer;
