import React, { PropTypes } from 'react';
import DiscussionsListItem from './DiscussionsListItem';

const { array } = PropTypes;
const DiscussionsList = ({ discussions }) => (
  <div>
    {
      discussions.map((item) => {
        return (
          <DiscussionsListItem key={item.threadId} item={item} />
        );
      })
    }
  </div>
);

DiscussionsList.propTypes = {
};

export default DiscussionsList;
