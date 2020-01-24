// import React from 'react';
// import './styles.scss';
// import { IAboutSectionData } from 'app/modules/about/types';
// import SectionPanels from 'app/components/about/SectionPanels';
// import { useTranslation } from 'react-i18next';
// import PartnershipOpportunitiesSection from 'app/components/about/PartnershipOpportunitiesSection';
// import CenterColumn from 'app/components/common/CenterColumn';
// import CardsLayout from 'app/components/common/CardsLayout';
// import PartnerCard from 'app/components/about/PartnerCard';
// import StoryCard from 'app/components/about/StoryCard';
//
// type AboutSectionContentProps = {
//   sectionData: IAboutSectionData;
// };
//
// export const AboutSectionContent: React.FC<
//   AboutSectionContentProps
// > = props => {
//   const { sectionData } = props;
//   const { sectionTag, aboutSloohHeroImageUrl, sectionPanels } = sectionData;
//
//   return (
//     <div className="about-section-container container-fluid">
//       {hasAboutSloohPartners &&
//         Array.isArray(aboutSloohPartners.partnerLogoList) &&
//         aboutSloohPartners.partnerLogoList.length > 0 && (
//           <CenterColumn>
//             <div style={{ paddingBottom: '0px' }}>
//               <CardsLayout
//                 sectionHeading={aboutSloohPartners.sectionHeading}
//                 sectionHeading2={aboutSloohPartners.sectionHeading2}
//               >
//                 {aboutSloohPartners.partnerLogoList.map(image => (
//                   <PartnerCard image={image} />
//                 ))}
//               </CardsLayout>
//             </div>
//           </CenterColumn>
//         )}
//
//       {(params.aboutSloohSectionId === CAREERS_SECTION ||
//         params.aboutSloohSectionId === TEAM_SECTION ||
//         params.aboutSloohSectionId === ADVISORS_SECTION) && (
//         <SectionPanels disableReadMore list={sectionPanels} />
//       )}
//       {params.aboutSloohSectionId !== CAREERS_SECTION &&
//         params.aboutSloohSectionId !== TEAM_SECTION &&
//         params.aboutSloohSectionId !== ADVISORS_SECTION && (
//           <SectionPanels disableReadMore={false} list={sectionPanels} />
//         )}
//
//       <CenterColumn>
//         {hasAboutSloohNewsStories &&
//           Array.isArray(aboutSloohNewsStories.newsStoriesList) &&
//           aboutSloohNewsStories.newsStoriesList.length > 0 && (
//             <CardsLayout
//               sectionHeading={aboutSloohNewsStories.sectionHeading}
//               sectionHeading2={aboutSloohNewsStories.sectionHeading2}
//             >
//               {aboutSloohNewsStories.newsStoriesList.map(story => (
//                 <StoryCard story={story} />
//               ))}
//             </CardsLayout>
//           )}
//         {hasAboutSloohStore && (
//           <CardsLayout
//             sectionHeading={aboutSloohStore.sectionHeading}
//             sectionHeading2={aboutSloohStore.sectionHeading2}
//           >
//             <a
//               href={aboutSloohStore.linkUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <img
//                 src={aboutSloohStore.imageUrl}
//                 alt="Store"
//                 className="store-banner"
//               />
//             </a>
//           </CardsLayout>
//         )}
//       </CenterColumn>
//     </div>
//   );
// };
