import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function Popup(props) {

    const style = {
        borderBottom: {
            borderBottom: '1px solid #dee2e6'
        }
    }
    const handleClose = () => {
        props.close();
    }

    return (
        <div>
            <Modal show={props.popupValue} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Name:{props.popUpListData.data.displayName}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={style.borderBottom}>Gravity Points:{props.popUpListData.data.gravity} </Modal.Body>
                <Modal.Body>Gravity Label:{props.popUpListData.data.gravityLabel} </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>

        </div>
    )
}
