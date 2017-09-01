import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class AsidePopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  /*
  <aside id="pop4" class="popup pointerleft" style="display:none">
      <article class="poptext">
          <p>Includes FITS files and 'piggybacking' on missions to capture images automatically</p>
      </article>

      <footer>
          Have Questions?
          <br>
          <a href="https://www.slooh.com/about/contact">Contact our support team</a>
      </footer>

      <div class="control-close-small">
        <i class="close" onclick="this.parentNode.parentNode.style.display = 'none';">
        </i>
      </div>
  </aside>
  */
  render() {
    const {  } = this.state;

    const {
      closePopup,
      popupText,
      contactLink,
      footerText,
      contactLinkText,
      popupOpen,
    } = this.props;

    const popRootClassnames = classnames('popup pointerleft', {
      hidden: !popupOpen,
    });

    return (
      <div className={popRootClassnames}>
        <article className="poptext">
          <p>
            {popupText}
          </p>
        </article>

        <footer>
          {footerText}
          <br />
          <a href={contactLink}>
            {contactLinkText}
          </a>
        </footer>

        <button
          className="btn-primary"
          onClick={closePopup}
        >
          Close
        </button>

        <style jsx>{`
          .popup {
            background-color: white;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            -ms-border-radius: 8px;
            border-radius: 8px;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2) !important;
            color: #557373;
            font-weight: 300;
            height: auto;
            left: 0;
            margin: 40px;
            position: absolute;
            text-align: left;
            top: 0;
            visibility: show;
            width: 210px;
            z-index: 9999;
          }

          .popup p {
            font-size: 11px;
            font-size: 0.91667rem;
            line-height: 1.4em;
          }

          .popup footer {
            border-top: solid 1px #b9d7d7;
            font-size: 12px;
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.1em;
            margin-top: 0;
            padding: 18px;
            text-align: center;
          }

          .popup.pointerleft:before {
            content: ' ';
            position: absolute;
            width: 0;
            height: 0;
            left: -23px;
            right: auto;
            top: 20px;
            bottom: auto;
            border: 12px solid;
            border-color: transparent white transparent transparent;
          }

          .poptext {
            padding: 18px;
            padding-bottom: 0;
            margin: 0;
          }

        `}</style>
      </div>
    );
  }


}


AsidePopup.defaultProps = {
  popupText: '',
  display: 'none',
  contactLink: 'https://www.slooh.com/about/contact',
  footerText: 'Have Questions?',
  contactLinkText: 'Contact our support team',
  popupOpen: false,
};

AsidePopup.propTypes = {
  closePopup: PropTypes.func,
  open: PropTypes.bool,
  popupOpen: PropTypes.bool,
  popupText: PropTypes.string,
  display: PropTypes.string,
  contactLink: PropTypes.string,
  footerText: PropTypes.string,
  contactLinkText: PropTypes.string,
};

export default AsidePopup;
