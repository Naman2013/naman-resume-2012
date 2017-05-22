import React from 'react';
import { darkBlueGray, gray } from '../../styles/variables/colors';


function Description() {
  return (
    <main className="description-container">
      <h4 className="description-title">
        THE SATURN ABOVE IT &nbsp;&nbsp;| &nbsp;&nbsp; An Anthology of Short Fiction About Space
      </h4>
      <div className="description-main">
        <article className="description-leftpanel">
          {'The Saturn Above It gathers together twenty-one short stories about space: a diverse collection of authoritative literary voices on encounters with our universe. This anthology offers a glimpse into our attempts to understand space and our place in it through the varied styles and perspectives of literary visionaries including Don DeLillo, Primo Levi, Steven Millhauser, Kurt Vonnegut, Virginia Woolf, J.G. Ballard, and Ray Bradbury. These stories explore the uniquely human ways we react to the strangeness and enormity of the universe. Together, they offer a portrait of the human psyche and who we are — or could be — when we contemplate all that lies beyond Earth’s atmosphere.'}
          <h4 className="description-title">A note from the editor</h4>
          {'Honestly, we just created a book we wanted to read, but couldn’t find. The Saturn Above It gathers together twenty-one short stories about space, but isn’t a science fiction anthology. Although the collection includes some wonderful sci fi, we felt the strangeness and enormity of the universe demanded a wider net to capture and reflect the diversity of human reaction to our skies and what lies beyond them. This anthology is intended to echo and amplify Slooh’s mission of open access to the stars by presenting a sampling of that diversity. To our editors, that meant a mash-up of short pieces from literary masters such as Don DeLillo, John Updike and Primo Levi juxtaposed with superb science fiction from Ray Bradbury, H.G. Wells and Stephen Baxter, and mixed in with less easily classified works from authors such as J.G. Ballard, Kurt Vonnegut and Margaret Atwood. We added a charming folksy tale from Hans Christian Anderson, a little Lovecraftian horror, and leavened it with a moving and rapturous first person eclipse testimonial by James Fennimore Cooper. We truly believe there’s no one right way ( or literary genre) to contemplate the universe and our collage of wildly diverse visions felt like a fresh approach to capturing a snapshot of the human psyche. We would love to hear your reactions to this, Slooh’s first literary effort to celebrate our common existence under a shared sky.'}
        </article>
        <aside className="description-rightpanel">
          <div className="description-contributors">
            Contributors
          </div>
        </aside>
      </div>
      <style jsx>{`
        .description-container {
          color: ${darkBlueGray};
          padding: 100px 250px;
          font-size: 19px;
        }
        .description-title {
          text-transform: uppercase;
          margin: 10px 0;
        }
        .description-main {
          border-top: 1px solid ${gray};
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 15px;
        }
        .description-leftpanel {
          flex: 1;
        }

        .description-rightpanel {
          flex: 1;
        }

        .description-contributors {
          margin: 0 auto;
          max-width: 100px;
        }
      `}</style>
    </main>
  );
}

export default Description;
