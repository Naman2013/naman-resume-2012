/***********************************
* V4 Community Group Overview Page
*
*
*
***********************************/

import React, { Component, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import styles from './QuestDetails.style';

const {
  shape,
  string,
  func,
} = PropTypes;


export const QuestDetails = (props) => {
  const {} = props;
  return (
    <div className="root">
      <CenterColumn>
      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
}

QuestDetails.propTypes = {
  actions: shape({
    fetchQuestPageMeta: func.isRequired,
  }).isRequired,
  pageMeta: shape({
    questIconURL: string.isRequired,
    questId: number.isRequired,
    questSubtitle: string.isRequired,
    questTitle:string.isRequired,
  }),
  questId: string.isRequired,
}
QuestDetails.defaultProps = {
}

export default QuestDetails;
