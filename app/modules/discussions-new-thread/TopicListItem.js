import { Record } from 'immutable';

const TopicListItem = Record({
  topicIndex: undefined, // (int) Position in list (0, 1, 2, etc.)
  topicId: undefined, // (int) ID of the topic, numeric
  topicTitle: '', // (string) Title of the topic
  topicStatus: '', // (string) ‘draft’ or ‘publish’ Note that ‘draft’ is implemented as ‘private’ in bbPress
});

export default TopicListItem;
