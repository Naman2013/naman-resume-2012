import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ShareButtonsPopover } from 'app/components/share-buttons-popover';
import './styles.scss';
import cx from 'classnames';
import { Select } from 'app/components/common/select';
import { IProfileGroupList } from 'app/modules/profile-photos/types';

type TClubListMenuProps = {
  show?: boolean;
  getProfileGroupList: Function;
  shareMemberPicture: Function;
  openSuccessShareableImageModal: Function;
  customerImageId: number;
  profileGroupList: IProfileGroupList;
  disableShare: boolean;
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
  selectedOption: string,
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
      disableShare,
    } = props;   
    return (
      show && (
        <div className="club-list-popover">
          <Button
          disabled={disableShare}
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
                  handleChange={(selectedOption: string) =>
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
                  placeholder="Select a Club"
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
