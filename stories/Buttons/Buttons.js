import React from 'react';
import noop from 'lodash/noop';
import { storiesOf } from '@storybook/react';
import DeviceProvider from 'providers/DeviceProvider';
import BackBar from '../../app/components/common/style/buttons/BackBar';
import GenericButton from '../../app/components/common/style/buttons/Button';
import CountButton from '../../app/components/common/style/buttons/CountButton';
import LikeButton from '../../app/components/common/style/buttons/LikeButton';
import CommentButton from '../../app/components/common/style/buttons/CommentButton';
import PhotoUploadButton from '../../app/components/common/style/buttons/PhotoUploadButton';
import LargeButtonWithRightIcon from '../../app/components/common/style/buttons/LargeButtonWithRightIcon';
import LikeSomethingButton from '../../app/components/common/LikeSomethingButton';

storiesOf('Buttons ', module)
  .addDecorator(getStory => <DeviceProvider>{getStory()}</DeviceProvider>)
  .add('Back Bar', () => (
    <BackBar onClickEvent={noop} />
  ))
  .add('Button with icon', () => (
    <GenericButton onClickEvent={noop} text="Post" icon="https://vega.slooh.com/assets/v4/common/comment.svg" />
  ))
  .add('Button without text', () => (
    <GenericButton onClickEvent={noop} icon="https://vega.slooh.com/assets/v4/common/comment.svg" />
  ))
  .add('LikeButton', () => (
    <LikeButton onClickEvent={noop} count="1" />
  ))
  .add('CommentButton', () => (
    <CommentButton onClickEvent={noop} count="1" />
  ))
  .add('CountButton', () => (
    <CountButton onClickEvent={noop} icon="https://vega.slooh.com/assets/v4/common/comment.svg" count="1000" />
  ))
  .add('LargeButtonWithRightIcon', () => (
    <LargeButtonWithRightIcon onClickEvent={noop} icon="https://vega.slooh.com/assets/v4/common/comment.svg" text="comment" />
  ))
  .add('PhotoUploadButton', () => (
    <PhotoUploadButton onClickEvent={noop} />
  ))
  .add('LikeSomethingButton, makes call to API', () => (
    <LikeSomethingButton
      customerId="310006"
      likePrompt="You cannot like your own comment"
      likesCount={3}
      showLikePrompt={true}
      user={{
        cid: '310006',
        at: '3',
        token: '05ab823d9323f02d0ae3667200c5f5b8f7acbd70',
      }}
    />
  ));
