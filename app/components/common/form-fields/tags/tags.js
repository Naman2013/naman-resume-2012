import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import deleteTag from 'app/services/tags/delete-tag';
import setTag from 'app/services/tags/set-tag';
import GenericButton from 'app/components/common/style/buttons/Button';
import TagInput from './partials/input';
import TagDisplay from './partials/display';
import styles from './tags.style';

const { arrayOf, func, number, shape, string } = PropTypes;

@withTranslation()
class Tags extends Component {
  static propTypes = {
    customerImageId: number,
    onTagsChange: func.isRequired,
    scheduledMissionId: number,
    tagClass: string.isRequired,
    tags: arrayOf(
      shape({
        tagIndex: number.isRequired,
        tagText: string.isRequired,
      })
    ),
    tagType: string.isRequired,
    uuid: string,
    user: shape({
      at: string.isRequired,
      token: string.isRequired,
      cid: string.isRequired,
    }).isRequired,
    validateResponseAccess: func.isRequired,
    noTagsMsg: string.isRequired,
    tagLabel: string.isRequired,
    tagPrompt: string.isRequired,
  };

  static defaultProps = {
    uuid: null,
    scheduledMissionId: null,
    customerImageId: null,
  };

  state = {
    newTagText: '',
    hasError: false,
  };

  onChangeText = event => {
    const { value } = event.target;

    this.setState(() => ({
      newTagText: value,
    }));
  };

  addTag = e => {
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
    }).then(res => {
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
  };

  deleteTag = e => {
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
    }).then(res => {
      if (!res.data.apiError) {
        onTagsChange(res.data.tagList);
      }

      validateResponseAccess(res);
    });
  };

  render() {
    const { tags, noTagsMsg, tagLabel, tagPrompt, t } = this.props;

    const { newTagText, hasError } = this.state;
    return (
      <div className="root">
        {noTagsMsg && (
          <Fragment>
            <TagDisplay
              noTagsMsg={noTagsMsg}
              tags={tags}
              onTagDelete={this.deleteTag}
              deleteTag={this.deleteTag}
            />
            <TagInput
              newTagText={newTagText}
              placeholder={tagPrompt}
              handleTagTextChange={this.onChangeText}
            />
            <GenericButton
              text={tagLabel}
              onClickEvent={this.addTag}
              theme={{ margin: '15px auto' }}
            />
            <div className="tag-error">
              <span>{hasError ? t('Alerts.AddTagErrorText') : ''}</span>
            </div>
          </Fragment>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Tags;
