import React, { PureComponent } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './styles.scss';

export class ReservationModalTabs extends PureComponent {
  render() {
    return (
      <div className="reservation-modal-tabs">
        <Tabs defaultActiveKey="slooh1000" id="reservation-modal-tabs">
          <Tab eventKey="slooh1000" title="by slooh 1000">
            asdfasd
          </Tab>
          <Tab eventKey="constellation" title="by constellation">
            fasdfasd
          </Tab>
          <Tab eventKey="catalog" title="by catalog">
            asfdasd
          </Tab>
          <Tab eventKey="coordinates" title="by coordinates">
            asfdasd
          </Tab>
        </Tabs>
      </div>
    );
  }
}
