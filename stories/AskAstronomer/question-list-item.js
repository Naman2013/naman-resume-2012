import React from 'react';
import { storiesOf } from '@storybook/react';
import QuestionListItem from '../app/components/ask-astronomer/question-list-item';

const answerTestData = `{"ver":"v1","lang":"en","apiError":false,"errorCode":0,"errorMsg":"","statusCode":200,"resultsCount":3,"pages":0,"replies":[{"replyId":448,"title":"Reply to user question","content":"Jupiter actually does have a ring system, it&#8217;s just very small compared to that of Saturn, and is much more difficult to see from Earth.","excerpt":"Jupiter actually does have a ring system, it&#8217;s just very small compared to that of Saturn, and is much more difficult to see from Earth.","replyCount":4,"creationDate":"2018-02-21 19:52:10","modified":"2018-02-21 19:53:14","customerId":185651,"firstName":"Anthony","location":"","membershipType":"Astronomer","displayName":"AnthonyD.2013","userid":"AnthonyD.2013","memberSince":"2013","avatarType":"dummy","avatarURL":"https:\/\/vega.slooh.com\/icons\/placeholders\/avatar-dummy.png","S3Files":[],"replyType":"answer","showLikePrompt":false,"likePrompt":"","likesCount":1,"canLikeFlag":true},{"replyId":451,"title":"Q and A reply","content":"Q and A reply","excerpt":"Q and A reply","replyCount":0,"creationDate":"2018-02-23 14:40:11","modified":"2018-02-23 14:40:11","customerId":185651,"firstName":"Anthony","location":"","membershipType":"Astronomer","displayName":"AnthonyD.2013","userid":"AnthonyD.2013","memberSince":"2013","avatarType":"dummy","avatarURL":"https:\/\/vega.slooh.com\/icons\/placeholders\/avatar-dummy.png","S3Files":[],"replyType":"answer","showLikePrompt":false,"likePrompt":"","likesCount":0,"canLikeFlag":true},{"replyId":453,"title":"answer question notification","content":"Should set a &#8216;someone answered your question&#8217; notification event.","excerpt":"Should set a &#8216;someone answered your question&#8217; notification event.","replyCount":0,"creationDate":"2018-03-14 13:49:19","modified":"2018-03-14 13:49:19","customerId":185651,"firstName":"Anthony","location":"","membershipType":"Astronomer","displayName":"AnthonyD.2013","userid":"AnthonyD.2013","memberSince":"2013","avatarType":"dummy","avatarURL":"https:\/\/vega.slooh.com\/icons\/placeholders\/avatar-dummy.png","S3Files":[],"replyType":"answer","showLikePrompt":false,"likePrompt":"","likesCount":0,"canLikeFlag":true}]}`;

const questionTestData = `{"threadId":447,"title":"User question","content":"Why doesn&#8217;t Jupiter have rings like Saturn?","replyCount":7,"voiceCount":2,"freshness":"2 days, 16 hours","forumId":437,"forumName":"FAQS","topicId":444,"topicName":"Jupiter","mostRecentAuthor":{"customerId":199637,"firstName":"Richard","location":"","membershipType":"Astronomer","displayName":"Herman VonFeewig","userid":"RichardD.2016","memberSince":"2016","avatarType":"user","avatarURL":"https:\/\/castor.slooh.com\/dev101\/avatar\/199637\/avatar1508337393.png"},"creationDate":"2018-02-21 16:27:35","modified":"2018-02-21 16:27:35","closedFlag":"no","closedIconURL":"","customerId":185651,"firstName":"Anthony","location":"","membershipType":"Astronomer","displayName":"AnthonyD.2013","userid":"AnthonyD.2013","memberSince":"2013","avatarType":"dummy","avatarURL":"https:\/\/vega.slooh.com\/icons\/placeholders\/avatar-dummy.png","S3Files":[],"showLikePrompt":false,"likePrompt":"","likesCount":1,"canLikeFlag":true}`;

const generateTimelineProps = (numberOfItems) => {
  const items = new Array(numberOfItems).fill().map((item, i) => (JSON.parse(questionTestData)));

  const answers = new Array(numberOfItems).fill().map((item, i) => (JSON.parse(answerTestData)));

  return {
    items,
    answers,
  };
};

storiesOf('Ask Astronomer - Question List Item', module)
  .add('6 Items', () => (
    <QuestionListItem
      {...generateTimelineProps(6)}
    />
  ))
  .add('12 Items', () => (
    <QuestionListItem
      {...generateTimelineProps(12)}
    />
  ))
  .add('24 Items', () => (
    <QuestionListItem
      {...generateTimelineProps(24)}
    />
  ));
