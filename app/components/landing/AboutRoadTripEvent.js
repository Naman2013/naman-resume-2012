import React from 'react';
import style from './AboutRoadTripEvent.scss';

const hosts = [
  {
    firstName: 'Gerry',
    lastName: 'Monteux',
    photoUrl: 'assets/images/roadtrip-lander/host1.jpg',
  }, {
    firstName: 'Paul',
    lastName: 'Cox',
    photoUrl: 'assets/images/roadtrip-lander/host2.jpg',
  }, {
    firstName: 'Eric',
    lastName: 'Edelman',
    photoUrl: 'assets/images/roadtrip-lander/host3.jpg',
  }, {
    firstName: 'Helen',
    lastName: 'Avery',
    photoUrl: 'assets/images/roadtrip-lander/host4.jpg',
  },
];

function AboutRoadTripEvent() {
  return (
    <div className={style.aboutRoadTripEventWrapper}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.eclipseIcon} />
        </div>
        <div className={`${style.description} ${style.firstDescription}`}>
          Solar eclipses occur when the Moon’s orbit passes directly between the Earth and the Sun, obscuring part or all of the solar disk. There are several types of solar eclipses, including annular and partial eclipses (when the Moon only obscures a portion of the Sun), and the incredible sight of a Total Solar Eclipse. While the Sun is actually about 400 times larger in diameter than the Moon, the Moon is also about 400 times closer than the Sun. Therefore, the Sun and the Moon appear to be about the same size in our sky, and that’s why they’re able to fit right on top of each other.
        </div>
        <div className={style.inner}>
          <div className={style.leftSide}>
            <div className={style.roadTripHeader}>
              About Our
              <br />
              Road Trip Event
            </div>
            <div className={style.description}>
              <p>In years past, Slooh has traveled around the world - to Kenya, the Faroe Islands, and Indonesia - to bring our community of space enthusiasts live views of total solar eclipses. This year is no different. We’re packing up the Space Situation Room and heading to the Idaho Rocky Mountain Ranch in Stanley, Idaho, one of the first towns situated directly in the path of totality. From there we’ll be using some of the most advanced equipment available to bring you up-close views of the eclipse live as it happens, with commentary and perspective from the world’s leading experts in solar eclipses.</p>
              <p>In honor of what is expected to be the celestial event of the century, we’ll be hosting a 3-day long festival celebrating all things Sun and Moon. Starting Friday, Aug 18th and running until Tuesday Aug 22nd, we’re inviting all Slooh members to join us in Stanley, Idaho for a weekend of fun, science, music, and more at the Elk Creek Campground. And the best part? It’s completely free to all members of Slooh.com!</p>
              <p>You’ll get to experience the Transcontinental Eclipse the way it was meant to be seen. The Elk Creek Campground lies directly on the line of totality, giving you over two minutes of complete solar blackout. And because we’ll be surrounded by the Rocky Mountains, the skies are expected to be virtually cloudless, giving you an unimpeded view of this once-in-a-lifetime event.
              </p>
            </div>
          </div>
          <div className={style.rightSide}>
            <div className={style.listWrapper}>
              <div className={style.listHeader}>Road Trip Hosts</div>
              <ul className={style.hostList}>
                {hosts.map((host, i) => {
                  return (
                    <li key={`host_${i}`} className={style.host}>
                      <img src={host.photoUrl} alt="host" />
                      <div className={style.hostInfo}>
                        <div className={style.name}>
                          <span>{host.firstName}</span>
                          <span>{host.lastName}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutRoadTripEvent;
