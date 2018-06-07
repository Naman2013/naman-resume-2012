import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';


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

const BootstrappedObservationSliderItem = ({

}) => (<div className="root" key={uniqueId()}>
    item
      <style jsx>{`
      `}</style>
    </div>);

export default BootstrappedObservationSliderItem;
