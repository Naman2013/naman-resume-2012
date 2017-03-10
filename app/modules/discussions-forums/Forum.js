import { Record } from 'immutable';

const Forum = Record({
  title: '', // (string) Forum’s title
  forumId: undefined, // (integer) ‘post’ ID of the forum
  topicCount: 0, // (integer) Number of topics under this forum
  replyCount: 0, // (integer) Number of replies in the forum.
  creationDate: '', // Date forum was created
  modified: '', // Date forum was last modified.
  closedFlag:	'', // (string) Is the forum closed for user additions? ‘yes’ or ‘no’.
  closedIconURL: '', // (string) Icon to display if forum is closed
});

export default Forum;
