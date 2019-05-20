/** *********************************
 * V4 Create Story
 *
 *
 *
 ***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Modal from 'react-modal';
import CenterColumn from 'app/components/common/CenterColumn';
import CreateStoryForm from 'app/components/stories/form/create-story-form';
import BarHeader from 'app/components/common/form-sections/bar-header';
import styles from './create-story.style';

const { func, shape, string } = PropTypes;

export const CreateStory = props => {
  const {
    actions,
    cancelLabel,
    contentCategories,
    contentCategoriesDescText,
    introText,
    objectCategoriesList,
    sectionLabels,
    submitLabel,
    submitStory,
    userActions,
    modal,
    uuid,
    user,
    device,
    headingPrompt,
    imagePrompt,
    noTagsMsg,
    tagLabel,
    tagPrompt,
    titlePrompt,
  } = props;
  return (
    <div className="root">
      <Modal
        ariaHideApp={false}
        isOpen={modal.showModal}
        style={modal.modalStyles}
        contentLabel="askAstronomer"
        onRequestClose={() => {
          actions.closeModal();
          if (modal.modalOnDismiss) modal.modalOnDismiss();
        }}
      >
        {modal.modalComponent}
      </Modal>
      <CenterColumn>
        <div className="create-form-container">
          <BarHeader title={headingPrompt} />
          <div className="inner-container">
            <CreateStoryForm
              device={device}
              actions={actions}
              cancelLabel={cancelLabel}
              contentCategories={contentCategories}
              contentCategoriesDescText={contentCategoriesDescText}
              goBack={userActions.goToHubs}
              introText={introText}
              objectCategoriesList={objectCategoriesList}
              sectionLabels={sectionLabels}
              submitStory={submitStory}
              submitLabel={submitLabel}
              user={user}
              uuid={uuid}
              imagePrompt={imagePrompt}
              noTagsMsg={noTagsMsg}
              tagLabel={tagLabel}
              tagPrompt={tagPrompt}
              titlePrompt={titlePrompt}
            />
          </div>
        </div>
      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
};

CreateStory.propTypes = {
  actions: shape({
    submitStory: func,
  }),
  cancelLabel: string,
  submitLabel: string,
  sectionLabels: shape({
    [string]: shape({
      title: string.isRequired,
      desc: string,
    }),
  }),
  user: shape({
    at: string.isRequired,
    token: string.isRequired,
    cid: string.isRequired,
  }).isRequired,
  introText: string,
  userActions: shape({
    goToHubs: func.isRequired,
  }),
};
CreateStory.defaultProps = {
  actions: {
    submitStory: noop,
  },
  submitLabel: '',
  cancelLabel: '',
  sectionLabels: {
    section1: {
      title: '',
    },
    section2: {
      title: '',
    },
    section3: {
      title: '',
    },
    section4: {
      title: '',
    },
    section5: {
      title: '',
    },
  },
  introText: '',
};

export default CreateStory;
