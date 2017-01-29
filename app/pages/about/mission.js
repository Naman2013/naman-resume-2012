import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
// import style from './static.scss';

class Mission extends Component {
  render() {
    return (
      <article className="static-page mission" id="about">

        <header className="static page">
          <h1 className="big-board">
            <div className="text-xlarge">Our Mission:</div>
            <div className="text-regular margin-top-large margin-bottom-small">Everyone Should Have access to</div>
            <div className="text-xxlarge">The Wonders of </div>
            <div className="text-ginormous">Space</div>
          </h1>
        </header>

        <i className="sigil slooh">
          <img alt="Slooh Sigil" src="assets/chrome/Siggle-Slooh.svg" width="100" height="100" className="center-center" />
        </i>

        <section className="row-col margin-bottom-xxlarge move-up-xxlarge">

          <article className="col-2third">
            <p>
              Welcome.
            </p>

            <p>
              Slooh launched on a Christmas morning fourteen years ago with
              just two telescopes in the Canary Islands. On that day we shared
              with our few curious members the light of the Sun bouncing off the
              planet Saturn and reflecting back to us here on Earth.
            </p>

            <p>
              Over the years we’ve expanded the footprint of our observatories
              and your capacity to control them, but a few things have remained
              constant throughout. For one, we’re committed to the authenticity
              of a &quot;live&quot; experience (versus 3D simulations or
              animations) in order to capture the real, yet ephemeral flow of a
              universe that we often find ourselves struggling to comprehend.
              That desire to know our place in the vast firmament around us is
              not one we explore alone. When we look through a Slooh telescope,
              we are doing it in unison with a global community looking up in
              wonder with us. Therefore, we fundamentally designed this new
              experience to be a social one, bringing about an active exchange
              of ideas and expressions.
            </p>

            <p>
              True to our mission, we welcome diverse perspectives about what
              is out &#39;there&#39;, knowing that no one interpretation can
              ever be definitive. We encourage you to share your own sense of
              wonder as we seek to curate our collective human response to space
              across every style of thought and expression. We&#39;re open to
              the spiritual, the artistic, the imaginative, along with the
              scientific. Ultimately, we believe we offer a meditation of sorts,
              a way to reflect on the light we see, and its subsequent
              reflection upon others. Look for these new community contributions
              adjacent to our live telescope feeds--and by all means feel free
              to submit your own!d
            </p>

            <p>
              The talented and passionate team that have contributed to the
              development of this evolution of Slooh will be represented below,
              as well as members of the community who have been encouraging us
              all along. Needless to say, as when we initially launched with
              that timeless view of Saturn 14 years ago, we&#39;re just getting
              started.
            </p>

            <blockquote>
              We encourage you to share your own sense of wonder as we seek to
              curate our collective human response to space across every style
              of thought and expression.
            </blockquote>
          </article>

          <aside className="col-third">
            <figure className="">
              <img alt="Michael Paolucci" src="assets/images/about/mike.jpg" width="270" />
              <figcaption>
                <div className="name">Michael Paolucci</div>
                <div className="title">Founder &amp; CEO</div>
              </figcaption>
            </figure>

            <div className="margin-top-med center-center" style={{ width: 270 }}>
              <img alt="Signiture of Michael Paolucci" src="assets/images/about/mike-sig.jpg" width="200" />
            </div>

          </aside>
        </section>

        <footer className="page padding-top-large padding-top-large">

          <header className="row-col margin-bottom-xlarge">
            <i className="pull-left margin-bottom-med margin-right-med">
              <img alt="Slooh LIVE icon" src="assets/icons/icon-SLT-live.svg" width="60" />
            </i>
            <div className="pull-right col-med">
              <h1 className="white">Syndicate Live Telescope Coverage</h1>
              <div className="white text-large">Join our media list and we will provide you with updates on events which include embed codes.</div>
            </div>
          </header>

          <article className="row-col">
            <p className="col-2third">Since 2003 our live coverage of celestial events has been watched by hundreds of millions of viewers worldwide as eclipses, transits, comets, asteroids and other celestial phenomena unfold in real-time and high definition, while Slooh hosts Bob Berman and Paul Cox interview expert guests. Our coverage has been syndicated to media outlets such as NBC, ABC, CNN, Fox News, National Geographic, Wired, The Weather Channel, the Google Doodle, and was recently covered in The New York Times.</p>

            <figure className="col-third">
              <video />
            </figure>
          </article>

          <footer className="row-col">
            <article className="white padding-tb-reg border-dark-top border-dark-bottom">
              <Link to="about/contact" className="btn-primary margin-right-large">Contact Us</Link>
              To join our media list, please send a request to press@slooh.com or call 877-427-5664 x3.
            </article>
          </footer>
        </footer>
      </article>
    );
  }
}

export default Mission;
