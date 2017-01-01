import React, { Component } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import CallToAction from '../../components/publish-post/call-to-action';
import SelectContentCategory from '../../components/publish-post/select-content-category';
import SelectObjectCategory from '../../components/reserve/reserve-by-object-category';
import SelectObjectTopic from '../../components/reserve/reserve-by-object-list';
import AddContent from '../../components/publish-post/add-content';
import AddTags from '../../components/publish-post/add-tags';
import testData from '../reserve/reserve-by-objects-data';
import UploadImage from '../../components/publish-post/upload-image';
import style from './publish-post.scss';

class PublishPost extends Component {
  constructor(props) {
    super(props);

    this.setObjectCategory = this.setObjectCategory.bind(this);
    this.setObjectTopic = this.setObjectTopic.bind(this);

    this.state = {selectedCategory: {}};
  }

  setObjectCategory(item) {
    this.setState({
      selectedCategory: item
    })
  }

  setObjectTopic() {

  }

  render() {
    const selectedObject = {};
    return (
      <div>
        <AnnouncementBanner />

        <CallToAction />

        <ul className="publish-post-list">
          <li className="item">
            <span className="number">1</span>
            <p className="description">Select a Content Category</p>

            <SelectContentCategory />
          </li>

          <li className="item">
            <span className="number">2</span>
            <p className="description">Select an Object Category and Object Topic from the List</p>

            <div className="select-object-category-and-topic-wrapper">
              <div className="select-object-category">
                <SelectObjectCategory
                  items={testData.categories}
                  selectedCategory={this.state.selectedCategory}
                  onClickHandler={this.setObjectCategory} />
              </div>

              <div className="select-object-topic">
                <SelectObjectTopic
                  selectedCategory={this.state.selectedCategory}
                  selectedObject={selectedObject}
                  onClickHandler={this.setObjectTopic}
                />
              </div>
            </div>
          </li>

          <li className="item">
            <span className="number">3</span>
            <p className="description">Add Your Content</p>

            <AddContent />
          </li>

          <li className="item">
            <span className="number">4</span>
            <p className="description">Add Tags <span className="param">(optional)</span></p>

            <AddTags />
          </li>

          <li className="item">
            <span className="number">5</span>
            <p className="description">Upload Image <span className="param">(optional)</span></p>

            <UploadImage />
          </li>

          <li className="item">
            <button className="call-to-action-btn cancel-btn">Sorry, Cancel This.</button>
            <button className="call-to-action-btn">Save Work</button>
            <button className="call-to-action-btn">Submit for Review</button>
          </li>
        </ul>
      </div>
    )
  }
}

export default PublishPost;
