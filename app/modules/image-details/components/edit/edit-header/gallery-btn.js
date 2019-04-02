import { Select } from 'app/components/common/select';
import { Spinner } from 'app/components/spinner/index';
import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';

const didMount = props => () => {
  const { getGalleries, customerImageId } = props;
  getGalleries({ customerImageId });
};

export const GalleryBtn = props => {
  const { galleryList, galleriesFetching } = props;

  const [isOpen, setOpen] = useState(false);

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
      isOpen={isOpen}
      setOpen={setOpen}
      className="ml-2 gallery-btn"
      tooltip="Plus"
      icon={<span className="icon-plus" />}
      popoverHeader="ADD IMAGE TO GALLERY"
      popover={
        <div className="gallery-popover">
          <Spinner loading={galleriesFetching} />
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" block>
              Add to existing gallery
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {galleryList.map(gallery => (
                <Dropdown.Item key={gallery.galleryId}>
                  {gallery.title}
                </Dropdown.Item>
              ))}
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button block>
            Create new Gallery
            <span className="icon-plus float-right" />
          </Button>
        </div>
      }
    />
  );
};
