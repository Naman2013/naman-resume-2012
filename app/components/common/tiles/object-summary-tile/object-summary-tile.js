import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'app/components/common/style/buttons/Button';
import { Link } from 'react-router';
import { plus, info } from 'app/styles/variables/iconURLs';

import Dots from 'atoms/icons/Dots';
import Close from 'atoms/icons/Close';
import FollowObjectButton from 'app/components/object-details/FollowObjectButton';
import style from './object-summary-tile.style';

const ObjectSummaryTile = props => (
  <div className="object-summary-tile-root">
    <h4 className="title">{props.objectTitle}</h4>

    <div className="vertical-line" style={{ height: '40px' }} />

    <div className="icon-border">
      <div className="icon-inner-ring">
        <img width="50%" height="50%" src={props.objectIconURL} />
      </div>
    </div>

    <div className="vertical-line" style={{ height: '40px' }} />
    <div className="horizontal-line" />

    <ul className="attribute-list">
      <li className="attribute">
        <img src={props.pointsList.iconList.objectTypeIconURL} />
        <p className="attribute-name">{props.pointsList.list.objectType}</p>
      </li>
      <li className="attribute">
        <img src={props.pointsList.iconList.domainIconURL} />
        <p className="attribute-name">{props.pointsList.list.domain}</p>
      </li>
      <li className="attribute">
        <img src={props.pointsList.iconList.constellationIconURL} />
        <p className="attribute-name">{props.pointsList.list.constellation}</p>
      </li>
    </ul>

    <ul className="action-list">
      <li>
        {props.objectId && (
          <FollowObjectButton
            objectId={props.objectId}
            user={props.user}
            followButtonText={props.followPrompt}
            followButtonIconURL={props.followActionIconUrl}
            width="100%"
            heigh={null}
          />
        )}
      </li>
      <li>
        <GenericButton icon={info} />
      </li>
      <li>
        <Link to={`/object-details/${props.objectId}`}>
          <img
            style={{ paddingLeft: '15px' }}
            src="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
          />
        </Link>
      </li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

export { ObjectSummaryTile };
