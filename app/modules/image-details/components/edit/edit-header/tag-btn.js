import { Spinner } from 'app/components/spinner/index';
import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';

const didMount = props => () => {
  const { getTags, customerImageId } = props;
  getTags({ customerImageId });
};

export const TagBtn = props => {
  const { tagList, tagsFetching, fullSize, placeholder } = props;

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

  const deleteTag = text => {
    const { deleteTag, customerImageId } = props;
    deleteTag({
      text,
      customerImageId,
    });
  };

  return (
    <BtnWithPopover
      fullSize={fullSize}
      isOpen={isTagsOpen}
      setOpen={setTagsOpen}
      className={fullSize ? 'ml-2 plain' : 'ml-2'}
      tooltip="Label"
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
