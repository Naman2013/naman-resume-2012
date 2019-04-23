import React, { PureComponent, Fragment } from 'react';
import chevron from 'atoms/icons/chevron.svg';
import './styles.scss';

export class MissionsDaySelector extends PureComponent {
  render() {
    const { selectedDate, selectDate, showDateArrows } = this.props;
    const {
      reservationDateFormatted,
      backEnabled,
      forwardEnabled,
      backDate,
      forwardDate,
    } = selectedDate;
    console.log(showDateArrows);
    return (
      <div className="missions-day-selector">
        <div className="date">{reservationDateFormatted}</div>
        {showDateArrows && (
          <Fragment>
            <div
              className={`arrows prev${backEnabled ? '' : ' disabled'}`}
              onClick={() => (backEnabled ? selectDate(backDate) : {})}
            >
              <div>
                <img alt="prev" src={chevron} />
              </div>
            </div>
            <div
              className={`arrows next${forwardEnabled ? '' : ' disabled'}`}
              onClick={() => (forwardEnabled ? selectDate(forwardDate) : {})}
            >
              <div>
                <img alt="next" src={chevron} />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
