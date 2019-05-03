import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import { intlShape, injectIntl } from 'react-intl';
import { customModalStyles } from 'app/styles/mixins/utilities';
import styles from './ObservationsForm.style';
import messages from './ObservationsForm.messages';
import './styles.scss';

const { bool, number, oneOfType, shape, string } = PropTypes;

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

  state = { title: '', observation: '' };

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
      actions: { setObservationTags },
      customerImageId,
      scheduledMissionId,
      intl,
      observationTagsError,
    } = this.props;
    const { title, observation } = this.state;
    if (!title || !observation) {
      window.alert(intl.formatMessage(messages.MissingRequired));
    } else {
      setObservationTags(
        customerImageId,
        scheduledMissionId,
        title,
        observation
      );
      this.setState(() => ({ title: '', observation: '' }));
    }
  };

  closeModal = e => {
    this.setState({
      showPrompt: false,
    });
  };

  render() {
    const { title, observation, showPrompt, promptText } = this.state;

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
            className="observation-control"
          />
          <textarea
            placeholder="Tell us something interesting and earn Gravity!"
            value={observation}
            onChange={this.onObservationChange}
            className="observation-control"
          />

          <div className="text-right">
            <Button className="ml-3" onClick={this.onSubmitForm}>
              Submit
            </Button>
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
