import React, { useEffect } from 'react';
import './styles.scss';
import { IAboutSectionData } from 'app/modules/about/types';
import CenterColumn from 'app/components/common/CenterColumn';
import { Tab, Nav } from 'react-bootstrap';
import { AboutSectionContent } from 'app/modules/about/components/about-section-content';

type AboutSectionProps = {
  sectionData: IAboutSectionData;
  subSectionData: IAboutSectionData;
  getSubSectionDataAction: Function;
};

export const AboutSection: React.FC<AboutSectionProps> = props => {
  const { sectionData, subSectionData, getSubSectionDataAction } = props;
  const { subMenuCount, subMenuItems } = sectionData;

  const getSubSectionFromServer = useCallback((url: string): void => {
    getSubSectionDataAction({
      sectionTag: url.substr(url.lastIndexOf('/') + 1),
    });
  });

  useEffect(() => {
    if (subMenuCount) {
      getSubSectionFromServer(subMenuItems[0].linkUrl);
    }
  }, [getSubSectionFromServer, subMenuCount, subMenuItems]);

  return (
    <div className="about-slooh-section">
      {subMenuCount ? (
        <>
          <CenterColumn>
            <Tab.Container
              defaultActiveKey={subMenuItems[0].linkUrl}
              id="tabs"
              unmountOnExit
              mountOnEnter
              onSelect={(key: string): void => getSubSectionFromServer(key)}
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
};
