import React, { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';

const MENU_ITEMS = {
  EDIT_COORDINATES: 'EDIT_COORDINATES',
  FINNISH_RESERVATION: 'FINISH_RESERVATION',
  PIGGYBACK: 'PIGGYBACK',
};

export class ThreeDotsMenu extends PureComponent {
  render() {
    const { timeSlot } = this.props;
    const {
      showPiggybackButton,
      enablePiggybackMenu,
      piggybackMenuText, //Auto Save to Photo Hub
      showFinishReservationButton,
      enableFinishReservationMenu,
      finishReservationMenuText, //Finish Reservation
      showEditCoordinatesButton,
      enableEditCoordinatesMenu,
      editCoordinatesMenuText, //Edit Coordinates
    } = timeSlot;
    
    return (
      <Dropdown>
        <Dropdown.Toggle
          as={props => (
            <i
              className="fa fa-ellipsis-h"
              aria-hidden="true"
              onClick={props.onClick}
            />
          )}
          id="dropdown-custom-components"
        />

        <Dropdown.Menu>
          {showPiggybackButton && (
            <Dropdown.Item
              eventKey={MENU_ITEMS.PIGGYBACK}
              disabled={!enablePiggybackMenu}
            >
              Auto Save to Photo Hub
            </Dropdown.Item>
          )}
          {showFinishReservationButton && (
            <Dropdown.Item
              eventKey={MENU_ITEMS.FINNISH_RESERVATION}
              disabled={!enableFinishReservationMenu}
            >
              Finish Reservation
            </Dropdown.Item>
          )}
          {showEditCoordinatesButton && (
            <Dropdown.Item
              eventKey={MENU_ITEMS.EDIT_COORDINATES}
              disabled={!enableEditCoordinatesMenu}
            >
              Edit Coordinates
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
