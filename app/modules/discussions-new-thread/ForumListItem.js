import { Record, List } from 'immutable';

const ForumListItem = Record({
  forumIndex: undefined, // (int) Position in list (0, 1, 2, etc.)
  forumId: undefined, // (int) ID of the forum, numeric
  forumTitle: '', // (string) Title of the forum
  forumDesc: '', // (string) Description of the forum
  forumTopicList: new List(),
});

export default ForumListItem;
