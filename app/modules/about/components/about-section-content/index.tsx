import React from 'react';
import './styles.scss';
import { IAboutSectionData } from 'app/modules/about/types';

const ABOUT_SLOOH_SECTION = 'about-slooh';
const SPONSOR_OPPORTUNITIES_SECTION = 'about-slooh-sponsor';
const CAREERS_SECTION = 'about-slooh-careers';
const TEAM_SECTION = 'about-slooh-team';
const ADVISORS_SECTION = 'about-slooh-advisors';

type AboutSectionContentProps = {
  sectionData: IAboutSectionData;
};

export const AboutSectionContent: React.FC<
  AboutSectionContentProps
> = props => {
  const { sectionData } = props;

  return (
    <div className="about-slooh-section-content">
      about-slooh-section-content
    </div>
  );
};
