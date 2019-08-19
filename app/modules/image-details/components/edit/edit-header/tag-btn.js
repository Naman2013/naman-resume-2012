import { Spinner } from 'app/components/spinner/index';
import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';

const didMount = props => () => {
  const { getTags, objectId } = props;
  getTags({ objectId });
};

export const TagBtn = props => {
  const { tagList, tagsFetching, placeholder } = props;

  const [isTagsOpen, setTagsOpen] = useState(false);

  useEffect(didMount(props), []);

  const [tagVal, setTagVal] = useState('');

  const submitTag = evt => {
    evt.preventDefault();
    const { setTag, objectId } = props;
    setTag({
      text: tagVal,
      objectId,
    });
    // clear form
    setTagVal('');
  };

  const deleteTag = text => {
    const { deleteTag, objectId } = props;
    deleteTag({
      text,
      objectId,
    });
  };

  return (
    <BtnWithPopover
      isOpen={isTagsOpen}
      setOpen={setTagsOpen}
      className="ml-2"
      tooltip="Tags"
      icon={<span className="icon-label" />}
      popover={
        <div className="tags-popover">
          <Spinner loading={tagsFetching} />
          <form noValidate onSubmit={submitTag}>
            <input
              type="text"
              className="observation-control observation-control-sm"
              placeholder={placeholder}
              onChange={evt => setTagVal(evt.target.value)}
              value={tagVal}
            />
          </form>
          <hr />

          <div className="tag-list">
            {tagList.map(tag => (
              <Tooltip
                title="Click to remove"
                arrow
                distance={0}
                position="top"
              >
                <Button
                  size="sm"
                  block
                  key={tag.tagIndex}
                  onClick={() => deleteTag(tag.tagText)}
                >
                  {tag.tagText}
                  <span className="icon-close float-right" />
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>
      }
    />
  );
};
