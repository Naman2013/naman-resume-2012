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
import styles from './create-story.style';

const {
  func,
  number,
  shape,
  string,
} = PropTypes;


export const CreateStory = (props) => {
  const {
    submitStory,
    userActions,
    uuid,
    contentCategoriesDescText,
    objectCategoriesList,
    contentCategories,
  } = props;

  return (
    <div className="root">
      <CenterColumn>
        <CreateStoryForm
          goBack={userActions.goToHubs}
          submitStory={submitStory}
          uuid={uuid}
          contentCategoriesDescText={contentCategoriesDescText}
          objectCategoriesList={objectCategoriesList}
          contentCategories={contentCategories}
        />

      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
};

CreateStory.propTypes = {
  actions: shape({
    submitStory: func,
  }),
  userActions: shape({
    goToHubs: func.isRequired,
  }),

}
CreateStory.defaultProps = {
  actions: {
    submitStory: noop,
  },
}

export default CreateStory;
