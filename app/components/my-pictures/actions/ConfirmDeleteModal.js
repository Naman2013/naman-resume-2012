import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { white, black, pink } from '../../../styles/variables/colors';
import { secondaryFont, primaryFont } from '../../../styles/variables/fonts';

const {
  func,
  string,
} = PropTypes;

class DeleteGallery extends Component {

  static propTypes = {
    buttonClass: string,
    confirmText: string,
    buttonHoverText: string,
    removeAction: func.isRequired,
  };
  static defaultProps = {
    buttonClass: 'fa-close',
    buttonHoverText: 'Remove',
    confirmText: 'Are you sure you want to remove this?'
  };

  state = {
    confirmModalIsOpen: false,
  };

  showModal = (e, bool) => {
    e.preventDefault();
    this.setState({
      confirmModalIsOpen: bool,
    });
  }

  render() {
    const { confirmText, removeAction, buttonClass, buttonHoverText } = this.props;
    const { confirmModalIsOpen } = this.state;
    const customModalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '650px',
        padding: '50px 25px',
        fontFamily: primaryFont,
      },
      overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0)'
      }
    };

    return (
      <div>
        <button className="action" onClick={e => this.showModal(e, true)}>
          <span className={`fa ${buttonClass}`} />
          <div className="action-description">{buttonHoverText}</div>
        </button>
        <Modal
          style={customModalStyles}
          isOpen={confirmModalIsOpen}
          contentLabel="Remove Confirm"
          onRequestClose={e => this.showModal(e, false)}
        >
          <i className="fa close-modal" onClick={e => this.showModal(e, false)} />
          <div dangerouslySetInnerHTML={{ __html: confirmText }} />
          <div className="button-container">
            <button className="button-action button-cancel" onClick={e => this.showModal(e, false)}>
              Cancel
            </button>
            <button className="button-action button-confirm" onClick={removeAction}>
              Yes
            </button>
          </div>
        </Modal>
        <style jsx>{`
          .button-container {
            float: right;
          }
          .button-action {
            height: 40px;
            line-height: 40px;
            width: 50px;
            font-size: 13px;
            display:  inline-block;
            text-align: center;
            margin: 0 10px;
            border: none;
            border-radius: 0;
            text-decoration: none;
          }
          .button-cancel {
            background-color: ${white};
            color: ${black};
          }
          .button-confirm {
            background-color: ${white};
            color: ${pink};
          }
          .close-modal {
            position: absolute;
            top: 5px;
            right: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default DeleteGallery;
