import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './tags.messages';
import deleteTag from 'services/tags/delete-tag';
import setTag from 'services/tags/set-tag';
import GenericButton from 'components/common/style/buttons/Button';
import TagInput from './partials/input';
import TagDisplay from './partials/display';
import styles from './tags.style';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;

class Tags extends Component {
  static propTypes = {
    customerImageId: number,
    onTagsChange: func.isRequired,
    scheduledMissionId: number,
    tagClass: string.isRequired,
    tags: arrayOf(shape({
      tagIndex: number.isRequired,
      tagText: string.isRequired,
    })),
    tagType: string.isRequired,
    uuid: string,
    user: shape({
      at: string.isRequired,
      token: string.isRequired,
      cid: string.isRequired,
    }).isRequired,
    validateResponseAccess: func.isRequired,
  };

  static defaultProps = {
    uuid: null,
    scheduledMissionId: null,
    customerImageId: null,
  };

  state = {
    newTagText: '',
    hasError: false,
  }

  onChangeText = (event) => {
    const { value } = event.target;

    this.setState(() => ({
      newTagText: value,
    }));
  }

  addTag = (e) => {
    e.preventDefault();
    const { onTagsChange } = this.props;
    const {
      customerImageId,
      scheduledMissionId,
      tagClass,
      tagType,
      user,
      uuid,
      validateResponseAccess,
    } = this.props;
    const { newTagText } = this.state;
    if (!newTagText) return;
    this.setState(() => ({
      hasError: false,
    }));

    setTag({
      text: newTagText,
      uniqueId: uuid,
      scheduledMissionId,
      customerImageId,
      tagType,
      tagClass,
      at: user.at,
      cid: user.cid,
      token: user.token,
    }).then((res) => {
      if (!res.data.apiError) {
        onTagsChange(res.data.tagList);
        this.setState(() => ({
          newTagText: '',
        }));
      } else {
        this.setState(() => ({
          hasError: true,
        }));
      }
      validateResponseAccess(res);
    });
  }

  deleteTag = (e) => {
    e.preventDefault();
    const { text } = e.currentTarget.dataset;
    const { onTagsChange } = this.props;
    const {
      customerImageId,
      scheduledMissionId,
      tagClass,
      tagType,
      user,
      uuid,
      validateResponseAccess,
    } = this.props;

    this.setState(() => ({
      hasError: false,
    }));

    deleteTag({
      text,
      uniqueId: uuid,
      scheduledMissionId,
      customerImageId,
      tagType,
      tagClass,
      at: user.at,
      cid: user.cid,
      token: user.token,
    }).then((res) => {
      if (!res.data.apiError) {
        onTagsChange(res.data.tagList);
      }

      validateResponseAccess(res);
    });
  }

  render() {
    const {
      tags,
    } = this.props;

    const {
      newTagText,
      hasError,
    } = this.state;
    return (
      <div className="root">
        <TagDisplay tags={tags} onTagDelete={this.deleteTag} deleteTag={this.deleteTag} />
        <TagInput
          newTagText={newTagText}
          placeholder="Add a new tag"
          handleTagTextChange={this.onChangeText}
        />
        <GenericButton
          text="Add"
          onClickEvent={this.addTag}
          theme={{ margin: '15px auto' }}
        />
        <div className="tag-error">
          <span>{hasError ? <FormattedMessage {...messages.AddTagErrorText} /> : ''}</span>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
};

export default Tags;
