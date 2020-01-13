import React from 'react';
import { IAboutSectionData, IAboutSubMenuItems } from 'app/modules/about/types';
import CenterColumn from 'app/components/common/CenterColumn';
import { Tab, Nav } from 'react-bootstrap';
import { AboutSectionContent } from 'app/modules/about/components/about-section-content';
import './styles.scss';

type AboutSectionProps = {
  sectionData: IAboutSectionData;
  subSectionData: IAboutSectionData;
  sectionTag: string;
  getSectionData: Function;
  getSubSectionData: Function;
};

export class AboutSection extends React.PureComponent<AboutSectionProps> {
  componentDidMount(): void {
    this.getSectionData();
  }

  getSectionData = (): void => {
    const { getSectionData, sectionTag } = this.props;

    if (sectionTag) {
      getSectionData({
        sectionTag,
      });
    }
  };

  getSubSectionData = (sectionTag: string): void => {
    const { getSubSectionData } = this.props;

    getSubSectionData({
      sectionTag,
    });
  };

  getSectionTag = (subMenuItems: Array<IAboutSubMenuItems>): string =>
    subMenuItems[0].linkUrl;

  render() {
    const { sectionData, subSectionData } = this.props;
    const { subMenuCount, subMenuItems } = sectionData;

    return (
      <div className="about-slooh-section">
        {subMenuCount ? (
          <>
            <CenterColumn>
              <Tab.Container
                defaultActiveKey={this.getSectionTag(subMenuItems)}
                id="tabs"
                unmountOnExit
                mountOnEnter
                onSelect={(key: string): void =>
                  this.getSubSectionData(key.substr(key.lastIndexOf('/') + 1))
                }
              >
                <Nav variant="tabs">
                  {subMenuItems.map(({ title, linkUrl }) => (
                    <Nav.Item>
                      <Nav.Link eventKey={linkUrl}>{title}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Tab.Container>
            </CenterColumn>

            <AboutSectionContent sectionData={subSectionData} />
          </>
        ) : (
          <AboutSectionContent sectionData={sectionData} />
        )}
      </div>
    );
  }
}
