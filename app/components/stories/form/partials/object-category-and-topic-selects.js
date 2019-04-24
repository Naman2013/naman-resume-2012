import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import SelectList from 'app/components/common/form-sections/select-list';
import messages from './object-category-and-topic-selects.messages';
import styles from './object-category-and-topic-selects.style';

const {
  arrayOf, func, shape, string,
} = PropTypes;
const ObjectCategoryAndTopicSelects = (props) => {
  const {
    formattedCategoryTopics,
    formattedObjectCategories,
    onSelectObjectCategory,
    onSelectObjectTopic,
    selectedObjectCategory,
    selectedObjectTopic,
  } = props;
  return (
    <div className="root">
      {formattedObjectCategories.length ? (
        <div className="select-container">
          <div className="title-text">
            <FormattedMessage {...messages.objectCategories} />
          </div>
          <SelectList
            handleSelectChange={onSelectObjectCategory}
            options={formattedObjectCategories}
            selectedValue={selectedObjectCategory}
            name="story-object-categories"
          />
        </div>
      ) : null}

      {formattedCategoryTopics.length ? (
        <div className="select-container">
          <div className="title-text">
            <FormattedMessage {...messages.objectTopics} />
          </div>
          <SelectList
            handleSelectChange={onSelectObjectTopic}
            options={formattedCategoryTopics}
            selectedValue={selectedObjectTopic}
            name="story-object-topics"
          />
        </div>
      ) : null}

      <style jsx>{styles}</style>
    </div>
  );
};

ObjectCategoryAndTopicSelects.propTypes = {
  formattedCategoryTopics: arrayOf(shape({
    value: string.isRequired,
    label: string.isRequired,
  })),
  formattedObjectCategories: arrayOf(shape({
    value: string.isRequired,
    label: string.isRequired,
  })),
  onSelectObjectCategory: func.isRequired,
  onSelectObjectTopic: func.isRequired,
  selectedObjectCategory: string,
  selectedObjectTopic: string,
};
ObjectCategoryAndTopicSelects.defaultProps = {
  formattedCategoryTopics: [],
  formattedObjectCategories: [],
  selectedObjectCategory: null,
  selectedObjectTopic: null,
};

export default ObjectCategoryAndTopicSelects;
