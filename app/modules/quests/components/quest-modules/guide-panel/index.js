import TopicList from 'app/components/guides/TopicList';
import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import GuideTile from 'app/components/common/tiles/guide-tile';
import './styles.scss';

export class QuestModuleGuidePanel extends PureComponent {
  componentDidMount = () => {
    const { module, params, getQuestGuidePanel } = this.props;
    const { questId } = params;
    const { moduleId } = module;

    if (questId && moduleId) getQuestGuidePanel({ questId, moduleId });
  };

  render() {
    const { questGuidePanel, module } = this.props;
    const { moduleId } = module;
    const {
      title,
      subTitle,
      description,
      hasLink,
      linkUrl,
      linkLabel,
      tagline,
      imageLinkUrl,
      imageLabel,
      imageTitle,
      mobileSubTitle,
      mobileSubTitleLinkUrl,
    } = questGuidePanel[moduleId] || {};
    
    return (
      <div className="quest-guide-panel-module">
        <div className="guide-panel-content">
          <div className="guide-panel-info">
            <div
              className="guide-panel-title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div
              dangerouslySetInnerHTML={{ __html: subTitle }}
              className="guide-panel-subtitle"
            />
            <div
              className="guide-panel-description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {hasLink && (
              <Link to={linkUrl}>
                <Button className="guide-panel-guide-link">
                  <span>{linkLabel}</span>
                  <img
                    src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                    className="arrow-link"
                    alt=""
                  />
                </Button>
              </Link>
            )}
          </div>

          <div className="guide-panel-guide-card">
            <GuideTile
              title={imageLabel}
              subTitle={imageTitle}
              linkUrl={imageLinkUrl}
            />
          </div>

          <div
            className="guide-panel-tagline"
            dangerouslySetInnerHTML={{ __html: tagline }}
          />
        </div>

        <div className="guide-panel-mobile-content">
          <div
            className="guide-panel-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="guide-panel-subtitle">
            <span>{mobileSubTitle}</span>
            <Link to={mobileSubTitleLinkUrl}>
              <img
                className="arrow-link"
                src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
                alt=""
              />
            </Link>
          </div>
          <div
            className="guide-panel-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="guide-panel-guide-card">
            <GuideTile
              title={imageLabel}
              subTitle={imageTitle}
              linkUrl={imageLinkUrl}
            />
          </div>
          <div
            className="guide-panel-tagline"
            dangerouslySetInnerHTML={{ __html: tagline }}
          />
        </div>
      </div>
    );
  }
}
