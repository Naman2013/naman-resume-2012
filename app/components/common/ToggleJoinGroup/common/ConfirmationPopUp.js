import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import classnames from 'classnames';
import { primaryFont } from 'app/styles/variables/fonts';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';





export function ConfirmationPopUp(props) {
   
    const [showModal, setShowModal] = useState(true);
    

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
           // height: '25%',
            textAlign:'center',
            backgroundColor:'#1C354A',
            color:'#ffff',
            fontSize:'18px',
            overflow:'hidden'
        },
       
    };

    const buttonStyle = {
    
            fontFamily: `${primaryFont}`,
            position:'relative',
            border:`1px dashed #fff`,
            borderRadius:'100px',
            height:'30px',
            margin:'15px 4px',
            fontSize:'11px',
            fontWeight:'bold',
            padding:'7px 15px',
            texrTranform:'uppercase',
            backgroundColor:'transparent',
            color:'#ffff'

    }

    const LeaveTheClub = () => {

        setShowModal(false)
        props.closeModal(true);
        props.confirmArchive();
    }
    const notLeaveTheClub = () => {
        setShowModal(false)
        props.closeModal(false);
    }
    return (
        <div>
            <div>
                <ReactModal
                    isOpen={props.showModal}
                    ariaHideApp={false}
                    contentLabel="onRequestClose Example"
                    // onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={false}
                    style={customStyles}
                >
                    <p>{props.content}</p>
                    <button  style={buttonStyle} onClick={LeaveTheClub}>YES</button>
                    <button  style={buttonStyle} onClick={notLeaveTheClub}>NO</button> 
                </ReactModal>
            </div>
        </div>
    )
}
