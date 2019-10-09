import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import {withTranslation} from 'react-i18next';
import Modal from 'react-modal';
import { customModalStyles } from 'app/styles/mixins/utilities';
import styles from './ObservationsForm.style';
import './styles.scss';

const { bool, number, oneOfType, shape, string } = PropTypes;
@withTranslation
class ObservationsForm extends Component {
  static propTypes = {
    customerImageId: oneOfType([number, string]).isRequired,
    saveLabel: string,
    canShareFlag: bool,
    scheduledMissionId: oneOfType([number, string]).isRequired,
    user: shape({
      at: oneOfType([number, string]).isRequired,
      token: oneOfType([number, string]).isRequired,
      cid: oneOfType([number, string]).isRequired,
    }).isRequired,

  };

  static defaultProps = {
    saveLabel: '',
    canShareFlag: true,
  };

  state = { showPrompt: false, promptText: '' };

  onTitleChange = e => {
    const { onTitleChange } = this.props;
    onTitleChange(e.target.value);
  };

  onObservationChange = e => {
    const { onObservationChange } = this.props;
    onObservationChange(e.target.value);
  };

  onSubmitForm = e => {
    e.preventDefault();
    const {
      actions: { setObservationTags },
      customerImageId,
      scheduledMissionId,
      t,
      title,
      observation,
    } = this.props;
    if (!title || !observation) {
      window.alert(t('Alerts.MissingRequired'));
    } else {
      setObservationTags(
        customerImageId,
        scheduledMissionId,
        title,
        observation
      ).then(() => {
        this.setState({
          showPrompt: true,
          promptText: 'Saved!',
        });
        setTimeout(() => {
          this.closeModal();
        }, 3000);
      });
      this.setState(() => ({ title: '', observation: '' }));
    }
  };

  closeModal = () => {
    const {
      refetchData,
      onSave,
      onTitleChange,
      onObservationChange,
    } = this.props;
    this.setState({
      showPrompt: false,
    });
    refetchData().then(onSave);
    onTitleChange('');
    onObservationChange('');
  };

  render() {
    const { title, observation } = this.props;
    const { showPrompt, promptText } = this.state;

    return (
      <div className="root observations-form" id="img-details-obs-form">
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
            Share your observation with the community and tell them what makes
            it special.
          </p>
          <input
            type="text"
            value={title}
            onChange={this.onTitleChange}
            placeholder="Title Your Entry"
            className="observation-control"
          />
          <textarea
            placeholder="Tell us something interesting and informative."
            value={observation}
            onChange={this.onObservationChange}
            className="observation-control"
          />

          <div className="text-right">
            <Button className="ml-3" onClick={this.onSubmitForm}>
              Save
            </Button>
          </div>
        </form>
        <Modal
          ariaHideApp={false}
          isOpen={showPrompt}
          style={{
            ...customModalStyles,
            content: { ...customModalStyles.content, maxWidth: '350px' },
          }}
          contentLabel="Observation Form"
          onRequestClose={this.closeModal}
        >
          <div className="dismiss" onClick={this.closeModal}>
            <span className="fa fa-close" />
          </div>
          {promptText}
        </Modal>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ObservationsForm;
