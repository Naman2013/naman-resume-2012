import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ShareButtonsPopover } from 'app/modules/clubs/components/share-buttons-popover';
import './styles.scss';
import cx from 'classnames';
import { Select } from 'app/components/common/select';

type TClubListMenuProps = {
  show?: boolean;
  getProfileGroupList: (data: any) => Promise<any>;
  shareMemberPicture: (data: any) => Promise<any>;
  openSuccessShareableImageModal: (data: any) => Promise<any>;
  customerImageId: number;
  profileGroupList: any;
  shareMemberPhotoData: any;
};

const openClubListMenuModal = (
  toggleShareMenu: Function,
  isShareMenuOpen: boolean,
  getProfileGroupList: Function
) => {
  if (!isShareMenuOpen) {
    getProfileGroupList({ callSource: 'shareObservation' });
  }

  toggleShareMenu(!isShareMenuOpen);
};

const handleChange = (
  selectedOption: any,
  shareMemberPicture: Function,
  customerImageId: number,
  setSelectedOption: Function,
  openSuccessShareableImageModal: Function,
  toggleShareMenu: Function
) => {
  setSelectedOption(selectedOption);

  shareMemberPicture({
    customerImageId,
    discussionGroupId: selectedOption,
  });
  toggleShareMenu(false);
  openSuccessShareableImageModal();
};
export const ClubListPopover: React.FC<TClubListMenuProps> = React.memo(
  props => {
    const [isShareMenuOpen, toggleShareMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const {
      show,
      getProfileGroupList,
      shareMemberPicture,
      customerImageId,
      profileGroupList,
      openSuccessShareableImageModal,
    } = props;

    return (
      show && (
        <div className="club-list-popover">
          <Button
            onClick={() =>
              openClubListMenuModal(
                toggleShareMenu,
                isShareMenuOpen,
                getProfileGroupList
              )
            }
            className={cx({ 'circle-close-btn': isShareMenuOpen })}
          >
            {!isShareMenuOpen ? (
              <span>Share</span>
            ) : (
              <i className="menu-icon-close icon-close" />
            )}
          </Button>

          <ShareButtonsPopover isOpen={isShareMenuOpen}>
            {isShareMenuOpen && (
              <div className="share-clubs-menu">
                <Select
                  handleChange={(selectedOption: number) =>
                    handleChange(
                      selectedOption,
                      shareMemberPicture,
                      customerImageId,
                      setSelectedOption,
                      toggleShareMenu,
                      openSuccessShareableImageModal
                    )
                  }
                  options={profileGroupList}
                  placeholder="CHOOSE"
                  value={selectedOption}
                />
              </div>
            )}
          </ShareButtonsPopover>
        </div>
      )
    );
  }
);
