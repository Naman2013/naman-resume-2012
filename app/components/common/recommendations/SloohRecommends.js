/**
  carries the installation of the modal to make the installation
  of recommendations simpler in the application

  TODO: how to handle different display formats...
  */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import Recommendation from './Recommendation';
import MissionConfirmModal from '../../missions/mission-confirm-modal';

const mapStateToProps = ({ user }) => ({
  user,
});

@connect(mapStateToProps)
class SloohRecommends extends Component {
  static defaultProps = {
    recommendations: [],
    type: 'community',
    user: {
      cid: null,
      token: null,
      at: null,
    },
  }

  static propTypes = {
    recommendations: PropTypes.arrayOf(PropTypes.number.isRequired),
    type: PropTypes.oneOf(['community']),
    user: PropTypes.shape({
      cid: PropTypes.string,
      token: PropTypes.string,
      at: PropTypes.number,
    }),
  }

  render() {
    const { recommendations, type } = this.props;
    const { cid, token, at } = this.props.user;

    return (
      <div>

        <MissionConfirmModal />

        {
          recommendations.map(recommendation => (
            <Recommendation
              key={uniqueId()}
              at={at}
              token={token}
              cid={cid}
              objectId={recommendation}
              type={type}
            />
          ))
        }
      </div>
    );
  }
}

export default SloohRecommends;
