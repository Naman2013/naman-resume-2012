import React, { Component } from 'react';
import { Link } from 'react-router';

const Mission = () => (
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
      <img alt="Slooh Sigil" src="https://vega.slooh.com/assets/chrome/Siggle-Slooh.svg" width="100" height="100" className="center-center" />
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

        <blockquote>
          We encourage you to share your own sense of wonder as we seek to
          curate our collective human response to space across every style
          of thought and expression.
        </blockquote>

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
          to submit your own!
        </p>

        <p>
          The talented and passionate team that have contributed to the
          development of this evolution of Slooh will be represented below,
          as well as members of the community who have been encouraging us
          all along. Needless to say, as when we initially launched with
          that timeless view of Saturn 14 years ago, we&#39;re just getting
          started.
        </p>
      </article>

      <aside className="col-third">
        <figure className="">
          <img alt="Michael Paolucci" src="https://vega.slooh.com/assets/images/about/mike.jpg" width="270" />
          <figcaption>
            <div className="name">Michael Paolucci</div>
            <div className="title">Founder &amp; CEO</div>
          </figcaption>
        </figure>

        <div className="margin-top-med center-center" style={{ width: 270 }}>
          <img alt="Signiture of Michael Paolucci" src="https://vega.slooh.com/assets/images/about/mike-sig.jpg" width="200" />
        </div>

      </aside>
    </section>

    <footer className="page padding-top-large padding-top-large">

      <header className="row-col margin-bottom-xlarge">
        <i className="pull-left margin-bottom-med margin-right-med">
          <img alt="Slooh LIVE icon" src="https://vega.slooh.com/assets/icons/icon-SLT-live.svg" width="60" />
        </i>
        <div className="pull-right col-med">
          <h1 className="white">Syndicate Live Telescope Coverage</h1>
          <div className="white text-large">Join our media list for updates on upcoming events and partner with Slooh in a variety of ways.</div>
        </div>
      </header>

      <article className="row-col">
        <p>
          Slooh&apos;s automated observatories develop celestial image streams in real-time for broadcast to the Internet, and Slooh’s technology is protected by Patent No.: US 7,194,146 B2 which was awarded in 2006.  Slooh's flagship observatory is situated at the Institute of Astrophysics of the Canary Islands (IAC), one of the finest observatory sites in the world and home to the largest telescope in the world. Slooh has traveled with a mobile observatory to Kenya, the Faroe Islands, Indonesia, Iceland, Australia, and Alaska, and partnered with observatories in Arizona, Japan, Hawaii, Cypress, Dubai, South Africa, Australia, New Zealand, Norway and many more to broadcast live celestial events of potentially hazardous asteroids (PHAs), comets, transits, eclipses, solar activity, etc., which are syndicated to media outlets worldwide, including TIME, National Geographic, NPR, Wired, ABC News, the New York Times, Washington Post and many more.
        </p>
        <p>
          Slooh has a variety of options for media partners that want to embed live telescope feeds into their websites during featured shows, as well as daily coverage of the moon, sun and other celestial phenomena.
        </p>
        <p>To join our media list, please submit a request via the <Link to="/about/contact">Contact Us form</Link>, send an email to <a href="mailto:press@slooh.com">press@slooh.com</a> or call 877-427-5664, x3. To partner with Slooh, please provide your contact information so we can follow up via phone to discuss partnership options. We look forward to hearing from you.</p>
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

export default Mission;
