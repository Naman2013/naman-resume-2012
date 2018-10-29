import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import AskQuestionTile from 'components/ask-astronomer/AskQuestionTile';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import MVPAstronomerList from 'components/common/MVPAstronomer/MVPAstronomerList';
import styles from '../AskAstronomer.style';

const {
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const AsideContainer = ({
  modalActions,
  objectSpecialists,
  objectId,
  aaaQuestionPrompt,
  user,
  submitQuestion,
}) => (
  <div>
    <DisplayAtBreakpoint
      screenSmall
      screenLarge
      screenXLarge
    >
      <AskQuestionTile
        modalActions={modalActions}
        objectId={objectId}
        user={user}
        submitQuestion={submitQuestion}
        {...aaaQuestionPrompt}
      />
    </DisplayAtBreakpoint>
    <div className="mvp">
      <div className="mvp-header">
        <h1>THIS OBJECT’S</h1>
        <h2>MVP ASTRONOMERS</h2>
      </div>
      {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
        <MVPAstronomerList {...objectSpecialists} />
      ) : (
        <div className="card-container__specialists">
          Sorry, there are no MVP Astronomers available.
        </div>
      )}
    </div>
    <style jsx>{styles}</style>
  </div>
);

AsideContainer.propTypes = {
  modalActions: shape({
    showModal: func,
  }).isRequired,
  objectSpecialists: shape({}),

};

AsideContainer.defaultProps = {
  showModal: noop,
  objectSpecialists: {},
};
export default AsideContainer;
