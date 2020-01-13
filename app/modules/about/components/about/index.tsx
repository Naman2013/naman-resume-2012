import React from 'react';
import './styles.scss';
import { IAboutData } from 'app/modules/about/types';
import PageHeader from 'app/components/common/PageHeader';
import Navigation from 'app/components/about/Navigation';
import AboutSection from 'app/modules/about/containers/about-section';

type AboutProps = {
  getAboutData: Function;
  aboutData: IAboutData;
  location: Record<string, any>;
  params: Record<string, any>;
};

export class About extends React.PureComponent<AboutProps> {
  componentDidMount(): void {
    const { getAboutData } = this.props;

    getAboutData();
  }

  render() {
    const { aboutData, location, params } = this.props;
    const { aboutSloohSectionId } = params;
    const {
      aboutSloohSectionsList,
      aboutSloohIconUrl,
      aboutSloohPageHeading1,
    } = aboutData;
    const { pathname } = location;

    return (
      <div className="about-slooh">
        <PageHeader icon={aboutSloohIconUrl} title={aboutSloohPageHeading1} />

        <Navigation
          aboutSloohSectionsList={aboutSloohSectionsList || []}
          locationPath={pathname}
        />

        <div className="container">
          <AboutSection
            key={`about-slooh-section-${aboutSloohSectionId}`}
            sectionTag={aboutSloohSectionId}
          />
        </div>
      </div>
    );
  }
}
