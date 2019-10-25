import React, { PureComponent } from 'react';
import Countdown from 'react-countdown-now';
import Button from 'app/components/common/style/buttons/Button';
import { FormattedNumber } from 'react-intl';
import './index.scss';

export class ReservationModalCountdown extends PureComponent {
  render() {
    const {
      buttonOnClick,
      extendedTimer,
      onCountdownTick,
      countdown,
      onCountdownComplete,
      completeReservationPromptLong,
      userHasHold,
    } = this.props;
    return (
      <div className="reservation-modal-countdown">
        <div className="countdown">
          <Countdown
            date={Date.now() + countdown}
            onComplete={onCountdownComplete}
            onTick={onCountdownTick}
            renderer={props => (
              <div>
                {completeReservationPromptLong} {props.minutes}:
                <FormattedNumber
                  value={props.seconds}
                  minimumIntegerDigits={2}
                />
              </div>
            )}
          />
        </div>
        {!userHasHold && (
          <Button
            text="Hold one hour"
            onClickEvent={buttonOnClick}
            disabled={extendedTimer}
          />
        )}
      </div>
    );
  }
}
