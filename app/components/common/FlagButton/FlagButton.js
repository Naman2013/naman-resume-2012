/***********************************
 * V4 Flag Button
 *
 *
 *
 ***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import { flagItem } from 'app/services/discussions/flag';

import styles from './FlagButton.style';

class FlagButton extends Component {
  state = {
    isModalOpen: false,
    modalText: '',
  };

  flagItem = e => {
    const { user, flagParams } = this.props;
    e.preventDefault();
    flagItem({
      token: user.token,
      at: user.at,
      cid: user.cid,
      ...flagParams,
    }).then(res => {
      this.setState({
        isModalOpen: true,
        modalText: res.data.statusMessage,
      });
    });
  };

  closeModal = e => {
    e.preventDefault();
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen, modalText } = this.state;
    const { user } = this.props;
    if (!user) return null;
    return (
      <Fragment>
        <div>
          <button className="button-container" onClick={this.flagItem}>
            <span className="button-icon icon-flag" />
          </button>
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={isModalOpen}
          style={customModalStylesBlackOverlay}
          contentLabel="Flag"
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          <p className="" dangerouslySetInnerHTML={{ __html: modalText }} />
        </Modal>
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(FlagButton);
