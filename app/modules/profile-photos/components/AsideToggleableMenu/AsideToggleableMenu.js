/** *********************************
 * V4 AsideToggleableMenu
 ********************************* */

import { AddTagsAsideMenu } from 'app/modules/profile-photos/components/add-tags-aside-menu';
import React from 'react';
import PropTypes, { number } from 'prop-types';
import { useTranslation } from 'react-i18next';
import DeleteImage from 'app/components/my-pictures/actions/DeleteImageV4';
import AddToGallery from 'app/components/my-pictures/actions/AddToGalleryV4';
import RemoveGalleryImageBtn from 'app/modules/gallery-details/containers/remove-gallery-image';

import styles from './AsideToggleableMenu.style';

const AsideToggleableMenu = props => {
  const {
    visible,
    optionsList,
    toggleMenuVisibility,
    user,
    count,
    firstImageNumber,
    currentItem: { customerImageId },
    index,
    isDesktop,
    blockWidth,
    redirectToImage,
    downloadFile,
    mod,
    tagActions = {},
    tagsData = {},
    galleryId,
    typeGallery,
    newDash
  } = props;
  const { t } = useTranslation();
 
  return (
    <div
      className={mod ? `root ${mod}` : 'root'}
      style={{ width: newDash ? '80%' : visible ? '70%' : '0' }}
      onClick={e => e.stopPropagation()}
      role="presentation"
    >
      <div style={!visible ? { display: 'none' } : null} className="heading">
        {t('Photos.CardMenu.MenuTitle')}
        <i
          className="fa fa-close"
          aria-hidden="true"
          onClick={toggleMenuVisibility}
        />
      </div>

      <div className="options-list">
        {optionsList.map(option => {
          if (option.action === 'removeFromGallery') {
            return typeGallery ? (
              <div className="action-menu-container option">
                <div
                  className="remove-gallery-image"
                  style={!visible ? { display: 'none' } : null}
                >
                  <RemoveGalleryImageBtn
                    label={option.label}
                    galleryId={galleryId}
                    customerImageId={customerImageId}
                  />
                </div>
              </div>
            ) : null;
          }
          if (option.action === 'remove') {
            return (
              <DeleteImage
                key={option.label}
                customerImageId={customerImageId}
                user={user}
                maxImageCount={count}
                firstImageNumber={firstImageNumber}
                render={removeImage => (
                  <button
                    style={!visible ? { display: 'none' } : null}
                    onClick={removeImage}
                    className="option delete"
                  >
                    {option.label}
                  </button>
                )}
              />
            );
          }
          if (option.action === 'addToGallery') {
            return (
              <AddToGallery
                customerImageId={customerImageId}
                user={user}
                index={index}
                isDesktop={isDesktop}
                className="option"
                asideMenuWidth={blockWidth * 0.7}
                render={toggleMenu => (
                  <button
                    style={!visible ? { display: 'none' } : null}
                    onClick={toggleMenu}
                    className="option"
                  >
                    {option.label}
                  </button>
                )}
              />
            );
          }
          if (option.action === 'redirect') {
            return (
              <button
                style={!visible ? { display: 'none' } : null}
                onClick={redirectToImage()}
                className="option"
              >
                {option.label}
              </button>
            );
          }
          if (option.action === 'download') {
            return (
              <button
                style={!visible ? { display: 'none' } : null}
                onClick={downloadFile}
                className="option"
              >
                {option.label}
              </button>
            );
          }
          if (option.action === 'tagging') {
            const { tagList, isFetching } = tagsData;
            const { setTag, getTags, deleteTag } = tagActions;

            return (
              <button
                style={!visible ? { display: 'none' } : null}
                className="option flex-row-reverse"
              >
                <AddTagsAsideMenu
                  label={option.label}
                  tagList={tagList}
                  isFetching={isFetching}
                  setTag={setTag}
                  getTags={getTags}
                  deleteTag={deleteTag}
                  customerImageId={customerImageId}
                />
              </button>
            );
          }
          return (
            <button
              style={!visible ? { display: 'none' } : null}
              onClick={option.action}
              className="option"
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

const { bool, arrayOf, shape, string, func } = PropTypes;

AsideToggleableMenu.propTypes = {
  visible: bool.isRequired,
  optionsList: arrayOf(
    shape({
      label: string,
      action: func,
    })
  ),
  toggleMenuVisibility: func.isRequired,
  user: shape({}).isRequired,
  currentItem: shape({}).isRequired,
  count: number,
  firstImageNumber: number,
  index: number.isRequired,
  isDesktop: bool.isRequired,
  blockWidth: number.isRequired,
  redirectToImage: func,
};

AsideToggleableMenu.defaultProps = {
  optionsList: [],
  count: 9,
  firstImageNumber: 1,
};

export default AsideToggleableMenu;
