import { Spinner } from 'app/components/spinner/index';
import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const fetchGalleryList = props => {
  const { getGalleries, customerImageId } = props;
  getGalleries({ customerImageId });
};

const didMount = props => () => {
  fetchGalleryList(props);
};

export const GalleryBtn = props => {
  const { galleryList, galleriesFetching } = props;

  const [isOpen, setOpen] = useState(false);
  const [isInput, switchInput] = useState(false);
  const [val, setVal] = useState('');

  useEffect(didMount(props), []);

  const addToGallery = galleryId => () => {
    const { addImageToGallery, customerImageId } = props;
    addImageToGallery(customerImageId, galleryId);
  };

  const submitGallery = evt => {
    evt.preventDefault();
    const { createGallery } = props;
    createGallery(val).then(() => {
      // refetch gallery list
      fetchGalleryList(props);
    });
    // clear form
    setVal('');
    switchInput(false);
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

          {/* SHOW BUTTON */}
          {!isInput && (
            <Button block style={{ marginTop: '5px' }} onClick={() => switchInput(true)}>
              Create new Gallery
              <span className="icon-plus float-right" />
            </Button>
          )}

          {/* SHOW INPUT */}
          {isInput && (
            <form noValidate onSubmit={submitGallery}>
              <input
                type="text"
                className="observation-control observation-control-sm"
                placeholder="Gallery name"
                onChange={evt => setVal(evt.target.value)}
                value={val}
                style={{ marginTop: '5px' }}
              />
            </form>
          )}
        </div>
      }
    />
  );
};
