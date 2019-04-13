import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { FormattedMessage } from 'react-intl';
import AskQuestionTile from 'app/components/ask-astronomer/AskQuestionTile';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import MVPAstronomerList from 'app/components/common/MVPAstronomer/MVPAstronomerList';
import styles from '../AskAstronomer.style';
import messages from './AsideContainer.messages';

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
  updateQuestionsList,
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
        updateQuestionsList={updateQuestionsList}
        {...aaaQuestionPrompt}
      />
    </DisplayAtBreakpoint>
    <div className="mvp">
      <div className="mvp-header">
        <h1>
          <FormattedMessage {...messages.MVPHeader1} />
        </h1>
        <h2>
          <FormattedMessage {...messages.MVPHeader2} />
        </h2>
      </div>
      {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
        <MVPAstronomerList {...objectSpecialists} />
      ) : (
        <div className="card-container__specialists">
          <FormattedMessage {...messages.NoMVP} />
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
  updateQuestionsList: func.isRequired,
};

AsideContainer.defaultProps = {
  showModal: noop,
  objectSpecialists: {},
};
export default AsideContainer;
