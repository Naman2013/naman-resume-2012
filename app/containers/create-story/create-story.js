/** *********************************
* V4 Create Story
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import CreateStoryForm from 'components/stories/create-story-form';
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
  } = props;

  console.log(props)
  return (
    <div className="root">
      <CenterColumn>
        <CreateStoryForm
          submitStory={actions.submitStory}
        />

      </CenterColumn>
      <style jsx>{styles}</style>
    </div>
  );
};

CreateStory.propTypes = {

}
CreateStory.defaultProps = {
}

export default CreateStory;
