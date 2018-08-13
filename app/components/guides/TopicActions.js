import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'components/common/style/buttons/Button';
import style from './TopicAction.style';

const TopicActions = () => (
  <ul className="button-container">
    <li>
      <GenericButton
        onClickEvent={() => {}}
        text="Follow"
        icon="https://vega.slooh.com/assets/v4/common/comment.svg"
      />
    </li>

    <li>
      <GenericButton
        onClickEvent={() => {}}
        icon="https://vega.slooh.com/assets/v4/common/comment.svg"
      />
    </li>

    <style jsx>{style}</style>
  </ul>
);

export default TopicActions;
