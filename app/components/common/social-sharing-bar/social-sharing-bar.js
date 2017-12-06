import React, { Component } from 'react';
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
    const socialSharingInlineStyle = {
      display: 'block',
      minWidth: '300px',
    }

    const shareUrl = 'http://www.slooh.com/abc';
    const title = 'Slooh: The December 2017 Supermoon!';

    /* FB wants the hashsymbol for each hashtag, twitter does not */
    const FB_hashtag = "#supermoonchallenge";
    const TW_hashtags = ['supermoonchallenge'];

    return (
      <div className="Demo__some-network">
          <div className="Demo__some-network">
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                hashtag={FB_hashtag}
                className="Demo__some-network__share-button">
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                title={title}
                hashtags={TW_hashtags}
                className="Demo__some-network__share-button">
                <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>

              <TelegramShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button">
                <TelegramIcon size={32} round />
              </TelegramShareButton>

              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="Demo__some-network__share-button">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <GooglePlusShareButton
                url={shareUrl}
                className="Demo__some-network__share-button">
                <GooglePlusIcon
                  size={32}
                  round />
              </GooglePlusShareButton>

              <LinkedinShareButton
                url={shareUrl}
                title={title}
                windowWidth={750}
                windowHeight={600}
                className="Demo__some-network__share-button">
                <LinkedinIcon
                  size={32}
                  round />
              </LinkedinShareButton>

              <PinterestShareButton
                url={String(window.location)}
                media={`${String(window.location)}/${exampleImage}`}
                windowWidth={1000}
                windowHeight={730}
                className="Demo__some-network__share-button">
                <PinterestIcon size={32} round />
              </PinterestShareButton>

              <VKShareButton
                url={shareUrl}
                image={`${String(window.location)}/${exampleImage}`}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button">
                <VKIcon
                  size={32}
                  round />
              </VKShareButton>

              <OKShareButton
                url={shareUrl}
                image={`${String(window.location)}/${exampleImage}`}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button">
                <OKIcon
                  size={32}
                  round />
              </OKShareButton>

              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button">
                <RedditIcon
                  size={32}
                  round />
              </RedditShareButton>

              <TumblrShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button">
                <TumblrIcon
                  size={32}
                  round />
              </TumblrShareButton>

              <LivejournalShareButton
                url={shareUrl}
                title={title}
                description={shareUrl}
                className="Demo__some-network__share-button"
              >
                <LivejournalIcon size={32} round />
              </LivejournalShareButton>

              <MailruShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button">
                <MailruIcon
                  size={32}
                  round />
              </MailruShareButton>

              <EmailShareButton
                url={shareUrl}
                subject={title}
                body="body"
                className="Demo__some-network__share-button">
                <EmailIcon
                  size={32}
                  round />
              </EmailShareButton>
        </div>

        <div className="Demo__some-network">
          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </FacebookShareCount>

          <GooglePlusShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </GooglePlusShareCount>

          <LinkedinShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </LinkedinShareCount>

          <PinterestShareCount url={shareUrl}
            className="Demo__some-network__share-count" />

          <VKShareCount url={shareUrl}
            className="Demo__some-network__share-count" />

          <OKShareCount url={shareUrl}
            className="Demo__some-network__share-count" />

          <RedditShareCount url={shareUrl}
            className="Demo__some-network__share-count" />

          <TumblrShareCount url={shareUrl}
            className="Demo__some-network__share-count" />
        </div>

        <style jsx>{`
            .Demo__some-network {
              position: relative;
              vertical-align: top;
              display: inline-block;
              margin-right: 30px;
              text-align: center;
            }

            .Demo__some-network__share-count {
              margin-top: 3px;
              font-size: 12px;
            }

            .Demo__some-network__share-button {
              cursor: pointer;
            }

            .Demo__some-network__share-button:hover:not(:active) {
              opacity: 0.75;
            }
        `}</style>
      </div>
    );
  }
}

export default SocialSharingBar;
