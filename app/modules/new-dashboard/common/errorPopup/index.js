import { Component } from 'react';
import React from "react";
import { AccountDetailsHeader } from 'app/modules/account-settings/components/account-details/header';
import Button from 'app/components/common/style/buttons/Button';
import Popup from 'react-modal';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import './style.scss';

export class ErrorPopup extends Component{

    
    render() {
        const { errorstate, onHide } = this.props;
        
        return (
            <Popup
                // ariaHideApp={false}
                isOpen={true}
                style={customModalStylesBlackOverlay}
                contentLabel="Error"
                shouldCloseOnOverlayClick={false}
                onRequestClose={onHide}
            >
                <AccountDetailsHeader headerClass={'h-2 h-2-md text-no-transform'} title={errorstate.statusTitle} showhr={true}/>
                <div className="container">
                    <h4>{errorstate.statusMessage} </h4>
                </div>
                <div className="actions-err-btn">
                    <Button onClickEvent={onHide} text={errorstate.statusBtnTxt} /> 
                </div>
            </Popup>
        );
    }

}