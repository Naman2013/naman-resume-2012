import React, { PureComponent } from "react";
import { Button } from "../../components/button";
import './style.scss';

export default class MapNavigation extends PureComponent{

    render(){
        const { onLeftButtonClick, onRightButtonClick, onUpButtonClick, onDownButtonClick, onZoomInButtonClick, onZoomOutButtonClick, zoomInDisabled, zoomOutDisabled, navigationBackgroundColor } =this.props;
        return(
            <div>
                <div className="circle-div" style={{backgroundColor: navigationBackgroundColor}}>
                    <Button
                        type={"button"}
                        onClickEvent={onUpButtonClick} 
                        text={""}
                        style={"up-btn"}
                        icon={"https://vega.slooh.com/assets/v4/dashboard-new/up_arrow_white.svg"}
                    />
                    <div className="center-div">
                        <Button
                            type={"button"}
                            onClickEvent={onLeftButtonClick} 
                            text={""}
                            style={"left-btn"}
                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"}
                        />
                        <div className="zoom-div">
                            <Button
                                disabled={zoomInDisabled}
                                type={"button"}
                                onClickEvent={onZoomInButtonClick} 
                                text={""}
                                style={"zoom-btn"}
                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/plus.svg"}
                            />
                            
                            <Button
                                disabled={zoomOutDisabled}
                                type={"button"}
                                onClickEvent={onZoomOutButtonClick} 
                                text={""}
                                style={"zoom-btn"}
                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/minus.svg"}
                            />
                        </div>
                        <Button
                            type={"button"}
                            onClickEvent={onRightButtonClick} 
                            text={""}
                            style={"right-btn"}
                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"}
                        />
                    </div>
                    <Button
                        type={"button"}
                        onClickEvent={onDownButtonClick} 
                        text={""}
                        style={"down-btn"}
                        icon={"https://vega.slooh.com/assets/v4/dashboard-new/down_arrow_white.svg"}
                    />
                </div>
                {/* <div class="circle-container">
                    <div class="circle-crop-top">
                        <div class="circle-parent">
                            <div class="circle"><p>Luzern</p></div>
                        </div>   
                    </div>
                    <div class="circle-first-left">
                        <div class="circle-parent">
                            <div class="circle"><p>Bern</p></div>
                        </div>
                    </div>
                    <div class="circle-first-right">
                        <div class="circle-parent">
                            <div class="circle"><p>Zurich</p></div>
                        </div>
                    </div>
                    <div class="circle-second-left">
                        <div class="circle-parent">
                            <div class="circle"><p>Basel</p></div>
                        </div>
                    </div>
                    <div class="circle-second-right">
                        <div class="circle-parent">
                            <div class="circle"><p>Genf</p></div>
                        </div>
                    </div>
                    <div class="circle-bottom">
                        <div class="circle-parent">
                            <div class="circle"><p>Saas-Fee, Alpin</p></div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}