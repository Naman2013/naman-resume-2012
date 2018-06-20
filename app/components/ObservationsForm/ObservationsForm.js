/***********************************
* V4 Observation form for editing
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';
import { customModalStyles } from 'styles/mixins/utilities';
import { darkGray, gray } from 'styles/variables/colors';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class ObservationsForm extends Component {
  static propTypes = {
    customerImageId: oneOfType([number, string]).isRequired,
    observationTitle: string,
    observationLog: string,
    saveLabel: string,
    scheduledMissionId: oneOfType([number, string]).isRequired,
    user: shape({
      at: oneOfType([number, string]).isRequired,
      token: oneOfType([number, string]).isRequired,
      cid: oneOfType([number, string]).isRequired,
    }).isRequired,

  }

  static defaultProps = {
    saveLabel: '',
    observationLog: '',
    observationTitle: '',
  };

  state = {
    title: this.props.observationTitle || '',
    observation: this.props.observationLog || '',
    showPrompt: false,
    promptText: '',
  };

  componentWillReceiveProps(nextProps) {
    let title = this.state.observationTitle;
    let observation = this.state.observationLog;
    if (nextProps.observationTitle !== this.state.observationTitle) {
      title = nextProps.observationTitle;
    }
    if (nextProps.observationLog !== this.state.observationLog) {
      observation = nextProps.observationLog;
    }

    this.setState({
      title,
      observation,
    });
  }

  onTitleChange = (e) => {
    e.preventDefault();

    this.setState({
      title: e.target.value,
    });
  }

  onObservationChange = (e) => {
    e.preventDefault();

    this.setState({
      observation: e.target.value,
    });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const {
      customerImageId,
      scheduledMissionId,
      user,
    } = this.props;
    const { title, observation } = this.state;
    if (!title || !observation) {
      window.alert('You are missing a required field.')
    } else {
      axios.post('/api/images/setObservationTags', {
        title,
        text: observation,
        scheduledMissionId,
        customerImageId,
        at: user.at,
        token: user.token,
        cid: user.cid,
      }).then((res) => {
        if (!res.data.apiError) {
          axios.post('/api/images/shareMemberPicture', {
            scheduledMissionId,
            at: user.at,
            token: user.token,
            cid: user.cid,
          }).then((shareRes) => {
            this.setState({
              title: '',
              observation: '',
              showPrompt: shareRes.data.showSharePrompt,
              promptText: shareRes.data.sharePrompt,
            })
          });
        }
      })
    }
  }

  closeModal = (e) => {
    this.setState({
      showPrompt: false,
    });
  }

  render() {
    const {
      saveLabel,
    } = this.props;
    const {
      title,
      observation,
      showPrompt,
      promptText,
    } = this.state;


    return (<div className="root">
      <form>
        <div>
          <span className="inspire">Inspire the Slooh Community:</span>
          <span className="write">Write Your Observation</span>
        </div>
        <span className="obs-form-required">*required</span>
        <input
          type="text"
          value={title}
          onChange={this.onTitleChange}
          placeholder={'Title Your Entry'}
          className="obs-form-input"
        />
        <span className="obs-form-required">*required</span>
        <textarea
          placeholder={'Tell us something interesting and earn Gravity!'}
          value={observation}
          onChange={this.onObservationChange}
          className="obs-form-textarea"
        />
        <button
          onClick={this.onSubmitForm}
          dangerouslySetInnerHTML={{ __html: saveLabel}}
          className="obs-form-button"
        />
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
      <style jsx>{`

        .root {
          font-family: ${primaryFont};
          color: ${darkGray};
          margin: 25px;
          padding: 50px;
          -moz-box-shadow: 0 2px 4px 0 ${gray};
           -webkit-box-shadow: 0 2px 4px 0 ${gray};
           box-shadow: 0 2px 4px 0 ${gray};
           width: 100%;
        }

        .inspire {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
        }
        .write {
          display: block;
          font-weight: bold;
          font-size: 20px;
          text-transform: uppercase;
        }
        .obs-form-required {
          display: block;
          padding-top: 15px;
        }
        .obs-form-input {
          display: block;
          width: 100%;
          padding-bottom: 15px;
        }
        .obs-form-textarea {
          display: block;
          width: 100%;
        }
        .obs-form-button {
          display: block;
          border: 1px dotted ${darkGray};
          border-radius: 100px;
          width: 110px;
          margin: 15px 0;
          font-size: 11px;
          font-weight: bold;
          padding: 5px 0;
          text-transform: uppercase;
        }
        .fa-close {
          position: absolute;
          top: 5px;
          right: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>);
  }
}

export default ObservationsForm;
