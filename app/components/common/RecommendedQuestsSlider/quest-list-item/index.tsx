import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import './styles.scss';

type TQuestListItemProps = {
  readOnly?: boolean;
  questDifficulty: string;
  title: string;
  iconUrl: string;
  hasLink: boolean;
  linkUrl: string;
};

export const QuestListItem: React.FC<TQuestListItemProps> = props => {
  const { questDifficulty, title, iconUrl, hasLink, linkUrl, readOnly } = props;
  const { t } = useTranslation();

  const QuestTile = (
    <>
      <div className="container">
        {/* <div className="blue-shield" /> */}
        <div className="icon-container">
          <img className="icon-content" alt="" src={iconUrl} />
        </div>
        <h5 className="title">{title}</h5>
        <h6 className="level">{questDifficulty}</h6>
      </div>
      <div className="quest-info">
        <div className="quest-info-item left">
          <span>{t('Dashboard.Slooh')}</span>
        </div>
        <div className="quest-info-item right">
          <span>{t('Dashboard.Quest')}</span>
        </div>
      </div>
    </>
  );
    
  return (
    <div className="quest-dashboard-list-item">
      {readOnly || !hasLink ? QuestTile : <Link to={linkUrl}>{QuestTile}</Link>}
    </div>
  );
};
