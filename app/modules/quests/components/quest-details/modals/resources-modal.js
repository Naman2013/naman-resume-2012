import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { useTranslation } from 'react-i18next';
import SterlingTitle from 'app/components/common/titles/SterlingTitle';
import IntroText from 'app/components/common/form-sections/intro-text';
import GenericButton from 'app/components/common/style/buttons/Button';
import style from './resources-modal.style';

const ResourcesModal = ({
  appendixSubheader,
  appendixHeader,
  appendixText,
  closeModal,
}) => {
  const { t } = useTranslation();
  return (
    <div className="root">
      <SterlingTitle title={appendixHeader} subTitle={appendixSubheader} />
      <IntroText desc={appendixText} />
      <GenericButton onClickEvent={closeModal} text={t('Quests.Close')} />
      <style jsx>{style}</style>
    </div>
  );
};

ResourcesModal.propTypes = {
  appendixSubheader: PropTypes.string.isRequired,
  appendixHeader: PropTypes.string.isRequired,
  appendixText: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
};

ResourcesModal.defaultProps = {
  closeModal: noop,
};

export default ResourcesModal;
