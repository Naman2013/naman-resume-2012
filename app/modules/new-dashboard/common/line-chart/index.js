import { Component } from 'react';
import React from "react";
// import './style.scss';
import { Chart } from "react-google-charts";

export class LineChart extends Component{

    
    
    render() {
        // const {data} = this.props;
        const data = {"Sunday": 100, "Monday": 200, "Tuesday": 800, "Wednesday": 500, "Thursday": 300, "Friday": 150, "Saturday": 80};
            
        return (
            <div className="title-main">
                <Chart
                    chartType="LineChart"
                    data={[["Day", "Gravity Points"], [0,100], [1, 200], [2,150], [3, 500], [4,300], [5,350], [6,100]]}
                    width="100%"
                    height="400px"
                    
                    options={{
                        backgroundColor: '#253446',
                        hAxis: {
                          title: 'Days',
                          textStyle:{color: '#FFF'},
                          titleTextStyle:{color: '#FFF'},
                          baselineColor:{color: '#FFF'},
                        //   ticks: [{v:0, f:"100$"},{v:150, f:"150$"},{v:200, f:"200$"},{v:300, f:"300$"}]
                        },
                        vAxis: {
                          title: 'Gravity Points',
                          textStyle:{color: '#FFF'},
                          titleTextStyle:{color: '#FFF'},
                          baselineColor:{color: '#FFF'},
                        },
                        series: {
                        //   0: { curveType: 'function' },
                        },
                        legend: { 
                            position: 'bottom',
                            textStyle: {color: '#FFF'},
                        },                        
                        pointShape: 'circle',
                        chartArea: {
                            // leave room for y-axis labels
                            left:75,bottom:75, top: 20, right:20,width:"100%",height:"100%"
                        },
                        axes: {
                            x: {
                              0: {side: 'bottom'}
                            },
                            y: {
                                0: {side: 'left'}
                            }
                        
                        },
                        vaxes:[
                            {title: 'Gravity Points',
                            textStyle:{color: '#FFF'},
                            titleTextStyle:{color: '#FFF'},
                            baselineColor:{color: '#FFF'},},
                            {}
                        ]
                    }}
                />
            </div>   
        );
    }

}