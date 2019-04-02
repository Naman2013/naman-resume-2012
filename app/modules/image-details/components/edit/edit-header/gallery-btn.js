import { Select } from 'app/components/common/select';
import { Spinner } from 'app/components/spinner/index';
import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import { addImageToGallery } from 'app/modules/image-details/thunks';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';

const didMount = props => () => {
  const { getGalleries, customerImageId } = props;
  getGalleries({ customerImageId });
};

export const GalleryBtn = props => {
  const { galleryList, galleriesFetching } = props;
  console.log(galleriesFetching);

  const [isOpen, setOpen] = useState(false);

  useEffect(didMount(props), []);

  const addToGallery = galleryId => () => {
    const { addImageToGallery, customerImageId } = props;
    addImageToGallery(customerImageId, galleryId);
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
                <Dropdown.Item
                  key={gallery.galleryId}
                  onClick={addToGallery(gallery.galleryId)}
                >
                  {gallery.title}
                </Dropdown.Item>
              ))}
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
