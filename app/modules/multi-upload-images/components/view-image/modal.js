import React from 'react';
import { Modal } from 'app/components/modal';
import './styles.scss';
import { Magnifier } from 'react-image-magnifiers';

export const ViewImageModal = ({
  showModal,
  onHide,
  images,
  onClickPrev,
  onClickNext,
  currentImageIndex,
}) => (
  <Modal
    show={showModal}
    onHide={onHide}
    customClass="view-uploaded-image-modal"
  >
    <div className="text-center">
      {images.length > 1 && (
        <button
          type="button"
          onClick={onClickPrev}
          disabled={currentImageIndex === 0}
          className="slick-arrow-btn slick-prev"
        />
      )}
      <div className="modal-img-wrapper">
        <div className="view-uploaded-image-title">
          {currentImageIndex + 1} OF {images.length}
        </div>

        <Magnifier
          className="modal-img"
          imageSrc={images[currentImageIndex]}
          onImageLoad={({
            currentTarget,
            currentTarget: { width, height, naturalWidth, naturalHeight },
          }) => {
            if (width < naturalWidth || height < naturalHeight) {
              currentTarget.parentNode.style.cursor = 'zoom-in';
            }
          }}
        />
      </div>
      {images.length > 1 && (
        <button
          type="button"
          onClick={onClickNext}
          disabled={currentImageIndex === images.length - 1}
          className="slick-arrow-btn slick-next"
        />
      )}
    </div>
  </Modal>
);
