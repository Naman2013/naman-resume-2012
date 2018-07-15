import React from 'react';
import noop from 'lodash/noop';
import { storiesOf } from '@storybook/react';
import BackBar from '../../app/components/common/style/buttons/BackBar';
import GenericButton from '../../app/components/common/style/buttons/Button';
import SmallButtonWithIcon from '../../app/components/common/style/buttons/SmallButtonWithIcon';
import LikeButton from '../../app/components/common/style/buttons/LikeButton';
import CommentButton from '../../app/components/common/style/buttons/CommentButton';
import PhotoUploadButton from '../../app/components/common/style/buttons/PhotoUploadButton';
import LargeButtonWithRightIcon from '../../app/components/common/style/buttons/LargeButtonWithRightIcon';


storiesOf('Buttons ', module)
  .add('Back Bar', () => (
    <BackBar onClickEvent={noop()} />
  ))
  .add('Button with icon', () => (
    <GenericButton onClickEvent={noop()} text="Post" icon="https://vega.slooh.com/assets/v4/common/comment.svg" />
  ))
  .add('Button without text', () => (
    <GenericButton onClickEvent={noop()} icon="https://vega.slooh.com/assets/v4/common/comment.svg" />
  ))
  .add('LikeButton with count', () => (
    <LikeButton onClickEvent={noop()} count="1" />
  ))
  .add('LikeButton without count', () => (
    <LikeButton onClickEvent={noop()} />
  ))
  .add('CommentButton with count', () => (
    <CommentButton onClickEvent={noop()} count="1" />
  ))
  .add('CommentButton without count', () => (
    <CommentButton onClickEvent={noop()} />
  ))
  .add('SmallButtonWithIcon', () => (
    <SmallButtonWithIcon onClickEvent={noop()} icon="https://vega.slooh.com/assets/v4/common/comment.svg" text="comment" />
  ))
  .add('LargeButtonWithRightIcon', () => (
    <LargeButtonWithRightIcon onClickEvent={noop()} icon="https://vega.slooh.com/assets/v4/common/comment.svg" text="comment" />
  ))
  .add('PhotoUploadButton', () => (
    <PhotoUploadButton onClickEvent={noop()} />
  ));
