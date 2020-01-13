import { createSelector } from 'reselect';

export const selectAbout = state => state.about;

export const makeAboutDataSelector = () =>
  createSelector(
    selectAbout,
    state => state.aboutData
  );

export const makeSectionDataSelector = () =>
  createSelector(
    selectAbout,
    state => state.sectionData
  );

export const makeSubSectionDataSelector = () =>
  createSelector(
    selectAbout,
    state => state.subSectionData
  );

export const makeActiveSubSectionSelector = () =>
  createSelector(
    selectAbout,
    state => state.acticeSubSection
  );
