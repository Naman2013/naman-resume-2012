/** *********************************
* V4 Create Story
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import CenterColumn from 'components/common/CenterColumn';
import CreateStoryForm from 'components/stories/form/create-story-form';
import BarHeader from 'components/common/form-sections/bar-header';
import styles from './create-story.style';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;


export const CreateStory = (props) => {
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
    uuid,
    user,
  } = props;

  return (
    <div className="root">
      <CenterColumn>
        <div className="create-form-container">
          <BarHeader title="Submit a Story" />
          <div className="inner-container">
            <CreateStoryForm
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
    })
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

}
CreateStory.defaultProps = {
  actions: {
    submitStory: noop,
  },
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
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
}

export default CreateStory;
