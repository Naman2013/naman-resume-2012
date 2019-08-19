import React from 'react';
import { MultiUploadImageItem } from 'app/modules/multi-upload-images/components/multi-upload-image-item';
import SloohSlider from 'app/components/common/Slider/Slider';
import { Spinner } from 'app/components/spinner/index';
import Modal from 'react-modal';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import cn from 'classnames';
import './styles.scss';
import { customModalStylesFitContent } from 'app/styles/mixins/utilities';
import Btn from 'app/atoms/Btn';

export const MultiUploadImageList = ({
  imageList,
  onDeleteImage,
  onAddImage,
  isLoading,
  useLoader = true,
  slidesToShow = 4,
  mobileVisible = false,
  handleToggleModal,
}) => {
  const sliderConfig = Object.assign({}, defaultSliderConfiguration(), {
    slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
  });
  const slideList = imageList.map((item, index) => ({
    render: () => (
      <MultiUploadImageItem image={item} onDeleteImage={onDeleteImage} />
    ),
  }));
  slideList.push({
    render: () => (
      <div onClick={onAddImage} className="add-button-container">
        ADD PHOTOS
      </div>
    ),
  });
  return (
    <div
      className={cn(
        imageList.length >= sliderConfig.slidesToShow ? 'slider' : null,
        'multi-upload-image-list'
      )}
    >
      <div className="desktop">
        {useLoader && isLoading ? (
          <Spinner loading={isLoading} />
        ) : (
          <SloohSlider sliderConfig={sliderConfig} slideList={slideList} />
        )}
      </div>
      <div className={cn('mobile', mobileVisible ? 'visible' : null)}>
        <Modal
          className="multi-upload-image-modal"
          ariaHideApp={false}
          isOpen={mobileVisible}
          style={{
            content: { ...customModalStylesFitContent.content, border: 'none' },
            overlay: customModalStylesFitContent.overlay,
          }}
          onRequestClose={handleToggleModal}
        >
          <div className="upload-modal-header">
            <span onClick={handleToggleModal} className="back">
              <span className="icon icon-arrow-left"></span> BACK
            </span>
          </div>
          {isLoading ? (
            <Spinner loading={isLoading} />
          ) : (
            <div className="upload-modal-body">
              <div className="upload-modal-images">
                <div className="upload-modal-content-wrapper">
                  {!!imageList.length && (
                    <span className="upload-modal-title">
                      {imageList.length} Images
                    </span>
                  )}
                  {imageList.map(item => (
                    <MultiUploadImageItem
                      image={item}
                      onDeleteImage={onDeleteImage}
                    />
                  ))}
                  <Btn className="add-more-button" onClick={onAddImage}>
                    ADD MORE PHOTOS
                  </Btn>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};
