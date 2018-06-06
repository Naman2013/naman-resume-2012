import React from 'react';
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

const RecommendedObservationsItem = ({
  customerImageId,
}) => (<Request
  serviceURL={IMAGE_DETAILS}
  requestBody={{
    customerImageId,
    useShareToken: 'n',
    callSource: 'sharedpictures',
  }}
  method="POST"
  render={({
    // fetchingContent,
    serviceResponse,
  }) => (<SliderItem {...serviceResponse} />)}
/>);

RecommendedObservationsItem.propTypes = {
  customerImageId: string,
};
RecommendedObservationsItem.defaultProps = {
  customerImageId: '',
};
export default RecommendedObservationsItem;
