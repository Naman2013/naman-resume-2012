import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectToggleList from '../../components/common/forms/SelectToggleList';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const topicPropTypes = {
  options: string,
  topicAstroObjectId: string,
  topicDisplayName: string,
  topicDisplayOrder: number,
  topicIconURL: string,
  topicIndex: number,
  topicIsSubcategory: bool,
  topicName: string,
  topicParentSlug: string,
  topicPostCount: number,
  topicSlug: string,
  topicSlugLookupId: number,
  topicStatus: string,
};

const listHeight = 500;

class SelectCategoryAndTopic extends Component {
  static propTypes = {
    categoryTopics: arrayOf(shape(topicPropTypes)),
    objectCategories: arrayOf(string),
    // objectCategories: arrayOf(shape({
    //   categoryDisplayName: string,
    //   categoryDisplayOrder: number,
    //   categoryIconURL: string,
    //   categoryIndex: number,
    //   categoryName: string,
    //   categoryPostCount: number,
    //   categorySlug: string,
    //   categorySlugLookupId: number,
    //   categoryStatus: string,
    //   categoryTopicCount: number,
    //   categoryTopicList: arrayOf(shape(topicPropTypes)),
    //   categoryTypeName: string,
    // })),
    selectedCategoryIndex: string,
    selectedTopicIndex: string,
    handleCategorySelectChange: func.isRequired,
    handleTopicSelectChange: func.isRequired,
  }

  static defaultProps = {
    objectCategories: [],
    categoryTopics: [],
    selectedCategoryIndex: null,
    selectedTopicIndex: null,
  }

  render() {
    const {
      categoryTopics,
      handleCategorySelectChange,
      handleTopicSelectChange,
      objectCategories,
      selectedCategoryIndex,
      selectedTopicIndex,
    } = this.props;

    return (
      <div className="cat-select-container">
        <p className="description">Select an object category and/or object topic from the list below, then click View Posts</p>

        <div className="select-object-category-and-topic-wrapper">
          <div className="select-object-category">
            <h3 className="header">Object Category</h3>
            <SelectToggleList
              options={objectCategories}
              name="categories"
              handleSelectedChange={handleCategorySelectChange}
              selectedIndex={selectedCategoryIndex}
              listHeight={listHeight - 50}
            />
          </div>

          <div className="select-object-topic">
            <h3 className="header">Topic</h3>
            <SelectToggleList
              options={categoryTopics}
              name="topics"
              handleSelectedChange={handleTopicSelectChange}
              selectedIndex={selectedTopicIndex}
              listHeight={listHeight - 50}
            />
          </div>
        </div>
        <style jsx>
          {`

            .cat-select-container {
              height: ${listHeight + 65}px;
            }

            .description {
              margin: 10px auto;
            }

            .header {
              margin: 15px;
            }

            .select-object-category-and-topic-wrapper {
              width: 100%;
              text-align: left;
              display: flex;
              justify-content: space-around;
              font-size: 16px;
            }

            .select-object-category,
            .select-object-topic {
              flex: 1 0 45%;
            }
          `}
        </style>
      </div>
    );
  }
}

export default SelectCategoryAndTopic;
