import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import SliderItem from './BootstrappedSliderItem';
import { IMAGE_DETAILS } from 'services/image-details';

const {
  string,
  arrayOf,
  number,
  bool,
  shape,
} = PropTypes;

class RecommendedObservationsItem extends Component {
  state = {};

  componentDidMount() {
    const { customerImageId, currentIndex, imageIndex } = this.props;
    console.log('props', this.props)
    if (currentIndex === imageIndex) {
    axios.post(IMAGE_DETAILS, {
      customerImageId,
      useShareToken: 'n',
      callSource: 'sharedpictures',
    }).then((res) => {
      this.setState({
        ...res.data,
      })
    });
  };
  }

  render() {
    return (
      <Fragment>
        <SliderItem {...this.state} />
      </Fragment>
    );
  }
}

RecommendedObservationsItem.propTypes = {
  customerImageId: number,
};
RecommendedObservationsItem.defaultProps = {
  customerImageId: '',
};
export default RecommendedObservationsItem;
