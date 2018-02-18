import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shareMemberPicture } from '../../../modules/share-member-photo/actions';
import actionsStyles from './actions.style';

const {
  func,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({ shareMemberPhoto }) => ({
  ...shareMemberPhoto,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    shareMemberPicture,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ShareMemberPhoto extends Component {

  static propTypes = {
    customerImageId: string.isRequired,
    actions: shape({
      sharememberPicture: func.isRequired,
    }),
  };

  sharePhoto = (e) => {
    e.preventDefault();

    const {
      actions,
      customerImageId,
    } = this.props;

    actions.shareMemberPicture({
      customerImageId,
    });
  }

  render() {
    return (
      <div>
        <button className="action" onClick={this.sharePhoto}>
          <span className="fa fa-cogs" />
          <div className="action-description share-description">Share</div>
        </button>
        <style jsx>{`
          ${actionsStyles}

          .action:hover .share-description {
            text-align: center;
            width: 80px;
          }
        `}</style>
      </div>
    );
  }
}

export default ShareMemberPhoto;
