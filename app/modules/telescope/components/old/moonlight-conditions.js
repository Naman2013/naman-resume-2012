import React from 'react';
import { ModuleContainer } from './index';
import style from './moonlight-conditions.style';
import GenericButton from 'app/components/common/style/buttons/Button';

const MoonlightConditions = () => (
  <ModuleContainer title="Moonlight Conditions">
    <ul className="moonlight-conditions">
      <li className="moonlight-condition">
        <div>
          <h4 className="moonlight-title">Lunar phase:</h4>
          <p className="datum">New 1%</p>
        </div>
        <div className="object-coin" />
      </li>

      <li className="moonlight-condition">
        <div>
          <h4 className="moonlight-title">Lunar Altitude:</h4>
          <p className="datum">Lorem Ipsum</p>
        </div>
        <div className="object-coin" />
      </li>
    </ul>

    <div className="actions">
      <GenericButton
        theme={{ width: '100%' }}
        text="View our guide"
        onClickEvent={() => {
         
        }}
      />
    </div>

    <style jsx>{style}</style>
  </ModuleContainer>
);

export { MoonlightConditions };
