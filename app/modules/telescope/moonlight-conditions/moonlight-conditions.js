import React, { useEffect, memo, useState } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import GenericButton from '../../../components/common/style/buttons/Button';
import { ModuleContainer } from '../components/old';

import './moonlight-conditions.scss';

export const MoonlightWidget = memo(function MoonlightWidget(props) {
  const [title, setTitle] = useState('');
  const [relatedGuideUrl, setGuideUrl] = useState('');
  const [subwidgets, setSubwidgets] = useState([]);

  useEffect(() => {
    const { widgetId, obsId } = props.moonlightWidget;
    axios
      .post('/api/widget/moonlightBar', {
        widgetUniqueId: widgetId,
        obsId,
      })
      .then(res => {
        setTitle(res.data.title);
        setSubwidgets(res.data.subwidgets);
        setGuideUrl(res.data.relatedGuideURL);
      });
  }, [props.moonlightWidget.widgetId]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ModuleContainer title={title}>
      <ul className="moonlight-conditions">
        {subwidgets.map(x => (
          <li className="moonlight-condition">
            <div>
              <h4 className="moonlight-title">{x.elementTitle}</h4>
              <p className="datum">{x.elementValue}</p>
            </div>
            <div className="object-coin">
              <img className="icon" src={x.elementImageURL} />
            </div>
          </li>
        ))}
      </ul>

      <div className="actions">
        <GenericButton
          theme={{ width: '100%' }}
          text="View our guide"
          onClickEvent={() => {
            browserHistory.push(relatedGuideUrl);
          }}
        />
      </div>
    </ModuleContainer>
  );
});
