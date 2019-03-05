import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import styles from './action-items.style';

const ActionItems = (props) => {
  const {
    cancelLabel,
    goBack,
    submitLabel,
    submitStory,
  } = props;
  return (
    <div className="root">
      <Button onClickEvent={goBack} text={cancelLabel} />
      <Button onClickEvent={submitStory} text={submitLabel} />
      <style jsx>{styles}</style>
    </div>
  )
}
ActionItems.propTypes = {
  cancelLabel: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  submitStory: PropTypes.func.isRequired,
};

export default ActionItems;
