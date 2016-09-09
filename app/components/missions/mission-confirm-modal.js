import React, {Component, Props} from 'react';
import { Modal } from 'react-bootstrap';


function mapStateToProps({ mission }) {
  return { mission };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...missionActions }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps);

export default class MissionConfirmModal extends React.Component {



  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

};
