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


const BootstrappedObservationSliderItem = (props) => (
  <div className="card-obs" key={uniqueId()}>
    <CardObservations
      title={props.observationTitle || props.imageTitle}
      description={props.observationLog}
      imageUrl={props.imageURL}
      hasLink={props.hasLink}
      linkLabel={props.linkLabel}
      linkUrl={props.linkUrl}
    />
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
