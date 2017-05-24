import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import CommunityPerspectives from '../common/community-perspectives/community-perspectives';
import { fetchContent } from '../../modules/pulse/get-post-action';
import { darkBlueGray, gray } from '../../styles/variables/colors';
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
      <div>
        <img alt="Book" className="bookclub-img" src="/assets/images/bookclub/Space_BookClub_Logo.png" />
        <span>Community Perspectives</span> | <Link to="/publish-post">Upload your own</Link>
        <CommunityPerspectives
          communityContent={communityPosts}
        />
        <style jsx>{`

        `}</style>
      </div>
    );
  }
}

export default Footer;
