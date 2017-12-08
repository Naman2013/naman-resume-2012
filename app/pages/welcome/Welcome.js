import React from 'react';
import { black } from '../../styles/variables/colors';

/* include Welcome components */
import {ExploreSpace,
        LiveTelescopes,
        SocialInteraction,
        HumanWisdom,
        NetworkEffect,
        WelcomeToSlooh} from '../../components/welcome';


function Welcome() {
  return (
    <div className="welcome-container">
      ExploreSpace
      LiveTelescopes
      SocialInteraction
      HumanWisdom
      NetworkEffect
      WelcomeToSlooh
      <style jsx>{`
        .welcome-container {
          background-color: ${black};
        }
        `}</style>
    </div>
  );
}

export default Welcome;
