import React from 'react';
import { Link } from 'react-router';

const Mission = () => (
  <article className="static-page mission" id="about">

    <header className="static page">
      <h1 className="big-board">
        <div className="text-xlarge">Our Mission:</div>
        <div className="minor-title text-regular margin-top-large margin-bottom-small">Teach the World to</div>
        <div className="major-title">Explore Space</div>
      </h1>
    </header>

    <i className="sigil slooh">
      <img alt="Slooh Sigil" src="https://vega.slooh.com/assets/chrome/Siggle-Slooh.svg" width="100" height="100" className="center-center" />
    </i>

    <section className="row-col margin-bottom-xxlarge move-up-xxlarge">

      <article className="col-2third">
        <p>
          Light pollution and the concentration of population in modern cities have blinded us to an important aspect of our environment, one in which our ancestors had far more appreciation. The distant sparkle of night lights shaped their sense of time and colored their Gods. We aspire to reclaim this lost realm, and with it our sense of perspective regarding the world beyond our making.
        </p>

        <p>
          Space is daunting, the purview of Einstein and rocket scientists. And yet we all wonder about space. It appears in our art and in our stories, in our music and in our dreams. Science leads the way, the little we know about what is out there. But we are inspired equally by imagination, about what <i>might</i> be out there. And by what our ancestors believed was out there, and by how they expressed it.
        </p>

        {
          /*
          <blockquote>
            We encourage you to share your own sense of wonder as we seek to
            curate our collective human response to space across every style
            of thought and expression.
          </blockquote>
          */
        }

        <p>
          We encourage you to share your own sense of wonder as we seek to curate our collective human response to space. Ultimately, we believe we offer a meditation of sorts, a way to reflect on the light we see, and its subsequent reflection upon others.  And we seek to build your connection to space by relating it to the things you already do, by encouraging you to practice yoga with a heightened sense of the Sun, by planning a camp out during the peak of a meteor shower or a BBQ under the full moon.
        </p>

        <p>
          We are committed to an authentic experience, one that emphasizes natural phenomena over simulations and animations, in order to capture the real, yet ephemeral flow of a universe that we often find ourselves struggling to comprehend.
        </p>

        <p>
          We embrace all perspectives about space, including those fueled by hope and spirituality, knowing that no one interpretation can ever be definitive.
        </p>

        <p>
          We believe space exploration is a uniting force, an opportunity to celebrate our common condition under a shared sky. We wish astronomy played a greater role in the education of our children. We think it has the potential to improve our world here on Earth.
        </p>

        <p>
          Your membership is an affirmation of our fourteen year mission to teach the world to explore space. Thank you for your support.
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
          Slooh&apos;s automated observatories develop celestial image streams in real-time for broadcast to the Internet, and Sloohâ€™s technology is protected by Patent No.: US 7,194,146 B2 which was awarded in 2006.  Slooh's flagship observatory is situated at the Institute of Astrophysics of the Canary Islands (IAC), one of the finest observatory sites in the world and home to the largest telescope in the world. Slooh has traveled with a mobile observatory to Kenya, the Faroe Islands, Indonesia, Iceland, Australia, and Alaska, and partnered with observatories in Arizona, Japan, Hawaii, Cypress, Dubai, South Africa, Australia, New Zealand, Norway and many more to broadcast live celestial events of potentially hazardous asteroids (PHAs), comets, transits, eclipses, solar activity, etc., which are syndicated to media outlets worldwide, including TIME, National Geographic, NPR, Wired, ABC News, the New York Times, Washington Post and many more.
        </p>
        <p>
          Slooh has a variety of options for media partners that want to embed live telescope feeds into their websites during featured shows, as well as daily coverage of the moon, sun and other celestial phenomena.
        </p>
        <p>To join our media list, please submit a request via email to <a href="mailto:press@slooh.com">press@slooh.com</a> or call 877-427-5664, x3. To partner with Slooh, please provide your contact information so we can follow up via phone to discuss partnership options. We look forward to hearing from you.</p>
      </article>

      <footer className="row-col">
        <article className="white padding-tb-reg border-dark-top border-dark-bottom">
          To join our media list, please send a request to press@slooh.com or call 877-427-5664 x3.
        </article>
      </footer>
    </footer>

    <style jsx>{`
      .minor-title {
        font-size: 34px;
        font-weight: 300;
      }
      .major-title {
        font-size: 70px;
      }
    `}</style>
  </article>
);

export default Mission;