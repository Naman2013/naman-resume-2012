import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import { intlShape, injectIntl } from 'react-intl';
import { customModalStyles } from 'app/styles/mixins/utilities';
import styles from './ObservationsForm.style';
import messages from './ObservationsForm.messages';
import './styles.scss';

const { arrayOf, bool, number, oneOfType, shape, string } = PropTypes;

class ObservationsForm extends Component {
  static propTypes = {
    customerImageId: oneOfType([number, string]).isRequired,
    observationTitle: string,
    observationLog: string,
    saveLabel: string,
    canShareFlag: bool,
    scheduledMissionId: oneOfType([number, string]).isRequired,
    user: shape({
      at: oneOfType([number, string]).isRequired,
      token: oneOfType([number, string]).isRequired,
      cid: oneOfType([number, string]).isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    saveLabel: '',
    observationLog: '',
    observationTitle: '',
    canShareFlag: true,
  };

  state = {
    title: this.props.observationTitle || '',
    observation: this.props.observationLog || '',
    showPrompt: false,
    promptText: '',
    saveLabelText: this.props.saveLabel,
    allowShare: this.props.canShareFlag,
  };

  componentWillReceiveProps(nextProps) {
    let title = this.state.observationTitle;
    let observation = this.state.observationLog;
    let { allowShare } = this.state;
    let { saveLabelText } = this.state;

    if (nextProps.observationTitle !== this.state.observationTitle) {
      title = nextProps.observationTitle;
    }
    if (nextProps.observationLog !== this.state.observationLog) {
      observation = nextProps.observationLog;
    }

    if (nextProps.canShareFlag !== this.state.allowShare) {
      allowShare = nextProps.canShareFlag;
    }

    if (nextProps.saveLabel !== this.state.saveLabelText) {
      saveLabelText = nextProps.saveLabel;
    }

    this.setState({
      title,
      observation,
      allowShare,
      saveLabelText,
    });
  }

  onTitleChange = e => {
    e.preventDefault();

    this.setState({
      title: e.target.value,
    });
  };

  onObservationChange = e => {
    e.preventDefault();

    this.setState({
      observation: e.target.value,
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const {
      actions,
      customerImageId,
      scheduledMissionId,
      user,
      intl,
    } = this.props;
    const { title, observation } = this.state;
    if (!title || !observation) {
      window.alert(intl.formatMessage(messages.MissingRequired));
    } else {
      axios
        .post('/api/images/setObservationTags', {
          title,
          text: observation,
          scheduledMissionId,
          customerImageId,
          at: user.at,
          token: user.token,
          cid: user.cid,
        })
        .then(res => {
          if (!res.data.apiError && this.state.allowShare) {
            axios
              .post('/api/images/shareMemberPicture', {
                customerImageId,
                at: user.at,
                token: user.token,
                cid: user.cid,
              })
              .then(shareRes => {
                this.setState({
                  showPrompt: shareRes.data.showSharePrompt,
                  promptText: shareRes.data.sharePrompt,
                  allowShare: false,
                  saveLabelText: 'Save',
                });
              });
          }

          actions.validateResponseAccess(res);
        });
    }
  };

  closeModal = e => {
    this.setState({
      showPrompt: false,
    });
  };

  render() {
    const {
      title,
      observation,
      showPrompt,
      promptText,
      saveLabelText,
    } = this.state;

    return (
      <div className="root observations-form">
        <form className="root-form">
          <div className="header">
            <span className="icon-person">
              <span className="path1" />
              <span className="path2" />
              <span className="path3" />
              <span className="path4" />
            </span>
            <span className="write h3-custom">Write Your Observation</span>
          </div>

          <h2 className="h2-bigger">
            Earn Gravity, and Inspire the Slooh Community!
          </h2>
          <p className="p-19">
            Nam dapibus nisl vitae elit fringie lla rutrum. Aenean sollicitudin
            do erat a massa estibulum sed metus in lorem tristique lorem dolar.
          </p>
          <input
            type="text"
            value={title}
            onChange={this.onTitleChange}
            placeholder="Title Your Entry"
            className="obs-form-input"
          />
          <textarea
            placeholder="Tell us something interesting and earn Gravity!"
            value={observation}
            onChange={this.onObservationChange}
            className="obs-form-textarea"
          />

          <div className="text-right">
            <Button onClickEvent={this.onSubmitForm}>{saveLabelText}</Button>
            <Button className="ml-3">Submit</Button>
          </div>
        </form>
        <Modal
          ariaHideApp={false}
          isOpen={showPrompt}
          style={customModalStyles}
          contentLabel="Observation Form"
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          {promptText}
        </Modal>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(ObservationsForm);
