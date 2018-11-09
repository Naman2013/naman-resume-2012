import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import IntroText from 'components/common/form-sections/intro-text';
import GenericButton from 'components/common/style/buttons/Button';
import style from './resources-modal.style';

const ResourcesModal = ({
  appendixSubheader,
  appendixHeader,
  appendixText,
  closeModal,
}) => (
  <div className="root">
    <SterlingTitle
      title={appendixHeader}
      subTitle={appendixSubheader}
    />
    <IntroText desc={appendixText} />
    <GenericButton
      onClickEvent={closeModal}
      text="Close"
    />
    <style jsx>{style}</style>
  </div>
);

ResourcesModal.propTypes = {
  appendixSubheader: PropTypes.string.isRequired,
  appendixHeader: PropTypes.string.isRequired,
  appendixText: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
};

ResourcesModal.defaultProps = {
  closeModal: noop,
}

export default ResourcesModal;
