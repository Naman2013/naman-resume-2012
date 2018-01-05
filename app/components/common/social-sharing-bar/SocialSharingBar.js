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
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
} = ShareCounts;

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
      shareURL,
      shareTitle,
      shareHashTags,
      shareImageURL,
    } = this.props;

    /* FB wants the hashsymbol for each hashtag, twitter does not */
    const FB_hashtag = "";
    const TW_hashtags = [];

    return (
      <div className="social-share-outercontainer">
          <ul className={'social-share-innercontainer-' + this.props.contentLayout}>

              {this.props.showFaceBook && <li className={'social-share-button-' + this.props.contentLayout}>
                  <FacebookShareButton
                    url={shareImageURL}
                    quote={shareTitle}
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
                    title={shareTitle}
                    hashtags={TW_hashtags}>
                  <TwitterIcon
                      size={32}
                      round />
                  </TwitterShareButton>
                </li>
              }

              {this.props.showTelegram && <li className={'social-share-button-' + this.props.contentLayout}>
                  <TelegramShareButton
                    url={shareURL}
                    title={shareTitle}
                    className="social-share-button">
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </li>
              }

              {this.props.showWhatsApp && <WhatsappShareButton className={'social-share-button-' + this.props.contentLayout}
                  url={shareURL}
                  title={shareTitle}
                  separator=":: ">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              }

              {this.props.showGooglePlus && <li className={'social-share-button-' + this.props.contentLayout}>
                  <GooglePlusShareButton
                    url={shareURL}>
                    title={shareTitle}
                    <GooglePlusIcon
                      size={32}
                      round />
                  </GooglePlusShareButton>
                </li>
              }

              {this.props.showLinkedIn && <LinkedinShareButton className={'social-share-button-' + this.props.contentLayout}
                  url={shareURL}
                  title={shareTitle}
                  windowWidth={750}
                  windowHeight={600}>
                  <LinkedinIcon
                    size={32}
                    round />
                </LinkedinShareButton>
              }

              {this.props.showPinterest && <li className={'social-share-button-' + this.props.contentLayout}>
                  <PinterestShareButton
                    url={shareURL}
                    media={shareImageURL}
                    description={shareTitle}
                    windowWidth={1000}
                    windowHeight={730}>
                    <PinterestIcon size={32} round />
                  </PinterestShareButton>
                </li>
              }

              {this.props.showVK && <VKShareButton className={'social-share-button-' + this.props.contentLayout}
                  url={shareURL}
                  media={shareImageURL}
                  windowWidth={660}
                  windowHeight={460}>
                  <VKIcon
                    size={32}
                    round />
                </VKShareButton>
              }

              {this.props.showOK && <OKShareButton className={'social-share-button-' + this.props.contentLayout}
                  url={shareURL}
                  image={shareImageURL}
                  windowWidth={660}
                  windowHeight={460}>
                  <OKIcon
                    size={32}
                    round />
                </OKShareButton>
              }

              {this.props.showReddit && <li className={'social-share-button-' + this.props.contentLayout}>
                  <RedditShareButton
                    url={shareURL}
                    title={shareTitle}
                    windowWidth={660}
                    windowHeight={460}>
                    <RedditIcon
                      size={32}
                      round />
                  </RedditShareButton>
                </li>
              }

              {this.props.showTumblr && <TumblrShareButton className={'social-share-button-' + this.props.contentLayout}
                  url={shareURL}
                  title={shareTitle}
                  windowWidth={660}
                  windowHeight={460}>
                  <TumblrIcon
                    size={32}
                    round />
                </TumblrShareButton>
              }

              {this.props.showLiveJournal && <LivejournalShareButton className={'social-share-button-' + this.props.contentLayout}
                  url={shareURL}
                  title={shareTitle}
                  description={shareDescription}>
                  <LivejournalIcon size={32} round />
                </LivejournalShareButton>
              }

              {this.props.showMailru && <MailruShareButton className={'social-share-button-' + this.props.contentLayout}
                  url={shareURL}
                  title={shareTitle}>
                  <MailruIcon
                    size={32}
                    round />
                </MailruShareButton>
              }

              {this.props.showEmail && <EmailShareButton className={'social-share-button-' + this.props.contentLayout}
                  url={shareURL}
                  subject={shareTitle}
                  body="body">
                  <EmailIcon
                    size={32}
                    round />
                </EmailShareButton>
              }
        </ul>

        {this.props.showPostCounts &&
          <div className="Demo__some-network">
            <FacebookShareCount
              url={shareURL}
              className="social-share-count">
              {count => count}
            </FacebookShareCount>

            <GooglePlusShareCount
              url={shareURL}
              className="social-share-count">
              {count => count}
            </GooglePlusShareCount>

            <LinkedinShareCount
              url={shareURL}
              className="social-share-count">
              {count => count}
            </LinkedinShareCount>

            <PinterestShareCount
              url={shareURL}
              className="social-share-count" />

            <VKShareCount
              url={shareURL}
              className="social-share-count" />

            <OKShareCount
              url={shareURL}
              className="social-share-count" />

            <RedditShareCount
              url={shareURL}
              className="social-share-count" />

            <TumblrShareCount
              url={shareURL}
              className="social-share-count" />
          </div>
        }

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

            .social-share-count-outercontainer-horizontal {
              display: inline-block;
              min-width: 100px;
              list-style-type: none;
            }

            .social-share-count-outercontainer-vertical {
              display: block;
              list-style-type: none;
            }

            .social-share-count {
              margin-top: 3px;
              font-size: 12px;
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
