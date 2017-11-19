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
          Welcome to Slooh.
        </p>

        <p>
          We believe that when people explore space it makes our world here on Earth better. People who explore space recognize that as a species we have far more in common than separates us. Factors such as light pollution and the concentration of population in modern cities have blinded us to an important aspect of our environment, one of which our ancestors had far more appreciation. The sky and the universe beyond it colored their Gods and shaped their calendars.
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
          We want to help people explore space because we know space is daunting; it&#39;s complex and distant, the turf of Einstein, Newton and rocket scientists. Not for me and you. And yet we all wonder about space. It shows up in our art and in our stories, in our music and in our dreams. We are inspired by science, yes, the little we actually know about what is &#39;out there&#39;, and the new bits we are learning all the time. But also by our imagination--what might be out there? And what our ancestors have believed through the ages and how they have expressed it.
        </p>

        <p>
          We encourage you to share your own sense of wonder as we seek to curate our collective human response to space across all modes of thought and expression. Ultimately, we believe we offer a meditation of sorts, a way to reflect on the light we see, and its subsequent reflection upon others.  And we seek to build your connection to space by relating it to the things you already love to do, by encouraging you to practice yoga with a heightened sense of the Sun, by planning a camp out during the peak of a meteor shower or a BBQ under the full moon.
        </p>

        <p>
          We are committed to an authentic experience, one that emphasizes natural wonders over simulations and animations, in order to capture the real, yet ephemeral flow of a universe that we often find ourselves struggling to comprehend. We embrace all perspectives about space, including those fueled by hope and spirituality, knowing that no one interpretation can ever be definitive. We believe in the wisdom of the crowd--when we look through a Slooh telescope, we are doing it in unison with a global community looking up in wonder with us. We believe astronomy deserves a greater role in the education of our children, and we seek to integrate it into S.T.E.A.M. curriculum.  We believe space is a uniting force, celebrating our common condition under a shared sky.
        </p>

        <p>
          Your membership is an affirmation of our continuing fourteen-year mission to teach the world to explore space.
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
          <Link to="/about/contact" className="btn-primary margin-right-large">Contact Us</Link>
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
