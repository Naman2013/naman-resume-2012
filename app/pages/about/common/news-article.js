import React from 'react';

const NewsArticle = () => (
  <section className="row-col margin-bottom-xxlarge">
    <article className="margin-bottom-large">
      {/**
          not sure if we are going to need this
          <figure className="article">
            <img src="https://vega.slooh.com/assets/photos/stellar-community.jpg" />
            <figcaption>
              <cite>[Citation]</cite>
            </figcaption>
          </figure>
        */}

      <header className="article-title-info">
        <h1 className="clearfix">SLOOH RECEIVES FUNDING FROM THE NATIONAL SCIENCE FOUNDATION</h1>

        <h2 className="margin-bottom-large">
          Phase One SBIR Grant Supports Expansion of Platform Teaching People to Explore Space
        </h2>

        {/**
            not sure if we are going to need this...
            <aside className="byline">
              <div className="headshot" />
              <cite className="author">
                [Author Name]
              </cite>
              <cite className="publication">
                [publication]
              </cite>
              <cite className="location">
                [City, State, coutry]. Member since [Year]
              </cite>
            </aside>
          */}
      </header>

      <article className="col-wide">
        <aside className="date-section">
          Posted on <date>12/20/2017</date>
        </aside>

        <p>
          Washington Depot, CT - On the eve of its 14th anniversary, Slooh is proud to announce it
          has been awarded a Phase One SBIR Grant from the National Science Foundation for its
          proposal entitled ‘Curriculum Driven Gamification of Space Exploration”. The funding is
          validation of the company’s mission to teach the world to explore space.
        </p>

        <p>
          Slooh teaches people to explore space by providing access to online telescopes, enriching
          content reflecting all human wisdom about space, and social tools to interact with a
          community of fellow explorers. Slooh reduces the complexity, time commitment and cost of
          exploring space through an easy-to-use online interface. Now the company plans to gamify
          the experience in a series of narratives that are eminently relatable to users with little
          knowledge on the subject.
        </p>

        <p>
          “The NSF grant supports our expansion into schools with our Slooh{' '}
          <a href="https://slooh.com/joinClassroom.php">Classroom</a> product for K-12 and our Slooh{' '}
          <a href="https://slooh.com/joinAstroLab.php">Astrolab</a> product for college students”,
          said Dr. Paige Godfrey, Director of Research and Education at Slooh, and principal
          investigator of the NSF funded proposal.
        </p>

        <p>
          Slooh provides social viewing and control of robotic telescopes situated at world class
          observatory sites, including seven telescopes situated at its flagship observatory, at the
          Institute of Astrophysics of the Canary Islands, one of the world’s top observatory sites,
          and three telescopes based in Santiago, Chile, situated at the Catholic University and
          offering complementary views of the southern skies.
        </p>

        <h3>Membership levels include:</h3>
        <ul>
          <li>
            Slooh Crew - Free registration to look through telescopes, take pictures participate in
            the community and watch live shows.
          </li>
          <li>
            Slooh Apprentice - For beginners and students at $4.95 per month, providing a curated
            experience to point the telescopes at the 500 most popular objects in the night sky.{' '}
          </li>
          <li>
            Slooh Astronomer - Amateur astronomers at $24.95 per month featuring ability to point
            telescopes at any object in the sky{' '}
          </li>
        </ul>

        <p>
          Since its inception on December 25th, 2003, Slooh&#39;s membership community have operated
          its robotic telescopes continuously for 4,800 nights, weather permitting. During that
          time, members have pointed the telescopes over one million times and taken over five
          million images of 50,000+ unique objects in the sky. Members have made over 6,000
          submissions to the Minor Planet Center, tracked comets for the European Space Agency, been
          published in research with the Max Planck Institute, discovered and confirmed numerous
          supernova, nova, etc.
        </p>

        <h3>About Slooh</h3>
        <p>
          Slooh connects humanity through communal exploration of the universe. Sloohh&#39;s
          automated observatories develop celestial image streams in real-time for broadcast to the
          Internet, and Sloohh&#39;s technology is protected by Patent No.: US 7,194,146 B2 which
          was awarded in 2006. Slooh has traveled with a mobile observatory to Kenya, the Faroe
          Islands, Indonesia, Iceland, Australia, Idaho and Alaska to broadcast live celestial
          events of potentially hazardous asteroids (PHAs), comets, transits, eclipses, solar
          activity, etc., which are syndicated to media outlets worldwide, including BuzzFeed,
          National Geographic, Wired, ABC News, The New Yorker and many more. Slooh recently
          published a book,{' '}
          <a href="https://www.amazon.com/Saturn-Above-Various/dp/0997621109/ref=sr_1_1?s=books&ie=UTF8&qid=1485711386&sr=1-1&keywords=the+saturn+above+it">
            The Saturn Above It
          </a>, An Anthology of Short Fiction About Space, edited by Karen Stevens. Slooh is
          supported by investment from Connecticut Innovations, the State’s venture capital
          investment fund. Slooh is based in Washington Depot, CT and is hiring for positions in
          engineering and content development.
        </p>

        <h3>Contact</h3>
        <p>
          EM: <a href="mailto:press@slooh.com">press@slooh.com</a>
        </p>

        <address>
          PH: 877-427-5664, ext. 3<br />
          176 West Morris Road<br />
          Washington Depot CT 06794<br />
          (819 words)
        </address>
      </article>
    </article>
  </section>
);

export default NewsArticle;
