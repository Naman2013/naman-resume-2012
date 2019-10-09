import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { DeviceContext } from '../../providers/DeviceProvider';
import Button from '../common/style/buttons/Button';
import { envelope, phone } from '../../styles/variables/iconURLs';
import submitPartnershipForm from '../../services/about/submit-partnership-form';
import style from './PartnershipOpportunitiesSection.style';


const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    width: '400px',
    maxWidth: '650px',
    padding: '25px 25px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
};

const initialState = {
  fullName: '',
  emailAddress: '',
  message: '',
};

@withTranslation
class PartnershipOpportunitiesSection extends Component {
  state = {
    ...initialState,
    modalIsVissible: false,
    response: {},
  };

  handleNameInput = e => this.setState({ fullName: e.target.value });

  handleEmailInput = e => this.setState({ emailAddress: e.target.value });

  handleWriteUsInput = e => this.setState({ message: e.target.value });

  handleCancel = () => this.setState({ ...initialState });

  handleCloseModal = () => this.setState({ modalIsVissible: false });

  handleSubmit = () => {
    const { fullName, message, emailAddress } = this.state;
    submitPartnershipForm({
      fullName,
      message,
      emailAddress,
    }).then(response =>
      this.setState({
        ...initialState,
        response: response.data,
        modalIsVissible: true,
      })
    );
  };

  render() {
    const {
      fullName,
      message,
      emailAddress,
      modalIsVissible,
      response,
    } = this.state;

    const {
      data,
      t,
    } = this.props;
    const {
      sectionHeading,
      sectionHeading2,
      aboutSloohPressIconURL,
      infoHeading,
      infoEmailAddress,
      infoPhoneNumber,
      infoHeading2,
    } = data;
    return (
      <DeviceContext.Consumer>
        {({ isMobile }) => (
          <div className="root">
            <Modal
              isOpen={modalIsVissible}
              contentLabel="Bio"
              onRequestClose={this.handleCloseModal}
              style={customModalStyles}
            >
              <i
                className="fa fa-close"
                onClick={this.handleCloseModal}
                role="button"
              />
              <div className="modal-header">
                {response.success ? t('About.Success') : t('About.Error')}
              </div>
              <div className="modal-body">{response.statusMessage}</div>
            </Modal>
            <section className="form">
              <div className="header-info">
                <h1 dangerouslySetInnerHTML={{ __html: sectionHeading }} />
                <h2 dangerouslySetInnerHTML={{ __html: sectionHeading2 }} />
              </div>
              <div className="bottom-inputs">
                <div className="inputs-row">
                  <div className="name row-item">
                    <div className="input-label">{t('About.NameLabel')}</div>
                    <input
                      className="input common-input"
                      placeholder={t('About.NamePlaceholder')}
                      onChange={this.handleNameInput}
                      value={fullName}
                      type="text"
                    />
                  </div>
                  <div className="email row-item">
                    <div className="input-label">{t('About.EmailLabel')}</div>
                    <input
                      className="input common-input"
                      placeholder={t('About.EmailPlaceholder')}
                      onChange={this.handleEmailInput}
                      value={emailAddress}
                      type="text"
                    />
                  </div>
                </div>
                <textarea
                  className="text-area common-input"
                  onChange={this.handleWriteUsInput}
                  placeholder={t('About.MessagePlaceholder')}
                  rows="3"
                  value={message}
                />

                <div className="bottom-buttons">
                  <Button
                    text={t('About.Cancel')}
                    withIntl
                    onClickEvent={this.handleCancel}
                    theme={{
                      width: isMobile ? '80%' : '140px',
                      marginTop: isMobile ? '20px' : '0',
                    }}
                  />

                  <Button
                    text={t('About.Submit')}
                    withIntl
                    onClickEvent={this.handleSubmit}
                    theme={{
                      width: isMobile ? '80%' : '140px',
                      marginLeft: isMobile ? '0' : '10px',
                    }}
                  />
                </div>
              </div>
            </section>
            <section className="contacts">
              <div className="i-box-blue-tile pad-50 contact-header text-center">
                <div className="img-wrapper-shadow">
                  <img src={aboutSloohPressIconURL} alt="" />
                </div>
              </div>
              <div className="contact-data">
                <h2 className="contact-title">{infoHeading}</h2>
                <h2
                  className="contact-subtitle"
                  dangerouslySetInnerHTML={{ __html: infoHeading2 }}
                />
                <div className="contact-label">
                  <img src={phone} className="contact-label-icon" alt="phone" />
                  {infoPhoneNumber}
                </div>
                <div className="contact-label">
                  <img
                    src={envelope}
                    className="contact-label-icon"
                    alt="envelope"
                  />
                  {infoEmailAddress}
                </div>
              </div>
            </section>
            <style jsx>{style}</style>
          </div>
        )}
      </DeviceContext.Consumer>
    );
  }
}

PartnershipOpportunitiesSection.defaultProps = {};

export default PartnershipOpportunitiesSection;
