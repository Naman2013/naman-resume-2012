import React, { Fragment } from 'react';
import { ObsBotWidget, TelescopeDetail, ObservatoryInformation } from './index';
import style from './tab-telescope.style';

const TabTelescope = props => {
  const {
    currentInstrument: {
      instrRelatedGuideUrl,
      instrAbout,
      instrTelescopeType,
      instrTelescopeShortName,
    },
    currentTelescope: { teleName, teleHasNeoView },
    currentObservatory: { obsShortName, obsHeroURL },
    allObservatoryTelescopeStatus: { clockList },
  } = props;
  

  return (
    <Fragment>
      {teleHasNeoView && (
        <div className="module-container">
          <ObsBotWidget {...props} ViewGroup="scopes" />
        </div>
      )}
      <div className="module-container">
        <TelescopeDetail
          teleName={teleName}
          obsHeroURL={obsHeroURL}
          instrAbout={instrAbout}
          obsShortName={obsShortName}
          instrTelescopeType={instrTelescopeType}
          instrTelescopeShortName={instrTelescopeShortName}
          instrRelatedGuideUrl={instrRelatedGuideUrl}
        />
      </div>
      <div className="module-container">
        <ObservatoryInformation clockList={clockList} />
      </div>
      <style jsx>{style}</style>
    </Fragment>
  );
};

export { TabTelescope };
