/** *********************************
* V4 Create Story
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
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
    actions,
    uuid,
    contentCategoriesDescText,
    objectCategoriesList,
    contentCategories,
  } = props;

  return (
    <div className="root">
      <CenterColumn>
        <CreateStoryForm
          submitStory={actions.submitStory}
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
  actions: shape({}),

}
CreateStory.defaultProps = {
}

export default CreateStory;
