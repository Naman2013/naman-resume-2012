import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from 'components/common/style/buttons/Button';
import styles from './action-items.style';

const ActionItems = (props) => {
  const {
    goBack,
    submitStory,
  } = props
  return (
    <div className="root">
      <Button onClickEvent={goBack} text="Cancel" />
      <Button onClickEvent={submitStory} text="Submit" />
      <style jsx>{styles}</style>
    </div>
  )
}
ActionItems.propTypes = {
    submitStory: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
}



export default ActionItems;
