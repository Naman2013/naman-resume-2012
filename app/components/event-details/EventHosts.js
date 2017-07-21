import React from 'react';
import PropTypes from 'prop-types';
import s from './EventHosts.scss';

const { array } = PropTypes;

function EventHosts({ hosts }) {
  return (
    <article className={s.eventHostsContainer}>
      <section className={s.eventHostsTitle}>
        <h2>Your Hosts</h2>
      </section>
      {hosts.map((host, i) => {
        const inlineSpeakerImageStyle = {
          backgroundImage: `url(${host.hostPhotoURL})`
        };
        return (
          <section
            className={`${s.eventHostsItem} row`}
            key={`${i}-${host.hostName}`}
          >
            <div className="col-xs-4">
              <div style={inlineSpeakerImageStyle} className={`${s.eventHostsItemImage}`} />
            </div>

            <div className={`${s.eventHostsItemInfo} col-xs-8`}>
              <h4 className={s.eventHostsItemTitle}>
                {
                  host.hostURL ?
                    <a href={host.hostURL} dangerouslySetInnerHTML={{ __html: host.hostName }} /> :
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
