import React from 'react';
import { useTranslation } from 'react-i18next';
import { browserHistory } from 'react-router';
import { primaryFont } from 'app/styles/variables/fonts';
import {
  romance,
  astronaut,
  golda,
} from 'app/styles/variables/colors_tiles_v4';
import Request from 'app/components/common/network/Request';
import { OBSERVATORIES_COMPACT } from 'app/services/observatories';
import Button from 'app/components/common/style/buttons/Button';
import { telescopeAstronaut } from 'app/styles/variables/iconURLs';
import BorderContainer from './partials/BorderedContainer';
import MenuList from './partials/MenuList';
import MenuTitleBar from './partials/MenuTitleBar';
import TELESCOPE_CONFIGURATION, {
  modelTelescopesFromObsList,
} from './telescopeConfiguration';
import { getUserInfo } from 'app/modules/User';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { flatten } from 'lodash';

const Telescopes = (props) => {
  const { token, at, cid } = getUserInfo();
  const { t } = useTranslation();
  const { observatoryList, user } = props;
  let obs_List;
  let TELESCOPES_ONLY;
  if(observatoryList!==undefined){
    obs_List=observatoryList.observatoryList;
    obs_List=obs_List.sort((a, b) => a.obsIndex > b.obsIndex ? 1 : -1);
    const telescopesByObservatory = obs_List.map(
      _observatory => _observatory.obsTelescopes
    );
    TELESCOPES_ONLY= flatten(telescopesByObservatory);
  }  
  
  return (
    // <Request
    //   serviceURL={OBSERVATORIES_COMPACT}
    //   method="GET"
    //   model={modelTelescopesFromObsList}
    //   callLink={props.isOpen}
    //   // requestBody={{ cid, at, token }}
    //   render={({
    //     fetchingContent,
    //     modeledResponses: { TELESCOPES_ONLY },
    //     serviceResponse: { observatoryList },
    //   }) => (
        <div className="root">
          <MenuTitleBar title={t('Telescopes.title')}>
            <div className="center-buttons">
              <Button
                text={t('Telescopes.setUp')}
                theme={{
                  display: 'inline-block',
                  textAlign: 'center',
                  marginRight: '15px',
                  width: '47%',
                  cursor: !user.isAuthorized ? 'unset' : 'pointer'
                }}
                onClickEvent={!user.isAuthorized ? null : () => browserHistory.push('/missions')}
              />
              <Button
                text={t('Telescopes.myPhotos')}
                theme={{
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '47%',
                  cursor: !user.isAuthorized ? 'unset' : 'pointer'
                }}
                onClickEvent={!user.isAuthorized ? null : () =>
                  browserHistory.push('/NewDashboard#photos')
                }
              />
            </div>
          </MenuTitleBar>
          {observatoryList && (
            <MenuList items={TELESCOPE_CONFIGURATION(TELESCOPES_ONLY, user)} />
          )}

          <style jsx>
            {`
              .root {
                color: ${astronaut};
                font-family: ${primaryFont};
              }

              .title {
                font-size: 14px;
                text-transform: uppercase;
              }

              .center-buttons {
                padding-top: 10px;
                display: flex;
                justify-content: space-between;
              }

              .action {
                border-radius: 5%;
                background: none;
                padding: 20px 40px;
                border: none;
                color: ${romance};
                background: ${astronaut};
              }

              .action:hover {
                background: ${golda};
              }
            `}
          </style>
        </div>
    //   )}
    // />
  );
};

Telescopes.propTypes = {};

const mapStateToProps=(state)=>({
  observatoryList: state.observatoryList.obsList,
  user: state.user  
})

export default compose(connect(mapStateToProps, null)) (Telescopes);
