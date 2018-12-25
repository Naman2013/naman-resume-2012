import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { intlShape, injectIntl } from 'react-intl';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import IntroText from 'components/common/form-sections/intro-text';
import GenericButton from 'components/common/style/buttons/Button';
import style from './resources-modal.style';
import messages from './resources-modal.messages';

const ResourcesModal = ({
  appendixSubheader,
  appendixHeader,
  appendixText,
  closeModal,
  intl,
}) => (
  <div className="root">
    <SterlingTitle
      title={appendixHeader}
      subTitle={appendixSubheader}
    />
    <IntroText desc={appendixText} />
    <GenericButton
      onClickEvent={closeModal}
      text={intl.formatMessage(messages.Close)}
    />
    <style jsx>{style}</style>
  </div>
);

ResourcesModal.propTypes = {
  appendixSubheader: PropTypes.string.isRequired,
  appendixHeader: PropTypes.string.isRequired,
  appendixText: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
  intl: intlShape.isRequired,
};

ResourcesModal.defaultProps = {
  closeModal: noop,
}

export default injectIntl(ResourcesModal);
