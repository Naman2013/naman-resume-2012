import React, { Component } from 'react';
import Modal from 'react-modal';
import PersonDetail from '../../components/person-detail/PersonDetail';
import { darkBlueGray, gray } from '../../styles/variables/colors';
import { secondaryFont, primaryFont } from '../../styles/variables/fonts';
import { profilePhotoStyle } from '../../styles/mixins/utilities';

const CONTRIBUTORS = [
  // order matters
  {
    firstName: 'Karen',
    lastName: 'Stevens',
    bio:
      'Karen Stevens exchanged her urban planning career for motherhood, moving to Connecticut to raise her children. A speedy and omnivorous reader, she has expanded her love of reading to encompass editing and writing. The thrill of the universe’s limitless horizons and how they relate and influence human culture has become a bit of an obsession and she is eager to share that excitement with Slooh’s community.',
    photo: 'https://vega.slooh.com/assets/images/bookclub/headshots/Karen.jpg',
  },
  {
    firstName: 'Margaret',
    lastName: 'Atwood',
    bio:
      'Canadian author Margaret Atwood (born in 1939) has produced over 40 books - novels, poetry, short stories, commentary and criticism. She has called some of her work “speculative fiction” rather than science fiction; it often explores feminism, environmentalism, and social justice. Atwood’s critical acclaim has been matched by her popularity. Her 1985 novel of a near future dystopia, The Handmaid’s Tale, has been adapted for the screen several times.',
    photo: 'https://vega.slooh.com/assets/images/bookclub/headshots/Atwood.jpg',
  },
  {
    firstName: 'J.G.',
    lastName: 'Ballard',
    bio:
      'J.G. Ballard (1930-2009) is the British author of short stories, novels, and essays. He drew on his childhood in Shangai during World War II in the novel Empire of the Sun, which Stephen Spielberg adapted into film. Ballard’s distinctive literary obsessions and themes have resulted in the adjective “Ballardian”, which Collins English Dictionary describes as “dystopian modernity, bleak man-made landscapes and the psychological effects of technological, social or environmental developments.”  ',
    photo:
      'https://vega.slooh.com/assets/images/bookclub/headshots/Ballard.jpg',
  },
  {
    firstName: 'Ray',
    lastName: 'Bradbury',
    bio:
      'Over a nearly seventy year career, beloved American author Ray Bradbury (1920-2012) produced many now-classic works of science fiction, including Fahrenheit 451 and The Martian Chronicles. His works have been translated into over 40 languages and adapted for film and television.',
    photo:
      'https://vega.slooh.com/assets/images/bookclub/headshots/Bradbury.jpg',
  },
  {
    firstName: 'Don',
    lastName: 'DeLillo',
    bio: `Don DeLillo was born in New York in 1936. Among the finest American writers working today, he is a novelist, playwright, essayist, and short story writer. His work began to receive a wide audience in the eighties with White Noise, Libra and Underworld. DeLillo employs complex language to explore the state of the modern individual and society. In a 2012 interview with the Chicago Tribune he said, “I think my work is influenced by the fact that we're living in dangerous times. If I could put it in a sentence, in fact, my work is about just that: living in dangerous times.”`,
    photo:
      'https://vega.slooh.com/assets/images/bookclub/headshots/Delillo.jpg',
  },
  {
    firstName: 'Phillip',
    lastName: 'Dick',
    bio:
      'Works including Ubik, The Man in the High Castle, and Do Androids Dream of Electric Sheep? established Phillip K. Dick’s (1928-1982) reputation as an original thinker and hugely influential science fiction author. His writing often explored the nature of reality and personal identity. A chaotic personal life, drug use, and mental instability didn’t slow his output: during his short but prolific career he produced 45 novels and 121 short stories. Many of his works have been adapted for film and television, giving Dick an outsize influence on popular culture.',
    photo: 'https://vega.slooh.com/assets/images/bookclub/headshots/Dick.jpg',
  },
  {
    firstName: 'Primo',
    lastName: 'Levi',
    bio:
      'Italian writer and Holocaust survivor Primo Levi (1919-1987) was educated as a chemist.  During World War II he survived Auschwitz and within a year of his liberation, he had returned to Italy, found work as a chemist and begun to write an account of his survival, If This is a Man. While continuing to work as a chemist, he composed books, poetry, short stories and essays. “He was profoundly in touch with the most endearing human events and with the most contemptible,” Phillip Roth wrote of him.',
    photo: 'https://vega.slooh.com/assets/images/bookclub/headshots/Levi.jpg',
  },
  {
    firstName: 'John',
    lastName: 'Updike',
    bio:
      'During his long career, American novelist, short story writer, poet, and critic John Updike (1932-2009) found both popular and critical success. Two-time winner of the Pulitzer, Updike is best known for his Rabbit series. His beautifully crafted prose often explored the emotional state of the middle class. ',
    photo: 'https://vega.slooh.com/assets/images/bookclub/headshots/Updike.jpg',
  },
  {
    firstName: 'Kurt',
    lastName: 'Vonnegut',
    bio:
      'Kurt Vonnegut was born in Indianapolis in 1922. With his sixth novel, the anti-war Slaughterhouse-Five, he found wide commercial and critical success. It was based on his World War II experiences and made famous the refrain, “So it goes.” His work often employed science fiction elements and biting humor as social commentary. Vonnegut died in 2007.',
    photo:
      'https://vega.slooh.com/assets/images/bookclub/headshots/Vonnegut.jpg',
  },
  {
    firstName: 'Virginia',
    lastName: 'Woolf',
    bio:
      'The author of modernist classics To the Lighthouse, Mrs. Dalloway, Orlando and The Waves, Virginia Woolf is considered one the twentieth century’s most important writers. Born in 1882 to a well-connected London family, Woolf became part of the Bloomsbury Group of British intellectuals and artists and published her first novel in her early thirties. Her fertile creative phases alternated with periods of depression and she took her own life in 1941.',
    photo: 'https://vega.slooh.com/assets/images/bookclub/headshots/Woolf.jpg',
  },
];

const paragraphOne =
  'The Saturn Above It gathers together twenty-one short stories about space: a diverse collection of authoritative literary voices on encounters with our universe. This anthology offers a glimpse into our attempts to understand space and our place in it through the varied styles and perspectives of literary visionaries including Don DeLillo, Primo Levi, Steven Millhauser, Kurt Vonnegut, Virginia Woolf, J.G. Ballard, and Ray Bradbury. These stories explore the uniquely human ways we react to the strangeness and enormity of the universe. Together, they offer a portrait of the human psyche and who we are — or could be — when we contemplate all that lies beyond Earth’s atmosphere.';

const paragraphTwo = `Honestly, we just created a book we wanted to read, but couldn’t find. The Saturn Above It gathers together twenty-one short stories about space, but isn’t a science fiction anthology. Although the collection includes some wonderful sci fi, we felt the strangeness and enormity of the universe demanded a wider net to capture and reflect the diversity of human reaction to our skies and what lies beyond them. This anthology is intended to echo and amplify Slooh’s mission of open access to the stars by presenting a sampling of that diversity. To our editors, that meant a mash-up of short pieces from literary masters such as Don DeLillo, John Updike and Primo Levi juxtaposed with superb science fiction from Ray Bradbury, H.G. Wells and Stephen Baxter, and mixed in with less easily classified works from authors such as J.G. Ballard, Kurt Vonnegut and Margaret Atwood. We added a charming folksy tale from Hans Christian Anderson, a little Lovecraftian horror, and leavened it with a moving and rapturous first person eclipse testimonial by James Fennimore Cooper. We truly believe there’s no one right way ( or literary genre) to contemplate the universe and our collage of wildly diverse visions felt like a fresh approach to capturing a snapshot of the human psyche. We would love to hear your reactions to this, Slooh’s first literary effort to celebrate our common existence under a shared sky.`;
class Description extends Component {
  state = {
    isOpen: false,
    contribIndex: 0,
  };

  toggleModal = (val, index = 0) => {
    this.setState({
      isOpen: val,
      contribIndex: index,
    });
  };
  render() {
    const { contribIndex, isOpen } = this.state;

    const customModalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '650px',
        padding: '50px 25px',
        fontFamily: primaryFont,
      },
      overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
      },
    };

    const modalProfilePhotoStyle = Object.assign(
      profilePhotoStyle(CONTRIBUTORS[contribIndex].photo),
      {
        width: '75px',
        height: '75px',
      }
    );

    return (
      <main className="description-container">
        <h4 className="description-title">
          <b>THE SATURN ABOVE IT</b> &nbsp;&nbsp;| &nbsp;&nbsp; An Anthology of
          Short Fiction About Space
        </h4>
        <div className="description-main">
          <article className="description-leftpanel">
            <span dangerouslySetInnerHTML={{ __html: paragraphOne }} />
            <h4 className="description-title">
              <b>A note from the editor</b>
            </h4>
            <span dangerouslySetInnerHTML={{ __html: paragraphTwo }} />
          </article>
          <aside className="description-rightpanel">
            <div className="description-contributors">
              <div className="contributors-title">Contributors</div>
              {CONTRIBUTORS.map((contributor, i) => (
                <PersonDetail
                  {...contributor}
                  toggleModal={this.toggleModal}
                  key={i}
                  index={i}
                />
              ))}
            </div>
          </aside>
        </div>
        <Modal
          isOpen={isOpen}
          style={customModalStyles}
          contentLabel="Bio"
          onRequestClose={() => this.toggleModal(false)}
        >
          <i className="fa fa-close" onClick={() => this.toggleModal(false)} />
          <div className="modal-person-detail">
            <div
              className="profile-photo"
              key={CONTRIBUTORS[contribIndex].name}
              style={modalProfilePhotoStyle}
            />
            <h4 className="modal-username">
              <div>{CONTRIBUTORS[contribIndex].firstName}</div>
              <div>{CONTRIBUTORS[contribIndex].lastName}</div>
            </h4>
          </div>
          <p
            className="modal-bio"
            dangerouslySetInnerHTML={{ __html: CONTRIBUTORS[contribIndex].bio }}
          />
        </Modal>
        <style jsx>{`
          .description-container {
            color: ${darkBlueGray};
            padding: 50px 250px;
            font-size: 19px;
          }
          .description-title {
            text-transform: uppercase;
            margin: 15px 0;
            font-family: ${primaryFont};
          }
          .description-main {
            border-top: 1px solid ${gray};
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-top: 15px;
            font-family: ${secondaryFont};
          }
          .description-leftpanel {
            flex: 1;
          }

          .description-rightpanel {
            flex: 1;
          }

          .description-contributors {
            float: right;
            max-width: 250px;
            font-family: ${primaryFont};
          }
          .contributors-title {
            font-weight: bold;
            margin-bottom: 15px;
          }

          .modal-person-detail {
            display: flex;
            flex-direction: row;
          }

          .modal-username {
            margin-left: 15px;
            text-transform: uppercase;
          }

          .modal-bio {
            margin-left: 90px;
            margin-top: 15px;
          }

          .fa-close {
            position: absolute;
            top: 5px;
            right: 10px;
          }
        `}</style>
      </main>
    );
  }
}

export default Description;
