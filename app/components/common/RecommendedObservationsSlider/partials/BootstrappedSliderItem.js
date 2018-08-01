import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import CardObservations from '../../../../../app/components/common/CardObservations';

const {
  string,
  arrayOf,
  number,
  bool,
  shape,
} = PropTypes;

const propTypes = {
  description: string,
  detailList: arrayOf(shape({
    label: string,
    text: string,
  })),
  hasIcon: bool,
  iconURL: string,
  subTitle: string,
  title: string,
};

const getIconStyle = (iconURL) => ({
  backgroundImage: iconURL,
});

const descriptionContent = 'Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it tristique de ullam ecorpere pretium…';
const tempProps = {
  title: 'The Moon!',
  author: 'JESSICA ANDERSON',
  descContent: descriptionContent,
  imageSrcUrl: 'https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg',
  likesCount: '1000',
  commentsCount: '007',
  detailsLinkUrl: 'https://www.slooh.com/',
  capturedDate: 'Jan 22, 2018',
};

const BootstrappedObservationSliderItem = ({serviceResponse

}) => (
  <div className="card-obs" key={uniqueId()}>
    <CardObservations {...tempProps} />
    <style jsx>{`
      .card-obs {
        padding: 0 40px;
        margin: 0 auto;
        max-width: 940px;
      }
    `}</style>
  </div>
  );

export default BootstrappedObservationSliderItem;
