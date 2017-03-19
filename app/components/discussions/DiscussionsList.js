import React, { PropTypes } from 'react';
import DiscussionsListItem from './DiscussionsListItem';

const { arrayOf, number, shape } = PropTypes;
const DiscussionsList = ({ discussions }) => (
  <div>
    {
      discussions.map(item => (<DiscussionsListItem
        key={item.threadId}
        item={item}
      />),
      )
    }
  </div>
);

DiscussionsList.defaultProps = {
  discussions: [],
};
DiscussionsList.propTypes = {
  discussions: arrayOf(shape({
    threadId: number.isRequired,
  })),
};

export default DiscussionsList;
