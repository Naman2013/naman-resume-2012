import React, { PureComponent } from 'react';
import './styles.scss';

export class QuestCompleted extends PureComponent {
  render() {
    return (
      <div className="quest-complete__body">
        <div className="quest-complete__body-banner">
          <div className="title">congratulations!</div>
          <div className="subtitle">quest completed!</div>
          <div className="vertical-line"></div>
        </div>
        <div className="quest-complete__body-content">
          <div className="quest-emblem">
            {/*<img src="./img/Quest_Shield.svg" alt="" />*/}
          </div>
          <div className="quest-badge">
            <div className="quest-badge__header">
              <div className="quest-badge__header-left">
                <div className="title">you are awarded the:</div>
                <div className="subtitle">Lorem Ipsum badge</div>
              </div>
            </div>
            <div className="quest-badge__body">
              <div className="quest-badge-review">
                <div className="title">Earned in the Lorem Ipsum Dolar Quest</div>
              </div>
              <ul className="quest-badge-list">
                <li className="quest-list-element">
                  <div className="title">You’ve Collected Data</div>
                  <div>
                    {/*<img src="img/check.svg" alt="" />*/}
                  </div>
                </li>
                <li className="quest-list-element">
                  <div className="title">You’ve Created an Animation</div>
                  <div>
                    {/*<img src="img/check.svg" alt="" />*/}
                  </div>
                </li>
                <li className="quest-list-element">
                  <div className="title">You’ve Added Labels</div>
                  <div>
                    {/*<img src="img/check.svg" alt="" />*/}
                  </div>
                </li>
                <li className="quest-list-element">
                  <div className="title">You’ve Created a Montage</div>
                  <div>
                    {/*<img src="img/check.svg" alt="" />*/}
                  </div>
                </li>
                <li className="quest-list-element">
                  <div className="title">You’ve Got Creative with your Words</div>
                  <div>
                    {/*<img src="img/check.svg" alt="" />*/}
                  </div>
                </li>
                <li className="quest-list-element">
                  <div className="title">You’ve Made correct Choices</div>
                  <div>
                    {/*<img src="img/check.svg" alt="" />*/}
                  </div>
                </li>
                <li className="quest-list-element">
                  <div className="title">You’ve Written</div>
                  <div>
                    {/*<img src="img/check.svg" alt="" />*/}
                  </div>
                </li>
                <li className="quest-list-element">
                  <div className="title">You’ve Completed an Assignment</div>
                  <div>
                    {/*<img src="img/check.svg" alt="" />*/}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
