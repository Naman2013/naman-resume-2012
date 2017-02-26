/**
  carries the installation of the modal to make the installation
  of recommendations simpler in the application

  TODO: how to handle different display formats...
  */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { uniqueId, difference } from 'lodash';
import classnames from 'classnames';
import Recommendation from './Recommendation';
import MissionConfirmModal from '../../missions/mission-confirm-modal';
import RecommendationTitleBar from './RecommendationTitleBar';
import s from './SloohRecommends.scss';

const COLUMN_COUNT_CLASSES = {
  1: 'col-xs-12',
  2: 'col-xs-6',
  3: 'col-xs-12',
};

const mapStateToProps = ({ user, piggyback }) => ({
  user,
  piggybackReservationConfirmed: piggyback.reservationConfirmed,
});

@connect(mapStateToProps)
class SloohRecommends extends Component {
  static defaultProps = {
    title: '',
    subTitle: '',
    recommendations: [],
    type: 'community',
    columns: 1,
    user: {
      cid: null,
      token: null,
      at: null,
    },
  }

  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    recommendations: PropTypes.arrayOf(PropTypes.number.isRequired),
    type: PropTypes.oneOf(['community']),
    columns: PropTypes.number,
    user: PropTypes.shape({
      cid: PropTypes.string,
      token: PropTypes.string,
      at: PropTypes.number,
    }),
  }

  shouldComponentUpdate(nextProps) {
    /**
      this is to prevent duplicate rendering of the cards when
      a given parent is rendering and providing the props
      */
    const currentRecommendations = this.props.recommendations;
    const nextRecommendations = nextProps.recommendations;
    const diffBetweenSets = difference(currentRecommendations, nextRecommendations);
    if (diffBetweenSets.length === 0) {
      return false;
    }
    return true;
  }

  render() {
    const { recommendations, type, columns, title, subTitle } = this.props;
    const { cid, token, at } = this.props.user;
    const recommendationContainerClassnames = classnames(COLUMN_COUNT_CLASSES[columns], {
      singleColumn: columns === 1,
    });
    return (
      <div className="clearfix sloohRecommendsRoot">

        <MissionConfirmModal />

        <RecommendationTitleBar
          title={title}
          subTitle={subTitle}
        />

        {
          recommendations.map(recommendation => (
            <div
              key={uniqueId()}
              className={recommendationContainerClassnames}
            >
              <Recommendation
                at={at}
                token={token}
                cid={cid}
                objectId={recommendation}
                type={type}
              />
            </div>
          ))
        }
      </div>
    );
  }
}

export default SloohRecommends;
