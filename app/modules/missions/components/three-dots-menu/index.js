import React, { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';
import './styles.scss';

const MENU_ITEMS = {
  EDIT_COORDINATES: 'EDIT_COORDINATES',
  FINNISH_RESERVATION: 'FINISH_RESERVATION',
  PIGGYBACK: 'PIGGYBACK',
};

export class ThreeDotsMenu extends PureComponent {
  handleSelect = key => {
    const {
      finnishReservation,
      grabPiggyback,
      editCoordinates,
      timeSlot,
    } = this.props;
    switch (key) {
      case MENU_ITEMS.FINNISH_RESERVATION: {
        finnishReservation(true);
        break;
      }
      case MENU_ITEMS.PIGGYBACK: {
        grabPiggyback(timeSlot);
        break;
      }
      case MENU_ITEMS.EDIT_COORDINATES: {
        editCoordinates(timeSlot);
        break;
      }
      default: {
        return null;
      }
    }
  };

  render() {
    const { timeSlot } = this.props;
    const {
      showPiggybackButton,
      enablePiggybackMenu,
      piggybackMenuText,
      showFinishReservationButton,
      enableFinishReservationMenu,
      finishReservationMenuText,
      showEditCoordinatesButton,
      enableEditCoordinatesMenu,
      editCoordinatesMenuText,
    } = timeSlot;

    return (
      <Dropdown
        className="three-dots-menu"
        onSelect={this.handleSelect}
        alignRight
      >
        <Dropdown.Toggle
          as={props => (
            <i
              className="fa fa-ellipsis-h"
              aria-hidden="true"
              onClick={props.onClick}
            />
          )}
        />

        <Dropdown.Menu>
          {showPiggybackButton && (
            <Dropdown.Item
              eventKey={MENU_ITEMS.PIGGYBACK}
              disabled={!enablePiggybackMenu}
            >
              {piggybackMenuText || 'Auto Save to Photo Hub'}
            </Dropdown.Item>
          )}
          {showFinishReservationButton && (
            <Dropdown.Item
              eventKey={MENU_ITEMS.FINNISH_RESERVATION}
              disabled={!enableFinishReservationMenu}
            >
              {finishReservationMenuText || 'Finish Reservation'}
            </Dropdown.Item>
          )}
          {showEditCoordinatesButton && (
            <Dropdown.Item
              eventKey={MENU_ITEMS.EDIT_COORDINATES}
              disabled={!enableEditCoordinatesMenu}
            >
              {editCoordinatesMenuText || 'Edit Coordinates'}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
