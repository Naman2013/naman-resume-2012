import React, { Component } from 'react';
import { Link } from 'react-router';
import { fetchCategoryTopicList } from '../../modules/browse-popular-objects/api';
import SelectCategoryAndTopic from '../../components/form/CategoryTopicSelector';
import flatten from 'lodash/flatten';

class PulseByObject extends Component {

  constructor() {
    super();
    fetchCategoryTopicList({
      callSource: 'browsePage',
    }).then((res) => {
      const {
        categoryList,
        apiError,
      } = res.data;

      if (apiError) return;

      this.setState({
        categoryList
      });
    });
  }

  state = {
    categoryList: [],
    selectedCategoryIndex: null,
    selectedTopicIndex: null,
  }

  handleCategorySelectChange = (event) => {
    this.setState({
      selectedCategoryIndex: event.target.value,
      selectedTopicIndex: null,
    });
  }

  handleTopicSelectChange = (event) => {
    this.setState({
      selectedTopicIndex: event.target.value,
    });
  }

  get objectCategories() {
    return this.state.categoryList.map(category => `${category.categoryDisplayName} (${category.categoryTopicCount})`);
  }

  get currentCategoryTopics() {
    const { categoryList, selectedCategoryIndex } = this.state;
    return (categoryList[selectedCategoryIndex]
            && categoryList[selectedCategoryIndex].categoryTopicList) || [];
  }

  get formattedCategoryTopics() {
    return flatten(this.currentCategoryTopics.map(topic => ({
      option: `${topic.topicDisplayName} (${topic.topicPostCount})`,
      ...topic,
    })));
  }

  get selectedCategory() {
    const { selectedCategoryIndex, categoryList } = this.state;
    return selectedCategoryIndex && categoryList[selectedCategoryIndex];
  }

  get selectedTopic() {
    const { selectedTopicIndex } = this.state;
    return selectedTopicIndex && this.formattedCategoryTopics[selectedTopicIndex];
  }

  render() {
    const {
      categoryList,
      selectedCategoryIndex,
      selectedTopicIndex,
    } = this.state;
    let url;

    if (this.selectedCategory) {
      url = this.selectedCategory && this.selectedTopic ? `/objects/latest-entries/${this.selectedTopic.topicSlugLookupId}/all` : `/objects/latest-entries/${this.selectedCategory.categorySlugLookupId}/all`
    }

    return (
      <div>
        <SelectCategoryAndTopic
          categoryTopics={this.formattedCategoryTopics}
          objectCategories={this.objectCategories}
          selectedCategoryIndex={selectedCategoryIndex}
          selectedTopicIndex={selectedTopicIndex}
          handleTopicSelectChange={this.handleTopicSelectChange}
          handleCategorySelectChange={this.handleCategorySelectChange}
        />

        {(this.selectedCategory || this.selectedTopic) && <Link
          to={url}
        >
          <span className="btn btn-primary view-posts">View Posts</span>
        </Link>}
        <style jsx>
        {`
          .view-posts {
            margin-top: 15px;
            width: 100%;
          }
        `}
        </style>
      </div>
    );
  }
}

export default PulseByObject;
