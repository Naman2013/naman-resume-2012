import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

import exampleImage from '../../../../assets/icons/question-mark.png';

const {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');
const OKIcon = generateShareIcon('ok');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');
const TumblrIcon = generateShareIcon('tumblr');
const MailruIcon = generateShareIcon('mailru');
const EmailIcon = generateShareIcon('email');
const LivejournalIcon = generateShareIcon('livejournal');

class SocialSharingBar extends Component {
  render() {
    const {
      shareTitle,
      shareURL,
      shareImageURL,
      shareDescription,
      shareHashTags,
    } = this.props;

    /* FB wants the hashsymbol for each hashtag, twitter does not */
    const FB_hashtag = "";
    const TW_hashtags = [];

    /************************************************************************
    * Facebook:
    *    Requires the complete share url and an empty description as we don't want the description to duplicate.
    *       The resulting page must have Open Graph (OG) tagging
    *       Leverage sharepage.php to provide all of this information.
    *
    * Twitter:
    *   No photo
    *   Use the shareURL
    *
    * Pinterest:
    *   shareURL is used.
    *   shareImageURL is used.
    *   shareDescription is used.
    *
    * Reddit:
    ************************************************************************/

    return (
      <div className="social-share-outercontainer">
          <ul className={'social-share-innercontainer-' + this.props.contentLayout}>
              {this.props.showFaceBook && <li className={'social-share-button-' + this.props.contentLayout}>
                  <FacebookShareButton
                    url={shareURL}
                    quote=""
                    hashtag={FB_hashtag}>
                    <FacebookIcon
                      size={32}
                      round />
                  </FacebookShareButton>
                </li>
              }

              {this.props.showTwitter && <li className={'social-share-button-' + this.props.contentLayout}>
                  <TwitterShareButton
                    url={shareURL}
                    title=""
                    hashtags={TW_hashtags}>
                  <TwitterIcon
                      size={32}
                      round />
                  </TwitterShareButton>
                </li>
              }

              {this.props.showPinterest && <li className={'social-share-button-' + this.props.contentLayout}>
                  <PinterestShareButton
                    url={shareURL}
                    media={shareImageURL}
                    description={shareDescription}
                    windowWidth={1000}
                    windowHeight={730}>
                    <PinterestIcon size={32} round />
                  </PinterestShareButton>
                </li>
              }

              {this.props.showReddit && <li className={'social-share-button-' + this.props.contentLayout}>
                  <RedditShareButton
                    url={shareURL}
                    title={shareDescription}
                    windowWidth={660}
                    windowHeight={460}>
                    <RedditIcon
                      size={32}
                      round />
                  </RedditShareButton>
                </li>
              }

          </ul>

        <style jsx>{`
            .social-share-outercontainer {
              margin: 0;
              padding: 0;
            }

            .social-share-innercontainer-horizontal {
              list-style-type: none;
              min-width: 100px;
              display: inline-block;
              margin: 0;
              padding: 0;
            }

            .social-share-innercontainer-vertical {
              list-style-type: none;
              display: block;
              margin: 0;
              padding: 0;
            }

            .social-share-button-horizontal {
              display: inline-block;
              cursor: pointer;
              margin-right: 5px;
            }

            .social-share-button-vertical {
              display: block;
              cursor: pointer;
              margin-bottom: 5px;
            }

            .social-share-button:hover:not(:active) {
              opacity: 0.75;
            }
        `}</style>
      </div>
    );
  }
}

export default SocialSharingBar;

SocialSharingBar.defaultProps = {
  contentLayout: 'horizontal',
  showPostCounts: false,
  shareTitle: '',
  shareURL: '',
  shareHashTags: [],
  shareImageURL: '',
  shareDescription: '',
  showFaceBook: true,
  showTwitter: true,
  showTelegram: false,
  showWhatsApp: false,
  showGooglePlus: false,
  showLinkedIn: false,
  showPinterest: true,
  showVK: false,
  showOK: false,
  showReddit: true,
  showTumblr: false,
  showLiveJournal: false,
  showMailru: false,
  showEmail: false,
};

SocialSharingBar.propTypes = {
  contentLayout: PropTypes.string,
  showPostCounts: PropTypes.bool,
  shareTitle: PropTypes.string,
  shareURL: PropTypes.string,
  shareHashTags: PropTypes.array,
  shareImageURL: PropTypes.string,
  shareDescription: PropTypes.string,
  showFaceBook: PropTypes.bool,
  showTwitter: PropTypes.bool,
  showTelegram: PropTypes.bool,
  showWhatsApp: PropTypes.bool,
  showGooglePlus: PropTypes.bool,
  showLinkedIn: PropTypes.bool,
  showPinterest: PropTypes.bool,
  showVK: PropTypes.bool,
  showOK: PropTypes.bool,
  showReddit: PropTypes.bool,
  showTumblr: PropTypes.bool,
  showLiveJournal: PropTypes.bool,
  showMailru: PropTypes.bool,
  showEmail: PropTypes.bool,
};
