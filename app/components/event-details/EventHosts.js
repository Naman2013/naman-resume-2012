import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './EventHosts.scss';

const { array } = PropTypes;

function EventHosts({ hosts }) {
  return (
    <article className={s.eventHostsContainer}>
      <section className={s.eventHostsTitle}>
        <h2>Your Hosts</h2>
      </section>
      {hosts.map((host, i) => {
        return (
          <section
            className={`${s.eventHostsItem} row`}
            key={`${i}-${host.hostName}`}
          >
            <div className="col-md-4">
              <img className={s.eventHostsItemImage} src={host.hostPhotoURL} />
            </div>
            <div className={`${s.eventHostsItemInfo} col-md-8`}>
              <h4 className={s.eventHostsItemTitle}>
                {
                  host.hostURL ?
                  <Link to={host.hostURL} dangerouslySetInnerHTML={{ __html: host.hostName }} /> :
                  <span dangerouslySetInnerHTML={{ __html: host.hostName }} />
                }
              </h4>
              <div className={s.eventHostsItemDescription} dangerouslySetInnerHTML={{ __html: host.hostDesc }} />
            </div>
          </section>
        );
      })}
    </article>
  );
}

EventHosts.defaultProps = {
  hosts: [],
};

EventHosts.propTypes = {
  hosts: array,
}
export default EventHosts;
