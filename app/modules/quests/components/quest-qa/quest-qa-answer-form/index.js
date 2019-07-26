import React, { PureComponent } from 'react';
import ImageClickHandler from 'app/components/common/ImageClickHandler';
import './styles.scss';

export class QuestQaAnswerForm extends PureComponent {
  render() {
    const { imageUrl, thumbnailUrl } = this.props;

    return (
      <div className="quest-qa-answer-form">
        <div className="quest-qa-answer-image">
          <ImageClickHandler imageUrl={imageUrl}>
            <img src={thumbnailUrl} />
          </ImageClickHandler>
        </div>
      </div>
    );
  }
}
