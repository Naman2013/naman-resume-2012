import React from 'react';
import './styles.scss';
import { Modal } from 'app/components/modal';
import { Button } from 'react-bootstrap';
import { IDeleteInvitationResponse } from 'app/modules/quests/types.ts';

type TDeleteInvitationModalProps = {
  onHide: Function;
  show: boolean;
  goBackText: string;
  deleteInvitationResponse: IDeleteInvitationResponse;
  deleteInvitation: Function;
};

export const MissionPhotosCard: React.FC<
  TDeleteInvitationModalProps
> = props => {
  const { onHide, show, deleteInvitationResponse, deleteInvitation } = props;

  const {
    confirmationText,
    confirmButtonText,
    cancelButtonText,
  } = deleteInvitationResponse;

  return (
    <Modal
      show={show}
      onHide={onHide}
      goBackText="GO BACK"
      disableGoBack={false}
    >
      <div className="delete-invitation">
        <div className="delete-invitation__title">{confirmationText}</div>
        <br />
        <div className="delete-invitation__action">
          <Button
            onClick={() => {
              deleteInvitation();
            }}
            className="modal-btn"
          >
            {confirmButtonText}
          </Button>
          <Button
            onClick={() => {
              onHide();
            }}
            className="modal-btn"
          >
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
