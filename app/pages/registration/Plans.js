import React from 'react';

const Plans = () => (
  <div className="registration plans">
    <article className="page">

      <header className="page">
        <h1 className="sloohlogo">
          <img src="assets/images/logos/sloohlogos/Logo-Slooh-White-C.svg" alt="Slooh" />
        </h1>
        <h1>Welcome [Name] <br /> Get the most out of slooh</h1>
        <h2>Choose a plan that&apos;s best for you.</h2>
      </header>

      <section className="row-xxwide">
        <article className="plan col-fourth">
          <header className="move-down">
            <div className="spotlight-icon">
              <img alt="Jupiter icon" className="" src="assets/icons/jupiter.svg" />
            </div>
          </header>
          <article className="backdrop dark text-center padding-med">
            <h3>Slooh Crew</h3>
            <p className="text-large">Free</p>
            <p>Your Current Plan</p>
            <div className="margin-top-med margin-bottom-large">
              Welcome to the
              <br />Slooh Community
            </div>

            <ul className="features">
              <li>Public Shows</li>
              <li className="not">Telescopes</li>
              <li>Take Occasional Pictures</li>
              <li>Community</li>
              <li className="not">Reservations</li>
              <li className="not">Objects: Most Popular</li>
              <li>Video On Demand: Featured</li>
            </ul>
          </article>

          <footer>
            <button className="btn-primary continue">Continue Free</button>
          </footer>
        </article>

        <article className="plan col-fourth">
          <header className="move-down">
            <div className="spotlight-icon">
              <img alt="Astronaut icon" src="../assets/icons/astronaut.svg" width="70%" />
            </div>
          </header>

          <article className="backdrop dark text-center padding-med">
            <h3>Apprentice</h3>
            <p className="text-large price"><sup>$</sup>4.95</p>
            <p className="margin-large">Monthly | USD</p>
            <div className="margin-top-med margin-bottom-large">
              30 Day free trial
              <br />if you act now<i className="icon control info-white">info</i>
            </div>
            <ul className="features">
              <li>Public Shows</li>
              <li>Telescopes</li>
              <li>Take Pictures</li>
              <li>Community</li>
              <li>5 Reservations <small>monthly</small> <i className="icon control info-white">info</i></li>
              <li>Objects: Most Popular</li>
              <li>Video On Demand: All</li>
            </ul>
          </article>

          <footer>
            <button className="btn-primary continue">Continue Free</button>
          </footer>
        </article>

        <article className="plan col-fourth">
          <header className="move-down">
            <div className="spotlight-icon">
              <img alt="Galaxy icon" src="assets/icons/galaxy.svg" />
            </div>
          </header>

          <article className="dark backdrop text-center padding-med">
            <h3 className="margin-top-med">Astronmer</h3>
            <p className="text-large price"><sup>$</sup>24.95</p>
            <p>Monthly | USD</p>
            <div className="margin-top-med margin-bottom-large">
              Become a leader in the
              <br />Slooh Community
            </div>

            <ul className="features">
              <li>Public Shows</li>
              <li>Telescopes</li>
              <li>Take Pictures</li>
              <li>Community</li>
              <li>Unlimited Reservations <i className="icon control info-white">info</i>
              </li>
              <li>Objects: All <i className="icon control info-white">info</i>
              </li>
              <li>Video On Demand: All</li>
            </ul>
          </article>

          <footer>
            <button className="btn-primary continue">Continue Free</button>
          </footer>

        </article>

        <article className="plan col-fourth">

          <header className="move-down">
            <div className="spotlight-icon"><img alt="Science log topic icon" src="../assets/icons/science_log.svg" width="90%" /> </div>
          </header>

          <article className="dark backdrop text-center padding-med">

            <h3 className="margin-top-med">Sloh Crew</h3>
            <p className="text-large price">
              <sup>$</sup>1.00 <span className="text-reg">Per User</span>
            </p>

            <p>Monthly | USD</p>

            <div className="margin-top-med margin-bottom-large">For Teacher&apos;s Only
                <br />Up to 30 students <i className="icon control info-white">info</i>
            </div>

            <ul className="features">
              <li>Public Shows</li>
              <li>Telescopes <i className="icon control info-white">info</i>
              </li>
              <li>Take Pictures</li>
              <li>Community</li>
              <li>5 Reservations <small>monthly</small> <i className="icon control info-white">info</i>
              </li>
              <li>Objects: Most Popular</li>
              <li>Video On Demand: All</li>
            </ul>

          </article>

          <footer>
            <button className="btn-primary continue">Continue Free</button>
          </footer>
        </article>
      </section>
    </article>

    <footer className="page margin-top-large">
      Questions?
      <a href="">Contact our upport team</a>.
    </footer>
  </div>
);

export default Plans;
