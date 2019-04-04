import React, { PureComponent } from 'react';
import chevron from 'atoms/icons/chevron.svg';
import './styles.scss';

export class MissionsDaySelector extends PureComponent {
  render() {
    const { selectedDate, selectDate } = this.props;
    const {
      reservationDateFormatted,
      backEnabled,
      forwardEnabled,
      backDate,
      forwardDate,
    } = selectedDate;
    return (
      <div className="missions-day-selector">
        <div className="date">{reservationDateFormatted}</div>
        <div
          className={`arrows prev${backEnabled ? '' : ' disabled'}`}
          onClick={() => selectDate(backDate)}
        >
          <div>
            <img alt="prev" src={chevron} />
          </div>
        </div>
        <div
          className={`arrows next${forwardEnabled ? '' : ' disabled'}`}
          onClick={() => selectDate(forwardDate)}
        >
          <div>
            <img alt="next" src={chevron} />
          </div>
        </div>
      </div>
    );
  }
}
