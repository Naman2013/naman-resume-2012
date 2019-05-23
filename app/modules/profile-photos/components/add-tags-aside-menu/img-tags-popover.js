// @flow

import { Spinner } from 'app/components/spinner/index';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import useOnClickOutside from 'use-onclickoutside';
import './img-tags-popover.scss';

type TImgTagsPopover = {
  hide: Function,
};

const didMount = props => () => {
  const { getTags, customerImageId } = props;
  getTags({ customerImageId });
};

export const ImgTagsPopover = (props: TImgTagsPopover) => {
  const { hide, tagList, isFetching } = props;

  const ref = React.useRef(null);
  useOnClickOutside(ref, hide);

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
    <div className="img-tags-popover  animated fadeIn faster" ref={ref}>
      <Spinner loading={isFetching} />
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
        {!isFetching && !tagList.length && <span>no tags</span>}
        {!isFetching &&
          tagList.map(tag => (
            <Tooltip title="Click to remove" arrow distance={0} position="top">
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
  );
};
