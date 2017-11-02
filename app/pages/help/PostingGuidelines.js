import React from 'react';
import { Link } from 'react-router';
import s from './Help.scss';

const PostingGuidelines = () => (
  <div>
    <div className="help-page-header">
      <h1 className="help-page-title">Posting Guidelines</h1>
      <Link to="/about/contact" className="button btn-primary help-page-button">
        Contact Us
      </Link>
    </div>
    <div className="help-page-inner">
      <div className="help-page-section">
        <div>
          <div className="help-page-paragraph">Thank you for your participation in the Slooh community!</div>
          <div className="help-page-paragraph">Illuminations posts are meant to be recorded for posterity, to add layers of depth to the experience of looking through a telescope on Slooh. Popular and interesting posts will also be featured during Slooh shows, and promoted by Slooh via social media.</div>
          <div className="help-page-paragraph">We are looking to curate and organize any content inspired by space, including your own original creations. We seek personal narratives, interesting facts, ancient mythology, how-to content, curated snippets from arcane or renowned published works, original creations such as poems, stories, and artwork, and anything that would enhance someone else's appreciation of these objects in the sky.  The best guide in terms of what we are looking for is to follow the standard set with posts such as those you see in <Link to="/best-of-slooh" target="_new">Best of Illuminations.</Link></div>
          <div className="help-page-paragraph">
            Posts are displayed within the Illuminations section of the website, and in the modules below the live telescope feeds and in the Situation Room, so members of the community can benefit from what other members know about specific objects or types of objects. Each post is meant to be associated with one of the Slooh 500 objects on the website, and will appear when the telescope is pointed at that object.
          </div>
          <div className="help-page-paragraph">
            Posts will appear in order based on the number of likes they receive, so the most popular content appears first. For every object in the Slooh 500, we are going to award the title of "Guardian" to the member who receives the most likes for their posts related to that object. Members are also encouraged to share their own and other favorite posts with friends and followers beyond the Slooh community as a means of sharing the experience and attracting more likes to your posts.
          </div>
          <div className="help-page-paragraph">
            We read all posts before they are published to confirm it is a good fit, conforms with editorial standards, and is appropriate for a family friendly environment. Posts may be edited slightly for grammar, spelling, categorization or to conform with editorial standards. Posts may also be rejected outright, with specific reasons provided in the hope you will revise and resubmit.
          </div>
          <div className="help-page-title help-page-paragraph">
            Fair Use
          </div>
          <div className="help-page-paragraph">
            <ul>
              <li>The rough guide for using other people’s content within a posting is to make sure you use less than 20 percent of their work; 10 percent would be better. If this is a book you are sourcing then clearly a paragraph or three won’t hurt, but make sure the book title and author receive credit and try to hyperlink to the book or the author. (Avoid linking to websites like Wikipedia or unreliable sites. It would be better to link to the author’s own site)</li>
              <li>Poems are a little fuzzy still on the fair use front. I would again heavily cite the poet and link to their site if possible.</li>
              <li>If quoting from a news source be sure to reference the reporter and publication, and again be sure to keep well within the 20 percent guidelines.</li>
              <li>If quoting from a website page, again reference the author and link to the site, and stay within the 20 percent guideline.</li>
              <li>If using images, try to use Slooh’s own images sourcing Slooh, or use a creative commons image. There are several free image sites, but they too will have different rules about how you have to credit the artist/photographer.</li>
              <li>You can use one or two lines from a song but source the song title and singer.</li>
              <li>Be very wary about lifting ideas from websites or books without sourcing them. It’s absolutely fine to take an idea, be inspired by it, rethink it and reword it as your own within a large article, but use your gut in determining whether you need to credit someone with the idea.</li>
            </ul>
          </div>
          <div className="help-page-title help-page-paragraph">
            Using Hyperlinks
          </div>
          <div className="help-page-paragraph">
            Please do not include hyperlinks to other sources within a posting.  We will create separate fields for adding hyperlinks and credits so we can control where and when they are displayed.
          </div>
          <div className="help-page-title help-page-paragraph">
            Style Guide
          </div>
          <div className="help-page-paragraph">
            <b>Basic Style</b>
            <ol>
              <li>One space only after a period. <i>Thin clouds often form around the mountains. Other features...</i></li>
              <li>Capitalize all names of planets, stars, groups of stars and the Sun and Moon. <i>Being farther from the Sun than Earth, Mars can appear at any place in the sky on the ecliptic.</i></li>
              <li>Regular comma use (not Oxford comma). <i>Mercury, Mars, Venus and Neptune.</i>
                <br /> Here are two links that show common comma examples AP style:
                <ol>
                  <li><a target="_new" href="http://www.grammaruntied.com/blog/?p=1196">Grammar United</a></li>
                  <li><a target="_new" href="https://www.textbroker.com/ap-style-and-textbroker">Textbroker</a></li>
                </ol>
              </li>
              <li>i.e., and e.g.,  (note the comma after)</li>
              <li>Only three dots …</li>
            </ol>
            <div className="help-page-paragraph">
              <b>Sourcing books, sites, and authors</b><br />
              This is the one exception to AP style: <br />
              Books or newspapers or movie titles should be in italics, authors have full names.
              <ol>
                <li>Julius D.W. Staal mentions in <i>The New Patterns in the Sky</i> that the “lost” Pleiad sometimes refers to Electra and sometimes to Merope.</li>
                <li>In an interview with Neil Armstrong in <i>The Guardian</i>, he said he was “over the Moon”…</li>
              </ol>
            </div>
            <div className="help-page-paragraph">
              <b>Names of people:</b><br />
              Names of people should be full the first use, and after only the second name used. i.e., after example 1) above, you would then refer to the author as Staal.
              <ol>
                <li>Staal goes on to say that Electra or Merope are crying.</li>
              </ol>
            </div>

            <div className="help-page-paragraph">
              <b>Names of places:</b><br />
              Names of U.S. towns unless there is only one of them and they are well-known (Seattle, Los Angeles, New York) should be accompanied by their state written out in abbreviated form. If in doubt of the abbreviation, just spell the entire state name. Do not use OR, NY etc.
              <ol>
                <li>In 1973 in Portland, Ore. James Schumacher, a local farmer, discovered a meteorite in the field behind his house.</li>
              </ol>
            </div>

            <div className="help-page-paragraph">
              <b>Dates:</b><br />
              <table>
                <tr>
                  <td className={s.tableCell}>Abbreviate months with six or more letters if they are used with a specific date. Spell out those with five or fewer letters.</td>
                  <td className={s.tableCell}>Aug. 13, June 6, May 31</td>
                </tr>
                <tr>
                  <td className={s.tableCell}>Spell out the month when it is used without a specific date.</td>
                  <td className={s.tableCell}>In September the football team ... The class begins in February 2015.</td>
                </tr>
                <tr>
                  <td className={s.tableCell}>For days of the month, use only numerals. Do not use nd, rd or th.</td>
                  <td className={s.tableCell}>Aug. 2, Sept. 3, April 4.</td>
                </tr>
                <tr>
                  <td className={s.tableCell}>Do not abbreviate days of the week. You usually do not need both a day of the week and a date.</td>
                  <td className={s.tableCell}>Wednesday, Monday <br />
                    The next game is Oct. 13.</td>
                </tr>
                <tr>
                  <td className={s.tableCell}>Use numerals, a space, lowercase letters, and periods for a.m. and p.m. Do not use extra zeros on times.</td>
                  <td className={s.tableCell}>7 p.m., 10 a.m., 1:45 p.m.</td>
                </tr>
                <tr>
                  <td className={s.tableCell}>Use noon and midnight rather than 12 a.m. or 12 p.m.</td>
                  <td className={s.tableCell}>The club will meet at noon.</td>
                </tr>
              </table>
            </div>
            <div className="help-page-paragraph">
              <b>Examples:</b><br />
              <ol>
                <li>The Full Moon in February is known as the Snow Moon, or the Hunger Moon.</li>
                <li>At midnight on each New Moon Buddhists gather at the top of the mountain.</li>
                <li>The Draconids are best observed between 9 p.m. and 3 a.m. on Oct. 20.</li>
                <li>The eclipse can be seen from 12.58-1p.m.</li>
                <li>In the year 5 A.D.</li>
                <li>In the ‘80s it was considered…</li>
                <li>In the 1920s, a famous astronomer…</li>
              </ol>
            </div>
            <div className="help-page-paragraph">
              <b>Numbers and Money:</b><br />
              <table>
                <tr>
                  <td className={s.tableCell}>
                    In most usage, spell out numbers under 10. Exceptions beyond dates and times shown above:
                    <ul>
                      <li>Addresses: 6 Maple St.</li>
                      <li>Ages, even for inanimate objects: Beth, a 15-year-old; the 2-year-old building</li>
                      <li>Dollars and cents: $5; 5 cents.</li>
                      <li>Measurements (such as dimensions and speed): 6 feet tall, 9-by-12 rug; 7 miles per hour</li>
                      <li>Temperature: 8 degrees</li>
                      <li>Millions, billions: 3 million people</li>
                      <li>Percentages: 4 percent (and spell out “percent”)</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className={s.tableCell}>
                    Spell out any number that appears at the beginning of a sentence. The one exception to this rule is a year: 1981 was the last time the high school won a state title.
                  </td>
                </tr>
                <tr>
                  <td className={s.tableCell}>
                    Do not spell out monetary amounts or use extra zeros: $6 or $2.30, but NOT $6.00 or six dollars.
                  </td>
                </tr>
              </table>
            </div>
            <div className="help-page-paragraph">
              <b>Examples:</b><br />
              <ol>
                <li>The Moon reflects between 3 and 12 percent of the Sun’s rays.</li>
                <li>There are 18 moons in Saturn’s orbit, but only two moons orbit Mars.</li>
                <li>The surface of the earth at the equator moves at a speed of 460 meters per second, or roughly 1,000 miles per hour.</li>
                <li>The Sun’s surface temperature is just 6,000 kelvins (10,340 degrees Fahrenheit)</li>
                <li>Nine years ago, it was discovered that….</li>
                <li>1921 was the last time that the comet was spotted.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PostingGuidelines;
