import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shareMemberPicture } from '../../../modules/share-member-photo/actions';
import ActionButton from './ActionButton';

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
    theme: PropTypes.oneOf(['light', 'dark']),
    customerImageId: string.isRequired,
    actions: shape({
      sharememberPicture: func.isRequired,
    }),
  };

  static defaultProps = {
    theme: 'light',
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
        <ActionButton
          theme={this.props.theme}
          handleClick={this.sharePhoto}
          fontAwesomeIcon="fa-cogs"
          description="Share"
        />
      </div>
    );
  }
}

export default ShareMemberPhoto;
