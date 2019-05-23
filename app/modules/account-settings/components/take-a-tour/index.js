import React, { PureComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ObjectRelatedTile from 'app/containers/object-details/ObjectRelatedTile';
import GuideTile from 'app/components/common/tiles/guide-tile';
import './styles.scss';

class TakeATour extends PureComponent {
  componentDidMount() {
    const { getDashboardPopupInfo } = this.props;
    getDashboardPopupInfo();
  }

  getGuideInfo = data => {
    return {
      title: data.title,
      subTitle: data.subTitle,
      description: data.guideDescription,
      excerpt: '',
      linkLabel: data.linkLabel,
      linkUrl: data.linkUrl,
      additionalContent: '',
      hasLink: !!data.linkUrl,
      showDescription: true,
      showExcerpt: '',
      showMobileAdditionalContent: '',
    };
  };

  render() {
    const { dashboardPopupInfo } = this.props;
    if (!dashboardPopupInfo) return null;
    const { popupData } = dashboardPopupInfo;
    if (!popupData) return null;
    const { relatedGuide } = popupData;
    if (!relatedGuide) return null;
    const guide = this.getGuideInfo(relatedGuide);

    return (
      <div className="take-a-tour">
        <Container>
          <Row className="orientation-block">
            <ObjectRelatedTile
              {...guide}
              showMobileAdditionalContent
              additionalContent={
                <GuideTile
                  title={guide.title}
                  subTitle={guide.subTitle}
                  linkUrl={guide.linkUrl}
                  linkLabel={guide.linkLabel}
                />
              }
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export { TakeATour };
