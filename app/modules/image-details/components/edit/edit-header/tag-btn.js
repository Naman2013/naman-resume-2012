import { Spinner } from 'app/components/spinner/index';
import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const didMount = props => () => {
  const { getTags, customerImageId } = props;
  getTags({ customerImageId });
};

export const TagBtn = props => {
  const { tagList, tagsFetching } = props;

  const [isTagsOpen, setTagsOpen] = useState(false);

  useEffect(didMount(props), []);

  const [tagVal, setTagVal] = useState('');

  const submitTag = evt => {
    evt.preventDefault();
    const { setTag, customerImageId } = props;
    setTag({
      text: tagVal,
      customerImageId,
    });
    // clear form
    setTagVal('');
  };

  return (
    <BtnWithPopover
      isOpen={isTagsOpen}
      setOpen={setTagsOpen}
      className="ml-2"
      tooltip="Label"
      icon={<span className="icon-label" />}
      popover={
        <div className="tags-popover">
          <Spinner loading={tagsFetching} />
          <form noValidate onSubmit={submitTag}>
            <input
              type="text"
              className="observation-control observation-control-sm"
              placeholder="Add tags to this image"
              onChange={evt => setTagVal(evt.target.value)}
              value={tagVal}
            />
          </form>
          <hr />

          <div className="tag-list">
            {tagList.map(tag => (
              <Button block key={tag.tagIndex}>
                {tag.tagText}
              </Button>
            ))}
          </div>
        </div>
      }
    />
  );
};
