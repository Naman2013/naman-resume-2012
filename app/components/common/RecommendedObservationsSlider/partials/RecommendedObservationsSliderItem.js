import React, { Component } from 'react';
import { API } from 'app/api';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IMAGE_DETAILS } from 'app/services/image-details';
import { LIKE } from 'app/services/like';
import SliderItem from './BootstrappedSliderItem';
import { ObservationCard } from 'app/modules/observations/components/observation-card';

const { number } = PropTypes;

class RecommendedObservationsItem extends Component {
  state = {
    observationData: {},
  };

  componentDidMount() {
    const { customerImageId, user } = this.props;
    const { token, at, cid } = user;
    return API.post(IMAGE_DETAILS, {
      cid,
      at,
      customerImageId,
      token,
      useShareToken: 'n',
      callSource: 'sharedpictures',
    }).then(res => {
      this.setState({
        observationData: { ...res.data },
      });
    });
  }

  handleLike = () => {
    const { user, customerImageId } = this.props;
    const { observationData } = this.state;
    const { token, at, cid } = user;

    return API.post(LIKE, {
      cid,
      at,
      token,
      likeId: customerImageId,
    }).then(res => {
      this.setState({
        observationData: { ...observationData, ...res.data },
      });
    });
  };

  render() {
    const { readOnly } = this.props;
    const { observationData } = this.state;

    return (
      <ObservationCard
        observationData={observationData}
        handleLike={this.handleLike}
        readOnly={readOnly}
      />
    );
  }
}

RecommendedObservationsItem.propTypes = {
  customerImageId: number.isRequired,
  currentIndex: number.isRequired,
  imageIndex: number.isRequired,
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(RecommendedObservationsItem);
