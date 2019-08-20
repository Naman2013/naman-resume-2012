import React from 'react';
import { Modal } from 'app/components/modal';
import './styles.scss';

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
      {!!(images.length > 1) && (
        <button
          onClick={onClickPrev}
          disabled={currentImageIndex === 0}
          className="slick-arrow-btn slick-prev"
        ></button>
      )}
      <div className="modal-img-wrapper">
        <div className="view-uploaded-image-title">
          {currentImageIndex + 1} OF {images.length}
        </div>
        <div
          className="modal-img"
          style={{ backgroundImage: `url("${images[currentImageIndex]}")` }}
        />
      </div>
      {!!(images.length > 1) && (
        <button
          onClick={onClickNext}
          disabled={currentImageIndex === images.length - 1}
          className="slick-arrow-btn slick-next"
        ></button>
      )}
    </div>
  </Modal>
);
