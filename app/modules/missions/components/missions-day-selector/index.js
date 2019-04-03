import React, { PureComponent } from 'react';
import moment from 'moment';
import chevron from 'atoms/icons/chevron.svg';
import './styles.scss';

export class MissionsDaySelector extends PureComponent {
  render() {
    const { selectedDate } = this.props;
    return (
      <div className="missions-day-selector">
        <div className="date">
          <span>The night of</span>{' '}
          {moment(selectedDate).format('dddd, MMM DD, YYYY')}
        </div>
        <div className="arrows prev">
          <div>
            <img alt="prev" src={chevron} />
          </div>
        </div>
        <div className="arrows next">
          <div>
            <img alt="next" src={chevron} />
          </div>
        </div>
      </div>
    );
  }
}
