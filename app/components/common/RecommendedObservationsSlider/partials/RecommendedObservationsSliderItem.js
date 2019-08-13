import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IMAGE_DETAILS } from 'app/services/image-details';
import { LIKE } from 'app/services/like';
import CardObservations from 'app/components/common/CardObservations';
import SliderItem from './BootstrappedSliderItem';

const { number } = PropTypes;

class RecommendedObservationsItem extends Component {
  state = {};

  componentDidMount() {
    const { customerImageId, user } = this.props;
    const { token, at, cid } = user;
    return axios
      .post(IMAGE_DETAILS, {
        cid,
        at,
        customerImageId,
        token,
        useShareToken: 'n',
        callSource: 'sharedpictures',
      })
      .then(res => {
        this.setState({
          ...res.data,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    const { currentIndex, user } = this.props;
    const { token, at, cid } = user;
    if (
      currentIndex !== nextProps.currentIndex &&
      nextProps.imageIndex === nextProps.currentIndex
    ) {
      axios
        .post(IMAGE_DETAILS, {
          cid,
          at,
          customerImageId: nextProps.customerImageId,
          token,
          useShareToken: 'n',
          callSource: 'sharedpictures',
        })
        .then(res => {
          this.setState({
            ...res.data,
          });
        });
    }
  }

  handleLike = () => {
    const { user, customerImageId } = this.props;
    const { token, at, cid } = user;
    axios
      .post(LIKE, {
        cid,
        at,
        token,
        likeId: customerImageId,
      })
      .then(res => {
        this.setState({
          ...res.data,
        });
      });
    return axios
      .post(IMAGE_DETAILS, {
        cid,
        at,
        customerImageId,
        token,
        useShareToken: 'n',
        callSource: 'sharedpictures',
      })
      .then(res => {
        this.setState({
          ...res.data,
        });
      });
  };

  render() {
    const { customerImageId } = this.props;
    return (
      <SliderItem
        {...this.state}
        handleLike={this.handleLike}
        customerImageId={customerImageId}
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
