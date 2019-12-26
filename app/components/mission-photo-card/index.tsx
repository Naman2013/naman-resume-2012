import React from 'react';
import './styles.scss';

type TMissionPhotoCard = {
  imageCard: any;
};

export const MissionPhotoCard: React.FC<TMissionPhotoCard> = props => {
  const { imageCard } = props;
  const { missionOwner } = imageCard;

  return <div className="fffffffff">{missionOwner}</div>;
};
