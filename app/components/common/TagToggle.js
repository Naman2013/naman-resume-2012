import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WithContext as ReactTags } from 'react-tag-input';
import { white, pink } from '../../styles/variables/colors';

class TagToggle extends Component {

  getActiveTagIndex = (tag) => {
    return this.props.activeTags.indexOf(tag);
  }

  toggleTag = (value) => {
    const { activeTags } = this.props;
    const activeTagIndex = this.getActiveTagIndex(value);
    if (activeTagIndex > -1) {
      activeTags.splice(activeTagIndex, 1);
    } else {
      activeTags.push(value);
    }

    this.props.handleTagClick(this.props.param, activeTags);
  }

  get tagListFormatted() {
    const {
      tagList
    } = this.props;
    return tagList.map((tag, id) => ({ id, text: tag }));
  }
  render() {
    const showTags = this.tagListFormatted.length > 0;
    return (
      <div className="react-tags-container">
        {!showTags && <div>There are no tags.</div>}
        { showTags && this.tagListFormatted.map(tag => (
          <button
            key={tag.id}
            className={classnames('tag', 'btn', {
              active: this.getActiveTagIndex(tag.text) > -1
            })}
            onClick={() => { this.toggleTag(tag.text); }}
          >
            {tag.text}
          </button>)
        )}
        <style jsx>
          {`
            .react-tags-container {
              padding: 10px;
              text-transform: none;
            }
            .tag {
              display: inline-block;
              background: ${white};
              border-radius: 8px;
              box-shadow: 0px 0px 4px 0px #999;
              padding: 4px 15px 4px 10px;
              margin: 4px 8px;
              position: relative;
              outline: 0;
            }

            .tag:focus {
              outline: 0;
            }

            .active {
                border-color: ${pink};
            }
          `}
        </style>
      </div>
    );
  }
}

TagToggle.defaultProps = {
  tagList: [],
  activeTags: [],
  param: ''
};

TagToggle.propTypes = {
  activeTags: PropTypes.arrayOf(PropTypes.string),
  tagList: PropTypes.arrayOf(PropTypes.string),
  handleTagClick: PropTypes.func.isRequired,
  param: PropTypes.string
};

export default TagToggle;
