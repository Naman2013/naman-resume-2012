/***********************************
* V4 Request Group Form
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const {
  func,
} = PropTypes;

class RequestGroupForm extends Component {
  static propTypes = {
    closeForm: func.isRequired,
    submitForm: func.isRequired,
  }

  static defaultProps = {
  }

  state = {
    requestFormText: '',
    requestFormPrivacy: 'public',
  }


  onChangeRequestForm = (e) => {
    e.preventDefault();
    this.setState({
      requestFormText: e.target.value,
    });
  }

  changeFormPrivacy = (e) => {
    this.setState({
      requestFormPrivacy: e.target.value,
    });
  }

  submitRequestForm = (e) => {
    e.preventDefault();
    const { submitForm } = this.props;
    const {
      requestFormText,
      requestFormPrivacy
    } = this.state;

    submitForm({
      requestFormText,
      requestFormPrivacy
    });
  }


  render() {
    const {
      submitForm,
      closeForm,
    } = this.props;

    const {
      requestFormText,
      requestFormPrivacy,
    } = this.state;


    return (
      <form>
        <h2>Request a group</h2>
        <h4>Step 1: Define</h4>
        <textarea className="request-textarea" value={requestFormText} onChange={this.onChangeRequestForm} />
        <h4>Step 2: Privacy Settings</h4>
        <div className="privacy-settings">
          <label htmlFor="public-privacy">
            <input
              name="privacy"
              type="radio"
              id="public-privacy"
              value="public"
              checked={requestFormPrivacy === 'public'}
              onChange={this.changeFormPrivacy}
            />
            Public Group
          </label>
          <label htmlFor="private-privacy">
            <input
              name="privacy"
              type="radio"
              value="private"
              id="private-privacy"
              checked={requestFormPrivacy === 'private'}
              onChange={this.changeFormPrivacy}
            />
            Private Group
          </label>
        </div>
        <div>
          <button onClick={closeForm}>Cancel</button>
          <button onClick={e => this.submitRequestForm(e)}>Submit</button>
        </div>
        <style jsx>{`
          .privacy-settings {
            display: flex;
            flex-direction: row;
          }

          .request-textarea {
            height: 200px;
            width: 300px;
          }
        `}</style>
      </form>
    )
  }
}

export default RequestGroupForm;
