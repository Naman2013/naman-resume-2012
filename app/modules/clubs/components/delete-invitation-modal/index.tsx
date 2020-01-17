import React from 'react';
import './styles.scss';
import { Modal } from 'app/components/modal';
import { Button } from 'react-bootstrap';
import {
  IDeleteInvitationResponse,
  IInvitationCustomerLinks,
} from 'app/modules/quests/types';

type TDeleteInvitationModalProps = {
  onHide: Function;
  show: boolean;
  goBackText: string;
  getGroupDeleteInvitation: () => void;
  groupDeleteInvitation: IDeleteInvitationResponse;
  deleteInvitation: (member: IInvitationCustomerLinks) => void;
  member: IInvitationCustomerLinks;
};

export default class DeleteInvitationModal extends React.PureComponent<
  TDeleteInvitationModalProps
> {
  componentDidMount(): void {
    const { getGroupDeleteInvitation } = this.props;
    getGroupDeleteInvitation();
  }

  render() {
    const {
      show,
      onHide,
      groupDeleteInvitation: {
        confirmationText,
        cancelButtonText,
        confirmButtonText,
        pageHeading1,
        pageHeading2,
      },
      member,
      deleteInvitation,
    } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        goBackText="GO BACK"
        disableGoBack={false}
      >
        <div className="delete-invitation">
          <h1 className="modal-h">{pageHeading1}</h1>
          <h3 className="modal-h3">{pageHeading2}</h3>
          <p className="modal-p">{confirmationText}</p>
          <div className="delete-invitation__action">
            <Button
              onClick={() => {
                deleteInvitation(member);
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
  }
}
