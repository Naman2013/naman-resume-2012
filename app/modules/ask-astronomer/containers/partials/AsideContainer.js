import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { useTranslation } from 'react-i18next';
import AskQuestionTile from 'app/modules/ask-astronomer/components/AskQuestionTile';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import MVPAstronomerList from 'app/components/common/MVPAstronomer/MVPAstronomerList';
import styles from '../AskAstronomer.style';

const AsideContainer = ({
  modalActions,
  objectSpecialists,
  objectId,
  aaaQuestionPrompt,
  user,
  submitQuestion,
  updateQuestionsList,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <DisplayAtBreakpoint screenSmall screenLarge screenXLarge>
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
          <h1>{t('AskAnAstronomer.MVPHeader1')}</h1>
          <h2>{t('AskAnAstronomer.MVPHeader2')}</h2>
        </div>
        {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
          <MVPAstronomerList {...objectSpecialists} />
        ) : (
          <div className="card-container__specialists">
            {t('AskAnAstronomer.NoMVP')}
          </div>
        )}
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

AsideContainer.defaultProps = {
  showModal: noop,
  objectSpecialists: {},
};
export default AsideContainer;
