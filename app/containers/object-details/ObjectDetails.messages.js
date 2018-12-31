import { defineMessages } from 'react-intl';
import { type Messages } from '../../utils/i18n/MessageDescriptor';

const messages: Messages = {
  UpcomingMissions: {
    id: 'Objects.UpcomingMissions',
    defaultMessage: 'Upcoming Missions',
    description: 'Objects Upcoming Missions',
  },
  NoMissions: {
    id: 'Objects.NoMissions',
    defaultMessage: 'Sorry, there are no missions available for {objectTitle} at this time.',
    description: 'Objects no Missions messages',
  },
  Observations: {
    id: 'Objects.Observations',
    defaultMessage: 'Observations',
    description: 'Objects Observations',
  },
  NoObservations: {
    id: 'Objects.NoObservations',
    defaultMessage: 'Sorry, there are no images available for {objectTitle} at this time.',
    description: 'Objects no Observations messages',
  },
  FeaturedObservation: {
    id: 'Objects.FeaturedObservation',
    defaultMessage: 'Featured observation',
    description: 'Objects Featured observation',
  },
  CommunityObservation: {
    id: 'Objects.CommunityObservation',
    defaultMessage: 'Community Observation',
    description: 'Objects Community Observation',
  },
  MVPAstronomers: {
    id: 'Objects.MVPAstronomers',
    defaultMessage: 'MVP Astronomers',
    description: 'Objects MVP Astronomers',
  },
  MostActive: {
    id: 'Objects.MostActive',
    defaultMessage: 'Most Active on {objectTitle}',
    description: 'Objects MostActive on object',
  },
  ViewSpecialist: {
    id: 'Objects.ViewSpecialist',
    defaultMessage: 'View Specialist',
    description: 'Objects View Specialist',
  },
  RelatedQuests: {
    id: 'Objects.RelatedQuests',
    defaultMessage: 'Related Quests',
    description: 'Objects Related Quests',
  },
  NoSpecialists: {
    id: 'Objects.NoSpecialists',
    defaultMessage: 'Sorry, there are no specialists for {objectTitle} available at this time.',
    description: 'Objects no specialists message',
  },
  NoQuests: {
    id: 'Objects.NoQuests',
    defaultMessage: 'Sorry, there are no quests available for {objectTitle} at this time.',
    description: 'Objects no quests message',
  },
  RelatedShows: {
    id: 'Objects.RelatedShows',
    defaultMessage: 'Related Shows',
    description: 'Objects Related Shows',
  },
  NoShows: {
    id: 'Objects.NoShows',
    defaultMessage: 'Sorry, there are no shows available for {objectTitle} at this time.',
    description: 'Objects no shows message',
  },
  RelatedStories: {
    id: 'Objects.RelatedStories',
    defaultMessage: 'Related Stories',
    description: 'Objects Related Stories',
  },
  NoStories: {
    id: 'Objects.NoStories',
    defaultMessage: 'Sorry, there are no stories available for {objectTitle} at this time.',
    description: 'Objects no stories message',
  },
};

const definedMessages: typeof messages = defineMessages(messages);

export default definedMessages;
