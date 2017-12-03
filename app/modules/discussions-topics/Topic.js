import { Record } from 'immutable';

const Topic = Record({
  topicId: undefined, // (integer) ‘post’ ID of the topic
  title: '', // (string) Topic title
  topicDesc: '', // (string) Topic description (‘content’)
  parentForumId: undefined, // (int) Forum under which this topic lives
  freshness: '',
  followingFlag: false,
  threadCount: 0, // (integer) Number of threads under this topic (these will actually be implemented as bbPress topics)
  replyCount: 0, // (integer) Number of replies in the topic. freshness (string) Time since most recent activity. It will be up to the API to decide ‘5 minutes’ vs. ‘2 years’...
  creationDate: undefined, // Date topic was create
  modified: undefined, // Date topic was last modified.
  closedFlag: undefined, // (string) is the topic closed for user additions? ‘yes’ or ‘no’.
  closedIconURL: '', // (string) Icon to display if forum is closed
});

export default Topic;
