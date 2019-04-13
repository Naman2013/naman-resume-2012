import React, { PureComponent } from 'react';
import Countdown from 'react-countdown-now';
import { FormattedNumber } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import './index.scss';

export class ReservationModalCountdown extends PureComponent {
  render() {
    const { buttonOnClick, extendedTimer } = this.props;
    return (
      <div className="reservation-modal-countdown">
        <div className="countdown">
          <Countdown
            date={
              extendedTimer
                ? Date.now() + 60 * 60 * 1000
                : Date.now() + 5 * 60 * 1000
            }
            //onComplete={onCancel}
            renderer={props => (
              <div>
                Please complete your reservation within {props.minutes}:
                <FormattedNumber
                  value={props.seconds}
                  minimumIntegerDigits={2}
                />
              </div>
            )}
          />
        </div>
        <Button
          text="Hold one hour"
          onClickEvent={buttonOnClick}
          disabled={extendedTimer}
        />
      </div>
    );
  }
}
