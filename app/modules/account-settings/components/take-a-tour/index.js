import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ObjectRelatedTile from '../../../../containers/object-details/ObjectRelatedTile';
import GuideTile from '../../../../components/common/tiles/guide-tile';
import './styles.scss';

const orientationGuide = {
  description:
    'Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it  tristique de ullam ecorpere pretium…',
  hasLink: true,
  iconUrl: '',
  imageLabel: 'A GUIDE TO',
  imageTitle: 'Slooh Apprentice',
  imageUrl: '',
  linkLabel: 'GO TO GUIDE',
  linkUrl: '',
  mobileSubTitle: 'A Guide to Slooh Apprentice Plan',
  show: true,
  subTitle: 'A Guide to Slooh Apprentice Plan',
  title: 'Check out this Orientation Guide',
};
export class TakeATour extends Component {
  render() {
    return (
      <div className="take-a-tour">
        <Container>
          <Row className="orientation-block">
            <ObjectRelatedTile
              {...orientationGuide}
              showMobileAdditionalContent
              additionalContent={
                <GuideTile
                  title={orientationGuide.imageLabel}
                  subTitle={orientationGuide.imageTitle}
                  linkUrl={orientationGuide.linkUrl}
                />
              }
            />
          </Row>
        </Container>
      </div>
    );
  }
}
