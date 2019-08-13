import React from 'react';
import { MultiUploadImageItem } from 'app/modules/multi-upload-images/components/multi-upload-image-item';
import SloohSlider from 'app/components/common/Slider/Slider';
import { Spinner } from 'app/components/spinner/index';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import cn from 'classnames';
import './styles.scss';

const sliderConfig = Object.assign({}, defaultSliderConfiguration(), {
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
});

export const MultiUploadImageList = ({
  imageList,
  onDeleteImage,
  onAddImage,
  isLoading,
  useLoader = true,
}) => {
  const slideList = imageList.map((item, index) => ({
    render: () => (
      <MultiUploadImageItem image={item} onDeleteImage={onDeleteImage} />
    ),
  }));
  slideList.push({
    render: () => (
      <div onClick={onAddImage} className="add-button-container">
        ADD
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
      {useLoader && isLoading ? (
        <Spinner loading={isLoading} />
      ) : (
        <SloohSlider sliderConfig={sliderConfig} slideList={slideList} />
      )}
    </div>
  );
};
