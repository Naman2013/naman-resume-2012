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
  deleteInvitation: (member: IInvitationCustomerLinks) => any;
  member: IInvitationCustomerLinks;
};

export default class DeleteInvitationModal extends React.PureComponent<
  TDeleteInvitationModalProps
> {
  componentDidMount(): void {
    const { getGroupDeleteInvitation } = this.props;
    getGroupDeleteInvitation();
  }

  confirmDeleteInvitation = () => {
    const { deleteInvitation, member, onHide } = this.props;
    deleteInvitation(member).then((response: any) => {
      const {
        payload: { statusMessage },
      } = response;
      onHide(statusMessage);
    });
  };

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
              onClick={this.confirmDeleteInvitation}
              className="modal-btn"
            >
              {confirmButtonText}
            </Button>
            <Button
              onClick={() => {
                onHide(null);
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
